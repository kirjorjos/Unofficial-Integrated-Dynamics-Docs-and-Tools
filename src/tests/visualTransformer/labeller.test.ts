import { CodeLineToAST } from "lib/transformers/CodeLine";
import {
  generateVisualSteps,
  getMaterializerResultCard,
} from "pages-lib/visualTransformerLogic";
import type { VisualStep } from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer } from "./fixtures";

const withReaderAndMaterializer =
  "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))";

const build = (
  input: string,
  labeller: boolean,
  startVariableId = 0
): VisualStep[] =>
  generateVisualSteps(CodeLineToAST(input), startVariableId, undefined, {
    labeller,
  });

const cardSteps = (steps: VisualStep[]): VisualStep[] =>
  steps.filter((step) => step.kind !== "labeller");

const labellerSteps = (steps: VisualStep[]): VisualStep[] =>
  steps.filter((step) => step.kind === "labeller");

const isNonSelfNaming = (step: VisualStep): boolean =>
  step.sourceType === "Reader" || step.sourceType === "Materialize";

describe("labellerVisualSteps", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testAddsOneLabellerStepPerReaderAndMaterializerStep", () => {
    const off = build(withReaderAndMaterializer, false);
    const on = build(withReaderAndMaterializer, true);

    expect(labellerSteps(off)).toHaveLength(0);
    expect(labellerSteps(on)).toHaveLength(
      cardSteps(off).filter(isNonSelfNaming).length
    );
    expect(on).toHaveLength(off.length + labellerSteps(on).length);

    for (const step of labellerSteps(on)) {
      const producer = on[on.indexOf(step) - 1]!;
      expect(isNonSelfNaming(producer)).toBe(true);
      expect(step.title).toBe("Labeller");
      expect(step.output).toBe(producer.output);
    }
  });

  it("testDoesNotAdvanceTheVariableCardIds", () => {
    const off = build(withReaderAndMaterializer, false);
    const on = build(withReaderAndMaterializer, true);

    expect(cardSteps(on).map((step) => step.variableId)).toEqual(
      off.map((step) => step.variableId)
    );

    for (const step of labellerSteps(on)) {
      const producer = on[on.indexOf(step) - 1]!;
      expect(step.variableId).toBe(producer.variableId);
      expect(step.inputs[0]!.variableId).toBe(producer.variableId);
    }
  });

  it("testKeepsStepNumberingGrowingWhileCardIdsStayPut", () => {
    const off = build(withReaderAndMaterializer, false);
    const on = build(withReaderAndMaterializer, true);

    const labellerIndexes = on
      .map((step, index) => (step.kind === "labeller" ? index : -1))
      .filter((index) => index >= 0);
    expect(labellerIndexes.length).toBeGreaterThan(0);
    expect(Math.max(...labellerIndexes)).toBeGreaterThan(off.length - 1);

    for (const index of labellerIndexes) {
      expect(on[index]!.variableId).toBe(on[index - 1]!.variableId);
    }
  });

  it("testMovesTheNameOntoTheLabellerCardForAMaterializerStep", () => {
    const off = build(withReaderAndMaterializer, false);
    const on = build(withReaderAndMaterializer, true);

    const offMaterializer = cardSteps(off).find(
      (step) => step.sourceType === "Materialize"
    )!;
    const onMaterializer = cardSteps(on).find(
      (step) => step.sourceType === "Materialize"
    )!;
    const labeller = labellerSteps(on).find(
      (step) => step.node.type === "Materialize"
    )!;
    const offResultCard = getMaterializerResultCard(offMaterializer);
    expect(offResultCard.tooltip.title).toBe(`§o${offMaterializer.output}`);
    expect(onMaterializer.tooltip.title).toBe("Variable Card");
    expect(labeller.tooltip.title).toBe(`§o${labeller.output}`);
    expect(labeller.inputs[0]!.tooltip.title).toBe(`§o${labeller.output}`);
    expect(labeller.tooltip.lines).toEqual(offResultCard.tooltip.lines);
    expect(labeller.inputs[0]!.type).toBe(offResultCard.type);
    expect(
      getMaterializerResultCard(onMaterializer, { unnamed: true }).tooltip.title
    ).toBe("Variable Card");
    expect(getMaterializerResultCard(onMaterializer).tooltip.title).toBe(
      `§o${onMaterializer.output}`
    );
  });

  it("testKeepsReaderTooltipsIdenticalToTheFlagOffRun", () => {
    const off = build(withReaderAndMaterializer, false);
    const on = build(withReaderAndMaterializer, true);

    const offReader = cardSteps(off).find(
      (step) => step.sourceType === "Reader"
    )!;
    const onReader = cardSteps(on).find(
      (step) => step.sourceType === "Reader"
    )!;
    const labeller = labellerSteps(on).find(
      (step) => step.variableId === offReader.variableId
    )!;

    expect(onReader.tooltip.title).toBe(offReader.tooltip.title);
    expect(onReader.tooltip.lines).toEqual(offReader.tooltip.lines);
    expect(labeller.tooltip.title).toBe(offReader.tooltip.title);
    expect(labeller.tooltip.lines).toEqual(offReader.tooltip.lines);
  });

  it("testNeverLabelsLogicProgrammerSteps", () => {
    const on = build("apply add 1 2", true);
    expect(labellerSteps(on)).toHaveLength(0);
  });

  it("testLeavesEverythingUntouchedWhenTheFlagIsOff", () => {
    const off = build(withReaderAndMaterializer, false);
    const implicit = generateVisualSteps(
      CodeLineToAST(withReaderAndMaterializer),
      0
    );
    expect(implicit).toEqual(off);
  });
});
