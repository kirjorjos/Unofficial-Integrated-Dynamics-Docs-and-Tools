import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import {
  operatorAliasForms,
  operatorDisplayForms,
  operatorRegistry,
} from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { compressWithInputState } from "lib/transformers/Compressed";
import { CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { decodeTransformerUrlCode } from "lib/transformers/decodeUrlState";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { ASTToCondensed } from "lib/transformers/Condensed";
import { ASTToCodeLine } from "lib/transformers/CodeLine";
import { inputToGiveCommands } from "lib/transformers/giveCommands";
import { snbtInputToAST } from "lib/transformers/snbtFormat";

const operatorClasses = Object.entries(operatorRegistry).filter(
  (entry): entry is [string, typeof BaseOperator] =>
    typeof entry[1] === "function"
);

const allDeclaredNames = (): string[] => {
  const names = new Set<string>();
  for (const [key, opClass] of operatorClasses) {
    for (const name of operatorAliasForms(key, opClass)) names.add(name);
    for (const name of operatorDisplayForms(opClass)) names.add(name);
  }
  return [...names];
};

const parseAsConstructor = (source: string): string => {
  const condensed = CondensedToAST(source);
  const codeLine = CodeLineToAST(source);
  expect(condensed.type).toBe(codeLine.type);
  expect(condensed).toEqual(codeLine);
  const expanded = ExpandedToAST(source) as TypeAST.NetworkCards;
  const node =
    expanded.type === "NetworkCards" ? expanded.definitions[0]!.node : expanded;
  expect(node).toEqual(condensed);
  return condensed.type;
};

describe("Constructor identifiers outrank operator names", () => {
  const constructors: { name: string; source: string; type: string }[] = [
    { name: "Block", source: 'Block("minecraft:stone")', type: "Block" },
    { name: "Item", source: 'Item("minecraft:stone")', type: "Item" },
    { name: "Fluid", source: 'Fluid("minecraft:water")', type: "Fluid" },
    { name: "Entity", source: 'Entity("minecraft:cow")', type: "Entity" },
    {
      name: "Ingredients",
      source: 'Ingredients([Item("minecraft:stone")])',
      type: "Ingredients",
    },
    {
      name: "Recipe",
      source:
        'Recipe(Ingredients([Item("minecraft:stone")]), Ingredients([Item("minecraft:stone")]))',
      type: "Recipe",
    },
    {
      name: "Operator",
      source: 'Operator("Logical Or")',
      type: "Operator",
    },
  ];

  it("testEveryConstructorNameThatAnOperatorAlsoClaimsStillBuildsAConstructor", () => {
    for (const name of ["Block", "Item", "Fluid"]) {
      expect(operatorRegistry.operatorNameOwners(name).length).toBeGreaterThan(
        0
      );
    }
    for (const { source, type } of constructors) {
      expect(parseAsConstructor(source)).toBe(type);
    }
  });

  it("testConstructorNamesWinCaseInsensitively", () => {
    expect(CondensedToAST('block("minecraft:stone")').type).toBe("Block");
    expect(CondensedToAST('item("minecraft:stone")').type).toBe("Item");
    expect(CondensedToAST('fluid("minecraft:water")').type).toBe("Fluid");
    expect(CondensedToAST('entity("minecraft:cow")').type).toBe("Entity");
    expect(CondensedToAST('FLUID("minecraft:water")').type).toBe("Fluid");
    expect(CodeLineToAST('FlUiD("minecraft:water")').type).toBe("Fluid");
  });

  it("testFluidAmountIsOptionalInEveryTextTransformer", () => {
    for (const source of [
      'Fluid("minecraft:water")',
      'Fluid("minecraft:water", 1000)',
    ]) {
      const parsed = CondensedToAST(source) as TypeAST.Fluid;
      expect(parsed.type).toBe("Fluid");
      expect(parsed.value["id"]).toBe("minecraft:water");
      expect(parsed.value["amount"]).toBe(
        source.includes("1000") ? "1000" : undefined
      );
      expect(CodeLineToAST(source)).toEqual(parsed);
      const expanded = ExpandedToAST(source) as TypeAST.NetworkCards;
      expect(expanded.definitions[0]!.node).toEqual(parsed);
    }
  });

  it("testTheShadowedOperatorStaysReachableByItsOperatorConstructor", () => {
    const fluidOperator = operatorRegistry.operatorByNickname("fluid");
    expect(fluidOperator).toBe("OBJECT_ITEMSTACK_FLUIDSTACK");
    expect(CondensedToAST('Operator("fluid")')).toEqual({
      type: "Operator",
      opName: "OBJECT_ITEMSTACK_FLUIDSTACK",
    });
  });
});

describe("Operator name resolution", () => {
  it("testOnlyNamesWithExactlyOneOwnerResolve", () => {
    for (const name of allDeclaredNames()) {
      const owners = operatorRegistry.operatorNameOwners(name);
      const resolved = operatorRegistry.operatorByNickname(name);
      if (owners.length > 1) {
        expect(resolved).toBeUndefined();
      } else {
        expect(owners).toHaveLength(1);
        expect(resolved).toBe(owners[0]);
      }
    }
  });

  it("testAmbiguousNamesDoNotResolve", () => {
    expect(operatorRegistry.operatorNameOwners("and")).toEqual([
      "LOGICAL_AND",
      "BINARY_AND",
    ]);
    expect(operatorRegistry.operatorByNickname("and")).toBeUndefined();
    expect(operatorRegistry.operatorByNickname("And")).toBeUndefined();
    expect(() => CondensedToAST('Operator("and")')).toThrow(/Unknown operator/);
    expect(() => CodeLineToAST('Operator("And")')).toThrow(/Unknown operator/);
    expect(() => CondensedToAST("and(true, false)")).toThrow(
      /Unknown identifier/
    );
  });

  it("testUniqueNameFormsAllResolve", () => {
    expect(operatorRegistry.operatorByNickname("Logical Or")).toBe(
      "LOGICAL_OR"
    );
    expect(operatorRegistry.operatorByNickname("logical_or")).toBe(
      "LOGICAL_OR"
    );
    expect(operatorRegistry.operatorByNickname("booleanOr")).toBe("LOGICAL_OR");
    expect(operatorRegistry.operatorByNickname("||")).toBe("LOGICAL_OR");
    expect(operatorRegistry.operatorByNickname("Addition")).toBe(
      "ARITHMETIC_ADDITION"
    );
    expect(CondensedToAST('Operator("||")')).toEqual({
      type: "Operator",
      opName: "LOGICAL_OR",
    });
    expect(CodeLineToAST('Operator("Addition")')).toEqual({
      type: "Operator",
      opName: "ARITHMETIC_ADDITION",
    });
  });

  it("testDisplayNamesSharedBySeveralOperatorsDoNotResolve", () => {
    expect(
      operatorRegistry.operatorNameOwners("Block Block Properties")
    ).toHaveLength(3);
    expect(
      operatorRegistry.operatorByNickname("Block Block Properties")
    ).toBeUndefined();
    expect(() => CondensedToAST('Operator("Block Block Properties")')).toThrow(
      /Unknown operator/
    );
  });
});

describe("Literals and constructors match the input docs", () => {
  const parseEverywhere = (source: string): TypeAST.AST => {
    const condensed = CondensedToAST(source);
    const codeLine = CodeLineToAST(source);
    expect(codeLine).toEqual(condensed);
    const expanded = ExpandedToAST(source) as TypeAST.NetworkCards;
    expect(expanded.definitions[0]!.node).toEqual(condensed);
    return condensed;
  };

  it("testPlainNumbersUseTheLowestTypeThatHoldsThem", () => {
    expect(parseEverywhere("2147483647")).toEqual({
      type: "Integer",
      value: "2147483647",
    });
    expect(parseEverywhere("2147483648")).toEqual({
      type: "Long",
      value: "2147483648",
    });
    expect(parseEverywhere("-2147483648")).toEqual({
      type: "Integer",
      value: "-2147483648",
    });
    expect(parseEverywhere("-2147483649")).toEqual({
      type: "Long",
      value: "-2147483649",
    });
    expect(parseEverywhere("9223372036854775807")).toEqual({
      type: "Long",
      value: "9223372036854775807",
    });
    expect(parseEverywhere("9223372036854775808").type).toBe("Double");
    expect(parseEverywhere("3.5")).toEqual({ type: "Double", value: "3.5" });
  });

  it("testFractionalAndSuffixedLiteralsKeepTheirType", () => {
    expect(parseEverywhere("1.5").type).toBe("Double");
    expect(parseEverywhere("5l")).toEqual({ type: "Long", value: "5" });
    expect(parseEverywhere("5L")).toEqual({ type: "Long", value: "5" });
    expect(parseEverywhere("5d")).toEqual({ type: "Double", value: "5.0" });
  });

  it("testLeadingZerosNormalizeToTheSameNumber", () => {
    expect(parseEverywhere("03")).toEqual({ type: "Integer", value: "3" });
  });

  it("testNumbersBeyondDoubleAreRejected", () => {
    const tooLarge = "1".padEnd(400, "0");
    expect(() => CondensedToAST(tooLarge)).toThrow(/too large/);
    expect(() => CodeLineToAST(tooLarge)).toThrow(/too large/);
  });

  it("testLiteralsAreCaseInsensitiveInEveryFormat", () => {
    for (const source of ["true", "True", "TRUE"]) {
      expect(parseEverywhere(source)).toEqual({ type: "Boolean", value: true });
    }
    for (const source of ["false", "False", "FALSE"]) {
      expect(parseEverywhere(source)).toEqual({
        type: "Boolean",
        value: false,
      });
    }
    for (const source of ["null", "Null", "NULL"]) {
      expect(parseEverywhere(source)).toEqual({ type: "Null" });
    }
  });

  it("testUnknownEscapesAreRejectedInEveryQuoteStyle", () => {
    for (const source of [String.raw`"a\q"`, String.raw`'a\q'`, '"""a\\q"""']) {
      expect(() => CondensedToAST(source)).toThrow(/Invalid escape/);
      expect(() => CodeLineToAST(source)).toThrow(/Invalid escape/);
      expect(() => ExpandedToAST(`x = ${source}`)).toThrow(/Invalid escape/);
    }
  });

  it("testValidEscapesStillWorkInEveryQuoteStyle", () => {
    expect(parseEverywhere(String.raw`"a\"b"`)).toEqual({
      type: "String",
      value: 'a"b',
    });
    expect(parseEverywhere(String.raw`'it\'s'`)).toEqual({
      type: "String",
      value: "it's",
    });
    expect(parseEverywhere(String.raw`"""say "hi""""`)).toEqual({
      type: "String",
      value: 'say "hi"',
    });
    expect(parseEverywhere(String.raw`"""left \""" right"""`)).toEqual({
      type: "String",
      value: 'left """ right',
    });
    expect(() => CondensedToAST(String.raw`"""say \"hi\""""`)).toThrow(
      /takes a bare quote/
    );
  });

  it("testConstructorsRejectLaxArguments", () => {
    for (const source of [
      "Item(stone)",
      'Item("minecraft:stone", "64")',
      'Item("minecraft:stone", 1.5)',
      'Item("minecraft:stone", 1, {}, 4)',
      'Entity("minecraft:cow", 2)',
      'Fluid("minecraft:water", 1.5)',
    ]) {
      expect(() => CondensedToAST(source)).toThrow();
      expect(() => CodeLineToAST(source)).toThrow();
      expect(() => ExpandedToAST(source)).toThrow();
    }
  });

  it("testIngredientsAndRecipeTakeLists", () => {
    const ingredients = parseEverywhere(
      'Ingredients([Item("minecraft:stone")], [Fluid("minecraft:water", 250)], [100l])'
    ) as TypeAST.Ingredients;
    expect(ingredients.value.items).toHaveLength(1);
    expect(ingredients.value.fluids).toHaveLength(1);
    expect(ingredients.value.energy).toEqual([{ type: "Long", value: "100" }]);

    const optional = parseEverywhere(
      'Ingredients([Item("minecraft:stone")])'
    ) as TypeAST.Ingredients;
    expect(optional.value.fluids).toEqual([]);
    expect(optional.value.energy).toEqual([]);

    const recipe = parseEverywhere(
      'Recipe(Ingredients([Item("a")]), Ingredients([Item("b")]))'
    ) as TypeAST.Recipe;
    expect(recipe.value.input.type).toBe("Ingredients");
    expect(recipe.value.output.type).toBe("Ingredients");
    expect(recipe.value.inputReuseable).toEqual({
      items: [],
      fluids: [],
      energies: [],
    });
  });

  it("testIngredientsRejectsTheWrongLists", () => {
    expect(() => CondensedToAST("Ingredients([])")).not.toThrow();
    expect(() =>
      CodeLineToAST('Ingredients([Fluid("minecraft:water")])')
    ).toThrow(/list of Item/);
    expect(() => CodeLineToAST('Ingredients([], [Item("a")])')).toThrow(
      /list of Fluid/
    );
    expect(() => CodeLineToAST("Ingredients([], [], [5])")).toThrow(/Long/);
    expect(() => CodeLineToAST("Recipe(Ingredients([]))")).toThrow(
      /two arguments/
    );
  });

  it("testIngredientsAndRecipeRoundTripThroughText", () => {
    for (const source of [
      'Ingredients([Item("minecraft:stone")])',
      'Ingredients([], [Fluid("minecraft:water")], [5l])',
      'Recipe(Ingredients([Item("a")]), Ingredients([Item("b")], [], [2l]))',
    ]) {
      const ast = CondensedToAST(source);
      expect(CondensedToAST(ASTToCondensed(ast))).toEqual(ast);
      expect(CodeLineToAST(ASTToCodeLine(ast))).toEqual(ast);
      expect(
        CondensedToAST(ASTToCondensed(CondensedToAST(ASTToCondensed(ast))))
      ).toEqual(ast);
    }
  });
});

describe("Declared types", () => {
  it("testNumberDeclarationAcceptsEveryNumericType", () => {
    for (const source of [
      "x :: Number = 5",
      "x :: Number = 5l",
      "x :: Number = 3.0",
      "x :: Number = numberAdd(1, 2)",
    ]) {
      expect(() => ExpandedToAST(source)).not.toThrow();
    }
    expect(() => ExpandedToAST('x :: Number = "text"')).toThrow(
      /declared as type "Number"/
    );
  });

  it("testGlobalTypeVariablesOnlyInsideSignatures", () => {
    expect(() => ExpandedToAST("x :: Any<foo> = 5")).toThrow(
      /only valid inside a signature/
    );
    expect(() => ExpandedToAST("x :: List<A> = [1]")).toThrow(
      /only valid inside a signature/
    );
    expect(() => ExpandedToAST("x :: List<Integer> = [1]")).not.toThrow();
    expect(() => ExpandedToAST("f :: Any<A> -> Any<A> = a => a")).not.toThrow();
    expect(() => ExpandedToAST('x :: List<Integer> = ["text"]')).toThrow(
      /declared as type "List<Integer>"/
    );
  });
});

describe("Interface parts", () => {
  const cardTag =
    '{_id:3,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}';
  const CABLE_PASTE = `/setblock 0 0 0 integrateddynamics:cable{partContainer:{parts:[{__partType:"integratedtunnels:interface_item",__side:"east",id:9,inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:${cardTag}}]}]}}`;
  const ITEM_PASTE = `/give @p integratedtunnels:part_interface_item{id:9,inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:${cardTag}}]}`;

  it("testInterfacePartsAreNeverEmittedButTheirCardsAre", () => {
    for (const paste of [CABLE_PASTE, ITEM_PASTE]) {
      const output = inputToGiveCommands(paste);
      expect(output.text).not.toContain("interface");
      expect(output.lines).toHaveLength(1);
      expect(output.lines[0]).toContain("integrateddynamics:variable");
      expect(
        output.warnings.some((warning) => warning.includes("interface part"))
      ).toBe(true);
    }
  });

  it("testInterfacePartsAreKeptInTheVariableStoreShape", () => {
    const output = inputToGiveCommands(CABLE_PASTE, {
      outputShape: "varstore",
    });
    expect(output.text).not.toContain("interface");
    expect(output.text).toContain("integrateddynamics:variablestore");
    expect(output.text).toContain("integrateddynamics:variable");
  });

  it("testInterfacePartsDoNotReachTheASTOrVisualOutput", () => {
    const ast = snbtInputToAST(CABLE_PASTE);
    expect(JSON.stringify(ast)).not.toContain("interface");
  });

  it("testInterfacePartsStillRoundTripThroughTheCompressedUrl", () => {
    const ast = snbtInputToAST(CABLE_PASTE);
    const code = compressWithInputState(ast, "snbt", {
      format: "snbt",
      mode: "raw",
      rawText: CABLE_PASTE,
    });
    const decoded = decodeTransformerUrlCode(code, "snbt");
    expect(decoded.input).toBe(CABLE_PASTE);
  });
});
