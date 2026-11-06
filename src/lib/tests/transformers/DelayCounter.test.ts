import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { simulateDocument } from "lib/transformers/delaySimulation";

const show = (node: TypeAST.AST): string => ASTToCondensed(node);

const histories = (ast: TypeAST.AST, ticks: number[]): string[][] =>
  ticks.map((tick) => simulateDocument(ast, tick).delays[0]!.history.map(show));

const COUNTER_CONDENSED =
  "Delay(modulus(add(1, getOrDefault(#0, subtract(listLength(#0), 1), 4)), 5), 1, 5); 0";

const COUNTER_CODELINE =
  "Delay(modulus (add 1 (getOrDefault #0 (subtract (listLength #0) 1) 4)) 5, 1, 5); 0";

const COUNTER_EXPANDED = [
  "seed = 4",
  "newest = getOrDefault(history, subtract(listLength(history), 1), seed)",
  "history = Delay(modulus(add(1, newest), 5), 1, 5)",
].join("\n");

const EXPECTED = [
  [],
  ["0"],
  ["0", "1"],
  ["0", "1", "2", "3", "4"],
  ["1", "2", "3", "4", "0"],
  ["0", "1", "2", "3", "4"],
];

describe("TestDelayLoopingCounter", () => {
  it("testLoopsZeroToFourInCondensed", () => {
    const ast = CondensedToAST(COUNTER_CONDENSED, new Map(), 0, true);
    expect(histories(ast, [0, 1, 2, 5, 6, 10])).toEqual(EXPECTED);
  });

  it("testLoopsZeroToFourInCodeLine", () => {
    const ast = CodeLineToAST(COUNTER_CODELINE, new Map(), 0, true);
    expect(histories(ast, [0, 1, 2, 5, 6, 10])).toEqual(EXPECTED);
  });

  it("testLoopsZeroToFourInExpanded", () => {
    const ast = ExpandedToAST(COUNTER_EXPANDED);
    expect(histories(ast, [0, 1, 2, 5, 6, 10])).toEqual(EXPECTED);
  });

  it("testReadsTheNewestSampleAtAnyCapacity", () => {
    const ast = CondensedToAST(COUNTER_CONDENSED, new Map(), 0, true);
    expect(histories(ast, [2, 3, 4])).toEqual([
      ["0", "1"],
      ["0", "1", "2"],
      ["0", "1", "2", "3"],
    ]);
  });
});

describe("TestDelaySelfReference", () => {
  it("testRejectsTakingItsOwnValueDirectly", () => {
    expect(() => CondensedToAST("Delay(#0); 0", new Map(), 0, true)).toThrow(
      /cannot take its own value directly/
    );
    expect(() => CodeLineToAST("Delay(#0); 0", new Map(), 0, true)).toThrow(
      /cannot take its own value directly/
    );
    expect(() => ExpandedToAST("delayed = Delay(delayed)")).toThrow(
      /cannot take its own value directly/
    );
  });

  it("testAllowsReadingItsOwnHistoryThroughACard", () => {
    expect(() =>
      CondensedToAST("Delay(getOrDefault(#0, 0, 0)); 0", new Map(), 0, true)
    ).not.toThrow();
  });
});

describe("TestDelayOwnHistoryThroughACard", () => {
  const NESTED = [["[]"], ["[]", "[[]]"], ["[]", "[[]]", "[[], [[]]]"]];

  it("testNestsTheHistoryThroughAnOperatorInCondensed", () => {
    const ast = CondensedToAST(
      "Delay(identity(#0), 1, 5); 0",
      new Map(),
      0,
      true
    );
    expect(histories(ast, [1, 2, 3])).toEqual(NESTED);
  });

  it("testNestsTheHistoryThroughAnOperatorInCodeLine", () => {
    const ast = CodeLineToAST(
      "Delay (identity #0, 1, 5); 0",
      new Map(),
      0,
      true
    );
    expect(histories(ast, [1, 2, 3])).toEqual(NESTED);
  });

  it("testNestsTheHistoryThroughAnOperatorInExpanded", () => {
    const ast = ExpandedToAST("history = Delay(identity(history), 1, 5)");
    expect(histories(ast, [1, 2, 3])).toEqual(NESTED);
  });

  it("testStillRejectsTheOwnCardDirectly", () => {
    expect(() =>
      CondensedToAST("Delay(#0, 1, 5); 0", new Map(), 0, true)
    ).toThrow(/cannot take its own value directly/);
    expect(() =>
      CodeLineToAST("Delay (#0, 1, 5); 0", new Map(), 0, true)
    ).toThrow(/cannot take its own value directly/);
    expect(() => ExpandedToAST("history = Delay(history, 1, 5)")).toThrow(
      /cannot take its own value directly/
    );
  });
});

describe("TestDefinitionPromise", () => {
  it("testResolvesANameDefinedOnALaterLine", () => {
    const ast = ExpandedToAST("delayed = Delay(second, 1, 2)\nsecond = 3");
    const document = simulateDocument(ast, 2);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[0]!.history.map(show)).toEqual(["3", "3"]);
  });

  it("testPromisesANameDefinedOnALaterLine", () => {
    const ast = ExpandedToAST(
      "counted = listLength(delayed)\ndelayed = Delay(counted, 1, 3)"
    );
    const document = simulateDocument(ast, 3);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[0]!.history.map(show)).toEqual(["0", "1", "2"]);
  });

  it("testRejectsAReferenceThatIsNeverDefined", () => {
    expect(() => ExpandedToAST("delayed = Delay(missing)")).toThrow(
      /"missing" is promised, but the input never defines it/
    );
    expect(() =>
      CondensedToAST("Delay(history, 1, 5); 0", new Map(), 0, true)
    ).toThrow(/"history" is promised, but the input never defines it/);
  });

  it("testResolvesACardReferenceOnlyFromAnEarlierStatement", () => {
    expect(() =>
      CondensedToAST("Delay(@history, 1, 5); 0", new Map(), 0, true)
    ).toThrow(/Unknown card reference: @history/);
    expect(() =>
      CondensedToAST("Delay(@0, 1, 5); 0", new Map(), 0, true)
    ).toThrow(/points to a card that is not created yet/);

    const ast = CondensedToAST("3; Delay(@0, 1, 2)", new Map(), 0, true);
    expect(histories(ast, [1, 2])).toEqual([["3"], ["3", "3"]]);
  });

  it("testKeepsTheDuplicateNameSettingForPromisedNames", () => {
    expect(() => ExpandedToAST("x = 5\nx = 6\ny = Delay(x)")).toThrow(
      /Variable "x" is already defined/
    );
  });

  it("testReportsADelayFreeCycleAsAnEvaluationError", () => {
    const ast = ExpandedToAST(
      "a = add(b, 1)\nb = add(a, 1)\nd = Delay(a, 1, 2)"
    );
    expect(simulateDocument(ast, 1).delays[0]!.error).toBe(
      "Unable to evaluate the delay's input at tick 1"
    );
  });

  it("testWrapsTheHistoryWhenTheInputIsAList", () => {
    const ast = ExpandedToAST("history = Delay([history], 1, 3)");
    expect(histories(ast, [1, 2])).toEqual([["[[]]"], ["[[]]", "[[[[]]]]"]]);
  });

  it("testUsesTheSeedWhenTheNewestIndexFallsBack", () => {
    const ast = ExpandedToAST(
      [
        "seed = 4",
        "newest = getOrDefault(history, subtract(listLength(history), 1), seed)",
        "history = Delay(newest, 1, 1)",
      ].join("\n")
    );
    expect(histories(ast, [1])).toEqual([["4"]]);
  });
});
