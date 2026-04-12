import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Operator Tab Output Type", () => {
  describe("Operator tab should show Operator type, not output type", () => {
    it("Operator with integer output should still show Operator type", () => {
      const ast = { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" };
      const steps = generateVisualSteps(ast as any, 0, "pattern");

      expect(steps[0]!.sourceType).toBe("Operator");
      expect(steps[0]!.detail).toBe("ARITHMETIC_ADDITION");
    });

    it("Partially applied curry shows Operator sourceType", () => {
      const ast = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer" as const, value: "1" }],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("Operator");
    });

    it("Fully applied curry shows value kind", () => {
      const ast = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [
          { type: "Integer" as const, value: "1" },
          { type: "Integer" as const, value: "2" },
        ],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.kind).not.toBe("operator");
    });
  });
});
