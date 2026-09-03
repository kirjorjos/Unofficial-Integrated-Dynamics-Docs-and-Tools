import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCondensed } from "lib/transformers/Condensed";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { globalMap } from "lib/HelperClasses/TypeMap";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

describe("TestExpandedTransformer", () => {
  beforeEach(() => {
    globalMap.clear();
    ParsedSignature.resetTypeIDCounter();
  });

  const deleteNestedVars = (node: TypeAST.AST) => {
    if (node.varName) delete node.varName;
    switch (node.type) {
      case "Curry":
        deleteNestedVars(node.base);
        node.args.forEach(deleteNestedVars);
        break;
      case "Pipe":
        deleteNestedVars(node.op1);
        deleteNestedVars(node.op2);
        break;
      case "Pipe2":
        deleteNestedVars(node.op1);
        deleteNestedVars(node.op2);
        deleteNestedVars(node.op3);
        break;
      case "Flip":
        deleteNestedVars(node.arg);
        break;
    }
  };

  const rootOf = (ast: TypeAST.AST): TypeAST.AST =>
    ast.type === "NetworkCards"
      ? ast.definitions[ast.definitions.length - 1]!.node
      : ast;

  it("testNestedScoping", () => {
    const input = `
varName1 = pipe operatorPipe operatorPipe2
varName2 = pipe varName1 operatorFlip
final = apply varName2 3
`;
    const ast = rootOf(ExpandedToAST(input.trim()));

    expect(ast.varName).toBe("final");
    expect(ast.type).toBe("Curry");

    const curry = ast as TypeAST.Curried;
    expect(curry.base.varName).toBe("varName2");
    expect((curry.args[0] as TypeAST.Integer).value).toBe("3");

    const var2 = curry.base as TypeAST.Pipe;
    expect(var2.varName).toBe("varName2");
    expect(var2.type).toBe("Pipe");
    expect((var2.op2 as TypeAST.BaseOperator).opName).toBe("OPERATOR_FLIP");

    const var1 = var2.op1 as TypeAST.Pipe;
    expect(var1.varName).toBe("varName1");
    expect(var1.type).toBe("Pipe");
    expect((var1.op1 as TypeAST.BaseOperator).opName).toBe("OPERATOR_PIPE");
    expect((var1.op2 as TypeAST.BaseOperator).opName).toBe("OPERATOR_PIPE2");
  });

  it("testUndefinedVarThrows", () => {
    const input = `
var1 = operatorPipe
var2 = pipe var3 operatorPipe2
`;
    expect(() => ExpandedToAST(input.trim())).toThrow();
  });

  it("testCommentsAndSignatures", () => {
    const input = `
-- Comment
var1 :: Any
var1 = 5 -- Inline comment
-- Solo line comment
final = operatorFlip apply var1 numberIncrement
`;
    const ast = rootOf(ExpandedToAST(input.trim()));
    expect(ast.varName).toBe("final");
    expect(ast.type).toBe("Curry");
    expect(((ast as TypeAST.Curried).args[0] as TypeAST.Integer).value).toBe(
      "5"
    );
  });

  it("testShadowingOperatorThrows", () => {
    const input = `
operatorPipe = 5
`;
    expect(() => ExpandedToAST(input.trim())).toThrow();
  });

  it("testShadowingOperatorAllowsSelfReference", () => {
    const input = `
operatorPipe = operatorPipe
`;
    expect(ExpandedToAST(input.trim())).toEqual({
      type: "NetworkCards",
      definitions: [
        {
          name: "operatorPipe",
          node: {
            type: "Operator",
            opName: "OPERATOR_PIPE",
            varName: "operatorPipe",
          },
        },
      ],
    });
  });

  it("testInvalidVarNameThrows", () => {
    const input = `
invalid(name) = 5
`;
    expect(() => ExpandedToAST(input.trim())).toThrow();
  });

  it("testNoAssignmentOnFirstLineThrows", () => {
    const input = "operatorPipe";
    expect(() => ExpandedToAST(input)).toThrow();
  });

  it("testExample3FromInput", () => {
    const input = `
operatorStringContains = "operatorStringContains"
operatorTooltip = "operatorTooltip"
operatorContainsPredicate = "operatorContainsPredicate"

flipContainsPredicate = flip operatorContainsPredicate
stringCommon = "Common"
containsCommon = apply operatorStringContains stringCommon
listContainsCommon = apply flipContainsPredicate containsCommon
tooltipContainsCommon = pipe operatorTooltip listContainsCommon
`;
    const ast = rootOf(ExpandedToAST(input.trim()));
    expect(ast.varName).toBe("tooltipContainsCommon");
    expect(ast.type).toBe("Pipe");
  });

  it("testMixedStyle", () => {
    const input = `
var1 = pipe numberIncrement numberMultiply
var2 = apply(var1, 10)
final = apply(numberAdd, var2)
`;
    const ast = rootOf(ExpandedToAST(input.trim()));
    expect(ast.varName).toBe("final");
    expect(ast.type).toBe("Curry");
    const curry = ast as TypeAST.Curried;
    expect(curry.args[0]!.type).toBe("Curry");
    expect(curry.args[0]!.varName).toBe("var2");
  });

  it("testASTToExpanded", () => {
    const code = "pipe (numberAdd 1) numberIncrement";
    const ast = CodeLineToAST(code);
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain("::");
    expect(expanded).toContain("=");

    const backAst = rootOf(ExpandedToAST(expanded));
    deleteNestedVars(backAst);
    deleteNestedVars(ast);
    expect(ASTToCodeLine(backAst)).toContain("operatorPipe");
  });

  it("testLargeCurryDecomposition", () => {
    const code =
      "apply (operatorPipe2 numberIncrement numberIncrement numberAdd) 5";
    const ast = CodeLineToAST(code);
    const expanded = ASTToExpanded(ast, "CodeLine");

    const lines = expanded.split("\n").filter((l) => l.includes("="));
    expect(lines.length).toBeGreaterThanOrEqual(2);

    const backAst = rootOf(ExpandedToAST(expanded));
    const ast1 = JSON.parse(JSON.stringify(ast)) as TypeAST.AST;
    const ast2 = JSON.parse(JSON.stringify(backAst)) as TypeAST.AST;
    deleteNestedVars(ast1);
    deleteNestedVars(ast2);
    expect(ast2).toEqual(ast1);
  });

  it("testExpandedDirectBaseOperatorRoundTrip", () => {
    const input = 'test = stringConcat("te", "st")';
    const ast = ExpandedToAST(input);
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain('test = stringConcat("te", "st")');
    expect(expanded).not.toContain("apply(");
  });

  it("testExpandedDirectBaseOperatorRoundTripCodeLineStyle", () => {
    const input = 'test = stringConcat("te", "st")';
    const ast = ExpandedToAST(input);
    const expanded = ASTToExpanded(ast, "CodeLine");

    expect(expanded).toContain('test = stringConcat "te" "st"');
  });

  it("testExpandedSingleAndTripleQuoteInput", () => {
    const singleValue = `hello "world"`;
    const single = `greeting = 'hello "world"'`;
    const singleAst = ExpandedToAST(single);
    expect(ASTToCondensed(singleAst)).toContain(JSON.stringify(singleValue));

    const tripleValue = `say "hi" to the world`;
    const triple = `msg = """say "hi" to the world"""`;
    const tripleAst = ExpandedToAST(triple);
    expect(ASTToCondensed(tripleAst)).toContain(JSON.stringify(tripleValue));
  });

  it("testExpandedOperatorPseudoConstructor", () => {
    const double = ExpandedToAST(
      `a = Operator("integrateddynamics:logical_or")`
    );
    expect(ASTToCondensed(double)).toContain("booleanOr");

    const single = ExpandedToAST(`b = Operator('logical_or')`);
    expect(ASTToCondensed(single)).toContain("booleanOr");

    const triple = ExpandedToAST(`c = Operator("""Logical Or""")`);
    expect(ASTToCondensed(triple)).toContain("booleanOr");

    const parseBoolean = ExpandedToAST(`d = Operator("Parse Boolean")`);
    expect(ASTToCondensed(parseBoolean)).toContain("stringParseAsBoolean");
  });

  it("testExpandedOperatorPseudoConstructorUnknownThrows", () => {
    expect(() => ExpandedToAST(`e = Operator("not_a_real_operator")`)).toThrow(
      "Unknown operator: not_a_real_operator"
    );
  });

  it("testExpandedNamedBoundaryStaysExplicit", () => {
    const ast: TypeAST.Curried = {
      type: "Curry",
      varName: "test",
      base: {
        type: "Curry",
        varName: "concatTe",
        base: { type: "Operator", opName: "STRING_CONCAT" },
        args: [{ type: "String", value: "te" }],
      },
      args: [{ type: "String", value: "st" }],
    };
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain('concatTe = apply(stringConcat, "te")');
    expect(expanded).toContain('test = apply(concatTe, "st")');
  });

  it("testVariableNamingConventions", () => {
    const ast1 = CodeLineToAST("apply operatorPipe numberIncrement");
    const exp1 = ASTToExpanded(ast1);
    expect(exp1).toContain("byNumberIncrement ::");

    const ast2 = CodeLineToAST("apply (flip operatorPipe) numberIncrement");
    const exp2 = ASTToExpanded(ast2);
    expect(exp2).toContain("onNumberIncrement ::");

    const ast3 = CodeLineToAST("apply (apply numberAdd 5) 10");
    const exp3 = ASTToExpanded(ast3);
    expect(exp3).toContain("{numberAddBy5}by10 ::");
    expect(exp3).not.toContain("numberAddBy5 ::");

    const ast4 = CodeLineToAST("apply2 numberAdd 5 10");
    const exp4 = ASTToExpanded(ast4);
    expect(exp4).toContain("{numberAddBy5}by10 ::");
    expect(exp4).not.toContain("numberAddBy5 ::");

    const ast6 = CodeLineToAST("apply (flip numberAdd) 5");
    const exp6 = ASTToExpanded(ast6);
    expect(exp6).toContain("{flipNumberAdd}on5 ::");

    const ast8 = CodeLineToAST("pipe numberIncrement numberMultiply");
    const exp8 = ASTToExpanded(ast8);
    expect(exp8).toContain("numberMultiplyWithNumberIncrement ::");

    const ast9 = CodeLineToAST(
      "pipe2 numberIncrement numberIncrement numberAdd"
    );
    const exp9 = ASTToExpanded(ast9);
    expect(exp9).toContain("numberAddWithNumberIncrementAndNumberIncrement ::");

    const scope10 = new Map<string, TypeAST.AST>([
      ["list1", { type: "Variable", name: "list1" }],
    ]);
    const ast10 = CodeLineToAST("applyN numberAdd list1", scope10);
    const exp10 = ASTToExpanded(ast10);
    expect(exp10).toContain("numberAddBy_nList1 ::");

    const ast11 = CodeLineToAST("flip numberAdd");
    const exp11 = ASTToExpanded(ast11);
    expect(exp11).toContain("flipNumberAdd ::");
  });

  it("testSignatureFormatting", () => {
    const ast = CodeLineToAST("operatorApply3");
    const expanded = ASTToExpanded(ast);
    const expected =
      "operatorApply3 :: Operator<Operator<Any → (Any → (Any → Any))> → (Any → (Any → (Any → Any)))>\noperatorApply3 = operatorApply3";
    expect(expanded).toBe(expected);
  });

  it("testExpandedListLiteral", () => {
    const input = `
whitelistTagList :: List<String>
whitelistTagList = ["c:armor", "c:tools"]
`;
    const ast = ExpandedToAST(input.trim());
    expect(rootOf(ast)).toEqual({
      type: "List",
      value: [
        { type: "String", value: "c:armor" },
        { type: "String", value: "c:tools" },
      ],
      varName: "whitelistTagList",
    });
    expect(ASTToExpanded(ast)).toContain(
      'whitelistTagList = ["c:armor", "c:tools"]'
    );
  });

  it("testExpandedImplicitFlipOperatorReference", () => {
    const ast = rootOf(ExpandedToAST("final = flipListContainsPredicate"));
    expect(ast).toEqual({
      type: "Flip",
      arg: { type: "Operator", opName: "LIST_CONTAINS_PREDICATE" },
      varName: "final",
    });
  });

  it("testVarNameIsGivenNickname", () => {
    expect(ASTToExpanded(CodeLineToAST("gt"))).toContain("gt ::");
    expect(ASTToExpanded(CodeLineToAST("flip pipe"))).toContain("flipPipe ::");
  });

  it("testFullyAppliedCurryArgBecomesNamedStep", () => {
    const ast = CodeLineToAST("apply numberAdd (numberAdd 5 10)");
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain("{numberAddBy5}by10 = numberAdd(5, 10)");
    expect(expanded).toContain(
      "numberAddBy{numberAddBy5}by10 = apply(numberAdd, {numberAddBy5}by10)"
    );
  });

  it("testNestedPipeDecomposesIntoSteps", () => {
    const ast = CodeLineToAST(
      "pipe (pipe numberIncrement numberIncrement) numberIncrement"
    );
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain(
      "numberIncrementWithNumberIncrement = operatorPipe(numberIncrement, numberIncrement)"
    );
    expect(expanded).toContain(
      "numberIncrementWithNumberIncrementWithNumberIncrement = operatorPipe(numberIncrementWithNumberIncrement, numberIncrement)"
    );
    expect(expanded).not.toContain(
      "operatorPipe(operatorPipe(numberIncrement, numberIncrement), numberIncrement)"
    );
  });

  it("testBraceVarNameReferenceRoundTrips", () => {
    const input = `{numberAddBy5}by10 = numberAdd(5, 10)
result = apply(numberAdd, {numberAddBy5}by10)`;
    const ast = rootOf(ExpandedToAST(input));
    expect(ast.varName).toBe("result");
    expect((ast as TypeAST.Curried).args[0]!.varName).toBe(
      "{numberAddBy5}by10"
    );
  });

  it("testEmptyNbtStillParses", () => {
    const ast = ExpandedToAST("emptyTag = {}");
    expect(rootOf(ast)).toEqual({
      type: "NBT",
      value: {},
      varName: "emptyTag",
    });
  });

  it("testExpandedReaderAutoName", () => {
    const ast: TypeAST.Reader = {
      type: "Reader",
      value: { reader: "RedstoneReader", aspect: "BOOLEAN_LOW" },
    };
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("redstoneLow ::");
    expect(expanded).toContain("redstoneLow = RedstoneReader.redstoneLow");
  });
  it("testExpandedReaderRoundTrip", () => {
    const input =
      'final = InventoryReader(0).slotItem({"slot":1}, Item("minecraft:stone", 1))';
    const ast = ExpandedToAST(input);
    const reader = rootOf(ast) as TypeAST.Reader;
    expect(reader.type).toBe("Reader");
    expect(reader.value.reader).toBe("InventoryReader");
    expect(reader.value.partId).toBe("0");
    expect(reader.value.aspect).toBe("OBJECT_ITEM_STACK_SLOT");
    expect(reader.value.settings).toEqual({ slot: 1 });

    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("final ::");
    expect(expanded).toContain(
      'final = InventoryReader(0).slotItem({"slot":1}, Item("minecraft:stone", 1))'
    );

    const back = rootOf(ExpandedToAST(expanded));
    deleteNestedVars(back);
    deleteNestedVars(reader);
    expect(JSON.parse(JSON.stringify(back))).toEqual(
      JSON.parse(JSON.stringify(reader))
    );
  });

  it("testExpandedReaderSignatureType", () => {
    const ast: TypeAST.Reader = {
      type: "Reader",
      value: { reader: "WorldReader", aspect: "LONG_TIME" },
    };
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("worldTime :: Long");
  });

  it("testIndexOfListFullyDecomposesAndRoundTrips", () => {
    const input =
      "indexOfList = (l) => (el) => head(filter((idx) => equals(el, listGet(l, idx)), slice(lazybuilt(0, increment), 0, listLength(l))))";
    const ast = ExpandedToAST(input);
    const expanded = ASTToExpanded(ast);

    expect(expanded).toContain(
      "{lazybuiltBy0}byIncrement = anyLazyBuilt(0, numberIncrement)"
    );
    expect(expanded).toContain(
      "sliceBy{lazybuiltBy0}byIncrement = apply(listSlice, {lazybuiltBy0}byIncrement)"
    );
    expect(expanded).not.toContain(
      "apply(listSlice, anyLazyBuilt(0, numberIncrement))"
    );
    expect(expanded).not.toContain("indexOfList = operatorPipe(operatorPipe2(");

    const backAst = rootOf(ExpandedToAST(expanded));
    expect(backAst.varName).toBe("indexOfList");
  });
  it("testExpandedToASTReturnsNetworkCards", () => {
    const input = `
a = 5
b = add a 1
final = apply b 2
`;
    const ast = ExpandedToAST(input.trim());
    expect(ast.type).toBe("NetworkCards");
    const network = ast as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual(["a", "b", "final"]);
    const root = network.definitions[network.definitions.length - 1]!.node;
    expect(root.type).toBe("Curry");
    expect(root.varName).toBe("final");
  });

  it("testUnusedDefinitionsArePreserved", () => {
    const input = `
step0 = 319
step1 = 236
final = apply add 3 4
`;
    const ast = ExpandedToAST(input.trim());
    const network = ast as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual([
      "step0",
      "step1",
      "final",
    ]);
    expect(network.definitions[0]!.node).toEqual({
      type: "Integer",
      value: "319",
      varName: "step0",
    });
    expect(network.definitions[1]!.node).toEqual({
      type: "Integer",
      value: "236",
      varName: "step1",
    });
  });

  it("testNetworkCardsRoundTripsThroughExpanded", () => {
    const input = `step0 = 319
step1 = 236
final = [step0, step1]`;
    const network = ExpandedToAST(input);
    const expanded = ASTToExpanded(network);
    expect(expanded).toContain("step0 = 319");
    expect(expanded).toContain("step1 = 236");
    expect(expanded).toContain("final = [step0, step1]");

    const back = ExpandedToAST(expanded);
    expect(JSON.parse(JSON.stringify(back))).toEqual(
      JSON.parse(JSON.stringify(network))
    );
  });

  it("testNetworkCardsCompressedRoundTrip", () => {
    const network = ExpandedToAST(
      "step0 = 319\nstep1 = 236\nfinal = [step0, step1]"
    );
    expect(CompressedToAST(ASTToCompressed(network))).toEqual(network);
  });

  it("testNetworkCardsEmitsInCondensedAndCodeLine", () => {
    const network = ExpandedToAST("a = 5\nfinal = a");
    expect(ASTToCondensed(network)).toBe("5; 5");
    expect(ASTToCodeLine(network)).toBe("5; 5");
  });

  it("testNetworkCardsEmitsSharedRefsAsRawVarIds", () => {
    const network = ExpandedToAST("a = 5\nb = add a 1\nfinal = [a, b]");
    expect(ASTToCodeLine(network)).toBe(
      "5; numberAdd 0 1; listConcat [0] (listAppend [] 2)"
    );
    expect(ASTToCondensed(network)).toBe(
      "5; numberAdd(0, 1); listConcat([0], listAppend([], 2))"
    );
    const back = CodeLineToAST("5; add @0 1; [@0, @1]");
    expect(back.type).toBe("NetworkCards");
  });

  it("testAtVarNameResolvesToLastCardId", () => {
    const network = ExpandedToAST(
      "step0 = 319\nstep1 = 236\nfinal = apply(apply(map, NetworkReader.variableValueById), [@step0, @step1])"
    ) as TypeAST.NetworkCards;
    const mapNode = JSON.stringify(network.definitions[2]!.node);
    expect(mapNode).toContain('"value":"0"');
    expect(mapNode).toContain('"value":"1"');
    expect(mapNode).not.toContain("@");
  });

  it("testAtVarNameResolvesToLastCardOfDecomposedDefinition", () => {
    const network = ExpandedToAST(
      "addLine = apply(apply(numberAdd, 5), 1)\nfinal = apply(apply(map, NetworkReader.variableValueById), [@addLine])"
    ) as TypeAST.NetworkCards;
    const mapNode = JSON.stringify(network.definitions[1]!.node);
    expect(mapNode).toContain('"value":"2"');
  });

  it("testAtVarNameUnknownNameThrows", () => {
    expect(() =>
      ExpandedToAST(
        "a = 5\nfinal = apply(apply(map, NetworkReader.variableValueById), [@nope])"
      )
    ).toThrow(/Unknown card reference/);
  });

  it("testAtVarNameSelfReferenceThrows", () => {
    expect(() =>
      ExpandedToAST(
        "final = apply(apply(map, NetworkReader.variableValueById), [@final])"
      )
    ).toThrow(/not created yet/);
  });

  it("testStartVariableIdOffsetsAtVarNameResolution", () => {
    const network = ExpandedToAST(
      "a = 319\nfinal = apply(apply(map, NetworkReader.variableValueById), [@a])",
      10
    ) as TypeAST.NetworkCards;
    const mapNode = JSON.stringify(network.definitions[1]!.node);
    expect(mapNode).toContain('"value":"10"');
  });

  it("testAtAndSemicolonRejectedInVarNames", () => {
    expect(() => ExpandedToAST("a@b = 5\nc = a@b")).toThrow(
      /Invalid variable name/
    );
    expect(() => ExpandedToAST("a;b = 5\nc = a;b")).toThrow(
      /Invalid variable name/
    );
  });

  it("testQuotedVarNameDefinitionAndReference", () => {
    const network = ExpandedToAST(
      'Variable("my cool variable") = 5\nfinal = Variable("my cool variable")'
    ) as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual([
      "my cool variable",
      "final",
    ]);
    expect(network.definitions[1]!.node).toEqual({
      type: "Integer",
      value: "5",
      varName: "final",
    });
    const expanded = ASTToExpanded(network);
    expect(expanded).toContain('Variable("my cool variable") ::');
    expect(expanded).toContain('Variable("my cool variable") = 5');
    expect(expanded).toContain("final = 5");
    const back = ExpandedToAST(expanded);
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testQuotedVarNameTypedDefinition", () => {
    const network = ExpandedToAST(
      'Variable("my cool variable") :: Integer = 5\nfinal = Variable("my cool variable")'
    ) as TypeAST.NetworkCards;
    expect(network.definitions[0]!.name).toBe("my cool variable");
    const back = ExpandedToAST(ASTToExpanded(network));
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testQuotedVarNameReferenceInArgument", () => {
    const network = ExpandedToAST(
      'Variable("my cool variable") = 5\nfinal = numberAdd(Variable("my cool variable"), 1)'
    ) as TypeAST.NetworkCards;
    const finalNode = network.definitions[1]!.node as TypeAST.Curried;
    expect(finalNode.args[0]).toEqual({
      type: "Integer",
      value: "5",
      varName: "my cool variable",
    });
    const expanded = ASTToExpanded(network);
    expect(expanded).toContain(
      'final = numberAdd(Variable("my cool variable"), 1)'
    );
    const back = ExpandedToAST(expanded);
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testQuotedVarNameWrapperRequired", () => {
    expect(() => ExpandedToAST("my cool variable :: Integer = 5")).toThrow(
      /Invalid variable name/
    );
    expect(() => ExpandedToAST('"my cool variable" = 5')).toThrow(
      /Invalid variable name/
    );
    expect(() => ExpandedToAST("a = 5\nfinal = my cool variable")).toThrow();
  });

  it("testQuotedVarNameStillRejectsNicknameShadow", () => {
    expect(() => ExpandedToAST('Variable("add") = 5')).toThrow(
      /overshadows an operator nickname/
    );
  });

  it("testAtVariablePseudoConstructorResolvesToCardId", () => {
    const network = ExpandedToAST(
      'Variable("my var") = 5\nfinal = @Variable("my var")'
    ) as TypeAST.NetworkCards;
    const finalNode = network.definitions[1]!.node;
    expect(finalNode).toEqual({
      type: "Integer",
      value: "0",
      varName: "final",
    });
    expect(ASTToCondensed(network)).toBe("5; 0");
  });

  it("testVariablePseudoConstructorResolvesScope", () => {
    const network = ExpandedToAST(
      'a = 5\nfinal = numberAdd(Variable("a"), 1)'
    ) as TypeAST.NetworkCards;
    const finalNode = network.definitions[1]!.node as TypeAST.Curried;
    expect(finalNode.type).toBe("Curry");
    expect(finalNode.args[0]).toEqual({
      type: "Integer",
      value: "5",
      varName: "a",
    });
  });

  it("testBareVarRefKeepsDefinitionName", () => {
    const network = ExpandedToAST("a = 5\nfinal = a") as TypeAST.NetworkCards;
    expect(network.definitions[0]!.node.varName).toBe("a");
    expect(network.definitions[1]!.node.varName).toBe("final");
    const expanded = ASTToExpanded(network);
    expect(expanded).toContain("a = 5");
    expect(expanded).toContain("final = 5");
    const back = ExpandedToAST(expanded);
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testMixedListNormalizesInExpanded", () => {
    const ast = ExpandedToAST(
      "a = [1, numberAdd(5, 1), numberAdd(2, 3)]"
    ) as TypeAST.NetworkCards;
    expect(ast.type).toBe("NetworkCards");
    // hoisted derived elements become definitions; the segment keeps its name
    expect(ast.definitions.map((d) => d.name)).toEqual(["var0", "var1", "a"]);

    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("var0 = numberAdd(5, 1)");
    expect(expanded).toContain("var1 = numberAdd(2, 3)");
    expect(expanded).toContain("a = listConcat");
    expect(expanded).toContain(
      "operatorMap(NetworkReader.variableValueById, [2, 5])"
    );

    const back = ExpandedToAST(expanded) as TypeAST.NetworkCards;
    const backJson = JSON.stringify(back);
    expect(backJson).toContain('"value":"2"');
    expect(backJson).toContain('"value":"5"');
  });

  it("testMixedListSingleDerivedInExpanded", () => {
    const ast = ExpandedToAST(
      "a = [1, numberAdd(5, 1), 2]"
    ) as TypeAST.NetworkCards;
    // single derived element stays in-tree via append, no hoisting
    expect(ast.definitions.map((d) => d.name)).toEqual(["a"]);
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("numberAdd(5, 1)");
    expect(expanded).toContain("listAppend([], ");
    expect(expanded).toContain("a = listConcat");
  });

  it("testTypedDefinitionTypePrefix", () => {
    const ast = rootOf(ExpandedToAST("x :: Integer = 5"));
    expect(ast.varName).toBe("x");
    expect((ast as TypeAST.Integer).value).toBe("5");
  });

  it("testTypedDefinitionTypeSuffix", () => {
    const ast = rootOf(ExpandedToAST('x = "hello" :: String'));
    expect(ast.varName).toBe("x");
    expect((ast as TypeAST.String).value).toBe("hello");
  });

  it("testTypedDefinitionListAcceptsAnyList", () => {
    const ast = rootOf(ExpandedToAST("x = [1, 2] :: List"));
    expect(ast.varName).toBe("x");
    expect(ast.type).toBe("List");
  });

  it("testTypedDefinitionAnyMatchesEverything", () => {
    const ast = rootOf(ExpandedToAST("x :: Any = true"));
    expect((ast as TypeAST.Boolean).value).toBe(true);
  });

  it("testTypedDefinitionCaseInsensitive", () => {
    const ast = rootOf(ExpandedToAST("x = 1.5 :: double"));
    expect(ast.type).toBe("Double");
  });

  it("testTypedDefinitionMultipleLines", () => {
    const input = `
total :: Integer = 3
label = "id" :: String
final = total
`;
    const ast = ExpandedToAST(input.trim()) as TypeAST.NetworkCards;
    expect(ast.definitions.map((d) => d.name)).toEqual([
      "total",
      "label",
      "final",
    ]);
    expect((ast.definitions[0]!.node as TypeAST.Integer).value).toBe("3");
    expect((ast.definitions[1]!.node as TypeAST.String).value).toBe("id");
  });

  it("testTypedDefinitionMismatchThrows", () => {
    expect(() => ExpandedToAST('x :: Integer = "oops"')).toThrow(
      /declared as type "Integer" but the expression has type "String"/
    );
    expect(() => ExpandedToAST("y = [1, 2] :: Integer")).toThrow(
      /declared as type "Integer" but the expression has type "List"/
    );
  });

  it("testTypedDefinitionUnknownTypeThrows", () => {
    expect(() => ExpandedToAST("x :: Widget = 5")).toThrow(
      /Unknown declared type/
    );
  });

  it("testTypedDefinitionInvalidNameThrows", () => {
    expect(() => ExpandedToAST("bad name :: Integer = 5")).toThrow(
      /Invalid variable name/
    );
    expect(() => ExpandedToAST("bad(name) :: Integer = 5")).toThrow(
      /Invalid variable name/
    );
  });

  it("testTypedDefinitionSuffixWithLambdaParams", () => {
    expect(() => ExpandedToAST("bad name = 5 :: Integer")).toThrow(
      /declared as type "Integer"/
    );

    const ast = rootOf(ExpandedToAST("bad name = 5"));
    expect(ast.varName).toBe("bad");
    expect(ast.type).toBe("Curry");
    expect(ast).toEqual(rootOf(ExpandedToAST("bad = name => 5")));
  });

  it("testNoDuplicateCardsWhenNamedVarReferencedInLambda", () => {
    const input = `
genomePath = ""
beeGenome = pipe itemNBT (nbtPathMatchFirst genomePath)
matchesFilter = (f) => (i) => == (beeGenome f) (beeGenome i)
`;
    const ast = ExpandedToAST(input.trim());
    const expanded = ASTToExpanded(ast);

    expect(expanded).not.toContain("nbtPathMatchFirstByGenomePathWithItemNBT");
    expect(expanded).toContain("beeGenome = operatorPipe(itemStackNBT,");
    expect(expanded).toContain("operatorPipe(beeGenome, anyEquals)");
    expect(expanded).toContain("apply(operatorPipe, beeGenome)");
  });

  it.each(["Condensed", "CodeLine"] as const)(
    "testEqPrefixedVarNamesRoundTrip (%s style)",
    (style) => {
      const input = `
genomePath = ""
beeGenome = pipe itemNBT (nbtPathMatchFirst genomePath)
matchesFilter = (f) => (i) => == (beeGenome f) (beeGenome i)
`;
      const ast = rootOf(ExpandedToAST(input.trim()));
      const expanded = ASTToExpanded(ast, style);

      expect(expanded).toContain('Variable("==WithBeeGenome")');
      expect(expanded).not.toMatch(/\n==\S+ =/);

      const backAst = rootOf(ExpandedToAST(expanded));
      deleteNestedVars(backAst);
      deleteNestedVars(ast);
      expect(JSON.parse(JSON.stringify(backAst))).toEqual(
        JSON.parse(JSON.stringify(ast))
      );
    }
  );

  it.each([
    ["it's", 'Variable("it\'s") = 5'],
    ["x{y", 'Variable("x{y") = 5'],
    ["}y", 'Variable("}y") = 5'],
    ["{}", 'Variable("{}") = 5'],
    ["5", 'Variable("5") = 5'],
    ["-5", 'Variable("-5") = 5'],
    ["5l", 'Variable("5l") = 5'],
    ["5.0", 'Variable("5.0") = 5'],
    ["true", 'Variable("true") = 5'],
    ["false", 'Variable("false") = 5'],
  ] as const)(
    "testInvalidCharVarNamesWrapAndRoundTrip (%s)",
    (name, expectedLine) => {
      const ast: TypeAST.NetworkCards = {
        type: "NetworkCards",
        definitions: [
          { name, node: { type: "Integer", value: "5", varName: name } },
          { name: "final", node: { type: "Variable", name, varName: "final" } },
        ],
      };
      const expanded = ASTToExpanded(ast);

      expect(expanded).toContain(expectedLine);
      expect(expanded.split("\n")).not.toContain(`${name} = 5`);

      const back = ExpandedToAST(expanded) as TypeAST.NetworkCards;
      expect(back.definitions.map((d) => d.name)).toEqual([name, "final"]);
      expect(back.definitions[0]!.node).toEqual({
        type: "Integer",
        value: "5",
        varName: name,
      });
      expect(back.definitions[1]!.node).toEqual({
        type: "Integer",
        value: "5",
        varName: "final",
      });
    }
  );

  it.each(["{}", "5", "-5", "5l", "5.0", "true", "false"])(
    "testLiteralLikeVarNameRoundTripThroughVariableWrapper (%s)",
    (name) => {
      const input = `Variable(${JSON.stringify(name)}) = 5\nfinal = Variable(${JSON.stringify(name)})`;
      const network = ExpandedToAST(input) as TypeAST.NetworkCards;
      expect(network.definitions.map((d) => d.name)).toEqual([name, "final"]);
      expect(network.definitions[0]!.node).toEqual({
        type: "Integer",
        value: "5",
        varName: name,
      });
      expect(network.definitions[1]!.node).toEqual({
        type: "Integer",
        value: "5",
        varName: "final",
      });

      const expanded = ASTToExpanded(network);
      expect(expanded).toContain(`Variable(${JSON.stringify(name)}) = 5`);
      expect(expanded.split("\n")).not.toContain(`${name} = 5`);

      const back = ExpandedToAST(expanded) as TypeAST.NetworkCards;
      expect(JSON.stringify(back)).toBe(JSON.stringify(network));
    }
  );

  it("testLambdaDefinitionNewFormMatchesArrowForm", () => {
    const newForm = "getGenome path bee = nbtPathMatchAll path (itemNBT bee)";
    const arrowForm =
      "getGenome = path => bee => nbtPathMatchAll path (itemNBT bee)";

    const newAst = rootOf(ExpandedToAST(newForm));
    const arrowAst = rootOf(ExpandedToAST(arrowForm));
    expect(newAst.varName).toBe("getGenome");
    expect(arrowAst.varName).toBe("getGenome");
    deleteNestedVars(newAst);
    deleteNestedVars(arrowAst);
    expect(JSON.parse(JSON.stringify(newAst))).toEqual(
      JSON.parse(JSON.stringify(arrowAst))
    );
  });

  it("testLambdaDefinitionNewFormSingleParam", () => {
    const ast = rootOf(ExpandedToAST("inc x = numberAdd x 1"));
    expect(ast.varName).toBe("inc");
    expect(ast).toEqual(rootOf(ExpandedToAST("inc = x => numberAdd x 1")));
  });

  it("testLambdaDefinitionNewFormWithTypedRhs", () => {
    const ast = rootOf(ExpandedToAST("add x y = numberAdd x y :: Operator"));
    expect(ast.varName).toBe("add");
    expect(ASTToExpanded(ast)).toContain("add ::");
    expect(ASTToExpanded(ast)).toContain("add = numberAdd");
  });

  it("testLambdaDefinitionNewFormMultipleDefinitions", () => {
    const input = `
genomePath = ""
beeGenome = pipe itemNBT (nbtPathMatchFirst genomePath)
matches a b = logicalAnd (beeGenome a) (beeGenome b)
final = matches "a" "b"
`;
    const ast = ExpandedToAST(input.trim()) as TypeAST.NetworkCards;
    expect(ast.definitions.map((d) => d.name)).toEqual([
      "genomePath",
      "beeGenome",
      "matches",
      "final",
    ]);
    expect(ast.definitions[2]!.node.varName).toBe("matches");
  });

  it("testLambdaDefinitionNewFormRejectsUnknownVar", () => {
    expect(() => ExpandedToAST("foo a = bar a")).toThrow();
  });

  it("testLambdaDefinitionNewFormRoundTrips", () => {
    const newForm = "getGenome path bee = nbtPathMatchAll path (itemNBT bee)";
    const ast = rootOf(ExpandedToAST(newForm));
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("getGenome ::");
    expect(expanded).toContain("getGenome = ");
    const backAst = rootOf(ExpandedToAST(expanded));
    deleteNestedVars(backAst);
    deleteNestedVars(ast);
    expect(JSON.parse(JSON.stringify(backAst))).toEqual(
      JSON.parse(JSON.stringify(ast))
    );
  });

  it("bare signature tokens are Any<X> sugar and must land on generic slots", () => {
    expect(() => ExpandedToAST("var1 :: A -> B\nvar1 = 5")).toThrow(
      /but the expression has a different signature/
    );
  });

  it("validates a matching single-name standalone signature", () => {
    const ast = rootOf(ExpandedToAST("x :: Integer\nx = 5"));
    expect((ast as TypeAST.Integer).value).toBe("5");
  });

  it("rejects a mismatched single-name standalone signature", () => {
    expect(() => ExpandedToAST("x :: Boolean\nx = 5")).toThrow(
      /but the expression has a different signature/
    );
  });

  it("accepts Any-wrapped and bare variable tokens on generic slots", () => {
    expect(() => ExpandedToAST("x :: List<A>\nx = 5")).toThrow(
      /but the expression has a different signature/
    );
    expect(() => ExpandedToAST("x :: Any\nx = 5")).not.toThrow();
    expect(() => ExpandedToAST("x :: Any<A>\nx = 5")).toThrow(
      /but the expression has a different signature/
    );
    expect(() =>
      ExpandedToAST('getByPipe :: List<Any>\ngetByPipe = [Item("")]')
    ).not.toThrow();
  });

  it("rejects a standalone signature for an undefined variable", () => {
    expect(() => ExpandedToAST("missing :: Integer\nx = 5")).toThrow(
      /variable "missing" is not defined/
    );
  });

  it("testRedefinitionSameASTAllowed", () => {
    const network = ExpandedToAST(
      "x = 5\nx = 5\nfinal = x"
    ) as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual(["x", "final"]);
    expect(network.definitions[0]!.node).toEqual({
      type: "Integer",
      value: "5",
      varName: "x",
    });
    expect(network.definitions[1]!.node).toEqual({
      type: "Integer",
      value: "5",
      varName: "final",
    });
    const expanded = ASTToExpanded(network);
    expect(expanded.split("\n").filter((l) => l.includes("="))).toEqual([
      "x = 5",
      "final = 5",
    ]);
    const back = ExpandedToAST(expanded);
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testRedefinitionSameASTViaEquivalentExpression", () => {
    const network = ExpandedToAST(
      "x = numberAdd(2, 3)\nx = numberAdd(2, 3)\nfinal = x"
    ) as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual(["x", "final"]);
    const back = ExpandedToAST(ASTToExpanded(network));
    expect(JSON.stringify(back)).toBe(JSON.stringify(network));
  });

  it("testRedefinitionSameASTViaVariableReference", () => {
    const network = ExpandedToAST(
      "a = 5\nx = a\nx = 5\nfinal = x"
    ) as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual(["a", "x", "final"]);
    expect(network.definitions[2]!.node).toEqual({
      type: "Integer",
      value: "5",
      varName: "final",
    });
  });

  it("testRedefinitionDifferentASTThrows", () => {
    expect(() => ExpandedToAST("x = 5\nx = 6")).toThrow(
      /already defined; redefinition is only allowed if the new definition resolves to the same AST/
    );
  });

  it("testRedefinitionDifferentASTThrowsViaExpression", () => {
    expect(() => ExpandedToAST("x = 5\nx = numberAdd(5, 1)")).toThrow(
      /already defined/
    );
  });

  it("testRedefinitionSameASTTypedDefinitionAllowed", () => {
    const network = ExpandedToAST(
      "x :: Integer = 5\nx :: Integer = 5\nfinal = x"
    ) as TypeAST.NetworkCards;
    expect(network.definitions.map((d) => d.name)).toEqual(["x", "final"]);
  });

  it("testRedefinitionDifferentASTTypedDefinitionThrows", () => {
    expect(() => ExpandedToAST("x :: Integer = 5\nx :: Integer = 6")).toThrow(
      /already defined/
    );
  });
});
