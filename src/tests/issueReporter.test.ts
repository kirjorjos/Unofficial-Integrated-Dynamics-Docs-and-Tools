import { INTERNAL_BUG_MESSAGE } from "lib/transformers/parseErrors";
import {
  buildInternalBugIssueBody,
  buildInternalBugIssueUrl,
  INTERNAL_BUG_ISSUE_TITLE,
  isInternalBugMessage,
  setLastInternalBugDetail,
  setLastInternalBugStep,
} from "lib/issueReporter";

describe("isInternalBugMessage", () => {
  it("testMatchesInternalBugMessage", () => {
    expect(isInternalBugMessage(INTERNAL_BUG_MESSAGE)).toBe(true);
  });

  it("testRejectsUserFacingErrors", () => {
    expect(
      isInternalBugMessage("Type mismatch: expected Number, got Boolean")
    ).toBe(false);
    expect(isInternalBugMessage("Division by zero")).toBe(false);
    expect(isInternalBugMessage(undefined)).toBe(false);
    expect(isInternalBugMessage("")).toBe(false);
  });
});

describe("buildInternalBugIssueUrl", () => {
  it("testPrefillsTitleAndPseudoTemplateBody", () => {
    const url = new URL(
      buildInternalBugIssueUrl({
        reproUrl: "https://example.test/?code=abc123&output=visual",
        detail: "Cannot read properties of undefined",
        step: 3,
      })
    );

    expect(url.origin + url.pathname).toBe(
      "https://github.com/kirjorjos/Unofficial-Integrated-Dynamics-Docs-and-Tools/issues/new"
    );
    expect(url.searchParams.get("title")).toBe(INTERNAL_BUG_ISSUE_TITLE);
    const body = url.searchParams.get("body")!;
    expect(body).toContain("https://example.test/?code=abc123&output=visual");
    expect(body).toContain("Cannot read properties of undefined");
    expect(body).toContain(
      "### Please don't modify the auto-filled parts, only the extra info section"
    );
    expect(body).toContain("### Transformer input");
    expect(body).toContain("### Step (automated)");
    expect(body).toContain("\n3\n");
    expect(body).toContain("### What happened");
    expect(body).toContain("### Anything else you want to add?");
  });

  it("testFallsBackWhenReproUrlAndDetailMissing", () => {
    const url = new URL(buildInternalBugIssueUrl({}));
    const body = url.searchParams.get("body")!;
    expect(body).toContain("(the transformer input could not be captured)");
    expect(body).toContain("(the internal error(s) could not be captured)");
  });

  it("testDetailFallsBackToLastCapturedInternalBugDetail", () => {
    setLastInternalBugDetail("captured console.error detail");
    const body = new URL(buildInternalBugIssueUrl({})).searchParams.get(
      "body"
    )!;
    expect(body).toContain("captured console.error detail");
  });

  it("testStepFallsBackToLastCapturedInternalBugStep", () => {
    setLastInternalBugStep(7);
    const body = new URL(buildInternalBugIssueUrl({})).searchParams.get(
      "body"
    )!;
    expect(body).toContain("\n7\n");
  });

  it("testStepIsUnknownWhenNeverCaptured", () => {
    setLastInternalBugStep(undefined);
    setLastInternalBugDetail(undefined);
    const body = buildInternalBugIssueBody({});
    expect(body).toContain("### Step (automated)");
    expect(body).toMatch(/### Step \(automated\)\s*\n\s*unknown\n/);
  });
});

describe("buildInternalBugIssueBody", () => {
  it("testBodyIsPlainMarkdownWithClearSections", () => {
    const body = buildInternalBugIssueBody({});
    expect(body).toMatch(
      /^### Please don't modify the auto-filled parts, only the extra info section\n/
    );
    expect(body).not.toContain("Affected area");
    expect(body.split("\n").every((line) => !line.includes("\r"))).toBe(true);
  });
});
