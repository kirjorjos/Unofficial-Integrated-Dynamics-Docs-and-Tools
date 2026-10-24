import {
  allowsBootstrap,
  parseBranchesJson,
  pruneMissing,
  serializeBranchesJson,
  validateBranches,
} from "lib/pagesDeploy/branchesJson";

const primary = "1.19.2/main";

describe("TestPagesDeployBranchesJson", () => {
  it("testRoundTripsSortedWithTrailingNewline", () => {
    const text = serializeBranchesJson({
      primary,
      branches: ["1.19.2/main", "1.19.2/development"],
    });
    expect(text.endsWith("\n")).toBe(true);
    expect(JSON.parse(text).branches).toEqual([
      "1.19.2/development",
      "1.19.2/main",
    ]);
    expect(parseBranchesJson(text)).toEqual({
      primary,
      branches: ["1.19.2/development", "1.19.2/main"],
    });
  });

  it("testRejectsInvalidConfigurations", () => {
    const cases: unknown[] = [
      null,
      [],
      { branches: [primary] },
      { primary, branches: [] },
      { primary: "1.19.2/nope", branches: [primary] },
      { primary, branches: [primary, primary] },
      { primary, branches: [primary, 42] },
      { primary, branches: [primary, "1.19.2/development/issue-abc"] },
      { primary, branches: [primary], extra: true },
      { primary, branches: [primary, " 1.19.2/development"] },
    ];
    for (const value of cases) {
      expect(() => validateBranches(value)).toThrow();
    }
    expect(() => parseBranchesJson("{not json")).toThrow(/not valid JSON/);
  });

  it("testRequiresPrimaryToBeListed", () => {
    expect(() =>
      validateBranches({
        primary: "1.19.2/development",
        branches: [primary],
      })
    ).toThrow(/primary .* is not in branches/);
  });

  it("testBootstrapOnlyAcceptsTheSinglePrimaryList", () => {
    expect(allowsBootstrap({ primary, branches: [primary] })).toBe(true);
    expect(
      allowsBootstrap({
        primary,
        branches: [primary, "1.19.2/development"],
      })
    ).toBe(false);
    expect(
      allowsBootstrap({ primary: "26.1.2/main", branches: ["26.1.2/main"] })
    ).toBe(false);
  });

  it("testPruneRemovesMissingBranches", () => {
    const config = {
      primary,
      branches: [primary, "1.19.2/development", "1.19.2/development/issue-1"],
    };
    const result = pruneMissing(config, [primary, "1.19.2/development"]);
    expect(result.pruned).toEqual(["1.19.2/development/issue-1"]);
    expect(result.config).toEqual({
      primary,
      branches: [primary, "1.19.2/development"],
    });
  });

  it("testPruneKeepsPresentBranchesAndRefusesToDropPrimary", () => {
    const config = { primary, branches: [primary] };
    expect(pruneMissing(config, [primary])).toEqual({
      config,
      pruned: [],
    });
    expect(() => pruneMissing(config, [])).toThrow(
      /primary branch .* no longer exists/
    );
  });
});
