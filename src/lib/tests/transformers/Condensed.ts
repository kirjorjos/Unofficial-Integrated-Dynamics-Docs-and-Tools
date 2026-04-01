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
    expect(ASTToCondensed(ast)).toBe("apply(operatorFlip(numberAdd), 1)");
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
    expect(ASTToCondensed(ast)).toBe("apply(operatorFlip(numberAdd), 1)");
  });

  it("testLambdaArrow", () => {
    const ast = CondensedToAST("x -> numberAdd(x, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(operatorFlip(numberAdd), 1)");
  });

  it("testLambdaVarWithDot", () => {
    const ast = CondensedToAST("\\var.with.dot.numberAdd(var.with.dot, 1)");
    expect(ASTToCondensed(ast)).toBe("apply(operatorFlip(numberAdd), 1)");
  });
});
