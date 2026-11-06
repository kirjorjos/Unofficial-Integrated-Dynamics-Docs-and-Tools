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
  it("lowersAPartialApplicationLikeTheOldAbstraction", () => {
    expect(lower("x => add(x, 1)")).toBe(
      "Curry:Operator:ARITHMETIC_ADDITION(Integer:1)"
    );
  });

  it("preservesSwappedArgumentOrderWithAFlip", () => {
    expect(lower("(x, y) => subtract(y, x)")).toBe(
      "Flip(Operator:ARITHMETIC_SUBTRACTION)"
    );
  });

  it("keepsRepeatedParameters", () => {
    expect(lower("x => add(x, x)")).toBe(
      "Pipe2(Operator:GENERAL_IDENTITY,Operator:GENERAL_IDENTITY,Operator:ARITHMETIC_ADDITION)"
    );
  });

  it("lowersThreeParameters", () => {
    expect(lower("(a, b, c) => add(add(a, b), c)")).toBe(
      "Pipe(Operator:ARITHMETIC_ADDITION,Curry:Flip(Operator:OPERATOR_PIPE)(Operator:ARITHMETIC_ADDITION))"
    );
  });

  it("lowersOperatorTypedParametersToTheOperatorValue", () => {
    expect(lower("(f, x) => apply(f, x)")).toBe("Operator:OPERATOR_APPLY");
  });

  it("lowersNestedCapturesInsideOut", () => {
    const lowered = lowerLambdasInAst(CondensedToAST("x => y => add(x, y)"));
    expect(astContentKey(lowered)).toBe("Operator:ARITHMETIC_ADDITION");
  });

  it("lowersConstantIdentityAndReferenceBodies", () => {
    expect(lower("x => 5")).toBe("Curry:Operator:GENERAL_CONSTANT(Integer:5)");
    expect(lower("x => x")).toBe("Operator:GENERAL_IDENTITY");
    expect(lower("x => @5")).toBe(
      "Curry:Operator:GENERAL_CONSTANT(Variable:5::)"
    );
  });

  it("doesNotMutateTheInputLambda", () => {
    const lambda = CondensedToAST("x => y => add(x, y)") as TypeAST.Lambda;
    const before = JSON.stringify(lambda);
    lowerLambda(lambda);
    expect(JSON.stringify(lambda)).toBe(before);
  });

  it("lowersLambdasNestedInCallArguments", () => {
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

  it("reportsEveryBlockerInsteadOfEmittingPartialOutput", () => {
    expect(() =>
      lowerLambda(CondensedToAST("x => Delay(x, 1)") as TypeAST.Lambda)
    ).toThrow(/Could not lower the lambda:\n- cannot lower a lambda parameter/);
  });

  it("lowersListBodiesWithPlacementBasedAppendAndConcat", () => {
    expect(lower("x => [x, 1]")).toContain("LIST_APPEND");
    expect(lower("x => [x, 1]")).toContain("LIST_CONCAT");
    expect(lower("x => [1, x]")).toContain("LIST_CONCAT");
  });

  it("guardsDuplicateParameterNamesWithChoiceAndError", () => {
    const key = lower("(x, x) => x");
    expect(key).toContain("GENERAL_CHOICE");
    expect(key).toContain("RELATIONAL_EQUALS");
    expect(key).toContain("STRING_ERROR");
  });

  it("rejectsAnOutOfRangeParameter", () => {
    const lambda: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 3 },
    };
    expect(() => lowerLambda(lambda)).toThrow(/out of range/);
  });

  it("rejectsNetworkCardsInsideALambdaBody", () => {
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
