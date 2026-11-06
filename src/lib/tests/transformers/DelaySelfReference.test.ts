import { ASTToCondensed } from "lib/transformers/Condensed";
import {
  evaluateAtTick,
  simulateDelay,
  simulateDocument,
} from "lib/transformers/delaySimulation";
import { foldDelayDependent } from "lib/transformers/tickFold";

const selfDelay = (capacity = 3): TypeAST.Delay => {
  const node = {
    type: "Delay",
    interval: 1,
    capacity,
  } as unknown as TypeAST.Delay;
  (node as unknown as { value: TypeAST.AST }).value = node;
  return node;
};

const show = (node: TypeAST.AST): string => ASTToCondensed(node);

describe("TestDelayUsingItsOwnHistory", () => {
  it("testReadsTheHistoryBeforeTheCurrentSampleIsAppended", () => {
    expect(simulateDelay(selfDelay(3), 1).history.map(show)).toEqual(["[]"]);
    expect(simulateDelay(selfDelay(3), 2).history.map(show)).toEqual([
      "[]",
      "[[]]",
    ]);
    expect(simulateDelay(selfDelay(3), 3).history.map(show)).toEqual([
      "[]",
      "[[]]",
      "[[], [[]]]",
    ]);
    expect(simulateDelay(selfDelay(3), 3).error).toBeUndefined();
  });

  it("testPollsBeforeReadingWhenTheHistoryIsFull", () => {
    expect(simulateDelay(selfDelay(2), 3).history.map(show)).toEqual([
      "[[]]",
      "[[], [[]]]",
    ]);
  });

  it("testTerminatesOnAMutualCycle", () => {
    const a = { type: "Delay", interval: 1 } as unknown as TypeAST.Delay;
    const b = { type: "Delay", interval: 1 } as unknown as TypeAST.Delay;
    (a as unknown as { value: TypeAST.AST }).value = b;
    (b as unknown as { value: TypeAST.AST }).value = a;

    const document = simulateDocument(a, 2);
    expect(document.delays).toHaveLength(2);
    expect(document.delays[0]!.history).toHaveLength(2);
    expect(document.delays[0]!.error).toBeUndefined();
    expect(document.delays[1]!.history).toHaveLength(2);
  });

  it("testEvaluatesAndFoldsASelfReferencingDelay", () => {
    const delay = selfDelay(3);
    expect(() => evaluateAtTick(delay, 3)).not.toThrow();
    expect(() => foldDelayDependent(delay, 3)).not.toThrow();
  });
});
