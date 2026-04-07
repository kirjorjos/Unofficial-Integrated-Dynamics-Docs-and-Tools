import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
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

  it("testNestedScoping", () => {
    const input = `
varName1 = pipe operatorPipe operatorPipe2
varName2 = pipe varName1 operatorFlip
final = apply varName2 3
`;
    const ast = ExpandedToAST(input.trim());

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
    const ast = ExpandedToAST(input.trim());
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
      type: "Operator",
      opName: "OPERATOR_PIPE",
      varName: "operatorPipe",
    });
  });

  it("testInvalidVarNameThrows", () => {
    const input = `
invalid!name = 5
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
    const ast = ExpandedToAST(input.trim());
    expect(ast.varName).toBe("tooltipContainsCommon");
    expect(ast.type).toBe("Pipe");
  });

  it("testMixedStyle", () => {
    const input = `
var1 = pipe numberIncrement numberMultiply
var2 = apply(var1, 10)
final = apply(numberAdd, var2)
`;
    const ast = ExpandedToAST(input.trim());
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

    const backAst = ExpandedToAST(expanded);
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

    const backAst = ExpandedToAST(expanded);
    const ast1 = JSON.parse(JSON.stringify(ast)) as TypeAST.AST;
    const ast2 = JSON.parse(JSON.stringify(backAst)) as TypeAST.AST;
    deleteNestedVars(ast1);
    deleteNestedVars(ast2);
    expect(ast2).toEqual(ast1);
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
    expect(exp3).toContain("numberAddBy5 ::");
    expect(exp3).toContain("{numberAddBy5}by10 ::");

    const ast4 = CodeLineToAST("apply2 numberAdd 5 10");
    const exp4 = ASTToExpanded(ast4);
    expect(exp4).toContain("{numberAddBy5}by10 ::");

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
    expect(ast).toEqual({
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
    const ast = ExpandedToAST("final = flipListContainsPredicate");
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
});
