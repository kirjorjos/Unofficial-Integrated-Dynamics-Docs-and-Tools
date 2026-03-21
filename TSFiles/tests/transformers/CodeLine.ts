import { ASTToCodeLine, CodeLineToAST } from "../../transformers/CodeLine";

describe("TestCodeLineTransformer", () => {
  it("testBlock", () => {
    const code = 'Block("minecraft:stone", 64)';
    const ast = CodeLineToAST(code);
    expect(ast.type).toBe("Block");
    expect((ast as TypeAST.Block).value["id"]).toBe("minecraft:stone");
    expect((ast as TypeAST.Block).value["size"]).toBe("64");
    expect(ASTToCodeLine(ast)).toBe(code);
  });

  it("testLambda", () => {
    const code = "x => (numberAdd x 1)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("(operatorFlip numberAdd) 1");
  });

  it("testLambdaShort", () => {
    const code = "\\x.numberAdd x 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("(operatorFlip numberAdd) 1");
  });

  it("testLambdaArrow", () => {
    const code = "x -> numberAdd x 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("(operatorFlip numberAdd) 1");
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
    expect(ASTToCodeLine(ast)).toBe("(operatorFlip numberAdd) 1");
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
    const code = "x => (booleanNot x) (numberIncrement x)";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe(
      "operatorPipe2 anyIdentity numberIncrement booleanNot"
    );
  });

  it("testLambdaVarWithDot", () => {
    const code = "\\var.with.dot.numberAdd var.with.dot 1";
    const ast = CodeLineToAST(code);
    expect(ASTToCodeLine(ast)).toBe("(operatorFlip numberAdd) 1");
  });

  it("testComplicated2", () => {
    const code =
      "pipe (pipe (pipe lt (pipe listLength)) map) (flip pipe (reduce1 and)) min";
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
      "operatorPipe (operatorPipe numberAdd 1) multiply",
    ];
    for (const c of cases) {
      const ast = CodeLineToAST(c);
      const back = ASTToCodeLine(ast);
      expect(ASTToCodeLine(CodeLineToAST(back))).toBe(back);
    }
  });
});
