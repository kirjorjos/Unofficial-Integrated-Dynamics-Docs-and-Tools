import { CondensedToAST } from "lib/transformers/Condensed";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import {
  ASTToExpanded,
  ASTToExpandedWithSignatureOptions,
  ExpandedToAST,
} from "lib/transformers/Expanded";
import { stripAutoCurryVarNames } from "lib/transformers/inputState";

const nodeOf = (ast: TypeAST.AST): TypeAST.AST =>
  ast.type === "NetworkCards"
    ? ast.definitions[ast.definitions.length - 1]!.node
    : ast;

describe("TestExpandedLambda", () => {
  it("parsesBothDefinitionFormsIntoOneLambda", () => {
    const arrow = nodeOf(ExpandedToAST("f = (x, y) => add(x, y)"));
    const short = nodeOf(ExpandedToAST("f (x, y) = add(x, y)"));
    expect(arrow.type).toBe("Lambda");
    expect(short.type).toBe("Lambda");
    expect((arrow as TypeAST.Lambda).params.map((p) => p.name)).toEqual([
      "x",
      "y",
    ]);
    expect((short as TypeAST.Lambda).params.map((p) => p.name)).toEqual([
      "x",
      "y",
    ]);
  });

  it("keepsTheDefinitionNameFromTheLeftHandSide", () => {
    const ast = ExpandedToAST("f = x => add(x, 1)") as TypeAST.NetworkCards;
    expect(ast.definitions[0]!.node.varName).toBe("f");
  });

  it("acceptsTypedLeftHandSideParameters", () => {
    const ast = ExpandedToAST(
      "f (x: integer, y: List<integer>) = add(1, 2)"
    ) as TypeAST.NetworkCards;
    expect((ast.definitions[0]!.node as TypeAST.Lambda).params).toEqual([
      { name: "x", type: "integer" },
      { name: "y", type: "List<integer>" },
    ]);
  });

  it("namesAnonymousTopLevelLambdasDeterministically", () => {
    const printed = ASTToExpanded(
      CondensedToAST("x => numberAdd(x, 1); y => numberAdd(y, 2)")
    );
    expect(printed).toContain("lambda = x => numberAdd(x, 1)");
    expect(printed).toContain("lambda2 = y => numberAdd(y, 2)");
  });

  it("keepsNestedCapturingLambdasInline", () => {
    const printed = ASTToExpanded(
      ExpandedToAST("f = x => map(y => add(x, y), [1, 2])")
    );
    expect(printed).toContain(
      "f = x => operatorMap(y => numberAdd(x, y), [1, 2])"
    );
    expect(printed).not.toMatch(/^g = /m);
  });

  it("keepsALambdaBodyInsideItsBinderAfterACompressedRoundTrip", () => {
    const stored = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ExpandedToAST("f = x => add(x, 1)")))
    );
    const printed = ASTToExpanded(stored);
    expect(printed).toContain("f = x => numberAdd(x, 1)");
    expect(printed).not.toMatch(/^\{.*\} = /m);
  });

  it("infersUntypedParameterTypesFromHowTheBodyUsesThem (issue #171)", () => {
    const printed = ASTToExpanded(
      ExpandedToAST("out list = uniq_p list (el1 => el2 => false)")
    );
    expect(printed).toContain("out :: List<Any> → List<Any>");
  });

  it("computesFunctionSignaturesFromParameterTypes", () => {
    const untyped = ASTToExpanded(ExpandedToAST("f = x => x"));
    expect(untyped).toContain("f :: Any → Any");
    const typed = ASTToExpanded(ExpandedToAST("f = (x: integer) => x"));
    expect(typed).toContain("f :: integer → Any");
    expect(
      ASTToExpandedWithSignatureOptions(
        ExpandedToAST("f = (x: integer) => x"),
        "Condensed",
        { depth: 2, labels: false, arrow: "→", hideOperatorWrappers: false },
        false,
        undefined,
        {}
      )
    ).toContain("f :: integer → Any");
  });

  it("supportsParametersThatAreAppliedAsFunctions (issue #172)", () => {
    const direct = ASTToExpanded(ExpandedToAST("out = f => x => f x"));
    expect(direct).toContain("out = f => x => apply(f, x)");

    const predicate = ASTToExpanded(
      ExpandedToAST("out = list => f => uniq_p list (el1 => el2 => f el1 el2)")
    );
    expect(predicate).toContain(
      "out = list => f => listUniquePredicate(list, el1 => el2 => apply(apply(f, el1), el2))"
    );
  });

  it("parsesCommaCallSyntaxInsideAPointFreeLambdaArgument (issue #172)", () => {
    const printed = ASTToExpanded(
      ExpandedToAST(
        "out = list => uniq_p list (el1 => el2 => booleanAnd(el1, el2))"
      )
    );
    expect(printed).toContain("out :: List<Boolean> → List<Boolean>");
    expect(printed).toContain(
      "out = list => listUniquePredicate(list, el1 => el2 => booleanAnd(el1, el2))"
    );
  });
});
