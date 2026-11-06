import { ASTToCondensed } from "lib/transformers/Condensed";
import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { simulateDocument } from "lib/transformers/delaySimulation";

const condensedAt = (ast: TypeAST.AST, targetTick: number): string =>
  ASTToCondensed(ast, true, 0, false, { targetTick });

const show = (node: TypeAST.AST): string => ASTToCondensed(node);

describe("TestDelayPromise", () => {
  it("testRejectsTakingItsOwnValueDirectly", () => {
    expect(() => ExpandedToAST("delayed = Delay(delayed)")).toThrow(
      /cannot take its own value directly/
    );
  });

  it("testKeepsThePromiseWhenPrinting", () => {
    const ast = ExpandedToAST(
      "delayed = Delay(second)\nsecond = Delay(3, 1, 2)"
    );
    expect(ASTToExpanded(ast)).toContain("Delay(second)");
    expect(condensedAt(ast, 3)).toContain("Delay(second)");
  });

  it("testPromisesADefinitionThatComesLater", () => {
    const ast = ExpandedToAST("first = Delay(second)\nsecond = Delay(3, 1, 2)");
    const document = simulateDocument(ast, 2);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[0]!.history).toHaveLength(2);
  });

  it("testResolvesANameDefinedOnALaterLine", () => {
    const ast = ExpandedToAST("delayed = Delay(second, 1, 2)\nsecond = 3");
    const document = simulateDocument(ast, 2);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[0]!.history.map(show)).toEqual(["3", "3"]);
  });

  it("testFoldsCardsThatReadAPromisedDelay", () => {
    const ast = ExpandedToAST(
      "counted = listLength(delayed)\ndelayed = Delay(counted, 1, 3)"
    );
    const document = simulateDocument(ast, 3);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[0]!.history.map(show)).toEqual(["0", "1", "2"]);
  });

  it("testReportsABrokenPromise", () => {
    expect(() => ExpandedToAST("delayed = Delay(missing)")).toThrow(
      /"missing" is promised, but the input never defines it/
    );
  });
});
