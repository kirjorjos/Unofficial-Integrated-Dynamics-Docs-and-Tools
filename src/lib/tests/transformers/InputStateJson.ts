import { ASTtoJSON, JSONtoAST } from "lib/transformers/JSON";
import {
  tokenizeJson,
  computeJsonOverlay,
  applyJsonOverlay,
} from "lib/transformers/inputState";

const baseAst: TypeAST.Curried = {
  type: "Curry",
  base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
  args: [{ type: "Integer", value: "10" }],
};

const canonicalOf = (raw: string): string =>
  JSON.stringify(ASTtoJSON(JSONtoAST(JSON.parse(raw) as jsonData)), null, 2);

const prettyCanonical = JSON.stringify(ASTtoJSON(baseAst), null, 2);
const minified = JSON.stringify(ASTtoJSON(baseAst));

describe("TestJsonOverlay", () => {
  describe("tokenizeJson", () => {
    it("tokenizes objects with structural chars and gaps", () => {
      const stream = tokenizeJson('{"a": 1}');
      expect(stream.tokens.map((t) => t.type)).toEqual([
        "lbrace",
        "string",
        "colon",
        "number",
        "rbrace",
      ]);
      expect(stream.tokens.map((t) => t.value)).toEqual([
        "{",
        '"a"',
        ":",
        "1",
        "}",
      ]);
      expect(stream.gaps).toEqual(["", "", "", " ", ""]);
      expect(stream.trailingGap).toBe("");
    });

    it("captures leading and trailing whitespace (no-trim)", () => {
      const stream = tokenizeJson(' \n\t{"a":1}\r\n ');
      expect(stream.tokens.map((t) => t.value)).toEqual([
        "{",
        '"a"',
        ":",
        "1",
        "}",
      ]);
      expect(stream.gaps[0]).toBe(" \n\t");
      expect(stream.trailingGap).toBe("\r\n ");
    });

    it("handles arrays, literals and nested structure", () => {
      const stream = tokenizeJson('[true, false, null, {"x":[]}]');
      expect(stream.tokens.map((t) => t.type)).toEqual([
        "lbracket",
        "boolean",
        "comma",
        "boolean",
        "comma",
        "null",
        "comma",
        "lbrace",
        "string",
        "colon",
        "lbracket",
        "rbracket",
        "rbrace",
        "rbracket",
      ]);
    });

    it("keeps string escapes inside a single token", () => {
      const stream = tokenizeJson('"a\\n\\u0041\\"b"');
      expect(stream.tokens).toEqual([
        { type: "string", value: '"a\\n\\u0041\\"b"' },
      ]);
    });

    it("tokenizes number forms", () => {
      const stream = tokenizeJson("[-1, 0, 1.5, 1e-3, 1.5E+2]");
      expect(
        stream.tokens.filter((t) => t.type === "number").map((t) => t.value)
      ).toEqual(["-1", "0", "1.5", "1e-3", "1.5E+2"]);
    });
  });

  describe("compute + apply against the real JSON canonical", () => {
    const roundTripCases: Array<[string, string]> = [
      ["minified", minified],
      ["pretty canonical", prettyCanonical],
      ["leading/trailing whitespace", `\n  ${minified} \t\n`],
      ["trailing .0 integer", minified.replace('"value":10', '"value":1.0')],
      ["exponent spelling", minified.replace('"value":10', '"value":1e-3')],
      [
        "identity-preserving long",
        minified.replace('"value":10', '"value":5000000000'),
      ],
      [
        "huge-long precision",
        minified.replace('"value":10', '"value":9007199254740993'),
      ],
      [
        "escape spelling",
        minified.replace(
          '"integrateddynamics:arithmetic_addition"',
          '"\\u0069ntegrateddynamics:arithmetic_addition"'
        ),
      ],
    ];

    it.each(roundTripCases)("round-trips %s", (_name, raw) => {
      const canonical = canonicalOf(raw);
      const overlay = computeJsonOverlay(raw, canonical);
      expect(applyJsonOverlay(canonical, overlay)).toBe(raw);
    });

    it("uses the sparse overlay for spelling differences", () => {
      const raw = minified.replace('"value":10', '"value":1.0');
      const overlay = computeJsonOverlay(raw, canonicalOf(raw));
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.spellingOverrides.some(([, v]) => v === "1.0")).toBe(
          true
        );
        expect(overlay.gapOverrides.length).toBeGreaterThan(0);
      }
    });

    it("produces an empty overlay when raw equals canonical", () => {
      const overlay = computeJsonOverlay(prettyCanonical, prettyCanonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.gapOverrides).toEqual([]);
        expect(overlay.spellingOverrides).toEqual([]);
        expect(overlay.hasTrailingGap).toBe(false);
      }
    });
  });

  describe("raw-text fallback on structural divergence", () => {
    it("falls back to raw text when a string is coerced to a number", () => {
      const raw = minified.replace('"value":10', '"value":"5l"');
      const overlay = computeJsonOverlay(raw, canonicalOf(raw));
      expect(overlay.mode).toBe(1);
      if (overlay.mode === 1) expect(overlay.rawText).toBe(raw);
      expect(applyJsonOverlay(canonicalOf(raw), overlay)).toBe(raw);
    });

    it("falls back to raw text when keys are reordered", () => {
      const parsed = JSON.parse(minified) as {
        curry: Record<string, jsonData>;
      };
      const reordered = JSON.stringify({
        curry: {
          baseOperator: parsed.curry["baseOperator"],
          values: parsed.curry["values"],
        },
      });
      expect(JSON.parse(reordered)).toEqual(JSON.parse(minified));
      const overlay = computeJsonOverlay(reordered, canonicalOf(reordered));
      expect(overlay.mode).toBe(1);
      if (overlay.mode === 1) expect(overlay.rawText).toBe(reordered);
      expect(applyJsonOverlay(canonicalOf(reordered), overlay)).toBe(reordered);
    });
  });
});
