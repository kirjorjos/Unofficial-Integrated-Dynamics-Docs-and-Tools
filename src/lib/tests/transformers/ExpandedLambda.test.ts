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
  it("parses both definition forms into one lambda", () => {
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

  it("keeps the definition name from the left-hand side", () => {
    const ast = ExpandedToAST("f = x => add(x, 1)") as TypeAST.NetworkCards;
    expect(ast.definitions[0]!.node.varName).toBe("f");
  });

  it("accepts typed left-hand side parameters", () => {
    const ast = ExpandedToAST(
      "f (x: integer, y: List<integer>) = add(1, 2)"
    ) as TypeAST.NetworkCards;
    expect((ast.definitions[0]!.node as TypeAST.Lambda).params).toEqual([
      { name: "x", type: "integer" },
      { name: "y", type: "List<integer>" },
    ]);
  });

  it("names anonymous top-level lambdas deterministically", () => {
    const printed = ASTToExpanded(
      CondensedToAST("x => numberAdd(x, 1); y => numberAdd(y, 2)")
    );
    expect(printed).toContain("lambda = x => numberAdd(x, 1)");
    expect(printed).toContain("lambda2 = y => numberAdd(y, 2)");
  });

  it("keeps nested capturing lambdas inline", () => {
    const printed = ASTToExpanded(
      ExpandedToAST("f = x => map(y => add(x, y), [1, 2])")
    );
    expect(printed).toContain(
      "f = x => operatorMap(y => numberAdd(x, y), [1, 2])"
    );
    expect(printed).not.toMatch(/^g = /m);
  });

  it("keeps a lambda body inside its binder after a compressed round-trip", () => {
    const stored = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ExpandedToAST("f = x => add(x, 1)")))
    );
    const printed = ASTToExpanded(stored);
    expect(printed).toContain("f = x => numberAdd(x, 1)");
    expect(printed).not.toMatch(/^\{.*\} = /m);
  });

  it("computes function signatures from parameter types", () => {
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
});
