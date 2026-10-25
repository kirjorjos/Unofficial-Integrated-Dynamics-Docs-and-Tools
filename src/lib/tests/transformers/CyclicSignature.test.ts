import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { generatePipeExpression } from "lib/transformers/convenienceOperators";

const PIPE_4_SOURCE = [
  "flipPipe = flip(pipe)",
  "expOpRes = apply(flipPipe, apply)",
  "expOpRes_2 = apply(flipPipe, apply2)",
  "expOpRes_3 = apply(flipPipe, apply3)",
  "temp1 = pipe(flipPipe, flipPipe)",
  "temp2 = flip(temp1)",
  "temp3 = apply2(temp2, temp2, expOpRes)",
  "pipe_2 = apply(expOpRes, temp3)",
  "flipPipe_2 = flip(pipe_2)",
  "pipe_3 = pipe_2(flip(pipe(flipPipe_2, flipPipe)), expOpRes_2)",
  "flipPipe_3 = flip(pipe_3)",
  "pipe_4 = pipe_2(flip(pipe(flipPipe_3, flipPipe)), expOpRes_3)",
].join("\n");

describe("TestCyclicSignature", () => {
  it("testRenderingATypeCycleTerminates", () => {
    const ast = ExpandedToAST(PIPE_4_SOURCE, 0, {});
    expect(() => ASTToExpanded(ast)).not.toThrow();
  });

  it("testGeneratedPipesKeepTerminating", () => {
    const sizes = [5, 6, 7, 8, 9, 10, 11, 12];
    const rendered = ASTToExpanded(
      ExpandedToAST(
        [
          PIPE_4_SOURCE,
          ...sizes.map(
            (size) => `pipe_${size} = ${generatePipeExpression(size)}`
          ),
        ].join("\n"),
        0,
        {}
      )
    );
    for (const size of sizes) {
      expect([size, rendered.includes(`pipe_${size} ::`)]).toEqual([
        size,
        true,
      ]);
    }
    const deepest = rendered
      .split("\n")
      .find((line) => line.startsWith("pipe_12 ::"));
    expect([
      deepest !== undefined,
      (deepest?.match(/Any →/g) ?? []).length,
    ]).toEqual([true, 25]);
  });

  it("testCompoundedDefinitionsKeepReadableSignatures", () => {
    const rendered = ASTToExpanded(ExpandedToAST(PIPE_4_SOURCE, 0, {}));
    const signatureOf = (name: string): string =>
      rendered.split("\n").find((line) => line.startsWith(`${name} ::`)) ?? "";

    for (const name of ["pipe_2", "pipe_3", "pipe_4"]) {
      const line = signatureOf(name);
      expect(line.length).toBeGreaterThan(0);
      expect(line.length).toBeLessThan(200);
    }
  });
});
