import { INTERNAL_BUG_MESSAGE } from "lib/transformers/parseErrors";

export const GITHUB_ISSUE_NEW_URL =
  "https://github.com/kirjorjos/Unofficial-Integrated-Dynamics-Docs-and-Tools/issues/new";

export const INTERNAL_BUG_ISSUE_TITLE = "Internal Bug Encountered";

/** Extra tooltip line shown when the error tooltip links to a new issue. */
export const INTERNAL_BUG_REPORT_HINT = "Click to report on GitHub";

export const isInternalBugMessage = (message: string | undefined): boolean =>
  message === INTERNAL_BUG_MESSAGE;

/**
 * The most recent internal-bug detail (the native error messages that were
 * logged via console.error at the error site). Kept at module scope so the
 * issue link can be built anywhere without threading the detail through the
 * component tree. The error sites call setLastInternalBugDetail() before the
 * tooltip that links to the issue is ever shown.
 */
let lastInternalBugDetail: string | undefined;

export const setLastInternalBugDetail = (detail: string | undefined): void => {
  lastInternalBugDetail = detail;
};

export const getLastInternalBugDetail = (): string | undefined =>
  lastInternalBugDetail;

/**
 * The 1-based step number (as shown in the visual transformer) where the most
 * recent internal bug occurred. Captured alongside the detail at the error
 * site so the issue body can point at the failing step.
 */
let lastInternalBugStep: number | undefined;

export const setLastInternalBugStep = (step: number | undefined): void => {
  lastInternalBugStep = step;
};

export const getLastInternalBugStep = (): number | undefined =>
  lastInternalBugStep;

/**
 * Pseudo-template body pre-filled via the URL body param. This deliberately
 * does not try to map onto the repo's real issue-form template; instead it is
 * a self-describing body with a clearly-marked automated section (don't
 * touch) followed by a free section for the reporter's own notes.
 */
export const buildInternalBugIssueBody = (params: {
  reproUrl?: string;
  detail?: string;
  step?: number;
}): string => {
  const detail = params.detail ?? getLastInternalBugDetail();
  const step = params.step ?? getLastInternalBugStep();
  return [
    "### Please don't modify the auto-filled parts, only the extra info section",
    "",
    "### Transformer input",
    "",
    params.reproUrl ?? "(the transformer input could not be captured)",
    "",
    "### Step (automated)",
    "",
    step !== undefined ? String(step) : "unknown",
    "",
    "### What happened",
    "",
    detail ?? "(the internal error(s) could not be captured)",
    "",
    "### Anything else you want to add?",
    "",
    "(optional — add any extra information here)",
  ].join("\n");
};

export const buildInternalBugIssueUrl = (params: {
  reproUrl?: string;
  detail?: string;
  step?: number;
}): string => {
  const url = new URL(GITHUB_ISSUE_NEW_URL);
  url.searchParams.set("title", INTERNAL_BUG_ISSUE_TITLE);
  url.searchParams.set("body", buildInternalBugIssueBody(params));
  return url.toString();
};
