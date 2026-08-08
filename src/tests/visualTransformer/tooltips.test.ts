import {
  buildValueCardTooltip,
  buildOperatorCardTooltip,
  buildStepTooltip,
  getCardTitle,
  getExpectedOutputTooltip,
  getInputSlotTooltip,
  getOperatorTooltipMeta,
  getOutputSlotTooltip,
} from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer, makeAst, steps } from "./fixtures";

describe("valueCardTooltips", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testIncludesTypeValueAndVariableIdLines", () => {
    const [integerStep] = steps(makeAst.arithmetic());
    const tooltip = buildValueCardTooltip(integerStep!, 2);
    expect(tooltip.lines[0]).toBe("§eType: §r§6Integer");
    expect(tooltip.lines).toContain("§e§oValue: §r1");
    expect(tooltip.lines).toContain("§e§oVariable ID: §r§o2");
    expect(tooltip.title).toBe(`§o${integerStep!.output}`);
  });

  it("testUsesStringValueAsCardTitleForStrings", () => {
    const [stringStep] = steps(makeAst.stringVal());
    expect(stringStep!.output).toBe("hello");
    const tooltip = buildValueCardTooltip(stringStep!, 0);
    expect(tooltip.title).toBe("§ohello");
  });

  it("testFallsBackToVariableCardTitleForEmptyNames", () => {
    const tooltip = buildValueCardTooltip(
      { output: "", sourceType: "Null", node: { type: "Null" } } as any,
      0
    );
    expect(tooltip.title).toBe("Variable Card");
  });
});

describe("operatorCardTooltips", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testResolvesRealSignatureForFullyAppliedCurry", () => {
    const result = steps(makeAst.arithmetic());
    const addStep = result[2]!;
    const tooltip = buildOperatorCardTooltip(addStep as any, 2);
    const meta = getOperatorTooltipMeta("ARITHMETIC_ADDITION");
    expect(tooltip.lines[0]).toBe(
      `§eOperator: §r${meta.displayName} (${meta.symbol})`
    );
    expect(tooltip.lines).toContain("§eInput Type 1: §r§6Number");
    expect(tooltip.lines).toContain("§eInput Type 2: §r§6Number");
    expect(tooltip.lines).toContain("§eOutput Type: §r§6Number");
    expect(
      tooltip.lines.some((l) => l.startsWith("§eVariable IDs: §r§o{"))
    ).toBe(true);
    expect(tooltip.lines).toContain("§e§oVariable ID: §r§o2");
  });

  it("testUsesVirtualOperatorDisplayForSerializerSteps", () => {
    const result = steps(makeAst.flip());
    const flipStep = result[1]!;
    const tooltip = buildOperatorCardTooltip(flipStep as any, 1);
    expect(tooltip.lines[0]).toContain("Virtual Flipped");
  });

  it("testReturnsBaseLinesWhenNoOperatorKey", () => {
    const tooltip = buildOperatorCardTooltip(
      { output: "x", inputs: [], sourceType: "Operator" } as any,
      3
    );
    expect(tooltip.lines).toEqual(["§e§oVariable ID: §r§o3"]);
  });
});

describe("buildStepTooltip", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testRoutesOperatorKindCurryStepsToOperatorCard", () => {
    const result = steps(makeAst.arithmetic());
    const addStep = result[2]!;
    const tooltip = buildStepTooltip(addStep as any, 2);
    expect(tooltip.lines[0]).toContain("§eOperator:");
  });

  it("testRoutesValueStepsToValueCard", () => {
    const [integerStep] = steps(makeAst.arithmetic());
    const tooltip = buildStepTooltip(integerStep!, 0);
    expect(tooltip.lines[0]).toBe("§eType: §r§6Integer");
  });
});

describe("slotTooltipHelpers", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testReturnsInputTooltipWhenSlotFilled", () => {
    const result = steps(makeAst.arithmetic());
    const addStep = result[2]!;
    const tooltip = getInputSlotTooltip(addStep, 0);
    expect(tooltip).not.toBeNull();
    expect(tooltip!.lines.some((l) => l.includes("Variable ID"))).toBe(true);
  });

  it("testReturnsExpectedInputTooltipForEmptySlot", () => {
    const result = steps(makeAst.operatorNode(), 0, "pattern");
    const patternStep = result[0]!;
    const tooltip = getInputSlotTooltip(patternStep, 0);
    expect(tooltip!.title).toBe("Expected Input");
    expect(tooltip!.lines[0]).toBe("§eExpected Type: §6Number");
  });

  it("testReturnsNullWhenNoInputAndNoExpectedType", () => {
    const [integerStep] = steps(makeAst.arithmetic());
    expect(getInputSlotTooltip(integerStep!, 0)).toBeNull();
  });

  it("testGetOutputSlotTooltipPrefersExpectedOutputInPatternMode", () => {
    const result = steps(makeAst.operatorNode(), 0, "pattern");
    const patternStep = result[0]!;
    const tooltip = getOutputSlotTooltip(patternStep);
    expect(tooltip.title).toBe("Expected Output");
    expect(tooltip.lines[0]).toBe("§eExpected Output: §6Number");
  });

  it("testGetOutputSlotTooltipFallsBackToStepTooltip", () => {
    const result = steps(makeAst.arithmetic());
    const addStep = result[2]!;
    expect(getOutputSlotTooltip(addStep)).toBe(addStep.tooltip);
  });
});

describe("getCardTitle", () => {
  it("testWrapsNonEmptyNamesInItalicCode", () => {
    expect(getCardTitle("foo")).toBe("§ofoo");
  });
  it("testUsesVariableCardForEmptyNames", () => {
    expect(getCardTitle("   ")).toBe("Variable Card");
  });
});

describe("getExpectedOutputTooltip", () => {
  it("testBuildsExpectedOutputLine", () => {
    const tooltip = getExpectedOutputTooltip("Boolean");
    expect(tooltip.title).toBe("Expected Output");
    expect(tooltip.lines[0]).toBe("§eExpected Output: §1Boolean");
  });
});
