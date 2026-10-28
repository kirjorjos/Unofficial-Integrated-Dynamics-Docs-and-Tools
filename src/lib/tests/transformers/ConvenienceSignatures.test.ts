import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { CondensedToAST } from "lib/transformers/Condensed";
import {
  CONVENIENCE_SOURCE,
  generatePipeExpression,
} from "lib/transformers/convenienceOperators";

describe("TestConvenienceSignatures", () => {
  it("testRenderingTheWholeTableTerminates", () => {
    const ast = ExpandedToAST(CONVENIENCE_SOURCE, 0, {});
    expect(() => ASTToExpanded(ast)).not.toThrow();
  });

  it("testPipe4IsPartOfTheTable", () => {
    const ast = ExpandedToAST(
      CONVENIENCE_SOURCE,
      0,
      {}
    ) as TypeAST.NetworkCards;
    expect(ast.definitions.map((definition) => definition.name)).toContain(
      "pipe_4"
    );
  });

  it("testGeneratedPipesInferTheirArity", () => {
    const sizes = [2, 3, 4, 5, 6];
    const sumLambda = (size: number): string => {
      const params = Array.from({ length: size }, (_, index) => `a${index}`);
      const sum = params
        .slice(1)
        .reduce((acc, param) => `add(${acc}, ${param})`, params[0]!);
      return `${params.join(" => ")} => ${sum}`;
    };
    const generated = sizes
      .filter((size) => size > 4)
      .map((size) => `pipe_${size} = ${generatePipeExpression(size)}`);

    const rendered = ASTToExpanded(
      ExpandedToAST(
        [
          CONVENIENCE_SOURCE,
          ...generated,
          ...sizes.map((size) => `f${size} = ${sumLambda(size)}`),
          "g = x => add(x, 1)",
          ...sizes.map((size) => `p${size} = pipe_${size}(f${size}, g)`),
        ].join("\n"),
        0,
        {}
      )
    );
    const signatureOf = (name: string): string =>
      rendered.split("\n").find((line) => line.startsWith(`${name} ::`)) ?? "";

    for (const size of sizes) {
      const line = signatureOf(`p${size}`);
      expect([size, line.startsWith(`p${size} :: Operator<Any`)]).toEqual([
        size,
        true,
      ]);
      expect([size, (line.match(/Number/g) ?? []).length]).toEqual([size, 1]);
      expect([size, (line.match(/Any/g) ?? []).length]).toEqual([size, size]);
    }
  });

  it("testConvenienceValuesAreCallableWithOperatorArguments", () => {
    const program = [
      CONVENIENCE_SOURCE,
      "f2 = a => b => add(a, b)",
      "g = x => add(x, 1)",
    ];
    const call = "p = pipe_2(f2, g)";

    const expanded = ASTToExpanded(
      ExpandedToAST([...program, call].join("\n"), 0, {})
    );
    const line =
      expanded.split("\n").find((entry) => entry.startsWith("p ::")) ?? "";
    expect(line.startsWith("p :: Operator<")).toBe(true);

    expect(() =>
      CondensedToAST("pipe_2(add, ceil)", new Map(), 0, true, false, {})
    ).not.toThrow();
  });

  it("testTableSignaturesStaySmall", () => {
    const rendered = ASTToExpanded(ExpandedToAST(CONVENIENCE_SOURCE, 0, {}));
    const signatureOf = (name: string): string =>
      rendered.split("\n").find((line) => line.startsWith(`${name} ::`)) ?? "";

    for (const name of ["pipe_2", "pipe_3", "pipe_4"]) {
      const line = signatureOf(name);
      expect(line.length).toBeGreaterThan(0);
      expect(line.length).toBeLessThan(200);
    }
  });
});
