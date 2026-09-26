import { CodeLineToAST } from "lib/transformers/CodeLine";
import { CondensedToAST } from "lib/transformers/Condensed";
import { abstractDynamicParts } from "lib/transformers/lambdaAbstraction";
import { astContentKey } from "lib/transformers/NetworkCards";
import {
  getCumulativeStepError,
  getDisplayPanelSourceStep,
  getDisplayPanelText,
  getMaterializerMiddleText,
  getMaterializerResultCard,
} from "pages-lib/visualTransformerLogic";
import { getDisplayPanelColor } from "pages-lib/visualTransformer";
import { beforeEachVisualTransformer, steps } from "./fixtures";

const CRAFTING_GRID_LINES = ["§5§oClear or copy in a crafting", "§5§ogrid"];

const materialize = (source: string): TypeAST.Materialize =>
  CondensedToAST(source) as TypeAST.Materialize;

const aspectsOf = (abstraction: {
  params: { node: TypeAST.AST }[];
}): string[] =>
  abstraction.params.map((p) => (p.node as TypeAST.Reader).value.aspect);

describe("materializeVisualSteps", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testAbstractsReaderIntoLambdaWithReaderParamName", () => {
    const abstraction = abstractDynamicParts(
      materialize("Materialize(numberAdd(inventoryReader.INTEGER_COUNT, 2))")
        .value
    );
    expect(abstraction.params.map((p) => p.name)).toEqual(["inventoryCount"]);
  });

  it("testStaticWrappedReaderIsNotAbstracted", () => {
    const abstraction = abstractDynamicParts(
      materialize("Materialize(Static(inventoryReader.INTEGER_COUNT))").value
    );
    expect(abstraction.params).toHaveLength(0);
    expect(abstraction.lambda).toMatchObject({
      type: "Static",
      value: { type: "Reader" },
    });
  });

  it("testDynamicWrapperIsAbstractedEvenWithoutAReader", () => {
    const abstraction = abstractDynamicParts(
      materialize("Materialize(Dynamic(5))").value
    );
    expect(abstraction.params).toHaveLength(1);
  });

  it("testMultipleReadersAreAbstractedInFirstAppearanceOrder", () => {
    const forward = abstractDynamicParts(
      materialize(
        "Materialize(numberAdd(redstoneReader.BOOLEAN_LOW, inventoryReader.INTEGER_COUNT))"
      ).value
    );
    expect(aspectsOf(forward)).toEqual(["BOOLEAN_LOW", "INTEGER_COUNT"]);
    expect(new Set(forward.params.map((p) => p.name)).size).toBe(2);

    const reversed = abstractDynamicParts(
      materialize(
        "Materialize(numberAdd(inventoryReader.INTEGER_COUNT, redstoneReader.BOOLEAN_LOW))"
      ).value
    );
    expect(aspectsOf(reversed)).toEqual(["INTEGER_COUNT", "BOOLEAN_LOW"]);
  });

  it("testStructurallyIdenticalReadersShareOneParameter", () => {
    const abstraction = abstractDynamicParts(
      materialize(
        "Materialize(numberAdd(inventoryReader.INTEGER_COUNT, inventoryReader.INTEGER_COUNT))"
      ).value
    );
    expect(abstraction.params).toHaveLength(1);
    const body = abstraction.openBody as TypeAST.Curried;
    expect(astContentKey(body.args[0]!)).toBe(astContentKey(body.args[1]!));
    expect((body.args[0] as TypeAST.Variable).name).toBe(
      (body.args[1] as TypeAST.Variable).name
    );
  });

  it("testReaderSettingsMakeDistinctParameters", () => {
    const abstraction = abstractDynamicParts(
      materialize(
        'Materialize(numberAdd(inventoryReader.OBJECT_ITEM_STACK_SLOT({"slotid": 1}), inventoryReader.OBJECT_ITEM_STACK_SLOT({"slotid": 2})))'
      ).value
    );
    expect(abstraction.params).toHaveLength(2);
  });

  it("testParameterOrderingIsDeterministic", () => {
    const source =
      "Materialize(numberAdd(redstoneReader.BOOLEAN_LOW, inventoryReader.INTEGER_COUNT))";
    const first = abstractDynamicParts(materialize(source).value).params.map(
      (p) => p.name
    );
    const second = abstractDynamicParts(materialize(source).value).params.map(
      (p) => p.name
    );
    expect(first).toEqual(second);
  });

  it("testNestedMaterializeIsAStaticBoundaryForTheOuter", () => {
    const outer = abstractDynamicParts(
      materialize("Materialize(numberAdd(Materialize(Dynamic(5)), 2))").value
    );
    expect(outer.params).toHaveLength(0);

    const inner = (
      materialize("Materialize(numberAdd(Materialize(Dynamic(5)), 2))")
        .value as TypeAST.Curried
    ).args[0] as TypeAST.Materialize;
    expect(inner.type).toBe("Materialize");
    expect(abstractDynamicParts(inner.value).params).toHaveLength(1);
  });

  it("testMaterializeEmitsLambdaThenMaterializerThenApplySteps", () => {
    const result = steps(
      CondensedToAST("Materialize(numberAdd(inventoryReader.INTEGER_COUNT, 2))")
    );

    const materializeIdx = result.findIndex(
      (s) => s.sourceType === "Materialize"
    );
    expect(materializeIdx).toBeGreaterThanOrEqual(0);

    expect(
      result.slice(0, materializeIdx).every((s) => s.sourceType !== "Reader")
    ).toBe(true);

    const readerIdx = result.findIndex((s) => s.sourceType === "Reader");
    expect(readerIdx).toBeGreaterThan(materializeIdx);
    expect(readerIdx).toBe(result.length - 2);
    expect(result[result.length - 1]!.inputs.map((i) => i.variableId)).toEqual([
      result[materializeIdx]!.variableId,
      result[readerIdx]!.variableId,
    ]);
  });

  it("testEachReaderGetsAReaderStepAndAnApplyStepInParameterOrder", () => {
    const result = steps(
      CondensedToAST(
        "Materialize(numberAdd(redstoneReader.BOOLEAN_LOW, inventoryReader.INTEGER_COUNT))"
      )
    );
    const materializeIdx = result.findIndex(
      (s) => s.sourceType === "Materialize"
    );
    expect(materializeIdx).toBeGreaterThanOrEqual(0);

    const tail = result.slice(materializeIdx);
    expect(
      tail.map((s) =>
        s.sourceType === "Reader"
          ? "reader"
          : s.sourceType === "Curry"
            ? "apply"
            : "other"
      )
    ).toEqual(["other", "reader", "apply", "reader", "apply"]);

    const firstApply = tail[2]!;
    const firstReader = tail[1]!;
    expect(firstApply.inputs.map((i) => i.variableId)).toEqual([
      tail[0]!.variableId,
      firstReader.variableId,
    ]);
    const secondApply = tail[4]!;
    const secondReader = tail[3]!;
    expect(secondApply.inputs.map((i) => i.variableId)).toEqual([
      firstApply.variableId,
      secondReader.variableId,
    ]);
  });

  it("testNestedMaterializeRendersTwoMaterializerSteps", () => {
    const result = steps(
      CondensedToAST("Materialize(numberAdd(Materialize(Dynamic(5)), 2))")
    );
    expect(result.filter((s) => s.sourceType === "Materialize")).toHaveLength(
      2
    );
  });

  it("testWrappedLambdaParametersProduceNoInternalErrors", () => {
    for (const source of [
      "x => add Dynamic(x) 2",
      "x => add Static(x) 2",
      "Materialize(x => add Dynamic(x) 2)",
    ]) {
      const result = steps(CodeLineToAST(source));
      for (const step of result) getDisplayPanelText(step);
      expect(result.some((s) => s.node?.type === "Variable")).toBe(false);
      expect(
        getCumulativeStepError(result, result[result.length - 1]!.variableId)
      ).toBeUndefined();
    }
  });

  it("testDynamicAndStaticAddNoStep", () => {
    const dynamic = steps(CondensedToAST("Dynamic(numberAdd(1, 2))"));
    const plain = steps(CondensedToAST("numberAdd(1, 2)"));
    expect(dynamic.map((s) => s.sourceType)).toEqual(
      plain.map((s) => s.sourceType)
    );

    const staticNode = steps(CondensedToAST("Static(numberAdd(1, 2))"));
    expect(staticNode.map((s) => s.sourceType)).toEqual(
      plain.map((s) => s.sourceType)
    );
  });

  it("testMaterializingALambdaWithDynamicInputsKeepsTheInputOrder", () => {
    const lambda = (first: string, second: string) =>
      `Materialize(x => numberAdd(Dynamic(${first}), Dynamic(${second})))`;
    const forward = lambda(
      "inventoryReader.INTEGER_COUNT",
      "redstoneReader.BOOLEAN_LOW"
    );
    const reversed = lambda(
      "redstoneReader.BOOLEAN_LOW",
      "inventoryReader.INTEGER_COUNT"
    );

    expect(
      abstractDynamicParts(materialize(forward).value).params.map((p) => p.name)
    ).toEqual(["inventoryCount", "redstoneLow"]);
    expect(
      abstractDynamicParts(materialize(reversed).value).params.map(
        (p) => p.name
      )
    ).toEqual(["redstoneLow", "inventoryCount"]);

    const materializedOrder = (
      source: string
    ): { readers: string[]; applied: string[] } => {
      const result = steps(CondensedToAST(source), 0);
      const tail = result.slice(
        result.findIndex((s) => s.sourceType === "Materialize")
      );
      return {
        readers: tail
          .filter((s) => s.sourceType === "Reader")
          .map((s) => s.output),
        applied: tail
          .filter((s) => s.sourceType === "Curry" && s.tooltipOperatorKey)
          .map((s) => s.inputs[1]!.name),
      };
    };

    expect(materializedOrder(forward)).toEqual({
      readers: ["inventoryCount", "redstoneLow"],
      applied: ["inventoryCount", "redstoneLow"],
    });
    expect(materializedOrder(reversed)).toEqual({
      readers: ["redstoneLow", "inventoryCount"],
      applied: ["redstoneLow", "inventoryCount"],
    });
  });

  it("testMaterializerStepShowsThePanelOfTheCardItMaterializes", () => {
    const result = steps(
      CondensedToAST(
        "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))"
      ),
      0
    );
    const materializeStep = result.find((s) => s.sourceType === "Materialize")!;
    const topCardStep = result.find(
      (s) => s.variableId === materializeStep.inputs[0]!.variableId
    )!;

    const source = getDisplayPanelSourceStep(materializeStep, result);
    expect(source).toBe(topCardStep);

    expect(source.sourceType).toBe(topCardStep.sourceType);
    expect(getDisplayPanelText(source)).toBe(getDisplayPanelText(topCardStep));
    expect(getDisplayPanelText(source)).toContain("::");
    expect(getDisplayPanelColor(source)).toBe(
      getDisplayPanelColor(topCardStep)
    );
  });

  it("testNestedMaterializerPanelResolvesThroughToTheValueCard", () => {
    const result = steps(
      CondensedToAST("Materialize(numberAdd(Materialize(Dynamic(5)), 2))"),
      0
    );
    const materializers = result.filter((s) => s.sourceType === "Materialize");
    expect(materializers).toHaveLength(2);

    for (const step of materializers) {
      const source = getDisplayPanelSourceStep(step, result);
      expect(source.sourceType).not.toBe("Materialize");
      expect(getDisplayPanelSourceStep(source, result)).toBe(source);
    }
  });

  it("testStepIdsAreUnique", () => {
    for (const source of [
      "[1]",
      "[1, 2, 3]",
      "Materialize([1, 2, 3])",
      "numberAdd(1, 2)",
    ]) {
      const result = steps(CondensedToAST(source), 0);
      expect(new Set(result.map((s) => s.id)).size).toBe(result.length);
    }
  });
});

describe("getMaterializerMiddleText", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testOperatorShowsTheDisplayPanelTopLine", () => {
    expect(getMaterializerMiddleText(CondensedToAST("numberAdd"))).toBe(
      "Arithmetic Addition ::"
    );
  });

  it("testListShowsItsFirstElement", () => {
    expect(getMaterializerMiddleText(CondensedToAST("[7, 8, 9]"))).toBe("7");
  });

  it("testNamedValueTypesShowTheirName", () => {
    expect(
      getMaterializerMiddleText({ type: "Item", value: { itemName: "Stone" } })
    ).toBe("Stone");
    for (const type of ["Fluid", "Block", "Entity"] as const) {
      expect(
        getMaterializerMiddleText({ type, value: { displayName: "Water" } })
      ).toBe("Water");
    }
  });

  it("testOtherValuesShowTheirCompactText", () => {
    expect(getMaterializerMiddleText(CondensedToAST("5"))).toBe("5");
    expect(getMaterializerMiddleText(CondensedToAST("true"))).toBe("true");
    expect(getMaterializerMiddleText(CondensedToAST('"hello"'))).toBe("hello");
    expect(getMaterializerMiddleText(CondensedToAST("null"))).toBe("null");
  });

  it("testWrappersAreUnwrapped", () => {
    expect(
      getMaterializerMiddleText(CondensedToAST("Dynamic(numberAdd)"))
    ).toBe("Arithmetic Addition ::");
  });
  it("testMaterializeStepTopCardCarriesTheValueForTheMiddleText", () => {
    const result = steps(
      CondensedToAST(
        "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))"
      ),
      0
    );
    const materializeStep = result.find((s) => s.sourceType === "Materialize")!;
    const topCard = materializeStep.inputs[0]!;
    expect(topCard.node).toBeDefined();
    expect(getMaterializerMiddleText(topCard.node!, topCard.name)).toContain(
      "::"
    );
  });
  it("testOperatorResultCardTooltipDescribesTheMaterializedOperator", () => {
    const result = steps(
      CondensedToAST(
        "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))"
      ),
      0
    );
    const materializeStep = result.find((s) => s.sourceType === "Materialize")!;
    const topCard = materializeStep.inputs[0]!;
    const resultCard = getMaterializerResultCard(materializeStep);

    expect(resultCard.tooltip.title).toBe(`§o${materializeStep.output}`);
    expect(resultCard.tooltip.lines).toEqual([
      "§eType: §r§2Operator",
      "§eSignature: §rNumber -> Number",
      "§e§oValue: §rApplied numberAdd [Integer]",
      `§e§oVariable ID: §r§o${topCard.variableId + 1}`,
      ...CRAFTING_GRID_LINES,
    ]);
  });

  it("testWrappedOperatorResultCardTooltipIsStillOperatorStyle", () => {
    const materializeStep = steps(
      CondensedToAST(
        "Materialize(numberAdd(Dynamic(1), InventoryReader.INTEGER_COUNT))"
      ),
      0
    ).find((s) => s.sourceType === "Materialize")!;
    const lines = getMaterializerResultCard(materializeStep).tooltip.lines;
    expect(lines[0]).toBe("§eType: §r§2Operator");
    expect(lines[2]).toBe("§e§oValue: §rArithmetic Addition");
  });

  it("testListResultCardTooltipShowsTheListValue", () => {
    const materializeStep = steps(
      CondensedToAST("Materialize([1, 2, 3])"),
      0
    ).find((s) => s.sourceType === "Materialize")!;
    const topCard = materializeStep.inputs[0]!;
    const resultCard = getMaterializerResultCard(materializeStep);
    expect(resultCard.tooltip.lines).toEqual([
      "§eType: §r§4List",
      "§e§oValue: §r[1, 2, 3]",
      `§e§oVariable ID: §r§o${topCard.variableId + 1}`,
      ...CRAFTING_GRID_LINES,
    ]);
    expect(resultCard.type).toBe("List");
  });

  it("testOperatorResultCardArtIsTheOperatorValueType", () => {
    const materializeStep = steps(
      CondensedToAST(
        "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))"
      ),
      0
    ).find((s) => s.sourceType === "Materialize")!;
    expect(getMaterializerResultCard(materializeStep).type).toBe("Operator");
  });

  it("testOtherValueTypesUseTheStandardValueTooltip", () => {
    const materializeStep = steps(CondensedToAST("Materialize(5)"), 0).find(
      (s) => s.sourceType === "Materialize"
    )!;
    const topCard = materializeStep.inputs[0]!;
    expect(getMaterializerResultCard(materializeStep).tooltip.lines).toEqual([
      "§eType: §r§6Integer",
      "§e§oValue: §r5",
      `§e§oVariable ID: §r§o${topCard.variableId + 1}`,
      ...CRAFTING_GRID_LINES,
    ]);
  });
});
