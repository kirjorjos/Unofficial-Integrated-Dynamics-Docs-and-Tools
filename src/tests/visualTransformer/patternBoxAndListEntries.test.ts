import {
  getPatternBox,
  getVisibleListEntries,
  getVirtualOperatorDisplay,
  isDirectListValue,
} from "pages-lib/visualTransformerLogic";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { LOGIC_PROGRAMMER_RENDER_PATTERNS } from "pages-lib/logicProgrammerRenderPatterns";
import type { VisualStep } from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer, makeAst, steps } from "./fixtures";

const WORKSPACE_X = 88;
const WORKSPACE_Y = 18;
const WORKSPACE_WIDTH = 160;
const WORKSPACE_HEIGHT = 87;

const makeStep = (overrides: Partial<VisualStep>): VisualStep =>
  ({
    id: "test-step",
    title: "Test",
    searchLabel: "Test",
    symbol: "T",
    kind: "value",
    sourceType: "Integer",
    inputs: [],
    output: "test",
    node: makeAst.boolVal(),
    variableId: 0,
    tooltip: { title: "Test", lines: [] },
    ...overrides,
  }) as VisualStep;

describe("getPatternBox", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testOperatorValueModeWithPatternTranslatesSlotPositions", () => {
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.INFIX;
    const box = getPatternBox(
      makeStep({ workspaceMode: "operatorValue", renderPattern: "INFIX" })
    );

    const expectedLeft =
      WORKSPACE_X + Math.floor((WORKSPACE_WIDTH - pattern.width) / 2);
    const expectedTop =
      WORKSPACE_Y + Math.floor((WORKSPACE_HEIGHT - pattern.height) / 2);

    expect(box.slots).toHaveLength(pattern.slotPositions.length);
    expect(box.canvas).toEqual({
      left: expectedLeft,
      top: expectedTop,
      width: pattern.width,
      height: pattern.height,
    });
    const deltas = box.slots.map((slot, index) => ({
      dx: slot.left - pattern.slotPositions[index]!.left,
      dy: slot.top - pattern.slotPositions[index]!.top,
    }));
    expect(new Set(deltas.map((d) => `${d.dx},${d.dy}`)).size).toBe(1);
    expect(deltas[0]).toEqual({ dx: expectedLeft, dy: expectedTop });
  });

  it("testOperatorValueModeWithoutPatternFallsBackToNoneCanvas", () => {
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.NONE_CANVAS;
    const box = getPatternBox(
      makeStep({ workspaceMode: "operatorValue", renderPattern: "NONE" })
    );
    expect(box.slots).toEqual([]);
    expect(box.symbol).toBeNull();
    expect(box.valueBox).toBeNull();
    expect(box.canvas!.width).toBe(pattern.width);
  });

  it("testPatternModeAlwaysUsesNoneCanvas", () => {
    const box = getPatternBox(
      makeStep({ workspaceMode: "pattern", renderPattern: "INFIX" })
    );
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.NONE_CANVAS;
    expect(box.slots).toEqual([]);
    expect(box.canvas!.width).toBe(pattern.width);
    expect(box.canvas!.height).toBe(pattern.height);
  });

  it("testItemStackBackedValueTypesUseSingleSlot", () => {
    const box = getPatternBox(makeStep({ sourceType: "Item" }));
    expect(box.slots).toHaveLength(1);
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.SINGLE_SLOT;
    expect(box.canvas!.width).toBe(pattern.width);
  });

  it("testSpreadsMultiInputSlotsEvenlyWith18pxSizeAnd8pxGap", () => {
    const box = getPatternBox(
      makeStep({
        inputs: [
          {
            name: "a",
            type: "Integer",
            variableId: 0,
            tooltip: { title: "", lines: [] },
          },
          {
            name: "b",
            type: "Integer",
            variableId: 1,
            tooltip: { title: "", lines: [] },
          },
          {
            name: "c",
            type: "Integer",
            variableId: 2,
            tooltip: { title: "", lines: [] },
          },
        ],
      })
    );
    const totalWidth = 3 * 18 + 2 * 8;
    const left = WORKSPACE_X + Math.floor((WORKSPACE_WIDTH - totalWidth) / 2);
    const top = WORKSPACE_Y + Math.floor((WORKSPACE_HEIGHT - 18) / 2);
    expect(box.slots.map((s) => s.left)).toEqual([left, left + 26, left + 52]);
    expect(box.slots.map((s) => s.top)).toEqual([top, top, top]);
    expect(box.canvas).toBeNull();
  });

  it("testZeroInputValueStepsUseNonePatternWithValueBox", () => {
    const box = getPatternBox(makeStep({ inputs: [] }));
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.NONE;
    const left =
      WORKSPACE_X + Math.floor((WORKSPACE_WIDTH - pattern.width) / 2);
    const top =
      WORKSPACE_Y + Math.floor((WORKSPACE_HEIGHT - pattern.height) / 2);
    expect(box.slots).toEqual([]);
    expect(box.symbol).toBeNull();
    expect(box.valueBox).toEqual({
      left: left + 14,
      top: top + 6,
      width: pattern.width - 28,
    });
    expect(box.canvas).toEqual({
      left,
      top,
      width: pattern.width,
      height: pattern.height,
    });
  });
});

describe("isDirectListValue", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testSameTypeLiteralListIsDirect", () => {
    expect(isDirectListValue(CodeLineToAST("[1, 2, 3]"))).toBe(true);
    expect(isDirectListValue(CodeLineToAST('["a", "b"]'))).toBe(true);
    expect(isDirectListValue(CodeLineToAST("[true, false]"))).toBe(true);
  });

  it("testListWithOperatorElementIsNotDirect", () => {
    expect(
      isDirectListValue(
        CodeLineToAST(
          "[319, 236, (apply apply reduce1 add (apply apply map readers.network.variableValueById [0, 1]))]"
        )
      )
    ).toBe(false);
  });

  it("testMixedTypeListIsNotDirect", () => {
    expect(isDirectListValue(CodeLineToAST('[1, "a"]'))).toBe(false);
    expect(isDirectListValue(CodeLineToAST("[1, [2]]"))).toBe(false);
  });

  it("testListOfOperatorReferencesIsDirect", () => {
    expect(
      isDirectListValue(CodeLineToAST("[numberAdd, numberMultiply]"))
    ).toBe(true);
  });

  it("testEmptyListIsNotDirect", () => {
    expect(isDirectListValue(CodeLineToAST("[]"))).toBe(false);
  });

  it("testNonListNodeIsNotDirect", () => {
    expect(isDirectListValue(CodeLineToAST("1"))).toBe(false);
  });
});

describe("getVisibleListEntries", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testActivatesMatchingTypeTabForIntegerValueStep", () => {
    const [integerStep] = steps(makeAst.arithmetic());
    const entries = getVisibleListEntries(integerStep!);
    const active = entries.filter((e) => e.active);
    expect(active).toHaveLength(1);
    expect(active[0]!.symbol).toBe("Integer");
    expect(active[0]!.tabKind).toBe("type");
  });

  it("testNeverReturnsMoreThan10Entries", () => {
    const [integerStep] = steps(makeAst.arithmetic());
    expect(getVisibleListEntries(integerStep!).length).toBeLessThanOrEqual(10);
  });

  it("testOperatorValueModeStepsActivateOwnSymbolTab", () => {
    const result = steps(makeAst.operatorNode());
    const operatorStep = result[0]!;
    const entries = getVisibleListEntries(operatorStep);
    const active = entries.filter((e) => e.active);
    expect(active).toHaveLength(1);
    expect(active[0]!.tabKind).toBe("operator");
    expect(active[0]!.symbol).toBe(operatorStep.symbol);
  });

  it("testPatternModeStepsFallBackToOperatorTypeTab", () => {
    const result = steps(makeAst.operatorNode(), 0, "pattern");
    const patternStep = result[0]!;
    const entries = getVisibleListEntries(patternStep);
    const active = entries.filter((e) => e.active);
    expect(active).toHaveLength(1);
    expect(active[0]!.symbol).toBe("Operator");
    expect(active[0]!.tabKind).toBe("type");
  });

  it("testMatchesEntriesBySearchLabel", () => {
    const listStep = steps(makeAst.list())[3]!;
    const entries = getVisibleListEntries(listStep);
    const listEntry = entries.find((e) => e.symbol === "List");
    expect(listEntry).toBeDefined();
    expect(listEntry!.active).toBe(true);
  });

  it("testVirtualSerializerStepsCarryOwnSymbolTab", () => {
    const result = steps(makeAst.flip());
    const flipStep = result[1]!;
    const entries = getVisibleListEntries(flipStep);
    const active = entries.filter((e) => e.active);
    expect(active).toHaveLength(1);
    expect(active[0]!.symbol).toBe(getVirtualOperatorDisplay("flip").symbol);
  });
});
