import { CodeLineToAST } from "lib/transformers/CodeLine";
import {
  getOperatorDisplay,
  getVirtualOperatorDisplay,
  getOutputTextureName,
  getDisplayPanelAlignment,
} from "pages-lib/visualTransformerLogic";
import {
  getDisplayPanelColor,
  getTypeColor,
  getTypeAltColor,
  getOperatorValueSignatureLines,
} from "pages-lib/visualTransformer";
import { beforeEachVisualTransformer, makeAst, steps } from "./fixtures";

describe("generateVisualSteps", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testFullyAppliedArithmeticValueValueOperator", () => {
    const result = steps(makeAst.arithmetic());
    expect(result).toHaveLength(3);
    expect(result.map((s) => s.kind)).toEqual(["value", "value", "operator"]);
    expect(result.map((s) => s.sourceType)).toEqual([
      "Integer",
      "Integer",
      "Curry",
    ]);
    expect(result.map((s) => s.variableId)).toEqual([0, 1, 2]);
    expect(result[2]!.inputs.map((i) => i.variableId)).toEqual([0, 1]);
    expect(result[2]!.title).toBe(
      getOperatorDisplay("ARITHMETIC_ADDITION").title
    );
    expect(result[2]!.tooltipOperatorKey).toBe("OPERATOR_APPLY_2");
  });

  it("testHonorsStartVariableIdOffset", () => {
    const result = steps(makeAst.arithmetic(), 10);
    expect(result.map((s) => s.variableId)).toEqual([10, 11, 12]);
    expect(result[2]!.inputs.map((i) => i.variableId)).toEqual([10, 11]);
  });

  it("testNestedCurryProducesFiveStepsWiredCorrectly", () => {
    const result = steps(makeAst.chained());
    expect(result).toHaveLength(5);
    expect(result[4]!.inputs.map((i) => i.variableId)).toEqual([2, 3]);
    expect(result[4]!.title).toBe(
      getOperatorDisplay("ARITHMETIC_MULTIPLICATION").title
    );
  });

  it("testPartialApplicationThenPartialApplyStep", () => {
    const result = steps(makeAst.partial());
    expect(result).toHaveLength(3);
    expect(result[0]!.kind).toBe("operator");
    expect(result[0]!.sourceType).toBe("Operator");
    expect(result[1]!.sourceType).toBe("Integer");
    expect(result[2]!.sourceType).toBe("Curry");
    expect(result[2]!.inputs.map((i) => i.variableId)).toEqual([0, 1]);
    expect(result[2]!.tooltipOperatorKey).toBe("OPERATOR_APPLY");
  });

  it("testFlipThenVirtualFlippedStep", () => {
    const result = steps(makeAst.flip());
    expect(result).toHaveLength(2);
    expect(result[0]!.sourceType).toBe("Operator");
    expect(result[1]!.sourceType).toBe("Flip");
    expect(result[1]!.title).toBe(getVirtualOperatorDisplay("flip").title);
    expect(result[1]!.tooltipOperatorKey).toBe("OPERATOR_FLIP");
    expect(result[1]!.inputs.map((i) => i.variableId)).toEqual([0]);
  });

  it("testInvalidFlipStillGeneratesStepsWithoutThrowing", () => {
    const result = steps(makeAst.invalidFlip());
    expect(result).toHaveLength(2);
    expect(result[1]!.sourceType).toBe("Flip");
  });

  it("testPipeThenVirtualPipedStep", () => {
    const result = steps(makeAst.pipe());
    expect(result).toHaveLength(3);
    expect(result[0]!.title).toBe(
      getOperatorDisplay("ARITHMETIC_INCREMENT").title
    );
    expect(result[1]!.title).toBe(
      getOperatorDisplay("ARITHMETIC_MULTIPLICATION").title
    );
    expect(result[2]!.sourceType).toBe("Pipe");
    expect(result[2]!.title).toBe(getVirtualOperatorDisplay("pipe").title);
    expect(result[2]!.tooltipOperatorKey).toBe("OPERATOR_PIPE");
    expect(result[2]!.inputs.map((i) => i.variableId)).toEqual([0, 1]);
  });

  it("testPipe2ThenVirtualPiped2Step", () => {
    const result = steps(makeAst.pipe2());
    expect(result).toHaveLength(3);
    expect(result[2]!.sourceType).toBe("Pipe2");
    expect(result[2]!.title).toBe(getVirtualOperatorDisplay("pipe2").title);
    expect(result[2]!.tooltipOperatorKey).toBe("OPERATOR_PIPE2");
  });

  it("testSharedCardUsedTwiceIsNotRecreated", () => {
    const result = steps(makeAst.pipe2());
    expect(result.map((s) => s.title)).toEqual([
      "numberIncrement",
      "numberAdd",
      getVirtualOperatorDisplay("pipe2").title,
    ]);
    expect(result[2]!.inputs.map((i) => i.variableId)).toEqual([0, 0, 1]);
    expect(result[0]!.variableId).toBe(0);
  });

  it("testRepeatedLiteralValueSharesOneCard", () => {
    const result = steps(makeAst.conjunction());
    expect(result).toHaveLength(2);
    expect(result[0]!.sourceType).toBe("Boolean");
    expect(result[1]!.inputs.map((i) => i.variableId)).toEqual([0, 0]);
  });

  it("testListValueElementsThenListStep", () => {
    const result = steps(makeAst.list());
    expect(result).toHaveLength(4);
    expect(result[3]!.sourceType).toBe("List");
    expect(result[3]!.kind).toBe("value");
    expect(result[3]!.symbol).toBe("[]");
    expect(result[3]!.inputs.map((i) => i.variableId)).toEqual([0, 1, 2]);
  });

  it("testNumberLiteralsDoNotFlagNumberIntegerMismatch", () => {
    const result = steps(makeAst.divzero());
    expect(result).toHaveLength(3);
    expect(result.every((s) => s.typeError === undefined)).toBe(true);
  });

  it("testFullyAppliedCurryOutputResolvesToConcreteValueType", () => {
    const result = steps(makeAst.arithmetic());
    expect(getOutputTextureName(result[2]!)).toBe("Integer");
  });

  it("testFailedEvaluationDirectCallOutputsBaseOperatorType", () => {
    const result = steps(makeAst.divzero());
    expect(getOutputTextureName(result[2]!)).toBe("Number");
  });

  it("testFullyAppliedCurryDisplayPanelUsesValueColorAndCenteredAlign", () => {
    const result = steps(makeAst.arithmetic());
    expect(getDisplayPanelColor(result[2]!)).toBe(getTypeColor("Integer"));
    expect(getDisplayPanelAlignment(result[2]!.sourceType)).toBe("center");
    // Number literal steps are centered too
    expect(getDisplayPanelAlignment(result[0]!.sourceType)).toBe("center");
  });

  it("testPartialCurryOutputStaysOperatorTyped", () => {
    const result = steps(makeAst.partial());
    // Steps: [add operator, 1 literal, partial curry]
    expect(getOutputTextureName(result[2]!)).toBe("Operator");
    // A partially-applied curry still represents the operator itself
    expect(getDisplayPanelColor(result[2]!)).toBe(getTypeColor("Operator"));
  });

  it("testCleanApplicationsCarryNoTypeError", () => {
    const result = steps(makeAst.stringConcat());
    expect(result).toHaveLength(3);
    expect(result.every((s) => s.typeError === undefined)).toBe(true);
  });

  it("testOperatorPatternPreviewModeProducesSingleStep", () => {
    const result = steps(makeAst.operatorNode(), 0, "pattern");
    expect(result).toHaveLength(1);
    const step = result[0]!;
    expect(step.sourceType).toBe("Operator");
    expect(step.workspaceMode).toBe("pattern");
    expect(step.forceOperatorTabActive).toBe(true);
    expect(step.variableId).toBe(0);
    expect(step.expectedInputTypes).toEqual(["Number"]);
    expect(step.expectedOutputType).toBe("Number");
    expect(step.inputs).toEqual([]);
  });

  it("testReaderValueStepExposesReaderMetadata", () => {
    const result = steps(makeAst.reader());
    expect(result).toHaveLength(1);
    const step = result[0]!;
    expect(step.kind).toBe("value");
    expect(step.sourceType).toBe("Reader");
    expect(step.title).toBe("inventory");
    expect(step.symbol).toBe("inventory");
    expect(step.detail).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(step.inputs).toEqual([]);
  });

  it("testReaderStepOutputTypeResolvesFromAspect", () => {
    const result = steps(makeAst.reader());
    expect(getOutputTextureName(result[0]!)).toBe("Item");
  });

  it("testReaderStepWithSimulatedOutputResolvesOutputType", () => {
    const result = steps(makeAst.readerWithSimulatedOutput());
    expect(result).toHaveLength(1);
    expect(result[0]!.sourceType).toBe("Reader");
    expect(getOutputTextureName(result[0]!)).toBe("Boolean");
    expect(result[0]!.typeError).toBeUndefined();
  });

  it("testReaderStepMismatchedSimulatedOutputSetsTypeError", () => {
    const result = steps(makeAst.readerWithBadSimulatedOutput());
    expect(result).toHaveLength(1);
    expect(result[0]!.sourceType).toBe("Reader");
    expect(result[0]!.typeError).toBe(
      "Expected output type Item, got simulatedOutput type String"
    );
  });

  it("testReaderStepAnyAspectNeverTypeErrors", () => {
    const result = steps(CodeLineToAST('readers.network.value("anything")'));
    expect(result).toHaveLength(1);
    expect(result[0]!.typeError).toBeUndefined();
  });

  it("testValueStepsExposePrimitiveDetails", () => {
    const result = steps(makeAst.stringVal());
    expect(result).toHaveLength(1);
    expect(result[0]!.sourceType).toBe("String");
    expect(result[0]!.kind).toBe("value");
    expect(result[0]!.detail).toBe("hello");
  });

  it("testTypeColorsUsePrimaryAndAlt", () => {
    expect(getTypeColor("Any")).toBe("#000000");
    expect(getTypeAltColor("Any")).toBe("#ffffff");
    // Alt falls back to primary when unset
    expect(getTypeAltColor("Integer")).toBe(getTypeColor("Integer"));
    expect(getTypeAltColor("Operator")).toBe(getTypeColor("Operator"));
  });

  it("testOperatorValueSignatureLinesUsePrimaryColor", () => {
    const lines = getOperatorValueSignatureLines("OPERATOR_APPLY_2");
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      expect(line.color).toBe(getTypeColor(line.label));
    }
  });
});
