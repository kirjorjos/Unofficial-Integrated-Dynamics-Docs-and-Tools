/**
 * Test the Condensed transformer.
 * @author kirjorjos
 */

import {
  ASTToCondensed,
  CondensedToAST,
  tokenize,
} from "../../transformers/Condensed";

describe("TestCondensedTransformer", () => {
  describe("TestTokenize", () => {
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
      const tokens = tokenize(
        '"string with \\"quote\\" and \\\\\\\\ backslash"'
      );
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

    it("testTokenizeJSON", () => {
      const tokens = tokenize(
        'Item({"id":"minecraft:stone", "tag":{"test":1}})'
      );
      expect(tokens).toEqual([
        { type: "identifier", value: "Item" },
        { type: "structural", value: "(" },
        { type: "nbt", value: '{"id":"minecraft:stone", "tag":{"test":1}}' },
        { type: "structural", value: ")" },
      ]);
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
  });

  describe("TestCondensedToAST", () => {
    it("testLiterals", () => {
      expect(CondensedToAST("1")).toEqual({ type: "Integer", value: "1" });
      expect(CondensedToAST("2l")).toEqual({ type: "Long", value: "2" });
      expect(CondensedToAST("3.0")).toEqual({ type: "Double", value: "3.0" });
      expect(CondensedToAST('"hi"')).toEqual({ type: "String", value: "hi" });
      expect(CondensedToAST("true")).toEqual({ type: "Boolean", value: true });
      expect(CondensedToAST("null")).toEqual({ type: "Null" });
    });

    it("testPseudoOperators", () => {
      const ast = CondensedToAST('Item("minecraft:stone")');
      expect(ast).toEqual({ type: "Item", value: { id: "minecraft:stone" } });
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

    it("testLambdaConstant", () => {
      const ast = CondensedToAST("x => 5");
      expect(ast).toEqual({
        type: "Curry",
        base: { type: "Operator", opName: "GENERAL_CONSTANT" },
        args: [{ type: "Integer", value: "5" }],
      });
    });

    it("testLambdaFlip", () => {
      const ast = CondensedToAST("(a, b) => stringConcat(b, a)");
      expect(ASTToCondensed(ast)).toBe("flip(stringConcat)");
    });

    it("testLambdaActualFlip", () => {
      const ast = CondensedToAST('(a, b) => stringConcat(b, "hi")');
      expect(ASTToCondensed(ast)).toBeDefined();
    });

    it("testLambdaClash", () => {
      // 'anyEquals' is a nickname for relational_equals
      expect(() => CondensedToAST("anyEquals => anyEquals")).toThrow(
        'Variable name "anyEquals" clashes with an existing operator nickname'
      );
    });
  });

  describe("TestASTToCondensed", () => {
    it("testRoundTrip", () => {
      const cases = [
        "1",
        "2l",
        "3.0",
        '"hi"',
        "true",
        "null",
        'Item({"id":"minecraft:stone"})',
        "apply(anyEquals, 8)",
        "pipe(arithmeticIncrement, arithmeticIncrement)",
      ];
      for (const c of cases) {
        const ast = CondensedToAST(c);
        const back = ASTToCondensed(ast);
        const ast2 = CondensedToAST(back);
        expect(ast2).toEqual(ast);
      }
    });

    it("testLambdaFork", () => {
      const ast = CondensedToAST("x => arithmeticAddition(x, x)");
      expect(ASTToCondensed(ast)).toBe(
        "pipe2(anyIdentity, anyIdentity, numberAdd)"
      );
    });

    it("testSpecificInteractNames", () => {
      const ast: TypeAST.BaseOperator = {
        type: "Operator",
        opName: "LOGICAL_AND",
      };
      expect(ASTToCondensed(ast)).toBe("booleanAnd");
    });
  });
});
