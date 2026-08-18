import { getCumulativeStepError } from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer, makeAst, steps } from "./fixtures";

describe("typeMismatchDetection", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testFlagsBooleanFedToNumberOperatorArgument", () => {
    const result = steps(makeAst.typeMismatch());
    const addStep = result[2]!;
    expect(addStep.typeError).toBe(
      "Type mismatch: expected Number, got Boolean"
    );
  });

  it("testDoesNotFlagApplicationsWithMatchingTypes", () => {
    const result = steps(makeAst.stringConcat());
    expect(result.every((s) => s.typeError === undefined)).toBe(true);
  });

  it("testDoesNotFlagSerializerStepsWithoutTypeCheck", () => {
    const result = steps(makeAst.flip());
    expect(result.every((s) => s.typeError === undefined)).toBe(true);
  });
});

describe("getCumulativeStepError", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testReturnsUndefinedForCleanStepGraph", () => {
    const result = steps(makeAst.arithmetic());
    expect(getCumulativeStepError(result, 2)).toBeUndefined();
    expect(getCumulativeStepError(result, 0)).toBeUndefined();
  });

  it("testWalksInputDependencyChainWithoutCrashing", () => {
    const result = steps(makeAst.chained());
    expect(() => getCumulativeStepError(result, 4)).not.toThrow();
    expect(getCumulativeStepError(result, 4)).toBeUndefined();
  });

  it("testToleratesCyclicInputGraphsViaSeenSet", () => {
    const nodeA = makeAst.boolVal();
    const nodeB = makeAst.boolVal();
    const stepA = {
      variableId: 0,
      node: nodeA,
      inputs: [{ variableId: 1 } as never],
    };
    const stepB = {
      variableId: 1,
      node: nodeB,
      inputs: [{ variableId: 0 } as never],
    };
    expect(() =>
      getCumulativeStepError([stepA, stepB] as never, 0)
    ).not.toThrow();
  });
});
