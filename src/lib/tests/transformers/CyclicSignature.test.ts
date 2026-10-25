import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";

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
