import {
  CondensedToAST,
  ASTToCondensed,
  tokenize,
} from "lib/transformers/Condensed";
import {
  tokenizeWithGaps,
  computeCondensedOverlay,
  applyCondensedOverlay,
} from "lib/transformers/inputState";

describe("TestCondensedOverlay", () => {
  describe("tokenizeWithGaps", () => {
    it("tokenizes identically to tokenize", () => {
      const inputs = [
        "add(1, 2)",
        "apply(eq, 8)",
        "pipe(numberAdd, multiply)",
        '"a;b"',
        "{a: 1, b: 2}",
        "x => x(1)",
      ];
      for (const input of inputs) {
        expect(tokenizeWithGaps(input).tokens).toEqual(tokenize(input));
      }
    });

    it("captures leading gaps (no-trim interface)", () => {
      const { tokens, gaps, trailingGap } = tokenizeWithGaps("  add(1, 2)");
      expect(tokens.length).toBe(gaps.length);
      expect(gaps[0]).toBe("  ");
      expect(trailingGap).toBe("");
    });

    it("captures trailing gap after the last token", () => {
      const stream = tokenizeWithGaps("add(1, 2)  \t");
      expect(stream.trailingGap).toBe("  \t");
    });

    it("captures inter-token gaps", () => {
      const stream = tokenizeWithGaps("add (1 , 2 )");
      expect(stream.gaps).toEqual(["", " ", "", " ", " ", " "]);
      expect(stream.trailingGap).toBe("");
    });
  });

  describe("compute + apply against the real ASTToCondensed canonical", () => {
    const cases = [
      "add(1, 2)",
      "apply(eq, 8)",
      "'quoted'",
      '"a;b"',
      "[1, 2, 3]",
      "add  (1  , 2  )",
      "  add(1, 2)  \t", // leading + trailing whitespace
      "\n\n\tnumberAdd(1, 2)\n\n", // outer newlines
      'stringConcat("te", "st")',
      "add('a', 'b')", // single-quoted strings
    ];

    it.each(cases)("round-trips %j", (raw) => {
      const ast = CondensedToAST(raw);
      const canonical = ASTToCondensed(ast);
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("surface-form divergence falls back to raw text", () => {
    it("prefix application vs canonical call form → mode 1", () => {
      const raw = 'apply stringConcat "a" "b"';
      const canonical = 'stringConcat("a", "b")';
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(1);
      if (overlay.mode === 1) expect(overlay.rawText).toBe(raw);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("canonical input produces an empty overlay", () => {
    it("no overrides when raw equals canonical", () => {
      const raw = "add(1, 2)";
      const overlay = computeCondensedOverlay(raw, raw);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.gapOverrides).toEqual([]);
        expect(overlay.spellingOverrides).toEqual([]);
        expect(overlay.hasTrailingGap).toBe(false);
      }
      expect(applyCondensedOverlay(raw, overlay)).toBe(raw);
    });
  });

  describe("trailing-gap capture", () => {
    it("preserves trailing whitespace via hasTrailingGap", () => {
      const raw = "add(1, 2)  ";
      const canonical = "add(1, 2)";
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.hasTrailingGap).toBe(true);
        expect(overlay.trailingGap).toBe("  ");
      }
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("overlay vs raw size decision", () => {
    it("prefers raw text when the input is compact", () => {
      const raw = "1l";
      const canonical = "1";
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });
});
