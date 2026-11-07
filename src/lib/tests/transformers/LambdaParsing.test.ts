import { CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ExpandedToAST } from "lib/transformers/Expanded";

const asLambda = (ast: TypeAST.AST): TypeAST.Lambda => {
  expect(ast.type).toBe("Lambda");
  return ast as TypeAST.Lambda;
};

describe("TestLambdaParsing", () => {
  it("parsesASingleParameterInCondensed", () => {
    const lambda = asLambda(CondensedToAST("x => add(x, 1)"));
    expect(lambda.params).toEqual([{ name: "x" }]);
    expect(lambda.body).toEqual({
      type: "Curry",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: [
        { type: "Param", index: 0, name: "x" },
        { type: "Integer", value: "1" },
      ],
    });
  });

  it("keepsParameterOrderForMultipleParameters", () => {
    const lambda = asLambda(CondensedToAST("(x, y) => subtract(y, x)"));
    expect(lambda.params.map((param) => param.name)).toEqual(["x", "y"]);
    expect(lambda.body).toMatchObject({
      args: [
        { type: "Param", index: 1, name: "y" },
        { type: "Param", index: 0, name: "x" },
      ],
    });
  });

  it("acceptsTypedAndGenericParameterAnnotations", () => {
    expect(asLambda(CondensedToAST("(x: integer) => x")).params).toEqual([
      { name: "x", type: "integer" },
    ]);
    expect(asLambda(CondensedToAST("(x: List<integer>) => x")).params).toEqual([
      { name: "x", type: "List<integer>" },
    ]);
  });

  it("acceptsZeroParameterLambdas", () => {
    const lambda = asLambda(CondensedToAST("() => add(1, 2)"));
    expect(lambda.params).toEqual([]);
    expect(lambda.body.type).toBe("Curry");
  });

  it("acceptsTheArrowAndBackslashSpellings", () => {
    expect(asLambda(CondensedToAST("x -> add(x, 1)")).params).toEqual([
      { name: "x" },
    ]);
    expect(asLambda(CondensedToAST("\\x.add(x, 1)")).params).toEqual([
      { name: "x" },
    ]);
    expect(asLambda(CodeLineToAST("x => add x 1")).params).toEqual([
      { name: "x" },
    ]);
  });

  it("parsesLambdasAsCallArgumentsInCodeLine", () => {
    const ast = CodeLineToAST("map (x => add x 1) [1, 2]");
    expect(ast.type).toBe("Curry");
    const curry = ast as TypeAST.Curried;
    expect(curry.args[0]!.type).toBe("Lambda");
  });

  it("parsesNestedLambdasAndCaptures", () => {
    const outer = asLambda(CondensedToAST("x => y => add(x, y)"));
    const inner = asLambda(outer.body);
    expect(outer.params.map((param) => param.name)).toEqual(["x"]);
    expect(inner.params.map((param) => param.name)).toEqual(["y"]);
    expect(inner.body).toMatchObject({
      args: [
        { type: "Param", index: 0, binderDepth: 1, name: "x" },
        { type: "Param", index: 0, name: "y" },
      ],
    });
  });

  it("usesLexicalShadowingForCaptures", () => {
    const outer = asLambda(CondensedToAST("x => x => x"));
    const inner = asLambda(outer.body);
    expect(inner.body).toEqual({ type: "Param", index: 0, name: "x" });
  });

  it("keepsConstantIdentityAndReferenceBodies", () => {
    expect(asLambda(CondensedToAST("x => 5")).body).toEqual({
      type: "Integer",
      value: "5",
    });
    expect(asLambda(CondensedToAST("x => x")).body).toEqual({
      type: "Param",
      index: 0,
      name: "x",
    });
    expect(asLambda(CondensedToAST("x => @5")).body).toEqual({
      type: "Variable",
      id: "5",
    });
    expect(asLambda(CondensedToAST("x => @foo")).body).toEqual({
      type: "Variable",
      label: "foo",
    });
  });

  it("allowsDuplicateParameterNames", () => {
    const lambda = CondensedToAST("(x, x) => x") as TypeAST.Lambda;
    expect(lambda.params.map((param) => param.name)).toEqual(["x", "x"]);
    expect(lambda.body).toEqual({ type: "Param", index: 0, name: "x" });
  });

  it("rejectsUnknownAndMalformedParameterTypes", () => {
    expect(() => CondensedToAST("(x: integerr) => x")).toThrow(
      /unknown type name "integerr"/
    );
    expect(() => CondensedToAST("(x: chemicalstack) => x")).toThrow(
      /unknown type name "chemicalstack"/
    );
    expect(() => CondensedToAST("(x: List<integer) => x")).toThrow();
  });

  it("parsesTypedDefinitionParametersInExpanded", () => {
    const network = ExpandedToAST(
      "f (x: integer, y) = add(x, 1)"
    ) as TypeAST.NetworkCards;
    const lambda = asLambda(network.definitions[0]!.node);
    expect(lambda.params).toEqual([
      { name: "x", type: "integer" },
      { name: "y" },
    ]);
  });
});
