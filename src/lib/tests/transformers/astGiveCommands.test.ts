import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { CondensedToAST } from "lib/transformers/Condensed";
import { astToGiveCommands } from "lib/transformers/astGiveCommands";
import { parseSnbtInput } from "lib/transformers/inputParser";
import { astContentKey, getCurryChunks } from "lib/transformers/NetworkCards";

const snbtOf = (text: string, options = {}): string[] =>
  astToGiveCommands(CondensedToAST(text), options).lines;

const warningsOf = (text: string, options = {}): string[] =>
  astToGiveCommands(CondensedToAST(text), options).warnings;

const cardAt = (lines: string[], index: number): string =>
  lines[index]!.replace(/^\/give @p integrateddynamics:variable/, "");

describe("TestAstToGiveCommandsCardGraph", () => {
  it("testWritesALiteralAsOneValuetypeCard", () => {
    expect(snbtOf("5")).toEqual([
      '/give @p integrateddynamics:variable{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}',
    ]);
  });

  it("testWritesEachLiteralTypeUnderItsOwnTypeName", () => {
    expect(cardAt(snbtOf('"hi"'), 0)).toContain(
      'typeName:"integrateddynamics:string",value:"hi"'
    );
    expect(cardAt(snbtOf("true"), 0)).toContain(
      'typeName:"integrateddynamics:boolean",value:1b'
    );
    expect(cardAt(snbtOf("5.5"), 0)).toContain(
      'typeName:"integrateddynamics:double",value:5.5d'
    );
  });

  it("testWritesADirectApplicationAsItsArgumentsPlusOneOperatorCard", () => {
    const lines = snbtOf("add(1, 2)");
    expect(lines).toHaveLength(3);
    expect(cardAt(lines, 0)).toContain(
      'typeName:"integrateddynamics:integer",value:1'
    );
    expect(cardAt(lines, 1)).toContain(
      'typeName:"integrateddynamics:integer",value:2'
    );
    expect(cardAt(lines, 2)).toBe(
      '{_id:2,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;0,1]}'
    );
  });

  it("testGivesAnOperatorUsedAsAValueItsOwnCard", () => {
    const lines = astToGiveCommands(CodeLineToAST("apply add 1")).lines;
    expect(lines).toHaveLength(3);
    expect(cardAt(lines, 0)).toBe(
      '{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}'
    );
    expect(cardAt(lines, 2)).toBe(
      '{_id:2,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;0,1]}'
    );
  });

  it("testSharesACardBetweenRepeatedSubexpressions", () => {
    const lines = snbtOf('stringConcat("a", "a")');
    expect(lines).toHaveLength(2);
    expect(cardAt(lines, 1)).toContain("variableIds:[I;0,0]");
  });

  it("testStartsTheIdsWhereItIsToldTo", () => {
    expect(cardAt(snbtOf("5", { startVariableId: 40 }), 0)).toContain("_id:40");
  });

  it("testWritesAListAsAMaterializedListProxy", () => {
    const lines = snbtOf("[1, 2, 3]");
    expect(lines).toHaveLength(4);
    expect(cardAt(lines, 3)).toBe(
      '{_id:3,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[1,2,3]}}}'
    );
  });

  it("testAppliesACardValuedBaseToTwoValuesInOneCard", () => {
    const applied = {
      type: "Curry",
      base: {
        type: "Curry",
        base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer", value: "1" }],
        varName: "x",
      },
      args: [
        { type: "Integer", value: "2" },
        { type: "Integer", value: "3" },
      ],
    } as unknown as TypeAST.AST;

    expect(cardAt(astToGiveCommands(applied).lines, 5)).toBe(
      '{_id:5,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply2",variableIds:[I;2,3,4]}'
    );
  });

  it("testChunksACardValuedBaseThreeValuesAtATimeAndAStaticOneAtATime", () => {
    const values = ["1", "2", "3", "4"].map(
      (value) => ({ type: "Integer", value }) as TypeAST.AST
    );

    const cardValued = {
      type: "Curry",
      base: { type: "Variable", name: "@0" },
      args: values,
    } as unknown as TypeAST.Curried;
    expect(getCurryChunks(cardValued).map((c) => c.args.length)).toEqual([
      3, 1,
    ]);

    const staticBase = {
      type: "Curry",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: values,
    } as unknown as TypeAST.Curried;
    expect(getCurryChunks(staticBase).map((c) => c.args.length)).toEqual([
      1, 1, 1, 1,
    ]);
  });

  it("testTheListCardItWritesParsesBackToTheSameList", () => {
    const lines = snbtOf("[1, 2, 3]");
    const reparsed = parseSnbtInput(lines.join("\n"), { missingParts: "warn" });
    const listCard = reparsed.cards.find((card) => card.ast?.type === "List");
    expect(
      listCard?.ast === undefined ? undefined : astContentKey(listCard.ast)
    ).toBe(astContentKey(CondensedToAST("[1, 2, 3]")));
  });
});

const lineAt = (lines: string[], index: number): string =>
  lines[index]!.replace(/ -- Warning:.*$/, "");

describe("TestAstToGiveCommandsDisplay", () => {
  it("testEmitsAPanelBareAndItsCardsAsTheirOwnItems", () => {
    const lines = snbtOf("Display(add(1, 2))");
    expect(lines).toHaveLength(4);
    expect(lineAt(lines, 0)).toBe(
      "/give @p integrateddynamics:part_display_panel{id:0,aspectProperties:{map:[]},enabled:1b,updateInterval:1}"
    );
    expect(lineAt(lines, 3)).toContain(
      'operatorName:"integrateddynamics:arithmetic_addition"'
    );
  });

  it("testPutsThePanelAheadOfTheStoreWhenItIsTheFirstStep", () => {
    const lines = snbtOf('Display(stringConcat("a", "b"))', {
      outputShape: "varstore",
    });
    expect(lines).toHaveLength(2);
    expect(lineAt(lines, 0)).toContain("part_display_panel");
    expect(lineAt(lines, 1)).toContain("variablestore");
  });

  it("testGivesEachCardItsOwnItemEvenWhenAPanelReadsIt", () => {
    const program = "add(1, 2); Display(add(1, 2))";
    const output = astToGiveCommands(CondensedToAST(program));
    expect(output.lines).toHaveLength(4);
    expect(
      output.lines.filter((line) => line.includes(":variable{"))
    ).toHaveLength(3);
    expect(lineAt(output.lines, 3)).toMatch(
      /^\/give @p integrateddynamics:part_display_panel\{id:0,/
    );
    expect(output.warnings).toEqual([]);
    const stores = astToGiveCommands(CondensedToAST(program), {
      outputShape: "varstore",
    });
    expect(stores.lines).toHaveLength(2);
    expect(lineAt(stores.lines, 0)).toContain("variablestore{inventory:[");
    expect(lineAt(stores.lines, 1)).toContain("part_display_panel");
  });

  it("testTreatsDisplayMaterializeAndMaterializeDisplayAsSynonyms", () => {
    const inside = snbtOf("Display(Materialize(5))");
    const outside = snbtOf("Materialize(Display(5))");
    expect(inside).toEqual(outside);
    expect(inside.some((line) => line.includes("part_display_panel"))).toBe(
      true
    );
    expect(
      snbtOf("Display(Materialize(InventoryReader(0).inventoryCount(5)))")
    ).toEqual(
      snbtOf("Materialize(Display(InventoryReader(0).inventoryCount(5)))")
    );
  });

  it("testRefusesADisplayBuriedInACall", () => {
    expect(() => snbtOf("add(Display(1), 2)")).toThrow(
      /Display\(\.\.\.\) cannot be buried inside another expression/
    );
  });
});

describe("TestAstToGiveCommandsCard", () => {
  const CARD =
    '/give @p integrateddynamics:variable{_id:7,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;3,3]}';

  it("testUnwrapsAPasteIntoItsCardsAndNothingElse", () => {
    const lines = snbtOf(`Card(${CARD})`);
    expect(lines).toHaveLength(1);
    expect(cardAt(lines, 0)).toContain(
      'operatorName:"integrateddynamics:arithmetic_addition"'
    );
  });

  it("testKeepsTheIdsItArrivedWithUnderPreserve", () => {
    const lines = snbtOf(`Card(${CARD})`, { cardIds: "preserve" });
    expect(cardAt(lines, 0)).toContain("_id:7");
  });

  it("testRefusesAReaderWhichHoldsNoCard", () => {
    expect(() =>
      snbtOf("Card(/setblock 0 0 0 integrateddynamics:block_reader{})")
    ).toThrow();
  });
});

describe("TestAstToGiveCommandsReaders", () => {
  it("testGivesAReaderThePartItsAspectCardReads", () => {
    const lines = snbtOf("InventoryReader(2).inventoryCount");
    expect(lines).toHaveLength(2);
    expect(lineAt(lines, 0)).toBe(
      "/give @p integrateddynamics:part_inventory_reader{id:0,aspectProperties:{map:[]},enabled:1b,updateInterval:1}"
    );
    expect(lineAt(lines, 1)).toBe(
      '/give @p integrateddynamics:variable{_id:0,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_integer_inventory_count",partId:0}'
    );
  });

  it("testNumbersThePartFromTheInitialIdNotTheReadersOwn", () => {
    const lines = snbtOf("InventoryReader(2).inventoryCount", {
      startVariableId: 40,
    });
    expect(lineAt(lines, 0)).toContain("part_inventory_reader{id:40,");
    expect(lineAt(lines, 1)).toContain("partId:40}");
  });

  it("testGivesAReaderThatNamesNoPartIdOneOfItsOwn", () => {
    const lines = snbtOf("InventoryReader.inventoryCount");
    expect(lineAt(lines, 0)).toContain("part_inventory_reader{id:0,");
    expect(lineAt(lines, 1)).toContain("partId:0}");
  });

  it("testSharesOnePartBetweenEveryAspectOfAnUnnamedReader", () => {
    const lines = snbtOf(
      "numberAdd(InventoryReader.inventoryCount, InventoryReader.slotsFilled)"
    );
    expect(lines).toHaveLength(4);
    expect(
      lines.filter((line) => line.includes("part_inventory_reader"))
    ).toHaveLength(1);
    expect(lineAt(lines, 3)).toContain("variableIds:[I;0,1]");
  });

  it("testKeepsThePartIdsTheProgramWroteUnderPreserve", () => {
    const lines = snbtOf("InventoryReader(3).inventoryCount", {
      cardIds: "preserve",
    });
    expect(lineAt(lines, 0)).toContain("part_inventory_reader{id:3,");
    expect(lineAt(lines, 1)).toContain("partId:3}");
  });

  it("testNumbersAnAssignedPartIdAroundTheOnesTheProgramWrote", () => {
    const lines = snbtOf(
      "numberAdd(blockReader(1).block, InventoryReader.inventoryCount)",
      { cardIds: "preserve" }
    );
    expect(lineAt(lines, 0)).toContain("part_block_reader{id:1,");
    expect(lineAt(lines, 2)).toContain("part_inventory_reader{id:0,");
  });

  it("testWritesTheReadersSettingsBackAsThePartsAspectProperties", () => {
    const lines = snbtOf('fluidReader(2).fluidCapacity({"tankid":3})');
    expect(lineAt(lines, 0)).toBe(
      '/give @p integrateddynamics:part_fluid_reader{id:0,aspectProperties:{map:[{key:"integrateddynamics:read_integer_fluid_capacity",value:{map:[{key:"integrateddynamics:integer",label:"aspect.aspecttypes.integrateddynamics.integer.tankid",value:3}]}}]},enabled:1b,updateInterval:1}'
    );
  });

  it("testBakesAMaterializedReadersValueInAndDropsThePart", () => {
    const lines = snbtOf("Materialize(InventoryReader(0).inventoryCount(5))");
    expect(lines).toHaveLength(1);
    expect(cardAt(lines, 0)).toContain(
      'typeName:"integrateddynamics:integer",value:5'
    );
  });

  it("testStillWritesThePartForAReaderMaterializeCannotBake", () => {
    const lines = snbtOf("Materialize(InventoryReader(0).inventoryCount)");
    expect(lines).toHaveLength(2);
    expect(lineAt(lines, 0)).toContain("part_inventory_reader");
  });

  it("testPutsThePanelBeforeThePartItsCardReads", () => {
    const lines = snbtOf("Display(InventoryReader.inventoryCount)");
    expect(lines).toHaveLength(3);
    expect(lineAt(lines, 0)).toContain("part_display_panel{id:1,");
    expect(lineAt(lines, 1)).toContain("part_inventory_reader{id:0,");
    expect(lineAt(lines, 2)).toContain('_type:"integrateddynamics:aspect"');
    expect(lineAt(lines, 2)).toContain("partId:0}");
  });

  it("testAssignsAPartIdOfItsOwnWhenTheOneWrittenIsNotANumber", () => {
    const lines = snbtOf('InventoryReader("abc").inventoryCount');
    expect(lineAt(lines, 0)).toContain("part_inventory_reader{id:0,");
    expect(warningsOf('InventoryReader("abc").inventoryCount')).toEqual([
      'The part id "abc" is not a number, so a new part id was chosen for it',
    ]);
  });

  it("testPutsThePartsAfterTheStoreWhoseCardsReadThem", () => {
    const lines = snbtOf("InventoryReader.inventoryCount", {
      outputShape: "varstore",
    });
    expect(lineAt(lines, 0)).toContain("variablestore");
    expect(lineAt(lines, 1)).toContain("part_inventory_reader");
  });

  it("testPutsAPartAfterItsOwnStoreNotAfterEveryStore", () => {
    const elements = Array.from({ length: 45 }, (_, i) => i).join(",");
    const lines = snbtOf(`[InventoryReader.inventoryCount, ${elements}]`, {
      outputShape: "varstore",
    });
    expect(lines).toHaveLength(3);
    expect(lineAt(lines, 0)).toContain("variablestore");
    expect(lineAt(lines, 1)).toContain("part_inventory_reader");
    expect(lineAt(lines, 2)).toContain("variablestore");
  });
});

const writerNode = (
  over: Partial<TypeAST.Writer["value"]> = {}
): TypeAST.Writer => ({
  type: "Writer",
  value: {
    partType: "integrateddynamics:inventory_writer",
    inventory: [{ type: "Integer", value: "5" }],
    ...over,
  },
});

describe("TestAstToGiveCommandsSourceNodes", () => {
  it("testEmitsAWritersPartBareAndItsCardsSeparately", () => {
    const lines = astToGiveCommands(writerNode()).lines;
    expect(lines).toHaveLength(2);
    expect(lineAt(lines, 0)).toBe(
      "/give @p integrateddynamics:part_inventory_writer{id:0,aspectProperties:{map:[]},enabled:1b,updateInterval:1}"
    );
    expect(lineAt(lines, 1)).toBe(
      '/give @p integrateddynamics:variable{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}'
    );
  });

  it("testEmitsAnExporterAndAnImporterAsTheirOwnItems", () => {
    const exporter: TypeAST.Exporter = {
      type: "Exporter",
      value: { partType: "integratedtunnels:exporter_item", inventory: [] },
    };
    const importer: TypeAST.Importer = {
      type: "Importer",
      value: { partType: "integratedtunnels:importer_item", inventory: [] },
    };
    expect(lineAt(astToGiveCommands(exporter).lines, 0)).toMatch(
      /^\/give @p integratedtunnels:part_exporter_item\{id:0,/
    );
    expect(lineAt(astToGiveCommands(importer).lines, 0)).toMatch(
      /^\/give @p integratedtunnels:part_importer_item\{id:0,/
    );
  });

  it("testKeepsTheIdASourceNodeWroteUnderPreserveAndRenumbersItOtherwise", () => {
    const exporter: TypeAST.Exporter = {
      type: "Exporter",
      value: {
        partType: "integratedtunnels:exporter_item",
        id: "4",
        inventory: [],
      },
    };
    expect(
      lineAt(astToGiveCommands(exporter, { cardIds: "preserve" }).lines, 0)
    ).toContain("part_exporter_item{id:4,");
    expect(lineAt(astToGiveCommands(exporter).lines, 0)).toContain(
      "part_exporter_item{id:0,"
    );
  });

  it("testReportsAPartItCannotNameAnItemForAndDropsItsCards", () => {
    const output = astToGiveCommands(
      writerNode({ partType: "mymod:thing_writer" })
    );
    expect(output.lines).toEqual([]);
    expect(output.warnings).toEqual([
      "mymod:thing_writer is not a part this tool can emit as an item, so its cards were left out",
    ]);
  });

  it("testPutsThePartFirstAndThePartsItsCardsReadNext", () => {
    const lines = astToGiveCommands(
      writerNode({
        inventory: [CondensedToAST("InventoryReader.inventoryCount")],
      })
    ).lines;
    expect(lines).toHaveLength(3);
    expect(lineAt(lines, 0)).toContain("part_inventory_writer{id:1,");
    expect(lineAt(lines, 1)).toContain("part_inventory_reader{id:0,");
    expect(lineAt(lines, 2)).toContain("aspectName:");
  });

  it("testNumbersAnAssignedPartIdAroundTheOnesTheSourceNodesWrote", () => {
    const lines = astToGiveCommands(
      writerNode({
        id: "5",
        inventory: [CondensedToAST("InventoryReader.inventoryCount")],
      }),
      { cardIds: "preserve", startVariableId: 5 }
    ).lines;
    expect(lineAt(lines, 0)).toContain("part_inventory_writer{id:5,");
    expect(lineAt(lines, 1)).toContain("part_inventory_reader{id:6,");
    expect(lineAt(lines, 2)).toContain("partId:6}");
  });

  it("testWritesTheSourceNodesSettingsBackAsPartFields", () => {
    const lines = astToGiveCommands(
      writerNode({ settings: { channel: 2, priority: 5, enabled: false } })
    ).lines;
    expect(lineAt(lines, 0)).toMatch(
      /^\/give @p integrateddynamics:part_inventory_writer\{id:0,aspectProperties:\{map:\[\]\},enabled:0b,channel:2,priority:5,updateInterval:1\}/
    );
  });

  it("testWritesAVariableStoresCardsInItsSlots", () => {
    const store: TypeAST.VarStore = {
      type: "VarStore",
      value: { cards: [{ type: "Integer", value: "5" }] },
    };
    const lines = astToGiveCommands(store).lines;
    expect(lines).toHaveLength(1);
    expect(lineAt(lines, 0)).toBe(
      '/give @p integrateddynamics:variablestore{inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}}]}'
    );
  });

  it("testEmitsAnAuthoredDisplayPanelTheWayDisplayDoes", () => {
    const panel: TypeAST.DisplayPanel = {
      type: "DisplayPanel",
      value: { id: "3", inventory: [{ type: "Integer", value: "5" }] },
    };
    const lines = astToGiveCommands(panel, { cardIds: "preserve" }).lines;
    expect(lineAt(lines, 0)).toMatch(
      /^\/give @p integrateddynamics:part_display_panel\{id:3,aspectProperties:\{map:\[\]\},enabled:1b,updateInterval:1\}/
    );
  });

  it("testKeepsAWriterWhenMaterializeIsOnBecauseItHasSideEffects", () => {
    const lines = astToGiveCommands(writerNode(), { materialize: true }).lines;
    expect(lines).toHaveLength(2);
    expect(lineAt(lines, 0)).toContain("part_inventory_writer");
  });

  it("testEmitsAWriterACompressedPasteBroughtBack", () => {
    const decoded = CompressedToAST(ASTToCompressed(writerNode({ id: "2" })));
    expect(decoded.type).toBe("Writer");
    const lines = astToGiveCommands(decoded, { cardIds: "preserve" }).lines;
    expect(lineAt(lines, 0)).toContain("part_inventory_writer{id:2,");
  });

  it("testReportsTwoPartsWrittenWithOneIdUnderPreserve", () => {
    const output = astToGiveCommands(
      writerNode({
        id: "5",
        inventory: [CondensedToAST("InventoryReader(5).inventoryCount")],
      }),
      { cardIds: "preserve" }
    );
    expect(output.warnings).toEqual([
      "The part id 5 is used by two parts, and parts share one id space, so only one of them can be placed",
    ]);
  });
});

describe("TestAstToGiveCommandsPartInventoryRule", () => {
  it("testNeverPutsInventoryOnAPartItemButKeepsItOnAVariableStore", () => {
    const programs: [string, Record<string, unknown>][] = [
      ["Display(add(1, 2))", {}],
      ["Display(add(1, 2))", { outputShape: "varstore" }],
      ["Display(InventoryReader.inventoryCount)", {}],
      ["InventoryReader.inventoryCount", {}],
      ["InventoryReader.inventoryCount", { outputShape: "varstore" }],
      ["blockReader(1).block", {}],
      ["add(1, 2); Display(add(1, 2))", { outputShape: "varstore" }],
    ];
    const exporter: TypeAST.Exporter = {
      type: "Exporter",
      value: { partType: "integratedtunnels:exporter_item", inventory: [] },
    };
    const importer: TypeAST.Importer = {
      type: "Importer",
      value: { partType: "integratedtunnels:importer_item", inventory: [] },
    };
    const store: TypeAST.VarStore = {
      type: "VarStore",
      value: { cards: [{ type: "Integer", value: "5" }] },
    };

    const given = [
      ...programs.map(([program, options]) => snbtOf(program, options)),
      astToGiveCommands(writerNode()).lines,
      astToGiveCommands(exporter).lines,
      astToGiveCommands(importer).lines,
      astToGiveCommands(store).lines,
    ];
    const lines = given.flat();
    const partLines = lines.filter((line) => line.includes(":part_"));
    const storeLines = lines.filter((line) => line.includes("variablestore"));

    expect(partLines.length).toBeGreaterThan(0);
    expect(storeLines.length).toBeGreaterThan(0);
    for (const line of partLines) expect(line).not.toContain("inventory:");
    for (const line of storeLines) expect(line).toContain("inventory:[");
  });
});

describe("TestAstToGiveCommandsShapes", () => {
  it("testFillsVariableStores45CardsAtATime", () => {
    const expression = `[${Array.from({ length: 46 }, (_, i) => i).join(",")}]`;
    const lines = snbtOf(expression, { outputShape: "varstore" });
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("integrateddynamics:variablestore");
    expect(lines[1]).toContain("integrateddynamics:variablestore");
  });

  it("testMarksACommandThatWillNotFitInChat", () => {
    const long = `"${"x".repeat(400)}"`;
    const lines = snbtOf(long);
    expect(lines[0]).toContain("-- Warning:");
    expect(lines[0]).toContain("chars is too long for chat");
  });

  it("testWritesANestedListInsideItsOuterProxiesPayload", () => {
    expect(cardAt(snbtOf("[[1], [2]]"), 4).replace(/ -- Warning:.*$/, "")).toBe(
      '{_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:list",values:[{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[1]}},{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:integer",values:[2]}}]}}}'
    );
  });

  it("testIndentsTheNbtInReadableLayout", () => {
    const lines = snbtOf("add(1, 2)", { layout: "readable", indentation: 2 });
    expect(lines[0]).toContain("\n");
  });
});
