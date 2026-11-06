import { CondensedToAST } from "lib/transformers/Condensed";
import {
  generateVisualSteps,
  getDelayHistoryText,
  getDelayResultCard,
  getDisplayPanelText,
} from "pages-lib/visualTransformerLogic";

describe("TestDelayVisualStep", () => {
  it("testGeneratesADelayStepWithItsHistoryAtTheTargetTick", () => {
    const ast = CondensedToAST("Delay(5, 1, 3)");
    const steps = generateVisualSteps(ast, 0, undefined, { targetTick: 5 });
    const delay = steps.find((step) => step.sourceType === "Delay");

    expect(delay).toBeDefined();
    expect(delay!.delayHistory).toHaveLength(3);
    expect(delay!.delayTick).toBe(5);
    expect(delay!.delayInterval).toBe(1);
    expect(delay!.delayCapacity).toBe(3);
    expect(delay!.delayFrozen).toBe(false);
    expect(delay!.inputs).toHaveLength(1);

    expect(getDelayHistoryText(delay!)).toBe("[5, 5, 5]");
    expect(getDisplayPanelText(delay!)).toBe("[5, 5, 5]");

    const card = getDelayResultCard(delay!);
    expect(card.type).toBe("List");
    expect(card.tooltip.title).toBe(`§o${delay!.output}`);
    expect(card.tooltip.lines).toContain("§e§oValue: §r[5, 5, 5]");
    expect(card.tooltip.lines[0]).toContain("List<Integer>");
  });

  it("testShowsTheEmptyHistoryBeforeTheFirstSample", () => {
    const ast = CondensedToAST("Delay(5, 4)");
    const steps = generateVisualSteps(ast, 0, undefined, { targetTick: 2 });
    const delay = steps.find((step) => step.sourceType === "Delay")!;

    expect(delay.delayHistory).toEqual([]);
    expect(delay.delayTick).toBe(2);
    expect(getDisplayPanelText(delay)).toBe("[]");
    expect(getDelayResultCard(delay).tooltip.lines[0]).toContain("List");
  });

  it("testFreezesTheHistoryAtTheFreezeTick", () => {
    const ast = CondensedToAST("Materialize(Static(Delay(5, 1, 3, 2)))");
    const steps = generateVisualSteps(ast, 0, undefined, { targetTick: 10 });
    const delay = steps.find((step) => step.sourceType === "Delay")!;

    expect(delay.delayTick).toBe(2);
    expect(delay.delayHistory).toHaveLength(2);
    expect(delay.delayFrozen).toBe(true);
  });

  it("testAddsALabellerAfterTheDelayWhenEnabled", () => {
    const ast = CondensedToAST("Delay(5, 1, 2)");
    const steps = generateVisualSteps(ast, 0, undefined, {
      targetTick: 2,
      labeller: true,
    });
    const index = steps.findIndex((step) => step.sourceType === "Delay");

    expect(steps[index + 1]?.kind).toBe("labeller");
    expect(
      getDelayResultCard(steps[index]!, { unnamed: true }).tooltip.title
    ).toBe("Variable Card");
  });
});
