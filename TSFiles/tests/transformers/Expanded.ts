import { ASTToExpanded, ExpandedToAST } from "../../transformers/Expanded";
import { ASTToCodeLine, CodeLineToAST } from "../../transformers/CodeLine";

describe("TestExpandedTransformer", () => {
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
    expect(((ast as TypeAST.Curried).args[1] as TypeAST.Integer).value).toBe(
      "5"
    );
  });

  it("testShadowingOperatorThrows", () => {
    const input = `
operatorPipe = 5
`;
    expect(() => ExpandedToAST(input.trim())).toThrow();
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
    delete backAst.varName;
    expect(ASTToCodeLine(backAst, true)).toBe(ASTToCodeLine(ast, true));
  });

  it("testLargeCurryDecomposition", () => {
    const code =
      "apply (operatorPipe2 numberIncrement numberIncrement numberAdd) 5";
    const ast = CodeLineToAST(code);
    const expanded = ASTToExpanded(ast, "CodeLine");

    const lines = expanded.split("\n").filter((l) => l.includes("="));
    expect(lines.length).toBeGreaterThanOrEqual(2);

    const backAst = ExpandedToAST(expanded);
    const clean = (node: TypeAST.AST) => {
      if (node.varName) delete node.varName;
      switch (node.type) {
        case "Curry":
          clean(node.base);
          node.args.forEach(clean);
          break;
        case "Pipe":
          clean(node.op1);
          clean(node.op2);
          break;
        case "Pipe2":
          clean(node.op1);
          clean(node.op2);
          clean(node.op3);
          break;
        case "Flip":
          clean(node.arg);
          break;
      }
    };
    const ast1 = JSON.parse(JSON.stringify(ast)) as TypeAST.AST;
    const ast2 = JSON.parse(JSON.stringify(backAst)) as TypeAST.AST;
    clean(ast1);
    clean(ast2);
    expect(ast2).toEqual(ast1);
  });
});
