import {
  branchFromSlug,
  branchSlug,
  branchUrl,
  branchUrlPath,
  isServedBranch,
  normalizeBase,
  SERVED_BRANCH_RE,
  versionOf,
} from "lib/pagesDeploy/branchPattern";

const BASE = "/Unofficial-Integrated-Dynamics-Docs-and-Tools/";

describe("TestPagesDeployBranchPattern", () => {
  it("testAcceptsTheSupportedBranchShapes", () => {
    for (const branch of [
      "1.19.2/main",
      "1.19.2/development",
      "1.19.2/development/issue-77",
      "1.9.4/main",
      "26.1.2/main",
    ]) {
      expect(isServedBranch(branch)).toBe(true);
      expect(SERVED_BRANCH_RE.test(branch)).toBe(true);
    }
  });

  it("testRejectsEverythingElse", () => {
    for (const branch of [
      "1.19/main",
      "1.19.2",
      "1.19.2/feature",
      "1.19.2/development/issue-abc",
      "1.19.2/development/issue-77/extra",
      "/1.19.2/main",
      "1.19.2/main/",
      "1.19.2/main ",
      "refs/heads/1.19.2/main",
      "1.19.2/development/issue-",
    ]) {
      expect(isServedBranch(branch)).toBe(false);
    }
  });

  it("testDerivesVersionAndUrlPath", () => {
    expect(versionOf("1.19.2/development/issue-77")).toBe("1.19.2");
    expect(versionOf("26.1.2/main")).toBe("26.1.2");
    expect(branchUrlPath("1.19.2/development/issue-77")).toBe(
      "1.19.2/development/issue-77/"
    );
    expect(branchUrl(BASE, "1.19.2/development/issue-77")).toBe(
      "/Unofficial-Integrated-Dynamics-Docs-and-Tools/1.19.2/development/issue-77/"
    );
    expect(() => versionOf("nope")).toThrow(/Invalid served branch/);
    expect(() => branchUrlPath("nope")).toThrow(/Invalid served branch/);
  });

  it("testSlugRoundTripsNestedBranches", () => {
    for (const branch of [
      "1.19.2/main",
      "1.19.2/development",
      "1.19.2/development/issue-77",
    ]) {
      const slug = branchSlug(branch);
      expect(slug).not.toContain("/");
      expect(branchFromSlug(slug)).toBe(branch);
    }
    expect(branchSlug("1.19.2/development")).toBe("1.19.2__development");
    expect(branchSlug("1.19.2/development/issue-77")).toBe(
      "1.19.2__development__issue-77"
    );
  });

  it("testNormalizesTheBasePath", () => {
    expect(normalizeBase("foo/")).toBe("/foo/");
    expect(normalizeBase("/foo")).toBe("/foo/");
    expect(normalizeBase(BASE)).toBe(BASE);
    for (const base of ["", "//foo/", "/foo/../bar/", "/foo/?x=1", "/a b/"]) {
      expect(() => normalizeBase(base)).toThrow(/Pages base/);
    }
  });
});
