import {
  ASTToCompressed,
  CompressedToAST,
  OLD_COMPRESSED_CODE_MESSAGE,
} from "lib/transformers/Compressed";
import { astContentKey } from "lib/transformers/NetworkCards";
import { visitAst } from "lib/transformers/astTraversal";

const stripVarNames = (ast: TypeAST.AST): TypeAST.AST => {
  visitAst(ast, (node) => {
    delete node.varName;
  });
  return ast;
};

const roundTrip = (ast: TypeAST.AST): TypeAST.AST =>
  stripVarNames(CompressedToAST(ASTToCompressed(ast)));

describe("TestCompressedLambda", () => {
  it("round-trips a zero parameter lambda", () => {
    const ast: TypeAST.Lambda = {
      type: "Lambda",
      params: [],
      body: { type: "Integer", value: "5" },
    };
    expect(roundTrip(ast)).toEqual(ast);
  });

  it("round-trips parameter names and types in order", () => {
    const ast: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x", type: "integer" }, { name: "y" }],
      body: { type: "Param", index: 1, name: "y" },
    };
    expect(roundTrip(ast)).toEqual(ast);
  });

  it("round-trips binder depth and nested lambdas", () => {
    const ast: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: {
        type: "Lambda",
        params: [{ name: "y" }],
        body: {
          type: "Curry",
          base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
          args: [
            { type: "Param", index: 0, binderDepth: 1, name: "x" },
            { type: "Param", index: 0, name: "y" },
          ],
        },
      },
    };
    expect(roundTrip(ast)).toEqual(ast);
  });

  it("round-trips Lambda.text including unicode and newlines", () => {
    const ast: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 0, name: "x" },
      text: 'x => add(x, 1)\n-- ünïcode ✓ "quoted"',
    };
    expect(roundTrip(ast)).toEqual(ast);
  });

  it("distinguishes absent and empty text", () => {
    const without: TypeAST.Lambda = {
      type: "Lambda",
      params: [],
      body: { type: "Integer", value: "1" },
    };
    const withEmpty: TypeAST.Lambda = { ...without, text: "" };
    expect(roundTrip(without)).toEqual(without);
    expect(roundTrip(withEmpty)).toEqual(withEmpty);
    expect(roundTrip(withEmpty)).not.toEqual(roundTrip(without));
  });

  it("keeps text in the content key", () => {
    const base: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 0, name: "x" },
    };
    expect(astContentKey(base)).not.toBe(
      astContentKey({ ...base, text: "x => x" })
    );
    expect(astContentKey({ ...base, text: "a" })).not.toBe(
      astContentKey({ ...base, text: "b" })
    );
  });

  it("round-trips Variable id, label, both and valueType", () => {
    for (const node of [
      { type: "Variable" as const, id: "5" },
      { type: "Variable" as const, label: "foo" },
      { type: "Variable" as const, id: "5", label: "foo" },
      { type: "Variable" as const, label: "foo", valueType: "integer" },
    ]) {
      expect(roundTrip(node)).toEqual(node);
    }
  });

  it("rejects old codes with a clear message", () => {
    expect(() => CompressedToAST("AAAA")).toThrow(OLD_COMPRESSED_CODE_MESSAGE);
  });
});
