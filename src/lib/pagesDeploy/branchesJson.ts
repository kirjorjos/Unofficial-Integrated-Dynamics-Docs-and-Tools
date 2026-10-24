import { isServedBranch } from "./branchPattern";
import { DeployError } from "./errors";

export interface BranchesConfig {
  primary: string;
  branches: string[];
}

const CONFIG_KEYS = ["primary", "branches"] as const;

export const BOOTSTRAP_PRIMARY = "1.19.2/main";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateBranches(value: unknown): BranchesConfig {
  if (!isPlainObject(value)) {
    throw new DeployError("branches.json must be a JSON object");
  }

  for (const key of Object.keys(value)) {
    if (!(CONFIG_KEYS as readonly string[]).includes(key)) {
      throw new DeployError(`branches.json has an unexpected key: ${key}`);
    }
  }
  for (const key of CONFIG_KEYS) {
    if (!(key in value)) {
      throw new DeployError(`branches.json is missing the key: ${key}`);
    }
  }

  const primary = value["primary"];
  const rawBranches = value["branches"];

  if (typeof primary !== "string" || primary.length === 0) {
    throw new DeployError("branches.json primary must be a non-empty string");
  }
  if (!Array.isArray(rawBranches) || rawBranches.length === 0) {
    throw new DeployError("branches.json branches must be a non-empty array");
  }

  const seen = new Set<string>();
  const branches: string[] = [];
  for (const entry of rawBranches) {
    if (typeof entry !== "string" || entry.length === 0) {
      throw new DeployError("branches.json entries must be non-empty strings");
    }
    if (entry.trim() !== entry || /\s/.test(entry)) {
      throw new DeployError(
        `branches.json entry contains whitespace: ${JSON.stringify(entry)}`
      );
    }
    if (!isServedBranch(entry)) {
      throw new DeployError(
        `branches.json entry is not a serveable branch: ${JSON.stringify(entry)}`
      );
    }
    if (seen.has(entry)) {
      throw new DeployError(`branches.json lists ${entry} more than once`);
    }
    seen.add(entry);
    branches.push(entry);
  }

  if (!seen.has(primary)) {
    throw new DeployError(
      `branches.json primary ${JSON.stringify(primary)} is not in branches`
    );
  }

  return { primary, branches: branches.sort() };
}

export function parseBranchesJson(text: string): BranchesConfig {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new DeployError(
      `branches.json is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
  return validateBranches(value);
}

export function serializeBranchesJson(config: BranchesConfig): string {
  const validated = validateBranches(config);
  return `${JSON.stringify(
    {
      primary: validated.primary,
      branches: [...validated.branches].sort(),
    },
    null,
    2
  )}\n`;
}

export function allowsBootstrap(config: BranchesConfig): boolean {
  return (
    config.primary === BOOTSTRAP_PRIMARY &&
    config.branches.length === 1 &&
    config.branches[0] === BOOTSTRAP_PRIMARY
  );
}

export interface PruneResult {
  config: BranchesConfig;
  pruned: string[];
}

export function pruneMissing(
  config: BranchesConfig,
  existingBranches: Iterable<string>
): PruneResult {
  const existing = new Set(existingBranches);
  const branches = config.branches.filter((branch) => existing.has(branch));
  const pruned = config.branches.filter((branch) => !existing.has(branch));

  if (!existing.has(config.primary)) {
    throw new DeployError(
      `primary branch ${config.primary} no longer exists on the remote`
    );
  }

  return {
    config: { primary: config.primary, branches },
    pruned,
  };
}
