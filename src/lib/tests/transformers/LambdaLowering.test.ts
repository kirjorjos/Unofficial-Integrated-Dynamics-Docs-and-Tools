import { CondensedToAST } from "lib/transformers/Condensed";
import { astChildren } from "lib/transformers/astTraversal";
import { astContentKey } from "lib/transformers/NetworkCards";
import {
  lowerLambda,
  lowerLambdasInAst,
} from "lib/transformers/lambdaLowering";

const lower = (source: string): string =>
  astContentKey(lowerLambda(CondensedToAST(source) as TypeAST.Lambda));

describe("TestLambdaLowering", () => {
  it("lowers a partial application like the old abstraction", () => {
    expect(lower("x => add(x, 1)")).toBe(
      "Curry:Operator:ARITHMETIC_ADDITION(Integer:1)"
    );
  });

  it("preserves swapped argument order with a flip", () => {
    expect(lower("(x, y) => subtract(y, x)")).toBe(
      "Flip(Operator:ARITHMETIC_SUBTRACTION)"
    );
  });

  it("keeps repeated parameters", () => {
    expect(lower("x => add(x, x)")).toBe(
      "Pipe2(Operator:GENERAL_IDENTITY,Operator:GENERAL_IDENTITY,Operator:ARITHMETIC_ADDITION)"
    );
  });

  it("lowers three parameters", () => {
    expect(lower("(a, b, c) => add(add(a, b), c)")).toBe(
      "Pipe(Operator:ARITHMETIC_ADDITION,Curry:Flip(Operator:OPERATOR_PIPE)(Operator:ARITHMETIC_ADDITION))"
    );
  });

  it("lowers operator-typed parameters to the operator value", () => {
    expect(lower("(f, x) => apply(f, x)")).toBe("Operator:OPERATOR_APPLY");
  });

  it("lowers nested captures inside-out", () => {
    const lowered = lowerLambdasInAst(CondensedToAST("x => y => add(x, y)"));
    expect(astContentKey(lowered)).toBe("Operator:ARITHMETIC_ADDITION");
  });

  it("lowers constant, identity and reference bodies", () => {
    expect(lower("x => 5")).toBe("Curry:Operator:GENERAL_CONSTANT(Integer:5)");
    expect(lower("x => x")).toBe("Operator:GENERAL_IDENTITY");
    expect(lower("x => @5")).toBe(
      "Curry:Operator:GENERAL_CONSTANT(Variable:5::)"
    );
  });

  it("does not mutate the input lambda", () => {
    const lambda = CondensedToAST("x => y => add(x, y)") as TypeAST.Lambda;
    const before = JSON.stringify(lambda);
    lowerLambda(lambda);
    expect(JSON.stringify(lambda)).toBe(before);
  });

  it("lowers lambdas nested in call arguments", () => {
    const lowered = lowerLambdasInAst(
      CondensedToAST("map(x => add(x, 1), [1, 2])")
    );
    let hasLambda = false;
    const walk = (node: TypeAST.AST): void => {
      if (node.type === "Lambda" || node.type === "Param") hasLambda = true;
      for (const child of astChildren(node)) walk(child);
    };
    walk(lowered);
    expect(hasLambda).toBe(false);
    expect(astContentKey(lowered)).toContain("OPERATOR_MAP");
  });

  it("reports every blocker instead of emitting partial output", () => {
    expect(() =>
      lowerLambda(CondensedToAST("x => [x]") as TypeAST.Lambda)
    ).toThrow(/Could not lower the lambda:\n- cannot lower a lambda parameter/);
  });

  it("rejects an out-of-range parameter", () => {
    const lambda: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 3 },
    };
    expect(() => lowerLambda(lambda)).toThrow(/out of range/);
  });

  it("rejects network cards inside a lambda body", () => {
    const lambda: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: {
        type: "NetworkCards",
        definitions: [{ name: "a", node: { type: "Param", index: 0 } }],
      },
    };
    expect(() => lowerLambda(lambda)).toThrow(/cannot appear inside a lambda/);
  });
});
