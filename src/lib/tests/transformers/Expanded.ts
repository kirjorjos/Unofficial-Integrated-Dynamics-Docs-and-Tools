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
var1 :: A -> B
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
      "operatorApply3 :: Operator<a<Operator<b<c<Any<typeID14>> → (d<e<Any<typeID15>> → (f<g<Any<typeID16>> → h<Any<typeID17>>>)>)>> → (i<j<Any<typeID22>> → (k<e<Any<typeID15>> → (l<g<Any<typeID16>> → h<Any<typeID17>>>)>)>)>>\noperatorApply3 = operatorApply3";
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
    expect(expanded).toContain("worldTime ::");
    expect(expanded).toContain("a<Long>");
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
    expect(ASTToCodeLine(network)).toBe("5; numberAdd 0 1; [0, 2]");
    expect(ASTToCondensed(network)).toBe("5; numberAdd(0, 1); [0, 2]");
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
});
