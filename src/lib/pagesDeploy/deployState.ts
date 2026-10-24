import { isServedBranch, normalizeBase } from "./branchPattern";
import { DeployError } from "./errors";

export interface DeployState {
  branches: Record<string, string>;
}

const FULL_SHA_RE = /^[0-9a-f]{40}$/;

export function stateUrlFor(siteUrl: string, base: string): string {
  const normalizedSite = siteUrl.replace(/\/+$/, "");
  if (normalizedSite.length === 0) {
    throw new DeployError("site URL must be a non-empty absolute URL");
  }
  return `${normalizedSite}${normalizeBase(base)}current-versions.json`;
}

export function isFullSha(value: string): boolean {
  return FULL_SHA_RE.test(value);
}

export function emptyDeployState(): DeployState {
  return { branches: {} };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseDeployState(text: string): DeployState {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new DeployError(
      `deploy state is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  if (!isPlainObject(value)) {
    throw new DeployError("deploy state must be a JSON object");
  }
  const keys = Object.keys(value);
  if (keys.length !== 1 || keys[0] !== "branches") {
    throw new DeployError('deploy state must have exactly one key: "branches"');
  }

  const rawBranches = value["branches"];
  if (!isPlainObject(rawBranches)) {
    throw new DeployError('deploy state "branches" must be an object');
  }

  const entries = Object.entries(rawBranches);

  const branches: Record<string, string> = {};
  for (const [branch, sha] of entries) {
    if (!isServedBranch(branch)) {
      throw new DeployError(
        `deploy state has an invalid branch key: ${JSON.stringify(branch)}`
      );
    }
    if (typeof sha !== "string" || !isFullSha(sha)) {
      throw new DeployError(
        `deploy state has an invalid SHA for ${branch}: ${JSON.stringify(sha)}`
      );
    }
    branches[branch] = sha;
  }

  return { branches: sortBranches(branches) };
}

function sortBranches(
  branches: Record<string, string>
): Record<string, string> {
  const sorted: Record<string, string> = {};
  for (const branch of Object.keys(branches).sort()) {
    sorted[branch] = branches[branch]!;
  }
  return sorted;
}

export function serializeDeployState(state: DeployState): string {
  return `${JSON.stringify(
    { branches: sortBranches(state.branches) },
    null,
    2
  )}\n`;
}

export function shaOf(state: DeployState, branch: string): string | undefined {
  return state.branches[branch];
}

export interface FetchLikeResponse {
  status: number;
  text(): Promise<string>;
}

export type FetchLike = (
  url: string,
  init: { signal: AbortSignal }
) => Promise<FetchLikeResponse>;

export interface ReadDeployStateOptions {
  bootstrapAllowed: boolean;
  attempts?: number;
  timeoutMs?: number;
  fetchImpl?: FetchLike;
  sleep?: (ms: number) => Promise<void>;
}

export async function readDeployState(
  url: string,
  options: ReadDeployStateOptions
): Promise<DeployState> {
  const attempts = options.attempts ?? 3;
  const timeoutMs = options.timeoutMs ?? 10_000;
  const fetchImpl: FetchLike =
    options.fetchImpl ??
    ((input, init) => (globalThis.fetch as unknown as FetchLike)(input, init));
  const sleep =
    options.sleep ??
    ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));

  let lastError: DeployError | undefined;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    if (attempt > 1) {
      await sleep(500 * 2 ** (attempt - 2));
    }

    let response: FetchLikeResponse;
    try {
      response = await fetchImpl(url, {
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (error) {
      lastError = new DeployError(
        `deploy state request failed for ${url}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      continue;
    }

    if (response.status === 404) {
      if (options.bootstrapAllowed) return emptyDeployState();
      throw new DeployError(
        `deploy state is missing at ${url} and this is not the single-primary bootstrap; refusing to deploy`
      );
    }

    if (response.status !== 200) {
      lastError = new DeployError(
        `deploy state request failed: HTTP ${response.status} for ${url}`
      );

      if (response.status >= 500 || response.status === 429) continue;
      throw lastError;
    }

    let text: string;
    try {
      text = await response.text();
    } catch (error) {
      lastError = new DeployError(
        `deploy state response could not be read from ${url}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      continue;
    }

    return parseDeployState(text);
  }

  throw (
    lastError ?? new DeployError(`deploy state could not be read from ${url}`)
  );
}
