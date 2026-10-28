import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import {
  ASTToExpanded,
  ASTToExpandedWithSignatureOptions,
  ExpandedToAST,
} from "lib/transformers/Expanded";

describe("TestLambdaPrinting", () => {
  it("round-trips lambda forms through Condensed", () => {
    for (const source of [
      "x => numberAdd(x, 1)",
      "(x, y) => numberSubtract(y, x)",
      "() => numberAdd(1, 2)",
      "x => y => numberAdd(x, y)",
      "x => numberIncrement(x)",
    ]) {
      const ast = CondensedToAST(source);
      const printed = ASTToCondensed(ast);
      expect(printed).toBe(source);
      expect(ASTToCondensed(CondensedToAST(printed))).toBe(source);
    }
  });

  it("round-trips lambda forms through CodeLine", () => {
    for (const source of [
      "x => numberAdd x 1",
      "(x, y) => numberSubtract y x",
      "x => y => numberAdd x y",
    ]) {
      const printed = ASTToCodeLine(CodeLineToAST(source));
      expect(printed).toBe(source);
      expect(ASTToCodeLine(CodeLineToAST(printed))).toBe(source);
    }
  });

  it("prints typed headers", () => {
    const source = "(x: integer, y: List<integer>) => numberAdd(1, 2)";
    expect(ASTToCondensed(CondensedToAST(source))).toBe(source);
  });

  it("prints zero parameter lambdas", () => {
    expect(ASTToCondensed(CondensedToAST("() => numberAdd(1, 2)"))).toBe(
      "() => numberAdd(1, 2)"
    );
  });

  it("parenthesizes lambda arguments in CodeLine", () => {
    const printed = ASTToCodeLine(CodeLineToAST("map (x => add x 1) [1, 2]"));
    expect(printed).toBe("operatorMap (x => numberAdd x 1) [1, 2]");
  });

  it("ignores Lambda.text in native printers", () => {
    const lambda = CondensedToAST("x => numberAdd(x, 1)") as TypeAST.Lambda;
    lambda.text = "x => add(x, 1)";
    expect(ASTToCondensed(lambda)).toBe("x => numberAdd(x, 1)");
    expect(ASTToCodeLine(lambda)).toBe("x => numberAdd x 1");
  });

  it("keeps arrow form for lambda definitions when lambdaParamSugar is on", () => {
    const ast = ExpandedToAST("inc x = numberAdd x 1") as TypeAST.NetworkCards;
    const printed = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      null,
      false,
      undefined,
      { lambdaParamSugar: true }
    );
    expect(printed).toContain("inc = x => numberAdd(x, 1)");
    expect(printed).not.toContain("inc x =");
  });

  it("throws when a Param disagrees with its binder", () => {
    const lambda: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 0, name: "y" },
    };
    expect(() => ASTToCondensed(lambda)).toThrow(/its binder calls it "x"/);
    expect(() => ASTToCodeLine(lambda)).toThrow(/its binder calls it "x"/);
  });

  it("throws for a Param outside its lambda", () => {
    const lambda: TypeAST.Lambda = {
      type: "Lambda",
      params: [{ name: "x" }],
      body: { type: "Param", index: 1, name: "y" },
    };
    expect(() => ASTToCondensed(lambda)).toThrow(/out of range/);
  });

  it("prints Expanded lambda definitions on one line", () => {
    const network = ExpandedToAST(
      "getGenome path bee = nbtPathMatchAll path (itemNBT bee)"
    ) as TypeAST.NetworkCards;
    const printed = ASTToExpanded(network);
    expect(printed).toContain(
      "getGenome = (path, bee) => stringNbtPathMatchAll(path, itemStackNBT(bee))"
    );
  });
});
