import { CondensedToAST } from "lib/transformers/Condensed";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTtoJSON, JSONtoAST } from "lib/transformers/JSON";

describe("TestFormatOuterWhitespaceTolerance", () => {
  describe("CondensedToAST", () => {
    const cases: Array<[string, string]> = [
      ["  numberAdd(1, 2)  ", "numberAdd(1, 2)"],
      ["\n\n\tnumberAdd(1, 2)\n\n", "numberAdd(1, 2)"],
      ["  \n  apply(add, 1, 2)  \t\n  ", "apply(add, 1, 2)"],
      ['   "hello" \t ', '"hello"'],
      [
        "numberAdd(\n  numberAdd(1, 2),\n  3\n)",
        "numberAdd(numberAdd(1, 2), 3)",
      ],
      ['stringConcat(\n  "a=b",\n  "c"\n)', 'stringConcat("a=b", "c")'],
    ];

    it.each(cases)("parsesUntrimmed%jLikeTrimmed%j", (wrapped, clean) => {
      expect(CondensedToAST(wrapped)).toEqual(CondensedToAST(clean));
    });
  });

  describe("ExpandedToAST", () => {
    const cases: Array<[string, string]> = [
      ["\n  x = 5\n  -- note\n  final = x\n", "x = 5\nfinal = x"],
      ["   \n\n\ty = 5\n   final = y\n\n  ", "y = 5\nfinal = y"],
      ["\nx :: Integer = 5\nfinal = x\n", "x :: Integer = 5\nfinal = x"],
    ];

    it.each(cases)("parsesUntrimmed%jLikeTrimmed%j", (wrapped, clean) => {
      expect(ExpandedToAST(wrapped)).toEqual(ExpandedToAST(clean));
    });
  });

  describe("CodeLineToAST", () => {
    const cases: Array<[string, string]> = [
      ["   apply add 1 2  ", "apply add 1 2"],
      ["\n\n\tapply add 1 2\n\n", "apply add 1 2"],
      ['  \n  stringConcat "a" "b"  \n  ', 'stringConcat "a" "b"'],
      ["numberAdd\n  (numberAdd 1 2)\n  3", "numberAdd (numberAdd 1 2) 3"],
    ];

    it.each(cases)("parsesUntrimmed%jLikeTrimmed%j", (wrapped, clean) => {
      expect(CodeLineToAST(wrapped)).toEqual(CodeLineToAST(clean));
    });
  });

  describe("JSONtoASTViaThePagesJSONParsePath", () => {
    const ast: TypeAST.Curried = {
      type: "Curry",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: [{ type: "Integer", value: "10" }],
    };
    const json = JSON.stringify(ASTtoJSON(ast));

    it.each([
      [`  ${json}  `, json],
      [`\n\n\t${json}\n\n`, json],
    ] as Array<[string, string]>)(
      "parsesUntrimmed%jLikeTrimmed%j",
      (wrapped, clean) => {
        expect(JSON.parse(wrapped)).toEqual(JSON.parse(clean));
        expect(JSONtoAST(JSON.parse(wrapped) as jsonData)).toEqual(
          JSONtoAST(JSON.parse(clean) as jsonData)
        );
      }
    );
  });
});
