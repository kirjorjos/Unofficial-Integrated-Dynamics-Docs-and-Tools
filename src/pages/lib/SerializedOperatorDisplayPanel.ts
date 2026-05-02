import {
  generateVisualSteps,
  getDisplayPanelText,
} from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Display Panel Text for Serialized Operators", () => {
  describe("getDisplayPanelText shows signature for serialized operator types", () => {
    it("shows name and signature for Pipe", () => {
      const ast = {
        type: "Pipe" as const,
        op1: { type: "Operator" as const, opName: "LIST_LENGTH" },
        op2: { type: "Operator" as const, opName: "ARITHMETIC_INCREMENT" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const text = getDisplayPanelText(steps[0]!);

      expect(text).not.toBe(steps[0]!.output);
      expect(text).toContain("::");
      expect(text).toContain("->");
    });

    it("shows name and signature for Pipe2", () => {
      const ast = {
        type: "Pipe2" as const,
        op1: { type: "Operator" as const, opName: "LIST_ELEMENT" },
        op2: { type: "Operator" as const, opName: "LIST_LENGTH" },
        op3: { type: "Operator" as const, opName: "ARITHMETIC_INCREMENT" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const text = getDisplayPanelText(steps[0]!);

      expect(text).toContain("::");
      expect(text).toContain("->");
    });

    it("shows name and signature for Flip", () => {
      const ast = {
        type: "Flip" as const,
        arg: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const text = getDisplayPanelText(steps[0]!);

      expect(text).not.toBe(steps[0]!.output);
      expect(text).toContain("::");
      expect(text).toContain("->");
    });

    it("shows name and signature for Curry (partially applied)", () => {
      const ast = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer" as const, value: "1" }],
      };
      const steps = generateVisualSteps(ast as any, 0);

      const text = getDisplayPanelText(steps[0]!);

      expect(text).not.toBe(steps[0]!.output);
      expect(text).toContain("::");
      expect(text).toContain("->");
    });
  });
});
