import { DeployError } from "./errors";

export const SERVED_BRANCH_RE =
  /^[0-9]+\.[0-9]{1,2}\.[0-9]{1,2}\/(?:main|development(?:\/issue-[0-9]+)?)$/;

export function isServedBranch(branch: string): boolean {
  return SERVED_BRANCH_RE.test(branch);
}

export function assertServedBranch(branch: string): string {
  if (!isServedBranch(branch)) {
    throw new DeployError(
      `Invalid served branch name: ${JSON.stringify(branch)}`
    );
  }
  return branch;
}

export function versionOf(branch: string): string {
  assertServedBranch(branch);
  return branch.slice(0, branch.indexOf("/"));
}

export function branchUrlPath(branch: string): string {
  assertServedBranch(branch);
  return `${branch}/`;
}

export function branchSlug(branch: string): string {
  return assertServedBranch(branch).replace(/\//g, "__");
}

export function branchFromSlug(slug: string): string {
  return assertServedBranch(slug.replace(/__/g, "/"));
}

export function normalizeBase(base: string): string {
  if (typeof base !== "string" || base.length === 0) {
    throw new DeployError("Pages base must be a non-empty string");
  }
  let normalized = base;
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (!normalized.endsWith("/")) normalized = `${normalized}/`;
  if (
    normalized.includes("//") ||
    normalized.includes("..") ||
    normalized.includes("?") ||
    normalized.includes("#") ||
    /\s/.test(normalized)
  ) {
    throw new DeployError(`Invalid Pages base: ${JSON.stringify(base)}`);
  }
  return normalized;
}

export function branchUrl(base: string, branch: string): string {
  return `${normalizeBase(base)}${branchUrlPath(branch)}`;
}
