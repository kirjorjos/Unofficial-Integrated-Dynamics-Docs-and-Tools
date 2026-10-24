import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  branchSlug,
  branchUrl,
  isServedBranch,
  normalizeBase,
} from "./branchPattern";
import {
  allowsBootstrap,
  parseBranchesJson,
  pruneMissing,
  serializeBranchesJson,
  type BranchesConfig,
} from "./branchesJson";
import { composeSite, type ComposeEntry } from "./compose";
import {
  emptyDeployState,
  isFullSha,
  readDeployState,
  shaOf,
  stateUrlFor,
  type DeployState,
} from "./deployState";
import { DeployError } from "./errors";
import {
  decideRebuild,
  lockHashOf,
  parseBuildManifest,
  serializeBuildManifest,
  storePlan,
  viteVersionFromLock,
  type BranchOutcome,
  type BuildTarget,
  type StoredFolderState,
  type StorePlan,
  type Toolchain,
} from "./store";

const DEFAULT_BASE = "/Unofficial-Integrated-Dynamics-Docs-and-Tools/";
const DEFAULT_SITE_URL = "https://kirjorjos.github.io";
const DEFAULT_OUT = "_site";
const DEFAULT_REMOTE = "origin";
const METADATA_BRANCH = "metadata";

type FlagValue = string | boolean;
type FlagMap = Map<string, FlagValue>;

type Command = "build" | "publish";

interface Target {
  branch: string;
  sha: string;
}

interface BranchReport {
  branch: string;
  sha: string;
  action: "built" | "reused" | "failed" | "pruned";
  reason?: string;
  files?: number;
  bytes?: number;
}

const USAGE = `Usage:
  pages-deploy build [--mode auto|all] [--dry-run] [--base <path>]
                     [--out <dir>] [--site-url <url>] [--state-url <url>]
                     [--metadata-ref <ref>] [--remote <name>]
                     [--trigger-branch <branch>] [--trigger-sha <sha>]
                     [--work-dir <dir>]
  pages-deploy publish [--base <path>] [--out <dir>]

  pages-deploy.mjs --bundle <file.cjs>   (write a standalone CLI bundle)`;

const BUILD_FLAGS = new Set([
  "mode",
  "dry-run",
  "base",
  "out",
  "site-url",
  "state-url",
  "metadata-ref",
  "remote",
  "trigger-branch",
  "trigger-sha",
  "work-dir",
  "help",
]);

const PUBLISH_FLAGS = new Set(["base", "out", "help"]);

function parseArgs(argv: string[]): { command: Command; flags: FlagMap } {
  const [command, ...rest] = argv;
  if (command === "--help" || command === "help") {
    return { command: "publish", flags: new Map([["help", true]]) };
  }
  if (command !== "build" && command !== "publish") {
    throw new DeployError(
      `Unknown command ${JSON.stringify(command)}\n\n${USAGE}`
    );
  }

  const flags: FlagMap = new Map();
  for (let index = 0; index < rest.length; index++) {
    const arg = rest[index]!;
    if (!arg.startsWith("--")) {
      throw new DeployError(`Unexpected argument: ${arg}\n\n${USAGE}`);
    }
    const equals = arg.indexOf("=");
    if (equals !== -1) {
      flags.set(arg.slice(2, equals), arg.slice(equals + 1));
      continue;
    }
    const name = arg.slice(2);
    const next = rest[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags.set(name, next);
      index += 1;
    } else {
      flags.set(name, true);
    }
  }

  const allowed = command === "build" ? BUILD_FLAGS : PUBLISH_FLAGS;
  for (const name of flags.keys()) {
    if (!allowed.has(name)) {
      throw new DeployError(`Unknown flag for ${command}: --${name}`);
    }
  }

  return { command, flags };
}

function stringFlag(flags: FlagMap, name: string, fallback?: string): string {
  const value = flags.get(name);
  if (value === undefined) {
    if (fallback !== undefined) return fallback;
    throw new DeployError(`Missing required flag: --${name}`);
  }
  if (typeof value !== "string") {
    throw new DeployError(`Flag --${name} needs a value`);
  }
  return value;
}

function booleanFlag(flags: FlagMap, name: string): boolean {
  const value = flags.get(name);
  if (value === undefined) return false;
  if (value !== true) {
    throw new DeployError(`Flag --${name} does not take a value`);
  }
  return true;
}

interface RunOptions {
  cwd?: string;
  capture?: boolean;
  env?: NodeJS.ProcessEnv;
}

function redact(value: string): string {
  const token = process.env["PAGES_PUSH_TOKEN"];
  return token === undefined || token.length === 0
    ? value
    : value.split(token).join("***");
}

function run(
  command: string,
  args: string[],
  options: RunOptions = {}
): string {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.error) {
    throw new DeployError(
      `${command} could not be started: ${result.error.message}`
    );
  }
  if (result.status !== 0) {
    const stderr =
      typeof result.stderr === "string" ? result.stderr.trim() : "";
    throw new DeployError(
      redact(
        `\`${command} ${args.join(" ")}\` failed (exit ${
          result.status ?? "signal"
        })${stderr ? `\n${stderr}` : ""}`
      )
    );
  }
  return typeof result.stdout === "string" ? result.stdout.trim() : "";
}

function git(repo: string, args: string[], capture = true): string {
  return run("git", args, { cwd: repo, capture });
}

function repoRoot(): string {
  return run("git", ["rev-parse", "--show-toplevel"], {
    capture: true,
    cwd: process.cwd(),
  });
}

function readText(file: string): string | undefined {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return undefined;
  }
}

function readFileAtCommit(
  repo: string,
  sha: string,
  file: string
): string | undefined {
  const result = spawnSync("git", ["show", `${sha}:${file}`], {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (result.status !== 0 || typeof result.stdout !== "string")
    return undefined;
  return result.stdout;
}

function packageVersion(file: string): string | undefined {
  const text = readText(file);
  if (text === undefined) return undefined;
  try {
    const parsed: unknown = JSON.parse(text);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as { version?: unknown }).version === "string"
    ) {
      return (parsed as { version: string }).version;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function remoteUrl(remote: string): string {
  const token = process.env["PAGES_PUSH_TOKEN"];
  const repository = process.env["GITHUB_REPOSITORY"];
  return token !== undefined && repository !== undefined
    ? `https://x-access-token:${token}@github.com/${repository}.git`
    : remote;
}

function fetchMetadata(repo: string, remote: string): string {
  const ref = `refs/remotes/${remote}/${METADATA_BRANCH}`;
  const result = spawnSync(
    "git",
    [
      "fetch",
      "--no-tags",
      "--depth=1",
      remoteUrl(remote),
      `+${METADATA_BRANCH}:${ref}`,
    ],
    { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  );
  if (result.status !== 0) {
    const stderr =
      typeof result.stderr === "string" ? redact(result.stderr.trim()) : "";
    throw new DeployError(
      `Could not fetch the ${METADATA_BRANCH} branch from ${remote}. ` +
        `Create it first (see README "Deployments"), then re-run.` +
        (stderr ? `\n${stderr}` : "")
    );
  }
  return ref;
}

function addWorktree(repo: string, dir: string, ref: string): void {
  spawnSync("git", ["worktree", "prune"], { cwd: repo, stdio: "ignore" });
  fs.rmSync(dir, { recursive: true, force: true });
  git(repo, ["worktree", "add", "--detach", "--force", dir, ref], false);
}

function removeWorktree(repo: string, dir: string): void {
  spawnSync("git", ["worktree", "remove", "--force", dir], {
    cwd: repo,
    stdio: "ignore",
  });
  fs.rmSync(dir, { recursive: true, force: true });
  spawnSync("git", ["worktree", "prune"], { cwd: repo, stdio: "ignore" });
}

function remoteHeads(repo: string, remote: string): Map<string, string> {
  const output = git(repo, ["ls-remote", "--heads", remoteUrl(remote)]);
  const heads = new Map<string, string>();
  if (output === "") return heads;
  for (const line of output.split("\n")) {
    const tab = line.indexOf("\t");
    if (tab === -1) continue;
    const sha = line.slice(0, tab);
    const ref = line.slice(tab + 1);
    const prefix = "refs/heads/";
    if (!ref.startsWith(prefix)) continue;
    heads.set(ref.slice(prefix.length), sha);
  }
  return heads;
}

function ensureCommit(repo: string, remote: string, sha: string): void {
  const local = spawnSync("git", ["cat-file", "-e", `${sha}^{commit}`], {
    cwd: repo,
    stdio: "ignore",
  });
  if (local.status === 0) return;
  const fetched = spawnSync(
    "git",
    ["fetch", "--no-tags", "--depth=1", remoteUrl(remote), sha],
    { cwd: repo, stdio: "ignore" }
  );
  if (fetched.status !== 0) {
    throw new DeployError(
      `Pinned commit ${sha} is not reachable on ${remote}; refusing to substitute a branch tip`
    );
  }
}

function toolchainFor(repo: string, sha: string): Toolchain {
  const lockText = readFileAtCommit(repo, sha, "package-lock.json");
  return {
    node: process.version,
    vite:
      lockText === undefined
        ? "unknown"
        : (viteVersionFromLock(lockText) ?? "unknown"),
    lockHash: lockHashOf(lockText),
  };
}

function storedFolderState(dir: string): StoredFolderState {
  if (!fs.existsSync(dir)) {
    return { folderExists: false, indexExists: false };
  }
  const indexExists = fs.existsSync(path.join(dir, "index.html"));
  const manifestPath = path.join(dir, "build.json");
  const manifestText = readText(manifestPath);
  if (manifestText === undefined) {
    return { folderExists: true, indexExists };
  }
  try {
    return {
      folderExists: true,
      indexExists,
      manifest: parseBuildManifest(manifestText),
    };
  } catch (error) {
    return {
      folderExists: true,
      indexExists,
      manifestError: error instanceof Error ? error.message : String(error),
    };
  }
}

interface RebuildInput {
  repo: string;
  workDir: string;
  metadataWt: string;
  branch: string;
  sha: string;
  base: string;
}

function rebuildBranch(input: RebuildInput): void {
  const slug = branchSlug(input.branch);
  const worktree = path.join(input.workDir, "branches", slug);
  const storeDir = path.join(input.metadataWt, "builds", slug);
  const branchBase = branchUrl(input.base, input.branch);

  addWorktree(input.repo, worktree, input.sha);
  try {
    run("npm", ["ci", "--prefer-offline", "--no-audit", "--no-fund"], {
      cwd: worktree,
    });

    fs.rmSync(storeDir, { recursive: true, force: true });
    run(
      "npx",
      [
        "--no-install",
        "vite",
        "build",
        `--base=${branchBase}`,
        "--outDir",
        storeDir,
        "--emptyOutDir",
      ],
      { cwd: worktree }
    );

    const lockText = fs.readFileSync(
      path.join(worktree, "package-lock.json"),
      "utf8"
    );
    const vite =
      packageVersion(path.join(worktree, "node_modules/vite/package.json")) ??
      "unknown";
    fs.writeFileSync(
      path.join(storeDir, "build.json"),
      serializeBuildManifest({
        branch: input.branch,
        sha: input.sha,
        base: branchBase,
        toolchain: {
          node: process.version,
          vite,
          lockHash: lockHashOf(lockText),
        },
      })
    );
  } catch (error) {
    fs.rmSync(storeDir, { recursive: true, force: true });
    throw error;
  } finally {
    removeWorktree(input.repo, worktree);
  }
}

function commitStore(metadataWt: string, message: string): string {
  git(metadataWt, ["add", "-A"], false);
  const tree = git(metadataWt, ["write-tree"]);
  const identity = {
    GIT_AUTHOR_NAME: "github-actions[bot]",
    GIT_AUTHOR_EMAIL: "41898282+github-actions[bot]@users.noreply.github.com",
    GIT_COMMITTER_NAME: "github-actions[bot]",
    GIT_COMMITTER_EMAIL:
      "41898282+github-actions[bot]@users.noreply.github.com",
  };
  return run("git", ["commit-tree", tree, "-m", message], {
    cwd: metadataWt,
    capture: true,
    env: { ...process.env, ...identity },
  });
}

function pushStore(
  repo: string,
  remote: string,
  commit: string,
  oldSha: string | undefined
): void {
  const target = remoteUrl(remote);

  const args = ["push"];
  if (oldSha !== undefined) {
    args.push(`--force-with-lease=refs/heads/${METADATA_BRANCH}:${oldSha}`);
  }
  args.push(target, `${commit}:refs/heads/${METADATA_BRANCH}`);

  const result = spawnSync("git", args, {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    const stderr =
      typeof result.stderr === "string" ? redact(result.stderr).trim() : "";
    throw new DeployError(
      `Could not push the ${METADATA_BRANCH} store (exit ${result.status})` +
        (stderr ? `\n${stderr}` : "")
    );
  }
}

function writeOutput(name: string, value: string): void {
  const outputFile = process.env["GITHUB_OUTPUT"];
  if (outputFile === undefined) return;
  fs.appendFileSync(outputFile, `${name}=${value}\n`);
}

function writeSummary(lines: string[]): void {
  const summaryFile = process.env["GITHUB_STEP_SUMMARY"];
  if (summaryFile === undefined) return;
  fs.appendFileSync(summaryFile, `${lines.join("\n")}\n`);
}

function printTable(reports: BranchReport[], pruned: string[]): void {
  const rows = reports.map((report) => {
    const parts = [
      report.branch,
      report.sha.slice(0, 12),
      report.action,
      report.reason ?? "",
      report.files === undefined ? "" : `${report.files} files`,
      report.bytes === undefined ? "" : `${report.bytes} bytes`,
    ];
    return parts.join("\t");
  });
  console.log(
    ["branch\tsha\taction\treason\tfiles\tbytes", ...rows].join("\n")
  );
  if (pruned.length > 0) {
    console.log(`pruned: ${pruned.join(", ")}`);
  }
}

function summaryLines(
  mode: string,
  dryRun: boolean,
  reports: BranchReport[],
  pruned: string[]
): string[] {
  const lines = [
    `## Pages deploy (${mode}${dryRun ? ", dry run" : ""})`,
    "",
    "| branch | sha | action | bytes |",
    "| --- | --- | --- | --- |",
    ...reports.map(
      (report) =>
        `| ${report.branch} | \`${report.sha.slice(0, 12)}\` | ${report.action}${
          report.reason ? ` (${report.reason})` : ""
        } | ${report.bytes ?? ""} |`
    ),
  ];
  if (pruned.length > 0) {
    lines.push("", `Pruned: ${pruned.join(", ")}`);
  }
  return lines;
}

function entriesFor(
  config: BranchesConfig,
  buildsDir: string,
  shas: Map<string, string>,
  reports: BranchReport[]
): ComposeEntry[] {
  const entries: ComposeEntry[] = [];
  for (const branch of config.branches) {
    const report = reports.find((candidate) => candidate.branch === branch);
    if (report?.action === "failed" || report?.action === "pruned") continue;
    const sha = shas.get(branch);
    if (sha === undefined) continue;
    entries.push({
      branch,
      dir: path.join(buildsDir, branchSlug(branch)),
      sha,
    });
  }
  return entries;
}

async function build(flags: FlagMap): Promise<void> {
  if (flags.get("help") === true) {
    console.log(USAGE);
    return;
  }

  const repo = repoRoot();
  const remote = stringFlag(flags, "remote", DEFAULT_REMOTE);
  const base = normalizeBase(
    stringFlag(flags, "base", process.env["PAGES_BASE"] ?? DEFAULT_BASE)
  );
  const mode = stringFlag(flags, "mode", "all");
  if (mode !== "auto" && mode !== "all") {
    throw new DeployError(`--mode must be auto or all (got ${mode})`);
  }
  const dryRun = booleanFlag(flags, "dry-run");
  const outDir = path.resolve(stringFlag(flags, "out", DEFAULT_OUT));
  const siteUrl = stringFlag(
    flags,
    "site-url",
    process.env["PAGES_SITE_URL"] ?? DEFAULT_SITE_URL
  );
  const stateUrl = stringFlag(
    flags,
    "state-url",
    process.env["PAGES_STATE_URL"] ?? stateUrlFor(siteUrl, base)
  );

  const metadataRef = stringFlag(
    flags,
    "metadata-ref",
    `refs/remotes/${remote}/${METADATA_BRANCH}`
  );
  const explicitWorkDir = flags.get("work-dir");
  const workDir =
    typeof explicitWorkDir === "string"
      ? path.resolve(explicitWorkDir)
      : fs.mkdtempSync(path.join(os.tmpdir(), "pages-deploy-"));
  const metadataWt = path.join(workDir, "metadata");
  const buildsDir = path.join(metadataWt, "builds");

  try {
    fetchMetadata(repo, remote);
    addWorktree(repo, metadataWt, metadataRef);

    const config = parseBranchesJson(
      fs.readFileSync(path.join(metadataWt, "branches.json"), "utf8")
    );

    const heads = remoteHeads(repo, remote);
    let state: DeployState = emptyDeployState();
    if (mode === "auto") {
      state = await readDeployState(stateUrl, {
        bootstrapAllowed: allowsBootstrap(config),
      });
    }

    const pruned = pruneMissing(config, heads.keys());
    const served = pruned.config;
    console.log(
      `[pages-deploy] mode=${mode} base=${base} served=${served.branches.join(
        ", "
      )}${pruned.pruned.length > 0 ? ` prune=${pruned.pruned.join(", ")}` : ""}`
    );

    let triggerBranch: string | undefined;
    let triggerSha: string | undefined;
    if (mode === "auto") {
      triggerBranch = stringFlag(flags, "trigger-branch");
      triggerSha = stringFlag(flags, "trigger-sha");
      if (
        !isServedBranch(triggerBranch) ||
        !served.branches.includes(triggerBranch)
      ) {
        throw new DeployError(
          `Trigger branch ${triggerBranch} is not in branches.json`
        );
      }
      if (!isFullSha(triggerSha)) {
        throw new DeployError(
          `Trigger SHA must be a full 40-hex commit: ${triggerSha}`
        );
      }
    }

    const targets: Target[] = served.branches.map((branch) => {
      if (mode === "auto" && branch === triggerBranch) {
        return { branch, sha: triggerSha! };
      }
      if (mode === "auto") {
        const pinned = shaOf(state, branch);
        if (pinned !== undefined) return { branch, sha: pinned };
      }
      const tip = heads.get(branch);
      if (tip === undefined) {
        throw new DeployError(`Branch ${branch} is not present on ${remote}`);
      }
      return { branch, sha: tip };
    });

    for (const target of targets) {
      ensureCommit(repo, remote, target.sha);
    }

    fs.mkdirSync(buildsDir, { recursive: true });
    const existingFolders = fs
      .readdirSync(buildsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const outcomes: BranchOutcome[] = [];
    const reports: BranchReport[] = [];
    const shas = new Map<string, string>();

    for (const target of targets) {
      const slug = branchSlug(target.branch);
      const storeDir = path.join(buildsDir, slug);
      const branchBase = branchUrl(base, target.branch);
      const buildTarget: BuildTarget = {
        branch: target.branch,
        sha: target.sha,
        base: branchBase,
        toolchain: toolchainFor(repo, target.sha),
      };

      shas.set(target.branch, target.sha);
      const decision = decideRebuild(storedFolderState(storeDir), buildTarget);
      if (decision.action === "reuse") {
        outcomes.push({ branch: target.branch, action: "reused" });
        reports.push({
          branch: target.branch,
          sha: target.sha,
          action: "reused",
          reason: decision.reason,
        });
        console.log(
          `[pages-deploy] ${target.branch}@${target.sha.slice(0, 12)} reuse (${decision.reason})`
        );
        continue;
      }

      console.log(
        `[pages-deploy] ${target.branch}@${target.sha.slice(0, 12)} rebuild (${decision.reason})`
      );
      try {
        rebuildBranch({
          repo,
          workDir,
          metadataWt,
          branch: target.branch,
          sha: target.sha,
          base,
        });
        outcomes.push({ branch: target.branch, action: "built" });
        reports.push({
          branch: target.branch,
          sha: target.sha,
          action: "built",
          reason: decision.reason,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[pages-deploy] ${target.branch} failed: ${message}`);
        outcomes.push({ branch: target.branch, action: "failed" });
        reports.push({
          branch: target.branch,
          sha: target.sha,
          action: "failed",
          reason: message.split("\n")[0],
        });
      }
    }

    const plan: StorePlan = storePlan({
      served: served.branches,
      pruned: pruned.pruned,
      outcomes,
      existingFolders,
    });
    for (const folder of plan.drop) {
      fs.rmSync(path.join(buildsDir, folder), { recursive: true, force: true });
    }

    for (const branch of pruned.pruned) {
      reports.push({
        branch,
        sha: "",
        action: "pruned",
      });
    }

    fs.writeFileSync(
      path.join(metadataWt, "branches.json"),
      serializeBranchesJson(served)
    );

    const composeOut = dryRun ? outDir : path.join(workDir, "compose-check");
    const composed = composeSite({
      outDir: composeOut,
      entries: entriesFor(served, buildsDir, shas, reports),
      primary: served.primary,
      servedBranches: served.branches,
      base,
    });
    for (const summary of composed.branches) {
      const report = reports.find(
        (candidate) => candidate.branch === summary.branch
      );
      if (report) {
        report.files = summary.files;
        report.bytes = summary.bytes;
      }
    }

    let metadataCommit: string | null = null;
    if (dryRun) {
      console.log(
        `[pages-deploy] dry run: composed ${composed.files} files (${composed.bytes} bytes) into ${outDir}`
      );
    } else {
      fs.rmSync(composeOut, { recursive: true, force: true });
      metadataCommit = commitStore(metadataWt, plan.commitMessage);
      const oldSha = git(repo, [
        "rev-parse",
        "--verify",
        `refs/remotes/${remote}/${METADATA_BRANCH}`,
      ]);
      pushStore(repo, remote, metadataCommit, oldSha);
      writeOutput("metadata_sha", metadataCommit);
      console.log(
        `[pages-deploy] pushed ${metadataCommit} to ${METADATA_BRANCH}: ${plan.commitMessage}`
      );
    }

    printTable(reports, pruned.pruned);
    console.log(
      JSON.stringify(
        {
          mode,
          dryRun,
          base,
          metadataCommit,
          branches: reports,
          pruned: pruned.pruned,
          counts: plan.counts,
        },
        null,
        2
      )
    );
    writeSummary(summaryLines(mode, dryRun, reports, pruned.pruned));
  } finally {
    removeWorktree(repo, metadataWt);
    if (typeof explicitWorkDir !== "string") {
      fs.rmSync(workDir, { recursive: true, force: true });
    }
  }
}

function publish(flags: FlagMap): void {
  if (flags.get("help") === true) {
    console.log(USAGE);
    return;
  }

  const metadataWt = repoRoot();
  const base = normalizeBase(
    stringFlag(flags, "base", process.env["PAGES_BASE"] ?? DEFAULT_BASE)
  );
  const outDir = path.resolve(stringFlag(flags, "out", DEFAULT_OUT));

  const config = parseBranchesJson(
    fs.readFileSync(path.join(metadataWt, "branches.json"), "utf8")
  );
  const buildsDir = path.join(metadataWt, "builds");

  const entries: ComposeEntry[] = [];
  const missing: string[] = [];
  for (const branch of config.branches) {
    const dir = path.join(buildsDir, branchSlug(branch));
    if (!fs.existsSync(dir)) {
      missing.push(branch);
      continue;
    }
    const manifestPath = path.join(dir, "build.json");
    if (!fs.existsSync(manifestPath)) {
      throw new DeployError(
        `${branch}: stored build has no build.json; the metadata store is corrupt`
      );
    }
    const manifest = parseBuildManifest(fs.readFileSync(manifestPath, "utf8"));
    entries.push({ branch, dir, sha: manifest.sha });
  }
  if (missing.length > 0) {
    console.warn(
      `[pages-deploy] no stored build for ${missing.join(
        ", "
      )} (failed or never built) — omitted from the artifact`
    );
  }

  const result = composeSite({
    outDir,
    entries,
    primary: config.primary,
    servedBranches: config.branches,
    base,
  });

  const reports: BranchReport[] = result.branches.map((entry) => ({
    branch: entry.branch,
    sha: entry.sha,
    action: "reused",
    files: entry.files,
    bytes: entry.bytes,
  }));
  for (const branch of missing) {
    reports.push({
      branch,
      sha: "",
      action: "failed",
      reason: "no stored build",
    });
  }
  printTable(reports, []);
  console.log(
    `[pages-deploy] composed ${result.files} files (${result.bytes} bytes) into ${outDir}; state has ${
      Object.keys(result.state.branches).length
    } branch(es)`
  );
  writeSummary(summaryLines("publish", false, reports, []));
}

export async function main(argv: string[]): Promise<void> {
  const { command, flags } = parseArgs(argv);
  if (flags.get("help") === true || argv.length === 0) {
    console.log(USAGE);
    return;
  }
  if (command === "build") {
    await build(flags);
  } else {
    publish(flags);
  }
}
