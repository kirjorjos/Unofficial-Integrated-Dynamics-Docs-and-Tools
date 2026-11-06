import {
  ASTToExpandedWithSignatureOptions,
  ExpandedToAST,
} from "lib/transformers/Expanded";

const render = (input: string, steps: boolean): string =>
  ASTToExpandedWithSignatureOptions(
    ExpandedToAST(input),
    "Condensed",
    { depth: null, labels: false, arrow: "->", hideOperatorWrappers: false },
    false,
    undefined,
    { lambdaExpansionSteps: steps }
  );

describe("TestExpandedExpansionSteps", () => {
  it("leavesOutputUnchangedWhenTheSettingIsOff", () => {
    const out = render("f = (x: integer) => x", false);
    expect(out).not.toContain("f = anyIdentity");
    expect(
      out.split("\n").filter((line) => line.startsWith("f = "))
    ).toHaveLength(1);
  });

  it("printsTheAuthoredFormFirstAndTheCanonicalFormLast", () => {
    const out = render("f = (x: integer) => x", true);
    const lines = out.split("\n");
    expect(lines[0]).toContain("f :: ");
    expect(lines[1]).toContain("f = (x: integer) => x");
    expect(lines[lines.length - 1]).toContain("f = anyIdentity");
    expect(out).not.toContain("\n\n\n");
  });

  it("printsOneStepPerAbstraction", () => {
    const out = render(
      "scale = (values, factor, offset) => map(x => add(multiply(x, factor), offset), values)",
      true
    );
    const definitions = out
      .split("\n")
      .filter((line) => line.startsWith("scale = "));
    expect(definitions).toHaveLength(4);
    expect(definitions[0]).toContain("(values, factor, offset) =>");
    expect(definitions[3]).not.toContain("=>");
    expect(render(out, true)).toBe(out);
  });

  it("lowersAListBodiedLambdaIntoSteps", () => {
    const out = render("f = x => [x, 1]", true);
    expect(out).toContain("f = x => [x, 1]");
    expect(out).toContain("listAppend");
  });

  it("collapsesAChainOnParseAndReRendersIdentically", () => {
    const first = render("f = (x: integer) => x", true);
    const second = render(first, true);
    expect(second).toBe(first);
  });

  it("collapsesApplyWrappedChainsOnParseAndReRendersIdentically", () => {
    const input = `price = 8
pick = (stack, fallback) => choice(greaterThan(multiply(count(stack, fallback), price), 32), Item("air"), fallback)`;
    const first = render(input, true);
    expect(first).toContain("apply(operatorFlip(operatorPipe)");
    expect(render(first, true)).toBe(first);
  });

  it("lowersALambdaWithDuplicateParameterNames", () => {
    const out = render("f = (x, x) => x", true);
    expect(out).toContain("f = (x, x) => x");
    expect(out).toContain("anyEquals");
  });
});
