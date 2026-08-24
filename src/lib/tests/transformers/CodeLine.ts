import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ExpandedToAST } from "lib/transformers/Expanded";

describe("TestCodeLineTransformer", () => {
  it("testBlock", () => {
    const code = 'Block("minecraft:stone", 64)';
    const ast = CodeLineToAST(code);
    expect(ast.type).toBe("Block");
    expect((ast as TypeAST.Block).value["id"]).toBe("minecraft:stone");
    expect((ast as TypeAST.Block).value["size"]).toBe("64");
    expect(ASTToCodeLine(ast)).toBe(code);
  });

  it("testListLiteral", () => {
    const code = '["c:armor", "c:tools"]';
    const ast = CodeLineToAST(code);
    expect(ast).toEqual({
      type: "List",
      value: [
        { type: "String", value: "c:armor" },
        { type: "String", value: "c:tools" },
      ],
    });
    expect(ASTToCodeLine(ast)).toBe(code);
  });

  it("testImplicitFlipOperatorReference", () => {
    const ast = CodeLineToAST("flipListContainsPredicate");
    expect(ast).toEqual({
      type: "Flip",
      arg: { type: "Operator", opName: "LIST_CONTAINS_PREDICATE" },
    });
  });

  it("testLambda", () => {
    const code = "x => (numberAdd x 1)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1");
  });

  it("testLambdaShort", () => {
    const code = "\\x.numberAdd x 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1");
  });

  it("testLambdaArrow", () => {
    const code = "x -> numberAdd x 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1");
  });

  it("testLambdaRule1", () => {
    // x => constantInX  =>  K constantInX
    const code = "x => 5";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("anyConstant 5");
  });

  it("testLambdaRule2", () => {
    // x => f x  =>  f
    const code = "x => (numberIncrement x)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberIncrement");
  });

  it("testLambdaRule3", () => {
    // x => f x y  =>  flip f y
    const code = "x => (numberAdd x 1)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1");
  });

  it("testLambdaRule4", () => {
    // x => f gOfX  =>  pipe (x => gOfX) f
    const code = "x => (numberIncrement (numberIncrement x))";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorPipe numberIncrement numberIncrement"
    );
  });

  it("testLambdaRule5", () => {
    // x => f gOfX hOfX  =>  pipe2 (x => gOfX) (x => hOfX) f
    const code = "x => (numberAdd (numberIncrement x) (numberDecrement x))";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorPipe2 numberIncrement numberDecrement numberAdd"
    );
  });

  it("testLambdaRule6", () => {
    // x => fOfX gOfX  =>  pipe2 (x => fOfX) (x => gOfX) apply
    const code = "x => x (operatorNegation x true)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorPipe2 anyIdentity ((operatorFlip operatorNegation) true) operatorApply"
    );
  });

  it("testLambdaNegation", () => {
    const code = "x => not (itemstackIsStackable x)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("operatorNegation itemstackIsStackable");
  });

  it("testLambdaConjunction", () => {
    const code =
      "x => (logicalAnd (itemstackIsStackable x) (itemstackIsDamageable x))";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorConjunction itemstackIsStackable itemstackIsDamageable"
    );
  });

  it("testLambdaDisjunction", () => {
    const code =
      "x => (logicalOr (itemstackIsStackable x) (itemstackIsDamageable x))";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorDisjunction itemstackIsStackable itemstackIsDamageable"
    );
  });

  it("testLambdaVarWithDot", () => {
    const code = "\\var.with.dot.numberAdd var.with.dot 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1");
  });

  it("testComplicated2", () => {
    const code =
      "pipe (pipe (pipe lt (pipe listLength)) map) (flip pipe (reduce1 logicalAnd)) min";
    const ast = CodeLineToAST(code);
    const back = ASTToCodeLine(ast);
    expect(CodeLineToAST(back)).toEqual(ast);
  });

  it("testFlattening", () => {
    const nested = "apply(apply(numberAdd, 1), 2)";
    const ast = CodeLineToAST(nested);
    expect(ast.type).toBe("Curry");
    const curry = ast as TypeAST.Curried;
    expect((curry.base as TypeAST.BaseOperator).opName).toBe(
      "ARITHMETIC_ADDITION"
    );
    expect(curry.args.length).toBe(2);
    expect(ASTToCodeLine(ast)).toBe("numberAdd 1 2");
  });

  it("testDirectBaseOperatorSerialization", () => {
    const ast: TypeAST.Curried = {
      type: "Curry",
      base: {
        type: "Curry",
        base: { type: "Operator", opName: "STRING_CONCAT" },
        args: [{ type: "String", value: "te" }],
      },
      args: [{ type: "String", value: "st" }],
    };

    expect(ASTToCodeLine(ast)).toBe('stringConcat "te" "st"');
  });

  it("testNamedBoundaryStopsDirectBaseSerialization", () => {
    const ast: TypeAST.Curried = {
      type: "Curry",
      base: {
        type: "Curry",
        varName: "concatTe",
        base: { type: "Operator", opName: "STRING_CONCAT" },
        args: [{ type: "String", value: "te" }],
      },
      args: [{ type: "String", value: "st" }],
    };

    expect(ASTToCodeLine(ast)).toBe('concatTe "st"');
  });

  it("testLeftAssociativeApply", () => {
    const code = "numberAdd numberIncrement 5 1 2";
    const ast = CodeLineToAST(code);
    expect(ast.type).toBe("Curry");
    expect(ASTToCodeLine(ast)).toBe(code);

    const code2 = "numberAdd 1 numberIncrement 5 2";
    const ast2 = CodeLineToAST(code2);
    expect(ast2.type).toBe("Curry");
    expect(ASTToCodeLine(ast2)).toBe(code2);
  });

  it("testSimpleCurry", () => {
    const code = "eq 0";
    const ast = CodeLineToAST(code);
    expect(ast.type).toBe("Curry");
    expect(((ast as TypeAST.Curried).args[0] as TypeAST.Integer).value).toBe(
      "0"
    );
  });

  it("testRoundTrip", () => {
    const cases = [
      "1",
      "2l",
      "3.0",
      '"hi"',
      "true",
      "null",
      "(numberAdd 1)",
      'stringConcat "te" "st"',
      "operatorPipe (operatorPipe numberAdd 1) multiply",
    ];
    for (const c of cases) {
      const ast = CodeLineToAST(c);
      const back = ASTToCodeLine(ast);
      expect(ASTToCodeLine(CodeLineToAST(back))).toBe(back);
    }
  });

  it("testReaderDottedForm", () => {
    const code =
      'InventoryReader(0).slotItem({"slot":1}, Item("minecraft:stone", 1))';
    const ast = CodeLineToAST(code) as TypeAST.Reader;
    expect(ast.type).toBe("Reader");
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.partId).toBe("0");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ast.value.settings).toEqual({ slot: 1 });
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    // Emits the canonical display name
    expect(ASTToCodeLine(ast)).toBe(code);
  });

  it("testReaderSimulatedOutputTypeMismatchThrows", () => {
    expect(() => CodeLineToAST('InventoryReader(0).slotItem("test")')).toThrow(
      "Expected output type Item, got simulatedOutput type String"
    );
  });

  it("testReaderVarByIdRejectsSimulatedOutput", () => {
    expect(() => CodeLineToAST("readers.network.variableValueById(5)")).toThrow(
      "Variable Value By ID does not support an overridden simulatedValue."
    );
  });

  it("testReaderEnumKeyStillParses", () => {
    const ast = CodeLineToAST(
      'InventoryReader(0).OBJECT_ITEM_STACK_SLOT({"slot":1})'
    ) as TypeAST.Reader;
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCodeLine(ast)).toBe('InventoryReader(0).slotItem({"slot":1})');
  });

  it("testReaderReadersDotForm", () => {
    const ast = CodeLineToAST("readers.inventory.slotItem") as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.partId).toBeUndefined();
    expect(ASTToCodeLine(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderSplitDotTokens", () => {
    const ast = CodeLineToAST(
      "InventoryReader(0) . slotItem"
    ) as TypeAST.Reader;
    expect(ast.value.partId).toBe("0");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
  });

  it("testReaderFunctionalForm", () => {
    const ast = CodeLineToAST(
      'inventoryReader("Slot Item", {"slot":0})'
    ) as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ast.value.settings).toEqual({ slot: 0 });
    expect(ASTToCodeLine(ast)).toBe('InventoryReader.slotItem({"slot":0})');
  });

  it("testReaderGenericForm", () => {
    const ast = CodeLineToAST(
      'reader("inventory", "slot_item")'
    ) as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCodeLine(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderSimulatedOutputOnly", () => {
    const code = 'InventoryReader().slotItem(Item("minecraft:stone", 1))';
    const ast = CodeLineToAST(code) as TypeAST.Reader;
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    expect(ASTToCodeLine(ast)).toBe(
      'InventoryReader.slotItem(Item("minecraft:stone", 1))'
    );
  });

  it("testReaderArgsEitherOrder", () => {
    const code =
      'InventoryReader().slotItem(Item("minecraft:stone", 1), {"slot":1})';
    const ast = CodeLineToAST(code) as TypeAST.Reader;
    expect(ast.value.settings).toEqual({ slot: 1 });
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    expect(ASTToCodeLine(ast)).toBe(
      'InventoryReader.slotItem({"slot":1}, Item("minecraft:stone", 1))'
    );
  });

  it("testReaderCaseInsensitiveConstructor", () => {
    const ast = CodeLineToAST("inventoryreader.slotItem") as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
  });

  it("testReaderUnknownAspect", () => {
    expect(() => CodeLineToAST("InventoryReader.slotItemNope")).toThrow();
  });

  it("testReaderUnknownReader", () => {
    expect(() => CodeLineToAST('reader("notareader", "X")')).toThrow();
  });

  it("testReaderRoundTrip", () => {
    const cases = [
      "InventoryReader.slotItem",
      'InventoryReader(0).slotItem({"slot":1})',
      'InventoryReader().slotItem(Item("minecraft:stone", 1))',
      'readers.redstone.redstoneLow({"interval":10}, true)',
    ];
    for (const c of cases) {
      const ast = CodeLineToAST(c);
      const back = ASTToCodeLine(ast);
      expect(ASTToCodeLine(CodeLineToAST(back))).toBe(back);
    }
  });

  it("testSemicolonSplitsIntoNetworkCards", () => {
    const ast = CodeLineToAST(
      "319; 236; map NetworkReader.variableValueById [@0, @1]"
    );
    expect(ast.type).toBe("NetworkCards");
    const nc = ast as TypeAST.NetworkCards;
    expect(nc.definitions.length).toBe(3);
    expect(nc.definitions[0]!.node).toEqual({ type: "Integer", value: "319" });
    expect(nc.definitions[1]!.node).toEqual({ type: "Integer", value: "236" });
    const mapNode = JSON.stringify(nc.definitions[2]!.node);
    expect(mapNode).toContain('"value":"0"');
    expect(mapNode).toContain('"value":"1"');
    expect(mapNode).not.toContain("@");
  });

  it("testSingleSegmentReturnsPlainAst", () => {
    expect(CodeLineToAST("add 5 1").type).toBe("Curry");
  });

  it("testSemicolonInsideStringIsNotASeparator", () => {
    const ast = CodeLineToAST('"a;b"') as TypeAST.String;
    expect(ast.value).toBe("a;b");
  });

  it("testSemicolonInsideNbtIsNotASeparator", () => {
    const ast = CodeLineToAST('{"a;b": 1}') as TypeAST.Nbt;
    expect(ast.value).toEqual({ "a;b": 1 });
  });

  it("testAtRefRejectedForCurrentDefinition", () => {
    expect(() =>
      CodeLineToAST("map NetworkReader.variableValueById [@0]")
    ).toThrow(/only valid inside a multi-statement/i);
  });

  it("testAtRefRejectedForFutureDefinition", () => {
    expect(() =>
      CodeLineToAST("map NetworkReader.variableValueById [@1]; 236")
    ).toThrow(/not created yet/);
  });

  it("testLiteralFutureIdsNotValidated", () => {
    const ast = CodeLineToAST(
      "5; map NetworkReader.variableValueById [7]"
    ) as TypeAST.NetworkCards;
    expect(ast.type).toBe("NetworkCards");
  });

  it("testStartVariableIdOffsetsAtResolution", () => {
    const ast = CodeLineToAST(
      "319; map NetworkReader.variableValueById [@0]",
      undefined,
      10
    ) as TypeAST.NetworkCards;
    const mapNode = JSON.stringify(ast.definitions[1]!.node);
    expect(mapNode).toContain('"value":"10"');
  });

  it("testNetworkCardsEmitsSemicolonSeparated", () => {
    const ast = CodeLineToAST(
      "319; 236; map NetworkReader.variableValueById [@0, @1]"
    );
    const out = ASTToCodeLine(ast);
    expect(out).toBe(
      "319; 236; operatorMap (NetworkReader.variableValueById) [0, 1]"
    );
    expect(ASTToCodeLine(CodeLineToAST(out))).toBe(out);
  });

  it("testNetworkCardsEmitsRawVarIdsForSharedDefinitions", () => {
    const ast = ExpandedToAST("a = 5\nb = add a 1\nfinal = [a, b]");
    expect(ASTToCodeLine(ast)).toBe("5; numberAdd 0 1; [0, 2]");
    const back = CodeLineToAST("5; add @0 1; [@0, @1]") as TypeAST.NetworkCards;
    expect(back.type).toBe("NetworkCards");
  });
});
