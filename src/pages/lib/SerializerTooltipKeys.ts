import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Serializer Tooltip Keys", () => {
  describe("tooltipOperatorKey is set correctly for each serializer type", () => {
    it("Curry uses OPERATOR_APPLY family keys", () => {
      const curryWith1Arg = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer" as const, value: "1" }],
      };
      const steps1 = generateVisualSteps(curryWith1Arg as any, 0);

      const curryStep1 = steps1.find((s) => s.sourceType === "Curry");
      expect(curryStep1?.tooltipOperatorKey).toBe("OPERATOR_APPLY");

      const curryWith2Args = {
        type: "Curry" as const,
        base: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
        args: [
          { type: "Integer" as const, value: "1" },
          { type: "Integer" as const, value: "2" },
        ],
      };
      const steps2 = generateVisualSteps(curryWith2Args as any, 0);
      const curryStep2 = steps2.find((s) => s.sourceType === "Curry");
      expect(curryStep2?.tooltipOperatorKey).toBe("OPERATOR_APPLY_2");
    });

    it("Flip uses OPERATOR_FLIP key", () => {
      const ast = {
        type: "Flip" as const,
        arg: { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const flipStep = steps.find((s) => s.sourceType === "Flip");
      expect(flipStep?.tooltipOperatorKey).toBe("OPERATOR_FLIP");
    });

    it("Pipe uses OPERATOR_PIPE key", () => {
      const ast = {
        type: "Pipe" as const,
        op1: { type: "Operator" as const, opName: "LIST_LENGTH" },
        op2: { type: "Operator" as const, opName: "ARITHMETIC_INCREMENT" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const pipeStep = steps.find((s) => s.sourceType === "Pipe");
      expect(pipeStep?.tooltipOperatorKey).toBe("OPERATOR_PIPE");
    });

    it("Pipe2 uses OPERATOR_PIPE2 key", () => {
      const ast = {
        type: "Pipe2" as const,
        op1: { type: "Operator" as const, opName: "LIST_ELEMENT" },
        op2: { type: "Operator" as const, opName: "LIST_LENGTH" },
        op3: { type: "Operator" as const, opName: "ARITHMETIC_INCREMENT" },
      };
      const steps = generateVisualSteps(ast as any, 0);

      const pipe2Step = steps.find((s) => s.sourceType === "Pipe2");
      expect(pipe2Step?.tooltipOperatorKey).toBe("OPERATOR_PIPE2");
    });
  });
});
