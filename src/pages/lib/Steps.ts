import {
  generateVisualSteps,
  getVisibleListEntries,
  getDisplayPanelText,
  type VisualStep,
} from "pages-lib/visualTransformerLogic";

describe("LogicProgrammerVisualOutput - Step Generation", () => {
  describe("generateVisualSteps", () => {
    it("generates single step for simple operator", () => {
      const ast = { type: "Operator" as const, opName: "ARITHMETIC_ADDITION" };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps.length).toBeGreaterThan(0);
      expect(steps[0]!.id).toBe("step-1");
      expect(steps[0]!.variableId).toBe(0);
    });

    it("generates steps numbered from 1", () => {
      const ast = {
        type: "Curry" as const,
        base: {
          type: "Operator" as const,
          opName: "ARITHMETIC_ADDITION" as const,
        },
        args: [
          { type: "Integer" as const, value: "1" as const },
          { type: "Integer" as const, value: "2" as const },
        ],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps.length).toBeGreaterThan(0);
      steps.forEach((step, index) => {
        expect(step.id).toBe(`step-${index + 1}`);
      });
    });

    it("uses var name from ast.varName when present", () => {
      const ast = {
        type: "Integer" as const,
        value: "42" as const,
        varName: "myVariable" as const,
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps[0]!.output).toBe("myVariable");
    });

    it("generates different steps for operator preview mode", () => {
      const ast = {
        type: "Operator" as const,
        opName: "ARITHMETIC_ADDITION" as const,
      };

      const normalSteps = generateVisualSteps(ast as any, 0, "value");
      const patternSteps = generateVisualSteps(ast as any, 0, "pattern");

      expect(normalSteps[0]!.workspaceMode).toBe("operatorValue");
      expect(patternSteps[0]!.workspaceMode).toBe("pattern");
      expect(patternSteps[0]!.forceOperatorTabActive).toBe(true);
    });

    it("handles operator with curry correctly", () => {
      const ast = {
        type: "Curry" as const,
        base: {
          type: "Operator" as const,
          opName: "ARITHMETIC_ADDITION" as const,
        },
        args: [{ type: "Integer" as const, value: "1" as const }],
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps.length).toBeGreaterThanOrEqual(1);
      expect(steps[0]!.kind).toBe("operator");
    });

    it("handles pipe operators", () => {
      const ast = {
        type: "Pipe" as const,
        op1: { type: "Operator" as const, opName: "LIST_LENGTH" as const },
        op2: {
          type: "Operator" as const,
          opName: "ARITHMETIC_INCREMENT" as const,
        },
      };
      const steps = generateVisualSteps(ast as any, 0);

      expect(steps.length).toBeGreaterThan(0);
      const pipeStep = steps.find(
        (s) => s.tooltipOperatorKey === "OPERATOR_PIPE"
      );
      expect(pipeStep).toBeDefined();
      expect(pipeStep!.sourceType).toBe("Pipe");
    });

    it("generates correct variable IDs", () => {
      const ast = {
        type: "Curry" as const,
        base: {
          type: "Operator" as const,
          opName: "ARITHMETIC_ADDITION" as const,
        },
        args: [
          { type: "Integer" as const, value: "1" as const },
          { type: "Integer" as const, value: "2" as const },
        ],
      };
      const steps = generateVisualSteps(ast as any, 10);

      steps.forEach((step, index) => {
        expect(step.variableId).toBe(10 + index);
      });
    });
  });

  describe("getVisibleListEntries", () => {
    it("returns entries for operator source type", () => {
      const step: VisualStep = {
        id: "step-1",
        title: "test",
        searchLabel: "", // Empty search shows all entries
        symbol: "+",
        kind: "operator",
        sourceType: "Operator",
        inputs: [],
        output: "result",
        node: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
        variableId: 0,
        tooltip: { title: "Test", lines: [] },
        detail: "ARITHMETIC_ADDITION",
        forceOperatorTabActive: false,
        workspaceMode: "operatorValue",
      };

      const entries = getVisibleListEntries(step);

      // Empty search should return some entries (both types and operators)
      expect(entries.length).toBeGreaterThan(0);
    });

    it("returns type tab entries for value source type", () => {
      const step: VisualStep = {
        id: "step-1",
        title: "test",
        searchLabel: "integer",
        symbol: "42",
        kind: "value",
        sourceType: "Integer",
        inputs: [],
        output: "result",
        node: { type: "Integer", value: "42" },
        variableId: 0,
        tooltip: { title: "Test", lines: [] },
        workspaceMode: "operatorValue",
      };

      const entries = getVisibleListEntries(step);
      const integerEntry = entries.find((e) => e.symbol === "Integer");

      expect(integerEntry?.active).toBe(true);
    });
  });

  describe("getDisplayPanelText", () => {
    it("returns step output when node is not available", () => {
      const step = {
        output: "myOutput",
        node: null as any,
      };

      const text = getDisplayPanelText(step as any);
      expect(text).toBe("myOutput");
    });

    it("returns operator name and signature for operator node", () => {
      const ast = { type: "Operator", opName: "ARITHMETIC_ADDITION" };
      const step = {
        output: "result",
        node: ast as any,
      };

      const text = getDisplayPanelText(step as any);
      expect(text).toContain("::");
    });
  });
});
