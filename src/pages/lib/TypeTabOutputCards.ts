import { generateVisualSteps } from "pages-lib/visualTransformerLogic";
import { getStepActualOutputType } from "pages-lib/visualTransformer";

describe("LogicProgrammerVisualOutput - Type Tab Output Cards", () => {
  describe("Output card type matches selected type tab", () => {
    it("Operator tab produces Operator output card", () => {
      const ast = { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" };
      const steps = generateVisualSteps(ast as any, 0, "pattern");

      expect(steps[0]!.sourceType).toBe("Operator");
      expect(steps[0]!.detail).toBe("ARITHMETIC_ADDITION");
    });

    it("Integer tab produces Integer output card", () => {
      const ast = { type: "Integer" as const, value: "42" };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("Integer");
      expect(getStepActualOutputType(steps[0]!)).toBe("Integer");
    });

    it("String tab produces String output card", () => {
      const ast = { type: "String" as const, value: "hello" };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("String");
      expect(getStepActualOutputType(steps[0]!)).toBe("String");
    });

    it("Boolean tab produces Boolean output card", () => {
      const ast = { type: "Boolean" as const, value: true };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("Boolean");
      expect(getStepActualOutputType(steps[0]!)).toBe("Boolean");
    });

    it("List tab produces List output card", () => {
      const ast = {
        type: "List" as const,
        value: [] as any[],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("List");
    });

    it("Double tab produces Double output card", () => {
      const ast = { type: "Double" as const, value: "3.14" };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("Double");
      expect(getStepActualOutputType(steps[0]!)).toBe("Double");
    });

    it("Long tab produces Long output card", () => {
      const ast = { type: "Long" as const, value: "9223372036854775807" };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.sourceType).toBe("Long");
      expect(getStepActualOutputType(steps[0]!)).toBe("Long");
    });

    it("Curried operator produces operator kind when fully applied", () => {
      const ast = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [
          { type: "Integer" as const, value: "1" },
          { type: "Integer" as const, value: "2" },
        ],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps.length).toBeGreaterThan(0);
      expect(steps[0]!.kind).not.toBe("operator");
    });

    it("Operator preview mode keeps Operator source type", () => {
      const ast = { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" };
      const steps = generateVisualSteps(ast as any, 0, "pattern");

      expect(steps[0]!.sourceType).toBe("Operator");
      expect(steps[0]!.forceOperatorTabActive).toBe(true);
    });

    it("Value mode keeps original source type", () => {
      const ast = { type: "Integer" as const, value: "42" };
      const steps = generateVisualSteps(ast as any, 0, "value");

      expect(steps[0]!.sourceType).toBe("Integer");
      expect(steps[0]!.forceOperatorTabActive).toBeFalsy();
    });
  });
});
