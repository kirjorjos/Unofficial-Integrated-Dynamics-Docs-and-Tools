import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import {
  getCardReferences,
  parseSnbtInput,
  splitInputBlobs,
} from "lib/transformers/inputParser";
import { astContentKey } from "lib/transformers/NetworkCards";

const VARIABLE_STORE = `/setblock -7 -60 -1 integrateddynamics:variablestore[facing=west]{connected:{map:[]},inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:4,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:operator",values:["integrateddynamics:operator_apply"]}},variableIds:[I;5,5]}},{Count:1b,Slot:1b,id:"integrateddynamics:variable",tag:{_id:5,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:operator_apply"}},{Count:1b,Slot:2b,id:"integrateddynamics:variable",tag:{_id:16,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:2}},{Count:1b,Slot:3b,id:"integrateddynamics:variable",tag:{_id:20,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_concat",variableIds:[I;16,17]}}]}`;
const CABLE = `/setblock -7 -59 -1 integrateddynamics:cable[waterlogged=false]{forceLightCheckAtClient:0b,partContainer:{parts:[{__partType:"integrateddynamics:block_reader",__side:"west",aspectProperties:{map:[]},channel:0,enabled:1b,id:18,inventoriesNamed:[],maxOffset:0,offsetVariablesSlotMessages:{},offsetX:0,offsetY:0,offsetZ:0,priority:0,updateInterval:1},{__partType:"integrateddynamics:display_panel",__side:"east",aspectProperties:{map:[]},channel:0,displayValue:{serializer:"integrateddynamics:combined.pipe",value:{operators:[{v:"integrateddynamics:list_length"}]}},displayValueType:"integrateddynamics:operator",enabled:1b,facingRotation:2,id:1,inventoriesNamed:[],inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:57,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_pipe",variableIds:[I;56,55]}}],maxOffset:0,updateInterval:1}]},realCable:1b}`;
const PLAYER = `{Inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variablestore"},{Count:1b,Slot:1b,id:"integrateddynamics:part_audio_reader"},{Count:1b,Slot:9b,id:"integrateddynamics:variable",tag:{_id:22,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;16,17]}},{Count:24b,Slot:16b,id:"integrateddynamics:variable"},{Count:1b,Slot:17b,id:"integrateddynamics:variable",tag:{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_any_network_value",partId:15}}],Pos:[-9.4d,-60.0d,4.1d],UUID:[I;1,2]} `;
const DROPPED_ITEM = `{Item:{Count:1b,id:"integrateddynamics:variable",tag:{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_any_network_value",partId:15}},Pos:[-8.6d,-60.0d,6.2d],UUID:[I;3,4]}`;
const PROXY_DATA_GET = `{errors:{collection:[]},id:"integrateddynamics:proxy",inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:22,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;16,17]}}],proxyId:0,x:-7,y:-60,z:3}`;
const CABLE_FLUID = `/setblock -7 -59 2 integrateddynamics:cable[waterlogged=false]{partContainer:{parts:[{__partType:"integrateddynamics:fluid_reader",__side:"west",aspectProperties:{map:[{key:"integrateddynamics:read_integer_fluid_capacity",value:{map:[{key:"integrateddynamics:integer",label:"aspect.aspecttypes.integrateddynamics.integer.tankid",value:3}]}}]},channel:0,enabled:1b,id:22,inventoriesNamed:[],maxOffset:0,priority:0,updateInterval:1}]},realCable:1b}`;
const CHEST = `/setblock -7 -60 -4 minecraft:chest[facing=north,type=single,waterlogged=false]{Items:[{Count:63b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:22,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:list_lazybuilt",variableIds:[I;16,17]}},{Count:1b,Slot:26b,id:"integrateddynamics:variable",tag:{_id:21,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_filter",typeName:"integrateddynamics:integer",value:0,variableIds:[I;33,22]}}]}`;

const ids = (cards: { id?: string }[]): (string | undefined)[] =>
  cards.map((card) => card.id);

describe("TestSplitInputBlobs", () => {
  it("testSeparatesBlobsOnBlankLines", () => {
    expect(splitInputBlobs("a\n\nb\n")).toEqual(["a", "b"]);
    expect(splitInputBlobs("  \n\n  ")).toEqual([]);
  });

  it("testKeepsAReadableMultilineBlobInOnePiece", () => {
    const readable = `/give @p integrateddynamics:variablestore{\n  inventory: [\n    {\n      Count: 1b,\n      id: "integrateddynamics:variable"\n    }\n  ]\n}\n\n/give @p integrateddynamics:variable{_id:1}`;
    const blobs = splitInputBlobs(readable);
    expect(blobs).toHaveLength(2);
    expect(blobs[0]).toContain("Count: 1b");
    expect(blobs[1]).toBe("/give @p integrateddynamics:variable{_id:1}");
  });

  it("testTakesOneLinePerBlobAndIsNotFooledByBracesInStrings", () => {
    expect(splitInputBlobs('{a:"}",b:"[I;1]"}\n{c:1b}')).toEqual([
      '{a:"}",b:"[I;1]"}',
      "{c:1b}",
    ]);
  });
});

describe("TestParseSnbtInputEnvelopes", () => {
  it("testReadsASetblocksCoordinatesIdAndState", () => {
    const { sources } = parseSnbtInput(VARIABLE_STORE);
    expect(sources[0]!.envelope).toMatchObject({
      kind: "setblock",
      coordinates: "-7 -60 -1",
      id: "integrateddynamics:variablestore",
      state: "facing=west",
      prefix:
        "/setblock -7 -60 -1 integrateddynamics:variablestore[facing=west]",
    });
  });

  it("testReadsAGiveOfTheToolsOwnOutput", () => {
    const { sources } = parseSnbtInput(
      '/give @p integrateddynamics:variable{_id:4,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}'
    );
    expect(sources[0]!.envelope).toMatchObject({
      kind: "give",
      id: "integrateddynamics:variable",
      prefix: "/give @p integrateddynamics:variable",
    });
    expect(ids(sources[0]!.cards)).toEqual(["4"]);
  });

  it("testReadsABareCompoundAndIdentifiesItFromItsIdAndCoordinates", () => {
    const { sources } = parseSnbtInput(PROXY_DATA_GET);
    expect(sources[0]!.envelope).toMatchObject({
      kind: "block",
      id: "integrateddynamics:proxy",
      prefix: "",
    });
  });

  it("testReadsAnEntityBlob", () => {
    const { sources, cards } = parseSnbtInput(DROPPED_ITEM, {
      missingParts: "warn",
    });
    expect(sources[0]!.envelope.kind).toBe("entity");
    expect(ids(cards)).toEqual(["90"]);
  });

  it("testStripsTheThreeDataGetWordingsAndKeepsThemForRestore", () => {
    const block = parseSnbtInput(
      `-7, -60, 3 has the following block data: ${PROXY_DATA_GET}`,
      { missingParts: "warn" }
    );
    expect(block.sources[0]!.envelope).toMatchObject({
      kind: "block",
      prose: "-7, -60, 3 has the following block data:",
      id: "integrateddynamics:proxy",
    });

    const entity = parseSnbtInput(
      `Notch has the following entity data: ${DROPPED_ITEM}`,
      { missingParts: "warn" }
    );
    expect(entity.sources[0]!.envelope.kind).toBe("entity");
    expect(entity.sources[0]!.envelope.prose).toBe(
      "Notch has the following entity data:"
    );
    expect(ids(entity.cards)).toEqual(["90"]);

    expect(() =>
      parseSnbtInput("minecraft:foo has the following contents: {Health:20.0f}")
    ).toThrow(/no variable cards or parts were found in it/);
  });

  it("testWarnsAboutABlobThatIsNotAnEnvelopeAndAboutInvalidSnbt", () => {
    const { warnings, cards } = parseSnbtInput(
      `some prose\n\n{a:}\n\n${DROPPED_ITEM}`,
      { missingParts: "warn" }
    );
    expect(warnings.join("\n")).toContain("Blob 1: not a /setblock");
    expect(warnings.join("\n")).toContain("Blob 2: not valid SNBT");
    expect(ids(cards)).toEqual(["90"]);
  });

  it("testRefusesInputWithNoCardsKeepingItsWarnings", () => {
    expect(() => parseSnbtInput("")).toThrow(/No variable cards were found/);
    expect(() => parseSnbtInput("{Health:20.0f}")).toThrow(
      /No variable cards were found[\s\S]*no variable cards or parts were found/
    );
  });
});

describe("TestParseSnbtInputSources", () => {
  it("testReadsEveryCardOfAVariablestoreInventoryInPasteOrder", () => {
    const { cards } = parseSnbtInput(VARIABLE_STORE);
    expect(ids(cards)).toEqual(["4", "5", "16", "20"]);
  });

  it("testReadsAValuetypeCardsCachedValueNotThePairBesideIt", () => {
    const { cards } = parseSnbtInput(VARIABLE_STORE);
    const card = cards.find((entry) => entry.id === "4")!;
    expect(card.application).toBe(false);
    expect(card.cached).toBe(true);
    expect(card.ast).toEqual({
      type: "List",
      value: [{ type: "Operator", opName: "OPERATOR_APPLY" }],
    });
  });

  it("testResolvesAnOperatorCardToItsOperatorCall", () => {
    const { cards } = parseSnbtInput(
      '{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:integer",value:0,variableIds:[I;13,14]}\n\n{_id:14,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}\n\n{_id:13,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}',
      { missingParts: "warn" }
    );
    const card = cards.find((entry) => entry.id === "15")!;
    expect(card.application).toBe(true);
    expect(card.cached).toBe(true);
    expect(card.ast).toEqual({
      type: "Curry",
      base: { type: "Operator", opName: "OPERATOR_APPLY" },
      args: [
        { type: "Variable", name: "@13" },
        { type: "Variable", name: "@14" },
      ],
    });
  });

  it("testReadsACablesPartsTheirIdsAndTheCardAPanelHolds", () => {
    const { parts, cards } = parseSnbtInput(CABLE);
    expect(parts.map((part) => [part.partId, part.partType])).toEqual([
      ["18", "integrateddynamics:block_reader"],
      ["1", "integrateddynamics:display_panel"],
    ]);
    expect(parts.map((part) => part.family)).toEqual(["reader", "panel"]);
    expect(parts[0]!.cards).toEqual([]);
    expect(parts[1]!.cards.map((card) => card.id)).toEqual(["57"]);
    expect(ids(cards)).toEqual(["57"]);
  });

  it("testReadsAPlayersInventoryPartItemsAndAspectCard", () => {
    const { cards, parts } = parseSnbtInput(PLAYER, { missingParts: "warn" });
    expect(ids(cards)).toEqual(["22", "90"]);
    expect(
      parts.map((part) => [part.itemId, part.partType, part.family])
    ).toEqual([
      [
        "integrateddynamics:part_audio_reader",
        "integrateddynamics:audio_reader",
        "reader",
      ],
    ]);
    expect(cards.some((card) => card.id === undefined)).toBe(false);
  });

  it("testKeepsAnItemstackValuesNestedCardOutOfTheCards", () => {
    const { cards } = parseSnbtInput(
      `{inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:37,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:itemstack",value:{Count:1,id:"integrateddynamics:variable",tag:{_id:36,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:general_identity"}}}}]}`,
      { missingParts: "warn" }
    );
    expect(ids(cards)).toEqual(["37"]);
  });

  it("testDecodesAnAspectCardFromAPartPastedElsewhere", () => {
    const aspect = `{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_integer_fluid_capacity",partId:22}`;
    const parsed = parseSnbtInput(`${CABLE_FLUID}\n\n${aspect}`);
    expect(parsed.missingPartIds).toEqual([]);
    expect(parsed.warnings).toEqual([]);
    expect(parsed.cards.find((card) => card.id === "90")!.ast).toEqual({
      type: "Reader",
      value: {
        reader: "FluidReader",
        aspect: "INTEGER_CAPACITY",
        partId: "22",
        settings: { tankid: 3 },
      },
    });
  });

  it("testReportsAnAspectWhosePartIsPresentButIsNotThatReader", () => {
    const aspect = `{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_integer_fluid_capacity",partId:18}`;
    const parsed = parseSnbtInput(`${CABLE}\n\n${aspect}`, {
      missingParts: "warn",
    });
    expect(parsed.cards.find((card) => card.id === "90")!.ast).toBeUndefined();
    expect(parsed.warnings.join("\n")).toContain(
      "is a FluidReader aspect, but part 18 is a BlockReader"
    );
  });

  it("testReportsAnAspectNameTheToolDoesNotKnow", () => {
    const aspect = `{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_nonsense",partId:18}`;
    const parsed = parseSnbtInput(`${CABLE}\n\n${aspect}`, {
      missingParts: "warn",
    });
    expect(parsed.cards.find((card) => card.id === "90")!.ast).toBeUndefined();
    expect(parsed.warnings.join("\n")).toContain(
      '"integrateddynamics:read_nonsense" is not an aspect this tool knows'
    );
  });

  it("testReadsAChestsItems", () => {
    const { cards } = parseSnbtInput(CHEST);
    expect(ids(cards)).toEqual(["22", "21"]);
  });
});

describe("TestParseSnbtInputDedupeAndOrder", () => {
  it("testCollapsesTheSameCardPastedFromSeveralSources", () => {
    const { cards, warnings } = parseSnbtInput(
      `${CHEST}\n\n${PROXY_DATA_GET}\n\n${PLAYER}`,
      { missingParts: "warn" }
    );
    expect(ids(cards)).toEqual(["22", "21", "90"]);
    expect(warnings.join("\n")).toContain(
      "2 duplicate cards were collapsed onto an identical definition"
    );
  });

  const RECIPE_CARD = `{_id:77,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:recipe",value:{input:{"minecraft:itemstack":[]},inputReusable:{"minecraft:itemstack":[B;0B]},output:{"minecraft:itemstack":[]}},variableIds:[I;55,14]}`;
  const FLUID_CARD = `{_id:77,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:fluidstack",value:{Amount:0,FluidName:"minecraft:empty"},variableIds:[I;55,14]}`;

  it("testTreatsAValuetypeCardsBodyAsItsDefinitionSoTwoCopiesConflict", () => {
    expect(() =>
      parseSnbtInput(`${RECIPE_CARD}\n\n${FLUID_CARD}`, {
        missingParts: "warn",
      })
    ).toThrow(/Variable _id:77 is defined twice with different values/);
  });

  it("testKeepsTheFirstAndWarnsWhenConflictsAreSetToWarn", () => {
    const { cards, warnings } = parseSnbtInput(
      `${RECIPE_CARD}\n\n${FLUID_CARD}`,
      { missingParts: "warn", conflicts: "warn" }
    );
    expect(ids(cards)).toEqual(["77"]);
    expect(cards[0]!.typeName).toBe("integrateddynamics:recipe");
    expect(warnings.join("\n")).toContain(
      "Variable _id:77 is defined twice with different values. The first was kept"
    );
  });

  it("testIgnoresTheFieldPairTheFacadeDoesNotOwnWhenComparingCards", () => {
    const one = `{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:integer",value:1,variableIds:[I;13,14]}`;
    const two = `{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:nbt",value:{v:2},variableIds:[I;13,14]}`;
    const { cards, warnings } = parseSnbtInput(`${one}\n\n${two}`, {
      missingParts: "warn",
    });
    expect(ids(cards)).toEqual(["15"]);
    expect(warnings.join("\n")).toContain(
      "1 duplicate card was collapsed onto an identical definition"
    );
  });

  it("testRefusesTwoDifferentDefinitionsOfOneId", () => {
    const one = `{_id:9,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:nbt",value:{v:2}}`;
    const two = `{_id:9,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:nbt",value:{v:3}}`;
    expect(() => parseSnbtInput(`${one}\n\n${two}`)).toThrow(
      /Variable _id:9 is defined twice with different values/
    );
  });

  it("testCollapsesThePartsOfABlockPastedTwiceWithoutAWord", () => {
    const { parts, warnings } = parseSnbtInput(`${CABLE}\n\n${CABLE}`, {
      missingParts: "warn",
    });
    expect(parts.map((part) => part.partId).filter(Boolean)).toEqual([
      "18",
      "1",
    ]);
    expect(warnings.join("\n")).not.toContain("Part 18");
  });

  it("testRefusesTwoDifferentPartsUnderOneId", () => {
    const changed = CABLE.replace(
      "offsetZ:0,priority:0,updateInterval:1}",
      "offsetZ:0,priority:3,updateInterval:1}"
    );
    expect(() => parseSnbtInput(`${CABLE}\n\n${changed}`)).toThrow(
      /Part 18 is present twice with different contents/
    );
  });

  it("testKeepsTheFirstPartAndWarnsWhenConflictsAreSetToWarn", () => {
    const changed = CABLE.replace(
      "offsetZ:0,priority:0,updateInterval:1}",
      "offsetZ:0,priority:3,updateInterval:1}"
    );
    const { parts, warnings } = parseSnbtInput(`${CABLE}\n\n${changed}`, {
      missingParts: "warn",
      conflicts: "warn",
    });
    expect(parts.map((part) => part.partId).filter(Boolean)).toEqual([
      "18",
      "1",
    ]);
    expect(warnings.join("\n")).toContain(
      "Part 18 is present twice with different contents. The first was kept"
    );
  });

  it("testIgnoresTheFieldsAPartDoesNotKeepWhenMatchingTwoPastes", () => {
    const moved = CABLE.replace(
      "offsetX:0,offsetY:0,offsetZ:0",
      "offsetX:5,offsetY:0,offsetZ:0"
    );
    const { parts } = parseSnbtInput(`${CABLE}\n\n${moved}`, {
      missingParts: "warn",
    });
    expect(parts.map((part) => part.partId).filter(Boolean)).toEqual([
      "18",
      "1",
    ]);
  });

  it("testPutsACardAfterTheCardsItRefersTo", () => {
    const { cards } = parseSnbtInput(
      '{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;13,14]}\n\n{_id:14,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}\n\n{_id:13,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:operator",value:"integrateddynamics:arithmetic_addition"}',
      { missingParts: "warn" }
    );
    expect(ids(cards)).toEqual(["13", "14", "15"]);
    expect(getCardReferences(cards[2]!)).toEqual(["13", "14"]);
  });

  it("testWarnsAboutAReferenceNotInThePaste", () => {
    const { warnings } = parseSnbtInput(
      '{_id:15,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator_apply",variableIds:[I;13,14]}',
      { missingParts: "warn" }
    );
    expect(warnings.join("\n")).toContain(
      "Card _id:15 refers to variable 13, which is not in the paste"
    );
  });
});

describe("TestParseSnbtInputStrictness", () => {
  it("testErrorsOnAPartReferenceThePasteDoesNotContainByDefault", () => {
    expect(() => parseSnbtInput(`${CABLE}\n\n${PLAYER}`)).toThrow(
      /refers to part 15, which is not in it/
    );
  });

  it("testReportsTheMissingPartInsteadWhenAskedToWarn", () => {
    const parsed = parseSnbtInput(`${CABLE}\n\n${PLAYER}`, {
      missingParts: "warn",
    });
    expect(parsed.missingPartIds).toEqual(["15"]);
    expect(parsed.warnings.join("\n")).toContain(
      "refers to part 15, which is not in it"
    );
  });

  it("testAcceptsAPasteWhoseReferencedPartsAreAllPresent", () => {
    const parsed = parseSnbtInput(CABLE);
    expect(parsed.missingPartIds).toEqual([]);
    expect(parsed.parts.map((part) => part.partId)).toEqual(["18", "1"]);
  });

  it("testReportsACardItCannotDecodeYet", () => {
    const parsed = parseSnbtInput(PLAYER, { missingParts: "warn" });
    expect(parsed.warnings.join("\n")).toContain(
      'Card _id:90: reads aspect "integrateddynamics:read_any_network_value" from part 15'
    );
    const aspect = parsed.cards.find((card) => card.id === "90")!;
    expect(aspect.ast).toBeUndefined();
    expect(aspect.aspectName).toBe("integrateddynamics:read_any_network_value");
  });

  it("testKeepsTheSourceTagOfEveryCardForReEmission", () => {
    const { cards } = parseSnbtInput(VARIABLE_STORE);
    const card = cards.find((entry) => entry.id === "20")!;
    expect(card.tag.get(new iString("_id")).toJSON()).toBe(20);
    expect(astContentKey(card.ast!)).toContain("LIST_CONCAT");
  });
});
