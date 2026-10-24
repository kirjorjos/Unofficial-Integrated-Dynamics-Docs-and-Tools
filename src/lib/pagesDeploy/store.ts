import { createHash } from "node:crypto";
import { isServedBranch } from "./branchPattern";
import { isFullSha } from "./deployState";
import { DeployError } from "./errors";

export interface Toolchain {
  node: string;
  vite: string;
  lockHash: string;
}

export interface BuildManifest {
  branch: string;
  sha: string;
  base: string;
  toolchain: Toolchain;
}

const MANIFEST_KEYS = ["branch", "sha", "base", "toolchain"] as const;
const TOOLCHAIN_KEYS = ["node", "vite", "lockHash"] as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertExactKeys(
  value: Record<string, unknown>,
  keys: readonly string[],
  label: string
): void {
  for (const key of Object.keys(value)) {
    if (!keys.includes(key)) {
      throw new DeployError(`${label} has an unexpected key: ${key}`);
    }
  }
  for (const key of keys) {
    if (!(key in value)) {
      throw new DeployError(`${label} is missing the key: ${key}`);
    }
  }
}

export function parseBuildManifest(text: string): BuildManifest {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new DeployError(
      `build.json is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  if (!isPlainObject(value)) {
    throw new DeployError("build.json must be a JSON object");
  }
  assertExactKeys(value, MANIFEST_KEYS, "build.json");

  const branch = value["branch"];
  const sha = value["sha"];
  const base = value["base"];
  const rawToolchain = value["toolchain"];

  if (typeof branch !== "string" || !isServedBranch(branch)) {
    throw new DeployError(
      `build.json records an invalid branch: ${JSON.stringify(branch)}`
    );
  }
  if (typeof sha !== "string" || !isFullSha(sha)) {
    throw new DeployError(
      `build.json records an invalid SHA: ${JSON.stringify(sha)}`
    );
  }
  if (typeof base !== "string" || base.length === 0) {
    throw new DeployError("build.json base must be a non-empty string");
  }
  if (!isPlainObject(rawToolchain)) {
    throw new DeployError("build.json toolchain must be an object");
  }
  assertExactKeys(rawToolchain, TOOLCHAIN_KEYS, "build.json toolchain");

  const requireString = (value: unknown, label: string): string => {
    if (typeof value !== "string" || value.length === 0) {
      throw new DeployError(
        `build.json toolchain.${label} must be a non-empty string`
      );
    }
    return value;
  };

  return {
    branch,
    sha,
    base,
    toolchain: {
      node: requireString(rawToolchain["node"], "node"),
      vite: requireString(rawToolchain["vite"], "vite"),
      lockHash: requireString(rawToolchain["lockHash"], "lockHash"),
    },
  };
}

export function serializeBuildManifest(manifest: BuildManifest): string {
  return `${JSON.stringify(
    {
      branch: manifest.branch,
      sha: manifest.sha,
      base: manifest.base,
      toolchain: {
        node: manifest.toolchain.node,
        vite: manifest.toolchain.vite,
        lockHash: manifest.toolchain.lockHash,
      },
    },
    null,
    2
  )}\n`;
}

export function fingerprint(input: {
  sha: string;
  base: string;
  toolchain: Toolchain;
}): string {
  return [
    input.sha,
    input.base,
    input.toolchain.node,
    input.toolchain.vite,
    input.toolchain.lockHash,
  ].join("|");
}

export function lockHashOf(lockText: string | undefined): string {
  if (lockText === undefined) return "missing";
  return createHash("sha256").update(lockText).digest("hex");
}

export function viteVersionFromLock(lockText: string): string | undefined {
  let lock: unknown;
  try {
    lock = JSON.parse(lockText);
  } catch {
    return undefined;
  }
  if (!isPlainObject(lock)) return undefined;

  const packages = lock["packages"];
  if (isPlainObject(packages)) {
    const vite = packages["node_modules/vite"];
    if (isPlainObject(vite)) {
      const version = vite["version"];
      if (typeof version === "string" && version.length > 0) return version;
    }
  }

  const dependencies = lock["dependencies"];
  if (isPlainObject(dependencies)) {
    const vite = dependencies["vite"];
    if (isPlainObject(vite)) {
      const version = vite["version"];
      if (typeof version === "string" && version.length > 0) return version;
    }
  }

  return undefined;
}

export interface StoredFolderState {
  folderExists: boolean;
  indexExists: boolean;
  manifest?: BuildManifest;
  manifestError?: string;
}

export interface BuildTarget {
  branch: string;
  sha: string;
  base: string;
  toolchain: Toolchain;
}

export interface RebuildDecision {
  action: "reuse" | "rebuild";
  reason: string;
}

export function decideRebuild(
  stored: StoredFolderState,
  target: BuildTarget
): RebuildDecision {
  if (!stored.folderExists)
    return { action: "rebuild", reason: "missing-folder" };
  if (stored.manifestError) {
    return { action: "rebuild", reason: "invalid-manifest" };
  }
  if (!stored.manifest) {
    return { action: "rebuild", reason: "missing-manifest" };
  }
  if (stored.manifest.branch !== target.branch) {
    throw new DeployError(
      `build.json in the store for ${target.branch} names branch ${stored.manifest.branch}`
    );
  }
  if (!stored.indexExists) {
    return { action: "rebuild", reason: "missing-index" };
  }
  if (stored.manifest.sha !== target.sha) {
    return { action: "rebuild", reason: "sha-changed" };
  }
  if (stored.manifest.base !== target.base) {
    return { action: "rebuild", reason: "base-changed" };
  }
  if (stored.manifest.toolchain.node !== target.toolchain.node) {
    return { action: "rebuild", reason: "node-changed" };
  }
  if (stored.manifest.toolchain.vite !== target.toolchain.vite) {
    return { action: "rebuild", reason: "vite-changed" };
  }
  if (stored.manifest.toolchain.lockHash !== target.toolchain.lockHash) {
    return { action: "rebuild", reason: "lockfile-changed" };
  }
  return { action: "reuse", reason: "up-to-date" };
}

export interface BranchOutcome {
  branch: string;
  action: "built" | "reused" | "failed";
}

export interface StorePlanInput {
  served: string[];
  pruned: string[];
  outcomes: BranchOutcome[];
  existingFolders: string[];
}

export interface StorePlan {
  keep: string[];
  write: string[];
  drop: string[];
  counts: {
    built: number;
    reused: number;
    pruned: number;
    failed: number;
  };
  commitMessage: string;
}

export function storePlan(input: StorePlanInput): StorePlan {
  const byBranch = new Map(
    input.outcomes.map((outcome) => [outcome.branch, outcome.action])
  );

  const keep: string[] = [];
  const write: string[] = [];
  let built = 0;
  let reused = 0;
  let failed = 0;

  for (const branch of input.served) {
    const action = byBranch.get(branch);
    if (action === undefined) {
      throw new DeployError(`no build outcome recorded for ${branch}`);
    }
    if (action === "failed") {
      failed += 1;
      continue;
    }
    const slug = branch.replace(/\//g, "__");
    keep.push(slug);
    if (action === "built") {
      built += 1;
      write.push(slug);
    } else {
      reused += 1;
    }
  }

  const drop = [...new Set(input.existingFolders)]
    .filter((folder) => !keep.includes(folder))
    .sort();

  return {
    keep: keep.sort(),
    write: write.sort(),
    drop,
    counts: { built, reused, pruned: input.pruned.length, failed },
    commitMessage: `deploy: build ${built}, reuse ${reused}, prune ${input.pruned.length}`,
  };
}
