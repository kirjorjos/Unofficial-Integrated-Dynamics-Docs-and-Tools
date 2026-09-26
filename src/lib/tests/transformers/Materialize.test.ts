import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { stripAutoCurryVarNames } from "lib/transformers/inputState";

const collectVariableNames = (
  node: TypeAST.AST,
  out: string[] = []
): string[] => {
  switch (node.type) {
    case "Variable":
      out.push(node.name);
      break;
    case "Curry":
      collectVariableNames(node.base as TypeAST.AST, out);
      node.args.forEach((arg) => collectVariableNames(arg, out));
      break;
    case "Pipe":
      collectVariableNames(node.op1 as TypeAST.AST, out);
      collectVariableNames(node.op2 as TypeAST.AST, out);
      break;
    case "Pipe2":
      collectVariableNames(node.op1 as TypeAST.AST, out);
      collectVariableNames(node.op2 as TypeAST.AST, out);
      collectVariableNames(node.op3 as TypeAST.AST, out);
      break;
    case "Flip":
      collectVariableNames(node.arg as TypeAST.AST, out);
      break;
    case "Dynamic":
    case "Static":
    case "Materialize":
      collectVariableNames(node.value, out);
      break;
    case "List":
      node.value.forEach((entry) => collectVariableNames(entry, out));
      break;
  }
  return out;
};

describe("TestMaterializeConstructor", () => {
  it("testParsesCallStyleWrappersInCondensed", () => {
    const materialize = CondensedToAST("Materialize(5)");
    expect(materialize).toMatchObject({
      type: "Materialize",
      value: { type: "Integer", value: "5" },
    });

    const dynamic = CondensedToAST("Dynamic(5)");
    expect(dynamic).toMatchObject({ type: "Dynamic" });

    const staticNode = CondensedToAST("Static(5)");
    expect(staticNode).toMatchObject({ type: "Static" });
  });

  it("testAcceptsAnyCasingOnInput", () => {
    expect(CondensedToAST("materialize(5)")).toMatchObject({
      type: "Materialize",
    });
    expect(CondensedToAST("DYNAMIC(5)")).toMatchObject({ type: "Dynamic" });
    expect(CondensedToAST("sTaTiC(5)")).toMatchObject({ type: "Static" });
  });

  it("testEmitsCanonicalPascalCase", () => {
    const ast = CondensedToAST("materialize(add(1, 2))");
    expect(ASTToCondensed(ast)).toBe("Materialize(numberAdd(1, 2))");
    expect(ASTToCodeLine(ast)).toBe("Materialize(numberAdd 1 2)");
  });

  it("testRoundTripsThroughEveryTextFormat", () => {
    const source = "Materialize(Dynamic(add(1, 2)))";
    const ast = CondensedToAST(source);
    expect(CondensedToAST(ASTToCondensed(ast))).toEqual(ast);
    expect(CodeLineToAST(ASTToCodeLine(ast))).toEqual(ast);
    const expanded = ExpandedToAST(ASTToExpanded(ast)) as TypeAST.NetworkCards;
    const root = expanded.definitions[expanded.definitions.length - 1]!.node;
    expect(root).toMatchObject({ type: "Materialize" });
  });

  it("testRoundTripsThroughCompressedEncoding", () => {
    for (const source of [
      "Materialize(5)",
      "Dynamic(5)",
      "Static(5)",
      "Materialize(Dynamic(add(1, 2)))",
      "Static(Materialize(Static(5)))",
    ]) {
      const ast = stripAutoCurryVarNames(CondensedToAST(source));
      const decoded = stripAutoCurryVarNames(
        CompressedToAST(ASTToCompressed(ast))
      );
      expect(decoded).toEqual(ast);
    }
  });

  it("testStripAutoCurryVarNamesHandlesWrappers", () => {
    const ast = CondensedToAST("Materialize(add(1, 2))");
    expect(() => stripAutoCurryVarNames(ast)).not.toThrow();
    expect(stripAutoCurryVarNames(ast)).toMatchObject({
      type: "Materialize",
    });
  });

  it("testLambdaAbstractionSeesThroughWrappersAroundAParameter", () => {
    const plain = ASTToCondensed(CodeLineToAST("x => add x 2"));
    for (const source of [
      "x => add Dynamic(x) 2",
      "x => add Static(x) 2",
      "x => add Materialize(x) 2",
      "x => Dynamic(x)",
    ]) {
      expect(collectVariableNames(CodeLineToAST(source))).toEqual([]);
    }
    expect(ASTToCondensed(CodeLineToAST("x => add Dynamic(x) 2"))).toBe(plain);
    expect(ASTToCondensed(CodeLineToAST("x => add Static(x) 2"))).toBe(plain);
    expect(ASTToCondensed(CodeLineToAST("x => add Materialize(x) 2"))).toBe(
      plain
    );
  });

  it("testMaterializeOfALambdaWithAWrappedParameterLeavesNoFreeVariable", () => {
    for (const source of [
      "Materialize(x => add Dynamic(x) 2)",
      "Materialize(x => add Static(x) 2)",
    ]) {
      const ast = CodeLineToAST(source);
      expect(collectVariableNames(ast)).toEqual([]);
      expect(ASTToCondensed(ast)).toBe("Materialize(apply(numberAdd, 2))");
    }
  });
});
