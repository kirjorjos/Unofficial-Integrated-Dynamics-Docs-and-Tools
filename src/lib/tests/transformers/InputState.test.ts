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
  describe("TokenizeWithGaps", () => {
    it("tokenizesIdenticallyToTokenize", () => {
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

    it("capturesLeadingGapsNoTrimInterface", () => {
      const { tokens, gaps, trailingGap } = tokenizeWithGaps("  add(1, 2)");
      expect(tokens.length).toBe(gaps.length);
      expect(gaps[0]).toBe("  ");
      expect(trailingGap).toBe("");
    });

    it("capturesTrailingGapAfterTheLastToken", () => {
      const stream = tokenizeWithGaps("add(1, 2)  \t");
      expect(stream.trailingGap).toBe("  \t");
    });

    it("capturesInterTokenGaps", () => {
      const stream = tokenizeWithGaps("add (1 , 2 )");
      expect(stream.gaps).toEqual(["", " ", "", " ", " ", " "]);
      expect(stream.trailingGap).toBe("");
    });
  });

  describe("ComputePlusApplyAgainstTheRealASTToCondensedCanonical", () => {
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
      "add(1, 2) -- note", // comment falls back to verbatim raw text
      'add(1, 2) -- "open string',
    ];

    it.each(cases)("roundTrips%j", (raw) => {
      const ast = CondensedToAST(raw);
      const canonical = ASTToCondensed(ast);
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("SurfaceFormDivergenceFallsBackToRawText", () => {
    it("prefixApplicationVsCanonicalCallFormToMode1", () => {
      const raw = 'apply stringConcat "a" "b"';
      const canonical = 'stringConcat("a", "b")';
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(1);
      if (overlay.mode === 1) expect(overlay.rawText).toBe(raw);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("CanonicalInputProducesAnEmptyOverlay", () => {
    it("noOverridesWhenRawEqualsCanonical", () => {
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

  describe("TrailingGapCapture", () => {
    it("preservesTrailingWhitespaceViaHasTrailingGap", () => {
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

  describe("OverlayVsRawSizeDecision", () => {
    it("prefersRawTextWhenTheInputIsCompact", () => {
      const raw = "1l";
      const canonical = "1";
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(applyCondensedOverlay(canonical, overlay)).toBe(raw);
    });
  });
});
