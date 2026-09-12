import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { beforeEachVisualTransformer, steps } from "./fixtures";

const expanded = (source: string): TypeAST.AST => ExpandedToAST(source.trim());

const program = (...lines: string[]): string => lines.join("\n");

const commentOf = (
  result: ReturnType<typeof steps>,
  output: string
): string | undefined => result.find((s) => s.output === output)?.comment;

describe("expanded step comments", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testLeadingCommentAttachesToItsDefinitionsStep", () => {
    const result = steps(expanded("-- the seed value\nx = 1"));
    expect(result).toHaveLength(1);
    expect(result[0]!.output).toBe("x");
    expect(result[0]!.comment).toBe("the seed value");
  });

  it("testTrailingCommentAttachesToItsDefinitionsStep", () => {
    const result = steps(expanded("x = 1 -- trailing note"));
    expect(result[0]!.comment).toBe("trailing note");
  });

  it("testCommentMarkerAndPaddingAreStripped", () => {
    expect(steps(expanded("--no space after marker\nx = 1"))[0]!.comment).toBe(
      "no space after marker"
    );
    expect(steps(expanded("x = 1 --    padded   "))[0]!.comment).toBe("padded");
  });

  it("testLeadingAndTrailingCommentsAreBothKept", () => {
    const result = steps(
      expanded(
        program(
          "-- This variable is defining `one` to be int1",
          "one = 1 -- int1"
        )
      )
    );
    expect(result).toHaveLength(1);
    expect(result[0]!.comment).toBe(
      "This variable is defining `one` to be int1\nint1"
    );
  });

  it("testConsecutiveLeadingCommentsAreAllKeptInSourceOrder", () => {
    const result = steps(
      expanded(program("-- first", "-- second", "-- third", "x = 1"))
    );
    expect(result[0]!.comment).toBe("first\nsecond\nthird");
  });

  it("testEmptyCommentMarkerLinesAreDropped", () => {
    const result = steps(
      expanded(program("--", "-- real note", "--", "x = 1"))
    );
    expect(result[0]!.comment).toBe("real note");
  });

  it("testCommentOnlyDefinitionLineHasNoStepComment", () => {
    const result = steps(expanded(program("--", "x = 1")));
    expect(result[0]!.comment).toBeUndefined();
  });

  it("testEachDefinitionKeepsItsOwnComment", () => {
    const result = steps(
      expanded(
        program(
          "-- the seed value",
          "x = 1",
          "-- the other value",
          "y = 2",
          "-- sum of both",
          "sum = apply add x y"
        )
      )
    );
    expect(result.map((s) => s.output)).toEqual(["x", "y", "sum"]);
    expect(result.map((s) => s.comment)).toEqual([
      "the seed value",
      "the other value",
      "sum of both",
    ]);
  });

  it("testCommentStaysOnDefinitionStepAndNotOnDerivedSteps", () => {
    const result = steps(
      expanded("-- nested thing\nsum = apply add (apply multiply 2 3) 4")
    );
    expect(result).toHaveLength(5);
    expect(result[4]!.output).toBe("sum");
    expect(result[4]!.comment).toBe("nested thing");
    expect(result.slice(0, 4).every((s) => s.comment === undefined)).toBe(true);
  });

  it("testCommentFollowsCardResolvedByStartVariableIdOffset", () => {
    const result = steps(expanded("-- the seed value\nx = 1"), 10);
    expect(result.map((s) => s.variableId)).toEqual([10]);
    expect(result[0]!.comment).toBe("the seed value");
  });

  it("testCommentAboveSignatureLineAttachesToItsDefinition", () => {
    const result = steps(
      expanded(program("-- typed seed", "x :: Integer", "x = 1 -- int one"))
    );
    expect(result[0]!.comment).toBe("typed seed\nint one");
  });

  it("testReaderDefinitionCommentAttachesToReaderStep", () => {
    const result = steps(
      expanded(
        program(
          "-- read the chest",
          'chestItem = InventoryReader(0).slotItem({"slot": 1})',
          "-- nothing in it",
          "chestEmpty = apply anyEquals chestItem null"
        )
      )
    );
    const readerStep = result.find((s) => s.sourceType === "Reader")!;
    expect(readerStep.output).toBe("chestItem");
    expect(readerStep.comment).toBe("read the chest");
    expect(commentOf(result, "chestEmpty")).toBe("nothing in it");
  });

  it("testUncommentedDefinitionsHaveNoComment", () => {
    const result = steps(expanded("x = 1\ny = apply increment x"));
    expect(result.every((s) => s.comment === undefined)).toBe(true);
  });

  it("testCommentOnSharedCardIsNotReusedByAnotherDefinitionsStep", () => {
    const result = steps(
      expanded(program("-- annotated", "a = 1", "b = apply add a a"))
    );
    expect(commentOf(result, "a")).toBe("annotated");
    expect(commentOf(result, "b")).toBeUndefined();
  });

  it("testNonExpandedInputCarriesNoComments", () => {
    const result = steps(CodeLineToAST("5; add 5 1"));
    expect(result.every((s) => s.comment === undefined)).toBe(true);
  });
});
