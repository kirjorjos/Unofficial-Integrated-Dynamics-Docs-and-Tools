import {
  generateVisualSteps,
  getDisplayPanelText,
} from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Display Panel Text", () => {
  describe("getDisplayPanelText uses operator instance for operator types", () => {
    it("constructs operator instance for Operator type node", () => {
      const ast = { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" };
      const steps = generateVisualSteps(ast as any, 0, "pattern");

      const text = getDisplayPanelText(steps[0]!);

      expect(text).toContain("::");
      expect(text).toContain("->");
      expect(text).toContain("Number");
    });

    it("shows correct name for GENERAL_IDENTITY (not anyIdentity)", () => {
      const ast = { type: "Operator" as const, opName: "GENERAL_IDENTITY" };
      const steps = generateVisualSteps(ast as any, 0, "pattern");

      const text = getDisplayPanelText(steps[0]!);

      expect(text).toContain("Identity");
      expect(text).not.toContain("anyIdentity");
    });

    it("returns output fallback when node is not an operator", () => {
      const step = {
        output: "myInteger",
        node: null,
      };

      const text = getDisplayPanelText(step as any);
      expect(text).toBe("myInteger");
    });

    it("returns output fallback when node type has no operator instance", () => {
      const step = {
        output: "myValue",
        node: { type: "Integer" as const, value: "42" },
      };

      const text = getDisplayPanelText(step as any);
      expect(text).toBe("myValue");
    });

    it("shows operator name and signature for curried operator", () => {
      const ast = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer" as const, value: "1" }],
      };
      const steps = generateVisualSteps(ast as any, 0);

      const text = getDisplayPanelText(steps[0]!);
      expect(text).not.toBe(steps[0]!.output);
      expect(text).toContain("::");
    });
  });
});
