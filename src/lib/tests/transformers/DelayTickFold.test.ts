import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ExpandedToAST } from "lib/transformers/Expanded";
import {
  evaluateAtTick,
  materializeDelays,
  simulateDelay,
} from "lib/transformers/delaySimulation";
import { foldDelayDependent } from "lib/transformers/tickFold";

const network = (source: string): TypeAST.AST => ExpandedToAST(source);

const condensed = (ast: TypeAST.AST, targetTick?: number): string =>
  ASTToCondensed(ast, true, 0, false, { targetTick });

const historyValues = (history: TypeAST.AST[]): number[] =>
  history.map((entry) => Number((entry as TypeAST.Integer).value));

describe("TestDelayOperatesAsAList", () => {
  it("testEvaluatesADelayToItsHistoryListAtTheTick", () => {
    const delay = CondensedToAST("Delay(3, 1, 3)");
    expect(materializeDelays(delay, 0)).toEqual({ type: "List", value: [] });
    expect(materializeDelays(delay, 2)).toEqual({
      type: "List",
      value: [
        { type: "Integer", value: "3" },
        { type: "Integer", value: "3" },
      ],
    });
    expect(ASTToCondensed(evaluateAtTick(delay, 3)!)).toBe("[3, 3, 3]");
  });

  it("testFoldsCardsThatDependOnTheDelay", () => {
    const ast = CondensedToAST("listLength(Delay(3, 1, 3))");
    for (const [tick, expected] of [
      [0, "0"],
      [1, "1"],
      [2, "2"],
      [3, "3"],
      [4, "3"],
    ] as const) {
      expect(condensed(ast, tick)).toBe(expected);
    }
  });

  it("testFoldsLinesThatReferenceTheDelayer", () => {
    const ast = network(
      "delayed = Delay(3, 1, 3)\ncounted = listLength(@delayed)"
    );
    expect(condensed(ast, 0)).toBe("Delay(3, 1, 3); 0");
    expect(condensed(ast, 2)).toBe("Delay(3, 1, 3); 2");
    expect(condensed(ast, 3)).toBe("Delay(3, 1, 3); 3");
    expect(condensed(ast, 4)).toBe("Delay(3, 1, 3); 3");
  });

  it("testFoldsLinesDownstreamOfADelayReference", () => {
    const ast = network(
      "delayed = Delay(3, 1, 3)\ncounted = listLength(@delayed)\nsummed = add(@counted, 1)"
    );
    expect(condensed(ast, 1)).toBe("Delay(3, 1, 3); 1; 2");
    expect(condensed(ast, 2)).toBe("Delay(3, 1, 3); 2; 3");
  });

  it("testKeepsTheDelayRecipeAndOtherLinesIntact", () => {
    const ast = network(
      "other = 4\ndelayed = Delay(3, 1, 3)\ncounted = listLength(@delayed)"
    );
    expect(condensed(ast, 2)).toBe("4; Delay(3, 1, 3); 2");
  });

  it("testLeavesDocumentsWithoutDelaysUnchanged", () => {
    const ast = network("a = 3\nb = listLength([@a, @a])");
    expect(foldDelayDependent(ast, 5)).toBe(ast);
    expect(condensed(ast, 5)).toBe(condensed(ast));
  });

  it("testUsesTheHistoryListOrACardDependingOnItAsTheDelayedCard", () => {
    const source = "Delay(listLength(Delay(3, 1, 5)), 1, 3)";
    const outer = CondensedToAST(source) as TypeAST.Delay;
    expect(historyValues(simulateDelay(outer, 0).history)).toEqual([]);
    expect(historyValues(simulateDelay(outer, 1).history)).toEqual([1]);
    expect(historyValues(simulateDelay(outer, 3).history)).toEqual([1, 2, 3]);
    expect(historyValues(simulateDelay(outer, 5).history)).toEqual([3, 4, 5]);
    expect(condensed(outer, 3)).toBe(ASTToCondensed(outer));
  });
});
