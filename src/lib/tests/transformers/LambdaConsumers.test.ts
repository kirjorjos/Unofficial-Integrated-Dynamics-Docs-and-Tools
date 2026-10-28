import { CondensedToAST } from "lib/transformers/Condensed";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { astToGiveCommands } from "lib/transformers/astGiveCommands";
import { stripAutoCurryVarNames } from "lib/transformers/inputState";
import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

describe("TestLambdaConsumers", () => {
  it("writes the same cards for a lambda and its point-free form", () => {
    const lambda = astToGiveCommands(CondensedToAST("x => numberAdd(x, 1)"));
    const pointFree = astToGiveCommands(CondensedToAST("apply(numberAdd, 1)"));
    expect(lambda.lines).toEqual(pointFree.lines);
  });

  it("never emits a lambda or parameter card", () => {
    const { lines } = astToGiveCommands(
      CondensedToAST("(x, y) => numberSubtract(y, x)")
    );
    for (const line of lines) {
      expect(line).not.toContain("lambda");
      expect(line).not.toContain("param");
    }
  });

  it("generates the same visual steps for a lambda and its point-free form", () => {
    const summary = (source: string) =>
      generateVisualSteps(CondensedToAST(source), 0).map((step) => [
        step.sourceType,
        step.output,
      ]);
    expect(summary("x => numberAdd(x, 1)")).toEqual(
      summary("apply(numberAdd, 1)")
    );
  });

  it("does not leak a lambda step into the visual output", () => {
    const steps = generateVisualSteps(
      CondensedToAST("x => operatorMap(y => numberAdd(x, y), [1, 2])"),
      0
    );
    expect(steps.every((step) => step.sourceType !== "Lambda")).toBe(true);
    expect(steps.every((step) => step.sourceType !== "Param")).toBe(true);
  });

  it("strips auto curry names inside a lambda body", () => {
    const stored = CompressedToAST(
      ASTToCompressed(CondensedToAST("x => numberAdd(x, 1)"))
    );
    const cloned = stripAutoCurryVarNames(stored) as TypeAST.Lambda;
    expect((cloned.body as TypeAST.Curried).varName).toBeUndefined();
  });

  it("keeps lambda text and parameters through input-state cloning", () => {
    const lambda = CondensedToAST("(x: integer) => numberAdd(x, 1)");
    (lambda as TypeAST.Lambda).text = "x => add(x, 1)";
    const cloned = stripAutoCurryVarNames(lambda) as TypeAST.Lambda;
    expect(cloned.text).toBe("x => add(x, 1)");
    expect(cloned.params).toEqual([{ name: "x", type: "integer" }]);
    expect((cloned.body as TypeAST.Curried).args[0]).toEqual({
      type: "Param",
      index: 0,
      name: "x",
    });
  });
});
