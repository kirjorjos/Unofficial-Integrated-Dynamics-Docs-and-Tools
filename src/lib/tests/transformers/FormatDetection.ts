import { detectInputFormat } from "lib/transformers/detectFormat";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";

describe("TestFormatDetection", () => {
  it.each([
    ["-- comment\nx = 5", "expanded"],
    ["var1 :: A -> B\nvar1 = 5", "expanded"],
    ["x = 5 -- comment", "expanded"],
    ["x :: Integer = 5", "expanded"],
    ["x::Integer=5", "expanded"],
    ['Variable("{}") = 5', "expanded"],
    ['Variable("a--b") = 5', "expanded"],
    ['Variable("x :: y") = 5', "expanded"],
    ['Variable("it\'s") = 5', "expanded"],
    ['Variable("==WithBeeGenome") = 5', "expanded"],
    ["apply add 1 2", "codeline"],
    ["5", "codeline"],
    ['{"a": 1}', "json"],
    ["apply(add, 1, 2)", "condensed"],
    ['stringConcat("a", "b")', "condensed"],
  ] as const)("detectInputFormat(%j) returns %s", (input, expected) => {
    expect(detectInputFormat(input)).toBe(expected);
  });

  it("detected expanded inputs parse with ExpandedToAST", () => {
    const expandedInputs = [
      "-- comment\nx = 5\nfinal = x",
      "var1 :: A -> B\nvar1 = 5\nfinal = var1",
      "x :: Integer = 5",
      'Variable("{}") = 5\nfinal = Variable("{}")',
      'Variable("a--b") = 5\nfinal = Variable("a--b")',
      'Variable("x :: y") = 5\nfinal = Variable("x :: y")',
    ];
    for (const input of expandedInputs) {
      expect(detectInputFormat(input)).toBe("expanded");
      const ast = ExpandedToAST(input);
      expect(ast.type).toBe("NetworkCards");
    }
  });

  it("detected codeline/condensed inputs still parse in their own formats", () => {
    expect(CondensedToAST("apply(add, 1, 2)")).toBeTruthy();
    expect(CodeLineToAST("apply add 1 2")).toBeTruthy();
  });
});
