import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";

const parse = (source: string): TypeAST.AST =>
  CondensedToAST(source, new Map(), 0, true);

describe("TestCalculationValueRef", () => {
  it("testResolvesTheValueOfTheNthCalculation", () => {
    const ast = parse("Delay(3); listLength(#0)");
    expect(ASTToCondensed(ast, true, 0, false, { targetTick: 2 })).toBe(
      "Delay(3); 2"
    );
    expect(ASTToCondensed(ast, true, 0, false, { targetTick: 3 })).toBe(
      "Delay(3); 3"
    );
  });

  it("testKeepsTheValueReferenceWhenPrinting", () => {
    expect(
      ASTToCondensed(parse("Delay(3); listLength(#0)"), true, 0, false)
    ).toBe("Delay(3); listLength(#0)");
  });

  it("testRejectsAReferencePastTheLastStatement", () => {
    expect(() => parse("3; listLength(#5)")).toThrow(
      /Calculation with index 5 does not exist/
    );
  });

  it("testQuotesNamesStartingWithAHash", () => {
    expect(
      ASTToCondensed({ type: "Variable", label: "#a" } as TypeAST.AST)
    ).toBe('Variable("#a")');
    expect(
      ASTToCondensed({ type: "Variable", label: "a#b" } as TypeAST.AST)
    ).toBe("@a#b");
  });
});
