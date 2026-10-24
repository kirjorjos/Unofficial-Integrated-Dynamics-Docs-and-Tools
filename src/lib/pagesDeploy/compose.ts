import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  branchSlug,
  branchUrl,
  isServedBranch,
  normalizeBase,
  versionOf,
} from "./branchPattern";
import { serializeDeployState, type DeployState } from "./deployState";
import { DeployError } from "./errors";
import { rootRedirectHtml, versionRedirectHtml } from "./redirectHtml";
import { parseBuildManifest } from "./store";

export interface ComposeEntry {
  branch: string;
  dir: string;
  sha: string;
}

export interface ComposeOptions {
  outDir: string;
  entries: ComposeEntry[];
  primary: string;
  servedBranches: string[];
  base: string;
}

export interface ComposeBranchSummary {
  branch: string;
  sha: string;
  files: number;
  bytes: number;
}

export interface ComposeResult {
  state: DeployState;
  branches: ComposeBranchSummary[];
  files: number;
  bytes: number;
  redirects: string[];
}

interface StoreFile {
  abs: string;
  rel: string;
  size: number;
}

interface RegisteredFile {
  hash: string;
  size: number;
  source?: string;
  content?: Buffer;
}

function hashBuffer(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function listStoreFiles(dir: string, relBase = ""): StoreFile[] {
  const files: StoreFile[] = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const abs = path.join(dir, name);
    const rel = relBase === "" ? name : `${relBase}/${name}`;
    const stat = fs.lstatSync(abs);
    if (stat.isSymbolicLink()) {
      throw new DeployError(`build store contains a symlink: ${abs}`);
    }
    if (stat.isDirectory()) {
      files.push(...listStoreFiles(abs, rel));
      continue;
    }
    if (!stat.isFile()) {
      throw new DeployError(`build store contains a special file: ${abs}`);
    }
    if (relBase === "" && name === "build.json") continue;
    files.push({ abs, rel, size: stat.size });
  }
  return files;
}

class FileRegistry {
  readonly files = new Map<string, RegisteredFile>();
  private readonly dirs = new Set<string>();
  readonly collisions: string[] = [];

  register(rel: string, file: RegisteredFile): void {
    const parts = rel.split("/");
    if (
      rel.startsWith("/") ||
      parts.some((part) => part === "" || part === "." || part === "..")
    ) {
      this.collisions.push(`invalid output path: ${rel}`);
      return;
    }

    let ancestor = "";
    for (let index = 0; index < parts.length - 1; index++) {
      ancestor =
        ancestor === "" ? parts[index]! : `${ancestor}/${parts[index]!}`;
      if (this.files.has(ancestor)) {
        this.collisions.push(
          `${ancestor} is a file but ${rel} needs a directory`
        );
      }
      this.dirs.add(ancestor);
    }

    if (this.dirs.has(rel)) {
      this.collisions.push(`${rel} is a directory in another branch build`);
    }

    const existing = this.files.get(rel);
    if (existing !== undefined) {
      if (existing.hash !== file.hash) {
        this.collisions.push(`${rel} has conflicting content`);
      }
      return;
    }
    this.files.set(rel, file);
  }
}

function compareEntries(a: ComposeEntry, b: ComposeEntry): number {
  const depth = a.branch.split("/").length - b.branch.split("/").length;
  if (depth !== 0) return depth;
  return a.branch < b.branch ? -1 : a.branch > b.branch ? 1 : 0;
}

export function composeSite(options: ComposeOptions): ComposeResult {
  const base = normalizeBase(options.base);
  const served = [...options.servedBranches];

  if (served.length === 0) {
    throw new DeployError("cannot compose a site with no served branches");
  }
  const servedSet = new Set<string>();
  for (const branch of served) {
    if (!isServedBranch(branch)) {
      throw new DeployError(`invalid served branch: ${JSON.stringify(branch)}`);
    }
    if (servedSet.has(branch)) {
      throw new DeployError(`served branch listed twice: ${branch}`);
    }
    servedSet.add(branch);
  }
  if (!servedSet.has(options.primary)) {
    throw new DeployError(
      `primary branch ${options.primary} is not in the served list`
    );
  }

  const seenBranches = new Set<string>();
  for (const entry of options.entries) {
    if (!servedSet.has(entry.branch)) {
      throw new DeployError(
        `compose entry is not a served branch: ${entry.branch}`
      );
    }
    if (seenBranches.has(entry.branch)) {
      throw new DeployError(`compose has two entries for ${entry.branch}`);
    }
    seenBranches.add(entry.branch);
  }

  const registry = new FileRegistry();
  const summaries: ComposeBranchSummary[] = [];
  const redirects: string[] = [];

  const registerContent = (rel: string, content: string): void => {
    const data = Buffer.from(content, "utf8");
    registry.register(rel, {
      hash: hashBuffer(data),
      size: data.length,
      content: data,
    });
  };

  registerContent("index.html", rootRedirectHtml(base, options.primary));

  const versions = [
    ...new Set(
      served
        .filter((branch) => servedSet.has(`${versionOf(branch)}/main`))
        .map((branch) => versionOf(branch))
    ),
  ].sort();
  for (const version of versions) {
    const rel = `${version}/index.html`;
    registerContent(rel, versionRedirectHtml(base, version));
    redirects.push(rel);
  }

  const entries = [...options.entries].sort(compareEntries);
  for (const entry of entries) {
    if (path.basename(entry.dir) !== branchSlug(entry.branch)) {
      throw new DeployError(
        `${entry.branch}: store folder ${path.basename(
          entry.dir
        )} does not match its slug ${branchSlug(entry.branch)}`
      );
    }
    const stat = fs.statSync(entry.dir, { throwIfNoEntry: false });
    if (!stat?.isDirectory()) {
      throw new DeployError(`build store folder is missing: ${entry.dir}`);
    }

    let manifest;
    try {
      manifest = parseBuildManifest(
        fs.readFileSync(path.join(entry.dir, "build.json"), "utf8")
      );
    } catch (error) {
      if (error instanceof DeployError) {
        throw new DeployError(`${entry.branch}: ${error.message}`);
      }
      throw error;
    }

    if (manifest.branch !== entry.branch) {
      throw new DeployError(
        `${entry.branch}: build.json names branch ${manifest.branch}`
      );
    }
    if (manifest.sha !== entry.sha) {
      throw new DeployError(
        `${entry.branch}: build.json SHA ${manifest.sha} does not match the plan (${entry.sha})`
      );
    }
    const expectedBase = branchUrl(base, entry.branch);
    if (manifest.base !== expectedBase) {
      throw new DeployError(
        `${entry.branch}: build.json base ${manifest.base} does not match ${expectedBase}`
      );
    }
    if (!fs.existsSync(path.join(entry.dir, "index.html"))) {
      throw new DeployError(`${entry.branch}: stored build has no index.html`);
    }

    const files = listStoreFiles(entry.dir);
    let bytes = 0;
    for (const file of files) {
      const data = fs.readFileSync(file.abs);
      registry.register(`${entry.branch}/${file.rel}`, {
        hash: hashBuffer(data),
        size: file.size,
        source: file.abs,
      });
      bytes += file.size;
    }
    summaries.push({
      branch: entry.branch,
      sha: entry.sha,
      files: files.length,
      bytes,
    });
  }

  const state: DeployState = {
    branches: Object.fromEntries(
      entries.map((entry) => [entry.branch, entry.sha] as const)
    ),
  };
  registerContent("current-versions.json", serializeDeployState(state));

  if (registry.collisions.length > 0) {
    throw new DeployError(
      `compose collisions:\n  - ${registry.collisions.join("\n  - ")}`
    );
  }

  fs.rmSync(options.outDir, { recursive: true, force: true });
  fs.mkdirSync(options.outDir, { recursive: true });

  let files = 0;
  let bytes = 0;
  for (const rel of [...registry.files.keys()].sort()) {
    const file = registry.files.get(rel)!;
    const dest = path.join(options.outDir, ...rel.split("/"));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (file.content !== undefined) {
      fs.writeFileSync(dest, file.content);
    } else if (file.source !== undefined) {
      fs.copyFileSync(file.source, dest);
    } else {
      throw new DeployError(`registered file has no source: ${rel}`);
    }
    files += 1;
    bytes += file.size;
  }

  return { state, branches: summaries, files, bytes, redirects };
}
