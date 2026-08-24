/**
 * Test the Condensed transformer.
 * @author kirjorjos
 */

import {
  ASTToCondensed,
  CondensedToAST,
  tokenize,
} from "lib/transformers/Condensed";

describe("TestCondensedTransformer", () => {
  it("testTokenizePrimitives", () => {
    const tokens = tokenize('1 2l 3.0 "string" true false null');
    expect(tokens).toEqual([
      { type: "integer", value: "1" },
      { type: "long", value: "2l" },
      { type: "double", value: "3.0" },
      { type: "string", value: '"string"' },
      { type: "boolean", value: "true" },
      { type: "boolean", value: "false" },
      { type: "null", value: "null" },
    ]);
  });

  it("testTokenizeEscapedString", () => {
    const tokens = tokenize('"string with \\"quote\\" and \\\\\\\\ backslash"');
    expect(tokens).toEqual([
      {
        type: "string",
        value: '"string with \\"quote\\" and \\\\\\\\ backslash"',
      },
    ]);
  });

  it("testTokenizeInvalidEscape", () => {
    expect(() => tokenize('"\\z"')).toThrow();
  });

  it("testFlattening", () => {
    const nested = "apply(apply(numberAdd, 1), 2)";
    const ast = CondensedToAST(nested);
    expect(ast.type).toBe("Curry");
    const curry = ast as TypeAST.Curried;
    expect((curry.base as TypeAST.BaseOperator).opName).toBe(
      "ARITHMETIC_ADDITION"
    );
    expect(curry.args.length).toBe(2);
    expect(ASTToCondensed(ast)).toBe("numberAdd(1, 2)");
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

    expect(ASTToCondensed(ast)).toBe('stringConcat("te", "st")');
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

    expect(ASTToCondensed(ast)).toBe('apply(concatTe, "st")');
  });

  it("testIncorrectArityCondensed", () => {
    // Over-expecting: numberIncrement takes 1 arg, given 2
    const over = "numberIncrement(1, 2)";
    expect(() => CondensedToAST(over)).toThrow();

    // Operator as value argument where not expected (incorrect arity of arguments)
    const midOp = "numberAdd(numberIncrement, 1)";
    expect(() => CondensedToAST(midOp)).toThrow();
  });

  it("testDirectVariableCallCondensed", () => {
    const code = "x => x(1)";
    expect(() => CondensedToAST(code)).toThrow();
  });

  it("testTokenizeStructural", () => {
    const tokens = tokenize("apply(eq, 8)");
    expect(tokens).toEqual([
      { type: "identifier", value: "apply" },
      { type: "structural", value: "(" },
      { type: "identifier", value: "eq" },
      { type: "structural", value: "," },
      { type: "integer", value: "8" },
      { type: "structural", value: ")" },
    ]);
  });

  it("testLiterals", () => {
    expect(CondensedToAST("1")).toEqual({ type: "Integer", value: "1" });
    expect(CondensedToAST("2l")).toEqual({ type: "Long", value: "2" });
    expect(CondensedToAST("3.0")).toEqual({ type: "Double", value: "3.0" });
    expect(CondensedToAST('"hi"')).toEqual({ type: "String", value: "hi" });
    expect(CondensedToAST("true")).toEqual({ type: "Boolean", value: true });
    expect(CondensedToAST("null")).toEqual({ type: "Null" });
  });

  it("testListLiteral", () => {
    const ast = CondensedToAST('["c:armor", "c:tools"]');
    expect(ast).toEqual({
      type: "List",
      value: [
        { type: "String", value: "c:armor" },
        { type: "String", value: "c:tools" },
      ],
    });
    expect(ASTToCondensed(ast)).toBe('["c:armor", "c:tools"]');
  });

  it("testImplicitFlipOperatorReference", () => {
    const ast = CondensedToAST("flipListContainsPredicate");
    expect(ast).toEqual({
      type: "Flip",
      arg: { type: "Operator", opName: "LIST_CONTAINS_PREDICATE" },
    });
  });

  it("testComplexNesting", () => {
    const ast = CondensedToAST("apply(relationalEquals, 8)");
    expect(ast).toEqual({
      type: "Curry",
      base: { type: "Operator", opName: "RELATIONAL_EQUALS" },
      args: [{ type: "Integer", value: "8" }],
    });
  });

  it("testPipe", () => {
    const ast = CondensedToAST(
      "pipe(arithmeticIncrement, arithmeticIncrement)"
    );
    expect(ast).toEqual({
      type: "Pipe",
      op1: { type: "Operator", opName: "ARITHMETIC_INCREMENT" },
      op2: { type: "Operator", opName: "ARITHMETIC_INCREMENT" },
    });
  });

  it("testLambdaIdentity", () => {
    const ast = CondensedToAST("x => x");
    expect(ast).toEqual({ type: "Operator", opName: "GENERAL_IDENTITY" });
  });

  it("testLambdaRule1", () => {
    // x => constantInX  =>  K constantInX
    const ast = CondensedToAST("x => 5");
    expect(ASTToCondensed(ast)).toBe("apply(anyConstant, 5)");
  });

  it("testLambdaRule2", () => {
    // x => f x  =>  f
    const ast = CondensedToAST("x => numberIncrement(x)");
    expect(ASTToCondensed(ast)).toBe("numberIncrement");
  });

  it("testLambdaRule3", () => {
    // x => f x y  =>  flip f y
    const ast = CondensedToAST("x => numberAdd(x, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(numberAdd, 1)");
  });

  it("testLambdaRule4", () => {
    // x => f gOfX  =>  pipe (x => gOfX) f
    const ast = CondensedToAST("x => numberIncrement(numberIncrement(x))");
    expect(ASTToCondensed(ast)).toBe(
      "operatorPipe(numberIncrement, numberIncrement)"
    );
  });

  it("testLambdaRule5", () => {
    // x => f gOfX hOfX  =>  pipe2 (x => gOfX) (x => hOfX) f
    const ast = CondensedToAST(
      "x => numberAdd(numberIncrement(x), numberDecrement(x))"
    );
    expect(ASTToCondensed(ast)).toBe(
      "operatorPipe2(numberIncrement, numberDecrement, numberAdd)"
    );
  });

  it("testLambdaRule6", () => {
    // x => fOfX gOfX  =>  pipe2 (x => fOfX) (x => gOfX) apply
    const ast = CondensedToAST(
      "x => operatorApply(x, operatorApply(operatorNegation(x), true))"
    );
    expect(ASTToCondensed(ast)).toBe(
      "operatorPipe2(anyIdentity, operatorPipe(operatorNegation, apply(operatorFlip(operatorApply), true)), operatorApply)"
    );
  });

  it("testLambdaNegation", () => {
    const code = "x => not(itemstackIsStackable(x))";
    const ast = CondensedToAST(code);
    expect(ASTToCondensed(ast)).toBe("operatorNegation(itemstackIsStackable)");
  });

  it("testLambdaConjunction", () => {
    const code =
      "x => logicalAnd(itemstackIsStackable(x), itemstackIsDamageable(x))";
    const ast = CondensedToAST(code);
    expect(ASTToCondensed(ast)).toBe(
      "operatorConjunction(itemstackIsStackable, itemstackIsDamageable)"
    );
  });

  it("testLambdaDisjunction", () => {
    const code =
      "x => logicalOr(itemstackIsStackable(x), itemstackIsDamageable(x))";
    const ast = CondensedToAST(code);
    expect(ASTToCondensed(ast)).toBe(
      "operatorDisjunction(itemstackIsStackable, itemstackIsDamageable)"
    );
  });

  it("testLambdaFlip", () => {
    const ast = CondensedToAST("(a, b) => stringConcat(b, a)");
    expect(ASTToCondensed(ast)).toBe("operatorFlip(stringConcat)");
  });

  it("testLambdaActualFlip", () => {
    const ast = CondensedToAST('(a, b) => stringConcat(b, "hi")');
    expect(ASTToCondensed(ast)).toBeDefined();
  });

  it("testLambdaClash", () => {
    expect(() => CondensedToAST("anyEquals => anyEquals")).toThrow();
  });

  it("testRoundTrip", () => {
    const cases = [
      "1",
      "2l",
      "3.0",
      '"hello"',
      "true",
      "null",
      "apply(numberAdd, 1)",
      'stringConcat("te", "st")',
      "pipe(numberAdd, multiply)",
    ];
    for (const c of cases) {
      const ast = CondensedToAST(c);
      const back = ASTToCondensed(ast);
      expect(ASTToCondensed(CondensedToAST(back))).toBe(back);
    }
  });

  it("testLambdaFork", () => {
    const ast = CondensedToAST("x => arithmeticAddition(x, x)");
    expect(ASTToCondensed(ast)).toBe(
      "operatorPipe2(anyIdentity, anyIdentity, numberAdd)"
    );
  });

  it("testLambdaShort", () => {
    const ast = CondensedToAST("\\x.numberAdd(x, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(numberAdd, 1)");
  });

  it("testLambdaArrow", () => {
    const ast = CondensedToAST("x -> numberAdd(x, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(numberAdd, 1)");
  });

  it("testLambdaVarWithDot", () => {
    const ast = CondensedToAST("\\var.with.dot.numberAdd(var.with.dot, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(numberAdd, 1)");
  });
  it("testReaderDottedForm", () => {
    const code =
      'InventoryReader(0).slotItem({"slot":1}, Item("minecraft:stone", 1))';
    const ast = CondensedToAST(code) as TypeAST.Reader;
    expect(ast.type).toBe("Reader");
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.partId).toBe("0");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ast.value.settings).toEqual({ slot: 1 });
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    expect(ASTToCondensed(ast)).toBe(code);
  });

  it("testReaderSimulatedOutputTypeMismatchThrows", () => {
    expect(() => CondensedToAST('InventoryReader(0).slotItem("test")')).toThrow(
      "Expected output type Item, got simulatedOutput type String"
    );
  });

  it("testReaderVarByIdRejectsSimulatedOutput", () => {
    expect(() =>
      CondensedToAST("readers.network.variableValueById(5)")
    ).toThrow(
      "Variable Value By ID does not support an overridden simulatedValue."
    );
  });

  it("testReaderEnumKeyStillParses", () => {
    const ast = CondensedToAST(
      'InventoryReader(0).OBJECT_ITEM_STACK_SLOT({"slot":1})'
    ) as TypeAST.Reader;
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCondensed(ast)).toBe('InventoryReader(0).slotItem({"slot":1})');
  });

  it("testReaderNicknameParses", () => {
    const ast = CondensedToAST(
      "readers.inventory.itemStackSlot"
    ) as TypeAST.Reader;
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCondensed(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderReadersDotForm", () => {
    const ast = CondensedToAST("readers.inventory.slotItem") as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.partId).toBeUndefined();
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCondensed(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderEmptyPartIdParens", () => {
    const ast = CondensedToAST("InventoryReader().slotItem") as TypeAST.Reader;
    expect(ast.value.partId).toBeUndefined();
    expect(ASTToCondensed(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderSplitDotTokens", () => {
    const ast = CondensedToAST(
      "InventoryReader(0) . slotItem"
    ) as TypeAST.Reader;
    expect(ast.value.partId).toBe("0");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
  });

  it("testReaderFunctionalForm", () => {
    const ast = CondensedToAST(
      'inventoryReader("Slot Item", {"slot":0})'
    ) as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ast.value.settings).toEqual({ slot: 0 });
    expect(ASTToCondensed(ast)).toBe('InventoryReader.slotItem({"slot":0})');
  });

  it("testReaderGenericForm", () => {
    const ast = CondensedToAST(
      'reader("inventory", "slot_item")'
    ) as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
    expect(ast.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(ASTToCondensed(ast)).toBe("InventoryReader.slotItem");
  });

  it("testReaderSimulatedOutputOnly", () => {
    const code = 'InventoryReader().slotItem(Item("minecraft:stone", 1))';
    const ast = CondensedToAST(code) as TypeAST.Reader;
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    expect(ASTToCondensed(ast)).toBe(
      'InventoryReader.slotItem(Item("minecraft:stone", 1))'
    );
  });

  it("testReaderArgsEitherOrder", () => {
    const code =
      'InventoryReader().slotItem(Item("minecraft:stone", 1), {"slot":1})';
    const ast = CondensedToAST(code) as TypeAST.Reader;
    expect(ast.value.settings).toEqual({ slot: 1 });
    expect(ast.value.simulatedOutput).toEqual({
      type: "Item",
      value: { id: "minecraft:stone", size: "1" },
    });
    expect(ASTToCondensed(ast)).toBe(
      'InventoryReader.slotItem({"slot":1}, Item("minecraft:stone", 1))'
    );
  });

  it("testReaderCaseInsensitiveConstructor", () => {
    const ast = CondensedToAST("inventoryreader.slotItem") as TypeAST.Reader;
    expect(ast.value.reader).toBe("InventoryReader");
  });

  it("testReaderUnknownAspect", () => {
    expect(() => CondensedToAST("InventoryReader.slotItemNope")).toThrow();
  });

  it("testReaderUnknownReader", () => {
    expect(() => CondensedToAST('reader("notareader", "X")')).toThrow();
  });

  it("testReaderRoundTrip", () => {
    const cases = [
      "InventoryReader.slotItem",
      'InventoryReader(0).slotItem({"slot":1})',
      'InventoryReader().slotItem(Item("minecraft:stone", 1))',
      'readers.redstone.redstoneLow({"interval":10}, true)',
    ];
    for (const c of cases) {
      const ast = CondensedToAST(c);
      const back = ASTToCondensed(ast);
      expect(ASTToCondensed(CondensedToAST(back))).toBe(back);
    }
  });

  it("testSemicolonSplitsIntoNetworkCards", () => {
    const ast = CondensedToAST(
      "319; 236; apply(apply(map, NetworkReader.variableValueById), [@0, @1])"
    );
    expect(ast.type).toBe("NetworkCards");
    const nc = ast as TypeAST.NetworkCards;
    expect(nc.definitions.length).toBe(3);
    const mapNode = JSON.stringify(nc.definitions[2]!.node);
    expect(mapNode).toContain('"value":"0"');
    expect(mapNode).toContain('"value":"1"');
    expect(mapNode).not.toContain("@");
  });

  it("testSingleSegmentReturnsPlainAst", () => {
    expect(CondensedToAST("apply(numberAdd, 1)").type).toBe("Curry");
  });

  it("testSemicolonInsideStringIsNotASeparator", () => {
    const ast = CondensedToAST('"a;b"') as TypeAST.String;
    expect(ast.value).toBe("a;b");
  });

  it("testSemicolonInsideNbtIsNotASeparator", () => {
    const ast = CondensedToAST('{"a;b": 1}') as TypeAST.Nbt;
    expect(ast.value).toEqual({ "a;b": 1 });
  });

  it("testAtRefRejectedForFutureDefinition", () => {
    expect(() =>
      CondensedToAST(
        "apply(apply(map, NetworkReader.variableValueById), [@1]); 236"
      )
    ).toThrow(/not created yet/);
  });

  it("testStartVariableIdOffsetsAtResolution", () => {
    const ast = CondensedToAST(
      "319; apply(apply(map, NetworkReader.variableValueById), [@0])",
      undefined,
      10
    ) as TypeAST.NetworkCards;
    const mapNode = JSON.stringify(ast.definitions[1]!.node);
    expect(mapNode).toContain('"value":"10"');
  });

  it("testNetworkCardsEmitsSemicolonSeparated", () => {
    const ast = CondensedToAST(
      "319; 236; apply(apply(map, NetworkReader.variableValueById), [@0, @1])"
    );
    const out = ASTToCondensed(ast);
    expect(out).toBe(
      "319; 236; operatorMap(NetworkReader.variableValueById, [0, 1])"
    );
    expect(ASTToCondensed(CondensedToAST(out))).toBe(out);
  });

  it("testMixedListSingleDerivedNormalizes", () => {
    const ast = CondensedToAST("[1, 2, numberAdd(5, 1), 5, 6]");
    expect(ASTToCondensed(ast)).toBe(
      "listConcat(listConcat([1, 2], listAppend([], numberAdd(5, 1))), [5, 6])"
    );
    const out = ASTToCondensed(ast);
    expect(ASTToCondensed(CondensedToAST(out))).toBe(out);
  });

  it("testMixedListReaderElementNormalizes", () => {
    const ast = CondensedToAST(
      '[1, InventoryReader(0).slotItem({"slot":1}), 2]'
    );
    expect(ASTToCondensed(ast)).toBe(
      'listConcat(listConcat([1], listAppend([], InventoryReader(0).slotItem({"slot":1}))), [2])'
    );
  });

  it("testMixedListMultiDerivedHoists", () => {
    const ast = CondensedToAST(
      "[1, numberAdd(5, 1), numberAdd(2, 3)]"
    ) as TypeAST.NetworkCards;
    expect(ast.type).toBe("NetworkCards");
    expect(ast.definitions.map((d) => d.name)).toEqual(["var0", "var1", ""]);
    expect(ASTToCondensed(ast)).toBe(
      "numberAdd(5, 1); numberAdd(2, 3); listConcat([1], operatorMap(NetworkReader.variableValueById, [2, 5]))"
    );
    const out = ASTToCondensed(ast);
    expect(ASTToCondensed(CondensedToAST(out))).toBe(out);
  });

  it("testMixedListNestedNormalizes", () => {
    const ast = CondensedToAST("[1, [2, numberAdd(3, 1)], 4]");
    expect(ASTToCondensed(ast)).toBe(
      "listConcat(listConcat([1], listAppend([], listConcat([2], listAppend([], numberAdd(3, 1))))), [4])"
    );
  });

  it("testMixedListMixedTypesStaysList", () => {
    const ast = CondensedToAST('[1, "a"]');
    expect(ast.type).toBe("List");
    expect(ASTToCondensed(ast)).toBe('[1, "a"]');
  });
});
