import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { beforeEachVisualTransformer, steps } from "./fixtures";

const expanded = (source: string): TypeAST.AST => ExpandedToAST(source.trim());

describe("expanded step comments", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testLeadingCommentAttachesToItsDefinitionsStep", () => {
    const result = steps(expanded("-- the seed value\nx = 1"));
    expect(result).toHaveLength(1);
    expect(result[0]!.output).toBe("x");
    expect(result[0]!.comment).toBe("-- the seed value");
  });

  it("testTrailingCommentAttachesToItsDefinitionsStep", () => {
    const result = steps(expanded("x = 1 -- trailing note"));
    expect(result[0]!.comment).toBe("-- trailing note");
  });

  it("testEachDefinitionKeepsItsOwnComment", () => {
    const result = steps(
      expanded(
        [
          "-- the seed value",
          "x = 1",
          "-- the other value",
          "y = 2",
          "-- sum of both",
          "sum = apply add x y",
        ].join("\n")
      )
    );
    expect(result.map((s) => s.output)).toEqual(["x", "y", "sum"]);
    expect(result.map((s) => s.comment)).toEqual([
      "-- the seed value",
      "-- the other value",
      "-- sum of both",
    ]);
  });

  it("testCommentStaysOnDefinitionStepAndNotOnDerivedSteps", () => {
    const result = steps(
      expanded("-- nested thing\nsum = apply add (apply multiply 2 3) 4")
    );
    expect(result).toHaveLength(5);
    expect(result[4]!.output).toBe("sum");
    expect(result[4]!.comment).toBe("-- nested thing");
    expect(result.slice(0, 4).every((s) => s.comment === undefined)).toBe(true);
  });

  it("testCommentFollowsCardResolvedByStartVariableIdOffset", () => {
    const result = steps(expanded("-- the seed value\nx = 1"), 10);
    expect(result.map((s) => s.variableId)).toEqual([10]);
    expect(result[0]!.comment).toBe("-- the seed value");
  });

  it("testReaderDefinitionCommentAttachesToReaderStep", () => {
    const result = steps(
      expanded(
        [
          "-- read the chest",
          'chestItem = InventoryReader(0).slotItem({"slot": 1})',
          "-- nothing in it",
          "chestEmpty = apply anyEquals chestItem null",
        ].join("\n")
      )
    );
    const readerStep = result.find((s) => s.sourceType === "Reader")!;
    expect(readerStep.output).toBe("chestItem");
    expect(readerStep.comment).toBe("-- read the chest");
    expect(result.find((s) => s.output === "chestEmpty")!.comment).toBe(
      "-- nothing in it"
    );
  });

  it("testUncommentedDefinitionsHaveNoComment", () => {
    const result = steps(expanded("x = 1\ny = apply increment x"));
    expect(result.every((s) => s.comment === undefined)).toBe(true);
  });

  it("testCommentOnSharedCardIsNotReusedByAnotherDefinitionsStep", () => {
    const result = steps(
      expanded(["-- annotated", "a = 1", "b = apply add a a"].join("\n"))
    );
    expect(result.find((s) => s.output === "a")!.comment).toBe("-- annotated");
    expect(result.find((s) => s.output === "b")!.comment).toBeUndefined();
  });

  it("testNonExpandedInputCarriesNoComments", () => {
    const result = steps(CodeLineToAST("5; add 5 1"));
    expect(result.every((s) => s.comment === undefined)).toBe(true);
  });
});
