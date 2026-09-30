import {
  SNBTToTag,
  SNBTToTagPrefix,
  SNBTToCompoundTag,
  TagToSNBT,
} from "lib/transformers/SNBT";
import { SNBTToAST, ASTtoSNBT } from "lib/transformers/NBT";
import { StructuralParseError } from "lib/transformers/parseErrors";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";

const typeOf = (text: string): number => SNBTToTag(text).getType();

const survivesRoundTrip = (text: string): string => {
  const original = SNBTToTag(text);
  const serialized = TagToSNBT(original);
  const reparsed = SNBTToTag(serialized);
  expect(reparsed.equals(original).valueOf()).toBe(true);
  expect(TagToSNBT(reparsed)).toBe(serialized);
  return serialized;
};

describe("TestSNBTParseTagTypes", () => {
  it.each([
    ["1b", Tag.TAG_BYTE],
    ["1B", Tag.TAG_BYTE],
    ["-1b", Tag.TAG_BYTE],
    ["0b", Tag.TAG_BYTE],
    ["1s", Tag.TAG_SHORT],
    ["1S", Tag.TAG_SHORT],
    ["-20s", Tag.TAG_SHORT],
    ["1", Tag.TAG_INT],
    ["-1", Tag.TAG_INT],
    ["+1", Tag.TAG_INT],
    ["0", Tag.TAG_INT],
    ["-300", Tag.TAG_INT],
    ["1l", Tag.TAG_LONG],
    ["1L", Tag.TAG_LONG],
    ["1.5f", Tag.TAG_FLOAT],
    ["1F", Tag.TAG_FLOAT],
    ["1.5F", Tag.TAG_FLOAT],
    ["20.0f", Tag.TAG_FLOAT],
    ["1d", Tag.TAG_DOUBLE],
    ["1.5d", Tag.TAG_DOUBLE],
    ["1.5D", Tag.TAG_DOUBLE],
    ["0.0d", Tag.TAG_DOUBLE],
    ["1.0", Tag.TAG_DOUBLE],
    ["1.", Tag.TAG_DOUBLE],
    [".5", Tag.TAG_DOUBLE],
    ["1e5", Tag.TAG_DOUBLE],
    ["1E5", Tag.TAG_DOUBLE],
    ["1e-5", Tag.TAG_DOUBLE],
    ["1.5e+3", Tag.TAG_DOUBLE],
    ["4.5718453965657714E-5d", Tag.TAG_DOUBLE],
    ["-0.0784000015258789d", Tag.TAG_DOUBLE],
    ["true", Tag.TAG_BYTE],
    ["false", Tag.TAG_BYTE],
    ["TRUE", Tag.TAG_STRING],
    ["True", Tag.TAG_STRING],
    ["1i", Tag.TAG_STRING],
    ["1x", Tag.TAG_STRING],
    ["abc", Tag.TAG_STRING],
  ] as Array<[string, number]>)("parses %j as tag type %i", (text, type) => {
    expect(typeOf(text)).toBe(type);
  });

  it("testQuotedNumbersAreStrings", () => {
    for (const text of ['"1"', "'1'", '"true"', "'false'", '"1b"']) {
      expect(typeOf(text)).toBe(Tag.TAG_STRING);
      expect((SNBTToTag(text) as StringTag).valueOf().valueOf()).toBe(
        text.slice(1, -1)
      );
    }
  });

  it("testNumericValues", () => {
    expect(SNBTToTag("-300").toJSON()).toBe(-300);
    expect(SNBTToTag("+1").toJSON()).toBe(1);
    expect(SNBTToTag("1.5e+3").toJSON()).toBe(1500);
    expect(SNBTToTag("1e-5").toJSON()).toBe(0.00001);
    expect(SNBTToTag("1L").valueOf().toString()).toBe("1");
    expect(SNBTToTag("9007199254740993L").valueOf().toString()).toBe(
      "9007199254740993"
    );
    expect(SNBTToTag("true").toJSON()).toBe(1);
    expect(SNBTToTag("false").toJSON()).toBe(0);
  });
});

describe("TestSNBTParseContainers", () => {
  it.each([
    ["{}", Tag.TAG_COMPOUND],
    ["{a:1}", Tag.TAG_COMPOUND],
    ["{a:1,b:2}", Tag.TAG_COMPOUND],
    ["{a:1,}", Tag.TAG_COMPOUND],
    ["{a:{b:{c:1}}}", Tag.TAG_COMPOUND],
    ['{"a b":1}', Tag.TAG_COMPOUND],
    ['{"integrateddynamics:x":1b}', Tag.TAG_COMPOUND],
  ] as Array<[string, number]>)("parses compound %j", (text, type) => {
    expect(typeOf(text)).toBe(type);
  });

  it.each([
    ["[]", Tag.TAG_LIST],
    ["[1]", Tag.TAG_LIST],
    ["[1,2]", Tag.TAG_LIST],
    ["[1,]", Tag.TAG_LIST],
    ['["a","b"]', Tag.TAG_LIST],
    ["[[1],[2]]", Tag.TAG_LIST],
    ["[{a:1},{a:2}]", Tag.TAG_LIST],
    ["[B, C]", Tag.TAG_LIST],
  ] as Array<[string, number]>)("parses list %j", (text, type) => {
    expect(typeOf(text)).toBe(type);
  });

  it.each([
    ["[B;]", Tag.TAG_BYTE_ARRAY],
    ["[B;0B,30B]", Tag.TAG_BYTE_ARRAY],
    ["[I;]", Tag.TAG_INT_ARRAY],
    ["[I;0,-300]", Tag.TAG_INT_ARRAY],
    ["[I;5,5]", Tag.TAG_INT_ARRAY],
    ["[L;]", Tag.TAG_LONG_ARRAY],
    ["[L;0L,240L]", Tag.TAG_LONG_ARRAY],
  ] as Array<[string, number]>)("parses array %j", (text, type) => {
    expect(typeOf(text)).toBe(type);
  });

  it("testArrayContents", () => {
    expect(SNBTToTag("[B;0B,30B]").toJSON()).toEqual([0, 30]);
    expect(SNBTToTag("[I;0,-300]").toJSON()).toEqual([0, -300]);
    expect(SNBTToTag("[L;0L,240L]").toJSON()).toEqual([0, 240]);
    expect(SNBTToTag("[B;]").toJSON()).toEqual([]);
    expect(SNBTToTag("[]").toJSON()).toEqual([]);
    expect(SNBTToTag("{}").toJSON()).toEqual({});
  });

  it("testNestedListOfCompounds", () => {
    const tag = SNBTToTag('[{"a":1b},{"a":2b}]') as ListTag;
    expect(tag.size().toJSNumber()).toBe(2);
    const first = tag.get(new Integer(0)) as CompoundTag;
    expect(first.get(new iString("a")).toJSON()).toBe(1);
    expect(tag.toJSON()).toEqual([{ a: 1 }, { a: 2 }]);
  });

  it("testWhitespaceIsInsignificant", () => {
    const spaced = SNBTToTag(
      "{\n  a: 1b,\n  b: [ 1 , 2 ],\n  c: { d: 'x' }\n}"
    ) as CompoundTag;
    expect(TagToSNBT(spaced)).toBe('{a:1b,b:[1,2],c:{d:"x"}}');
  });

  it("testKeysAreNotChoppedAtTheColon", () => {
    const tag = SNBTToTag(
      '{"integrateddynamics:infoBookSpawned":1b}'
    ) as CompoundTag;
    expect(
      tag
        .getAllKeys()
        .valueOf()
        .map((key) => key.valueOf())
    ).toEqual(["integrateddynamics:infoBookSpawned"]);
  });
});

describe("TestSNBTParseStrings", () => {
  it.each([
    ['"abc"', "abc"],
    ["'abc'", "abc"],
    ['""', ""],
    ["''", ""],
    ['"a\\"b"', 'a"b'],
    ["'a\\'b'", "a'b"],
    ['"a\\\\b"', "a\\b"],
    ['"a\\nb"', "anb"],
    ['"it\'s"', "it's"],
    ["'say \"hi\"'", 'say "hi"'],
    ['"integrateddynamics:variable"', "integrateddynamics:variable"],
    ['"minecraft:air"', "minecraft:air"],
  ] as Array<[string, string]>)("parses %j as %j", (text, expected) => {
    expect((SNBTToTag(text) as StringTag).valueOf().valueOf()).toBe(expected);
  });
});

describe("TestSNBTParseLeniencies", () => {
  it("testLeadingZerosParseAsNumbers", () => {
    expect(typeOf("007")).toBe(Tag.TAG_INT);
    expect(SNBTToTag("007").toJSON()).toBe(7);
    expect(typeOf("0b")).toBe(Tag.TAG_BYTE);
  });

  it("testTrailingCommasEverywhere", () => {
    expect(TagToSNBT(SNBTToTag("{a:1,}"))).toBe("{a:1}");
    expect(TagToSNBT(SNBTToTag("[1,]"))).toBe("[1]");
    expect(TagToSNBT(SNBTToTag("[I;1,]"))).toBe("[I;1]");
    expect(TagToSNBT(SNBTToTag("{a:[1,2,],b:{c:1,},}"))).toBe(
      "{a:[1,2],b:{c:1}}"
    );
  });

  it("testMixedTypeListsAreAccepted", () => {
    expect(TagToSNBT(SNBTToTag('[1,"a",1b]'))).toBe('[1,"a",1b]');
  });

  it("testOutOfRangeNumbersFallBackToStrings", () => {
    expect(typeOf("2147483648")).toBe(Tag.TAG_STRING);
    expect(SNBTToTag("99999999999999999999999")).toBeInstanceOf(StringTag);
    expect(SNBTToTag("99999999999999999999999L")).toBeInstanceOf(StringTag);
    expect(SNBTToTag("2147483648").toJSON()).toBe("2147483648");
  });
});

describe("TestSNBTParseErrors", () => {
  it.each([
    "",
    "   ",
    "{",
    "{a",
    "{a:",
    "{a:1",
    "{a 1}",
    "{a::1}",
    "[",
    "[1",
    "[1,",
    '"abc',
    "'abc",
    '"abc\\',
    "1 2",
    "{} {}",
    "minecraft:stone",
    "{id:minecraft:stone}",
    "[I;1b]",
    "[B;1]",
    "[L;1]",
    "[I;1.5]",
  ])("rejects %j", (text) => {
    expect(() => SNBTToTag(text)).toThrow(StructuralParseError);
  });

  it("testErrorReportsLineAndColumn", () => {
    let message = "";
    try {
      SNBTToTag("{\n  a: 1b,\n  b: ,\n}");
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain("line 3");
    expect(message).toContain("column");
  });
});

describe("TestSNBTParseRealData", () => {
  const valueTypeCard =
    '{_id:4,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:list",value:{proxyName:"integrateddynamics:materialized",serialized:{valueType:"integrateddynamics:operator",values:["integrateddynamics:operator_apply"]}},variableIds:[I;5,5]}';

  const operatorCard =
    '{_id:11,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",variableIds:[I;10]}';

  const cablePart =
    '{connected:{map:[{key:0,value:0b},{key:1,value:1b},{key:2,value:1b},{key:3,value:1b},{key:4,value:0b},{key:5,value:0b}],valueType:"java.lang.Boolean"},forceDisconnected:{map:[],valueType:"java.lang.Boolean"},forceLightCheckAtClient:0b,lastRedstonePulses:{map:[]},lightLevels:{map:[]},partContainer:{parts:[{__partType:"integrateddynamics:block_reader",__side:"west",aspectProperties:{map:[]},channel:0,enabled:1b,id:18,inventoriesNamed:[],maxOffset:0,offsetVariablesSlotMessages:{},offsetX:0,offsetY:0,offsetZ:0,priority:0,updateInterval:1}]},realCable:1b,redstoneInputs:{map:[]}}';

  const variantStoreSection =
    '{inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:9,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:nbt",value:{v:2}}},{Count:24b,Slot:16b,id:"integrateddynamics:variable"}]}';

  const playerLike =
    '{AbsorptionAmount:0.0f,Air:300s,CanUpdate:1b,DataVersion:3120,Dimension:"minecraft:overworld",FallDistance:0.0f,Fire:-20s,Health:20.0f,Invulnerable:0b,Motion:[0.0d,-0.0784000015258789d,0.0d],OnGround:1b,Pos:[-9.417528688597677d,-60.0d,4.107704178659858d],PortalCooldown:0,Rotation:[-99.00339f,19.9501f],Score:0,UUID:[I;785987917,1572160881,-1824404025,39561767],XpSeed:-902426881,abilities:{flySpeed:0.05f,flying:0b,instabuild:1b},ForgeData:{PlayerPersisted:{"integrateddynamics:infoBookSpawned":1b}},recipeBook:{recipes:["minecraft:chest","integratedcrafting:crafting/scripting_disk"],toBeDisplayed:[]}}';

  const recipeAndByteArray =
    '{input:{"minecraft:itemstack":[{type:0b,val:[{condition:1,prototype:{Count:1b,id:"minecraft:air"}}]}]},inputReusable:{"minecraft:itemstack":[B;0B,0B,0B,0B,0B]},output:{"minecraft:itemstack":[{Count:4b,id:"minecraft:warped_planks"}]}}';

  const aspectCard =
    '{Count:1b,Slot:17b,id:"integrateddynamics:variable",tag:{_id:90,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_any_network_value",partId:15}}';

  const cases = [
    ["valueTypeCard", valueTypeCard],
    ["operatorCard", operatorCard],
    ["cablePart", cablePart],
    ["variantStoreSection", variantStoreSection],
    ["playerLike", playerLike],
    ["recipeAndByteArray", recipeAndByteArray],
    ["aspectCard", aspectCard],
  ] as Array<[string, string]>;

  it.each(cases)("parses %s", (_name, text) => {
    expect(() => SNBTToTag(text)).not.toThrow();
  });

  it.each(cases)("round-trips %s semantically", (_name, text) => {
    const original = SNBTToTag(text);
    const reparsed = SNBTToTag(TagToSNBT(original));
    expect(reparsed.equals(original).valueOf()).toBe(true);
  });

  it("testLongArraysAndDanglingPartIds", () => {
    const tag = SNBTToTag(aspectCard) as CompoundTag;
    const card = tag.get(new iString("tag")) as CompoundTag;
    expect(card.get(new iString("_id")).toJSON()).toBe(90);
    expect(card.get(new iString("partId")).toJSON()).toBe(15);
  });

  it("testEmptyMapsSurvive", () => {
    const tag = SNBTToTag(
      "{map:[],collection:[],nested:{map:[]}}"
    ) as CompoundTag;
    expect(tag.getAllKeys().valueOf().length).toBe(3);
    expect(TagToSNBT(tag)).toBe("{map:[],collection:[],nested:{map:[]}}");
  });
  it("testScientificNotationSurvivesAsAValue", () => {
    const text =
      "{Motion:[4.5718453965657714E-5d,-0.04d,1.2411384693394037E-4d]}";
    const tag = SNBTToTag(text);
    expect(tag.toJSON()).toEqual({
      Motion: [4.5718453965657714e-5, -0.04, 1.2411384693394037e-4],
    });
    const reparsed = SNBTToTag(TagToSNBT(tag));
    expect(reparsed.equals(tag).valueOf()).toBe(true);
  });
});

describe("TestSNBTSerialize", () => {
  it.each([
    ["1b", "1b"],
    ["1B", "1b"],
    ["-20s", "-20s"],
    ["1S", "1s"],
    ["1", "1"],
    ["-300", "-300"],
    ["1L", "1L"],
    ["1l", "1L"],
    ["1.5f", "1.5f"],
    ["20.0f", "20.0f"],
    ["20f", "20.0f"],
    ["1d", "1.0d"],
    ["1.5d", "1.5d"],
    ["1.0", "1.0d"],
    ["1e5", "100000.0d"],
    ["true", "1b"],
    ["false", "0b"],
    ["abc", '"abc"'],
    ["1i", '"1i"'],
    ['"abc"', '"abc"'],
    ["'abc'", '"abc"'],
    ["[]", "[]"],
    ["{}", "{}"],
    ["[1,2]", "[1,2]"],
    ["{a:1b}", "{a:1b}"],
    ["[B;0B,30B]", "[B;0B,30B]"],
    ["[I;0,-300]", "[I;0,-300]"],
    ["[L;0L,240L]", "[L;0L,240L]"],
  ] as Array<[string, string]>)("writes %j as %j", (input, expected) => {
    expect(TagToSNBT(SNBTToTag(input))).toBe(expected);
  });

  it("testValuesAreQuotedKeysAreNot", () => {
    expect(TagToSNBT(SNBTToTag('{id:"minecraft:air",Count:1b}'))).toBe(
      '{id:"minecraft:air",Count:1b}'
    );
  });

  it.each([
    ['{"a b":1}', '{"a b":1}'],
    ['{"integrateddynamics:x":1}', '{"integrateddynamics:x":1}'],
    ['{"":1}', '{"":1}'],
    ['{"a.b-c+d_e":1}', "{a.b-c+d_e:1}"],
    ['{"a\\"b":1}', "{'a\"b':1}"],
  ] as Array<[string, string]>)(
    "quotes the key of %j as %j",
    (input, expected) => {
      expect(TagToSNBT(SNBTToTag(input))).toBe(expected);
    }
  );

  it("testPreferSingleQuotesWhenTheValueHasADoubleQuote", () => {
    expect(TagToSNBT(new StringTag(new iString('say "hi"')))).toBe(
      "'say \"hi\"'"
    );
    expect(TagToSNBT(new StringTag(new iString("it's")))).toBe('"it\'s"');
  });

  it("testEscapeBothQuotesWhenNeeded", () => {
    const tag = new StringTag(new iString("a'b\"c"));
    expect(TagToSNBT(tag)).toBe('"a\'b\\"c"');
    expect(SNBTToTag(TagToSNBT(tag)).equals(tag).valueOf()).toBe(true);
  });

  it("testBackslashesAreEscaped", () => {
    const tag = new StringTag(new iString("a\\b"));
    expect(TagToSNBT(tag)).toBe('"a\\\\b"');
    expect(SNBTToTag(TagToSNBT(tag)).equals(tag).valueOf()).toBe(true);
  });

  it("testNullHasNoSNBTForm", () => {
    expect(() => TagToSNBT(new NullTag())).toThrow(StructuralParseError);
  });
});

describe("TestSNBTSerializeLayout", () => {
  const source = "{a:1b,b:[1,2],c:{d:[]}}";

  it("testMinimizeIsASingleLine", () => {
    expect(TagToSNBT(SNBTToTag(source))).toBe("{a:1b,b:[1,2],c:{d:[]}}");
    expect(TagToSNBT(SNBTToTag(source), { layout: "minimize" })).not.toContain(
      "\n"
    );
    expect(TagToSNBT(SNBTToTag(source), { indentation: 8 })).toBe(
      "{a:1b,b:[1,2],c:{d:[]}}"
    );
  });

  it("testReadableIndents", () => {
    expect(
      TagToSNBT(SNBTToTag(source), { layout: "readable", indentation: 2 })
    ).toBe(
      [
        "{",
        "  a: 1b,",
        "  b: [",
        "    1,",
        "    2",
        "  ],",
        "  c: {",
        "    d: []",
        "  }",
        "}",
      ].join("\n")
    );
  });

  it("testReadableHonoursIndentation", () => {
    expect(
      TagToSNBT(SNBTToTag("{a:{b:1}}"), {
        layout: "readable",
        indentation: 4,
      })
    ).toBe(["{", "    a: {", "        b: 1", "    }", "}"].join("\n"));
    expect(
      TagToSNBT(SNBTToTag("{a:{b:1}}"), { layout: "readable", indentation: 0 })
    ).toBe(["{", "a: {", "b: 1", "}", "}"].join("\n"));
  });

  it("testReadableLeavesEmptyContainersInline", () => {
    expect(
      TagToSNBT(SNBTToTag("{}"), { layout: "readable", indentation: 2 })
    ).toBe("{}");
    expect(
      TagToSNBT(SNBTToTag("[]"), { layout: "readable", indentation: 2 })
    ).toBe("[]");
  });

  it("testReadableKeepsArraysInline", () => {
    const text = TagToSNBT(SNBTToTag("{a:[I;1,2],b:[B;1B],c:[L;1L]}"), {
      layout: "readable",
      indentation: 2,
    });
    expect(text).toContain("[I;1,2]");
    expect(text).toContain("[B;1B]");
    expect(text).toContain("[L;1L]");
  });

  it("testReadableStillParsesBack", () => {
    for (const indentation of [0, 1, 2, 4]) {
      const original = SNBTToTag(
        '{a:1b,b:[1,2,{c:"x"}],d:{e:[{f:1}]},g:[I;1,2]}'
      );
      const text = TagToSNBT(original, { layout: "readable", indentation });
      expect(SNBTToTag(text).equals(original).valueOf()).toBe(true);
    }
  });
});

describe("TestSNBTRoundTrip", () => {
  it.each([
    "1b",
    "1s",
    "1",
    "1L",
    "1.5f",
    "1.5d",
    '"abc"',
    "{a:1b}",
    "{a:1b,b:1s,c:1,d:1L}",
    '{a:1.5f,b:1.5d,c:"x"}',
    "{a:[1,2,3]}",
    "{a:[I;1,2],b:[B;1B,2B],c:[L;1L,2L]}",
    '{"a:b":1}',
    "{a:{b:{c:{d:1}}}}",
    "{a:[]}",
    "{a:{}}",
    '{"":""}',
  ])("is byte-stable for %j", (text) => {
    const once = TagToSNBT(SNBTToTag(text));
    expect(once).toBe(text);
    expect(TagToSNBT(SNBTToTag(once))).toBe(text);
  });

  it("testSemanticRoundTripKeepsValues", () => {
    for (const text of [
      "4.5718453965657714E-5d",
      "-902426881",
      "9007199254740993L",
      '["minecraft:chest","minecraft:warped_planks"]',
      "[B;0B,0B,0B]",
    ]) {
      survivesRoundTrip(text);
    }
  });

  it("testBooleansNormaliseToBytes", () => {
    expect(TagToSNBT(SNBTToTag("{a:true,b:false}"))).toBe("{a:1b,b:0b}");
    expect(
      SNBTToTag("{a:true,b:false}").equals(SNBTToTag("{a:1b,b:0b}")).valueOf()
    ).toBe(true);
  });

  it("testNestedContainersOfLists", () => {
    const text = "[[1,2],[3],[],[{a:[1b]}]]";
    expect(TagToSNBT(SNBTToTag(text))).toBe(text);
  });

  it("testListOfCompounds", () => {
    const text = "[{key:0,value:0b},{key:1,value:1b}]";
    expect(TagToSNBT(SNBTToTag(text))).toBe(text);
  });
});

describe("TestSNBTToTagPrefix", () => {
  it("testReportsWhereTheValueEnded", () => {
    const text =
      "Block at 1, 2, 3 has the following block data: {a:1b} trailing";
    const start = text.indexOf("{");
    const { tag, end } = SNBTToTagPrefix(text, start);
    expect(TagToSNBT(tag)).toBe("{a:1b}");
    expect(text.slice(start, end)).toBe("{a:1b}");
  });

  it("testParsesAValueWithNoTrailer", () => {
    const { tag, end } = SNBTToTagPrefix("{a:1b}");
    expect(TagToSNBT(tag)).toBe("{a:1b}");
    expect(end).toBe(6);
  });

  it("testNestedValuesEndAtTheRightPlace", () => {
    const text = "{a:{b:[1,2]}} {c:3}";
    const { tag, end } = SNBTToTagPrefix(text, 0);
    expect(TagToSNBT(tag)).toBe("{a:{b:[1,2]}}");
    expect(end).toBe(13);
    expect(text.slice(0, end)).toBe("{a:{b:[1,2]}}");
    expect(text.slice(end)).toBe(" {c:3}");
  });

  it("testSkipsLeadingWhitespace", () => {
    const { tag } = SNBTToTagPrefix("   {a:1b}");
    expect(TagToSNBT(tag)).toBe("{a:1b}");
  });
});

describe("TestSNBTToCompoundTag", () => {
  it("testAcceptsACompound", () => {
    expect(SNBTToCompoundTag("{a:1b}").getAllKeys().valueOf().length).toBe(1);
    expect(SNBTToCompoundTag("{}").getAllKeys().valueOf().length).toBe(0);
  });

  it.each(["5", "[1]", '"a"', "[]", "1b", "[I;1]"])(
    "rejects the non-compound root %j",
    (text) => {
      expect(() => SNBTToCompoundTag(text)).toThrow(StructuralParseError);
    }
  );

  it("testRejectsTrailingContent", () => {
    expect(() => SNBTToCompoundTag("{a:1b} {b:2b}")).toThrow(
      StructuralParseError
    );
    expect(() => SNBTToCompoundTag("{a:1b} junk")).toThrow(
      StructuralParseError
    );
  });
});

describe("TestSNBTAstBridge", () => {
  it("testASTtoSNBT", () => {
    expect(ASTtoSNBT({ type: "Integer", value: "7" })).toBe("7");
    expect(ASTtoSNBT({ type: "String", value: "hello" })).toBe('"hello"');
  });

  it("testASTtoSNBTHonoursLayout", () => {
    const ast: TypeAST.AST = { type: "Integer", value: "7" };
    expect(ASTtoSNBT(ast, { layout: "readable" })).toBe("7");
  });

  it("testSNBTToASTSurfacesStructuralErrors", () => {
    expect(() => SNBTToAST("{")).toThrow(StructuralParseError);
    expect(() => SNBTToAST("not an nbt value")).toThrow(StructuralParseError);
  });

  it("testSNBTToASTReturnsAnAst", () => {
    expect(SNBTToAST('"hello"', "integrateddynamics:string")).toBeDefined();
  });
});
