import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";

describe("TestConvenienceResolution", () => {
  it("testExpandedAcceptsConvenienceNames", () => {
    const sources = [
      "x = rotate_2_1(numberAdd)",
      "x = rotate_1_2_3_4_6_5(apply2)",
      "x = r124365(apply3)",
      "x = swap_1",
      "x = rotate_2_3_1_4",
      "x = rotate_10_1_2_3_4_5_6_7_8_9",
      "x = pipe_5",
      "x = identity",
    ];
    for (const source of sources) {
      const rendered = ASTToExpanded(ExpandedToAST(source, 0, {}));
      expect([source, rendered.length > 0]).toEqual([source, true]);
    }
  });

  it("testRotatesParseInAllThreeInputFormats", () => {
    for (const source of [
      "rotate_2_1(add)",
      "r21(add)",
      "swap_2",
      "rotate_10_1_2_3_4_5_6_7_8_9",
    ]) {
      expect(
        CondensedToAST(source, new Map(), 0, true, false, {})
      ).toBeTruthy();
      expect(CodeLineToAST(source, new Map(), 0, true, false, {})).toBeTruthy();
    }
  });

  it("testGeneratedPipesParseInAllThreeInputFormats", () => {
    for (const source of ["pipe_5", "pipe_9"]) {
      expect(
        CondensedToAST(source, new Map(), 0, true, false, {})
      ).toBeTruthy();
      expect(CodeLineToAST(source, new Map(), 0, true, false, {})).toBeTruthy();
      expect(ExpandedToAST(source, 0, {})).toBeTruthy();
    }
  });

  it("testRotateWithAFiveAndSixSwapParses", () => {
    const rendered = ASTToExpanded(
      ExpandedToAST("s = rotate_1_2_3_4_6_5(apply2)", 0, {})
    );
    expect(rendered).toContain("s ::");
  });

  it("testNamesThatAreNotConveniencesStayUnknown", () => {
    for (const source of [
      "x = rotate_9_9",
      "x = rotate",
      "x = rotate_1_1",
      "x = notAConvenience",
    ]) {
      expect(() => ExpandedToAST(source, 0, {})).toThrow(/Unknown identifier/);
    }
  });

  it("testUserDefinitionsShadowConvenienceNames", () => {
    const ast = ExpandedToAST(
      ["swap_1 = numberAdd", "x = swap_1"].join("\n"),
      0,
      {}
    ) as TypeAST.NetworkCards;
    expect(ast.definitions.map((definition) => definition.name)).toEqual([
      "swap_1",
      "x",
    ]);
    const resolved = JSON.stringify(ast.definitions[1]!.node);
    expect(resolved).toContain("ARITHMETIC_ADDITION");
    expect(resolved).not.toContain('"Flip"');
  });
});
