import { CodeLineToAST, ASTToCodeLine } from "lib/transformers/CodeLine";
import {
  tokenizeCodeLineWithGaps,
  computeCodeLineOverlay,
  applyCodeLineOverlay,
} from "lib/transformers/inputState";

describe("TestCodeLineOverlay", () => {
  describe("tokenizeCodeLineWithGaps", () => {
    it("splits space-separated words, capturing gaps", () => {
      const stream = tokenizeCodeLineWithGaps("add 1 2");
      expect(stream.tokens).toEqual(["add", "1", "2"]);
      expect(stream.gaps).toEqual(["", " ", " "]);
      expect(stream.trailingGap).toBe("");
    });

    it("captures leading and trailing whitespace (no-trim)", () => {
      const stream = tokenizeCodeLineWithGaps("  \nadd 1 2\t ");
      expect(stream.tokens).toEqual(["add", "1", "2"]);
      expect(stream.gaps[0]).toBe("  \n");
      expect(stream.trailingGap).toBe("\t ");
    });

    it("handles quotes and structural chars", () => {
      const stream = tokenizeCodeLineWithGaps('stringConcat "a" (1, 2)');
      expect(stream.tokens).toEqual([
        "stringConcat",
        '"a"',
        "(",
        "1",
        ",",
        "2",
        ")",
      ]);
    });
  });

  describe("compute + apply against the real ASTToCodeLine canonical", () => {
    const cases = [
      "add 1 2", // canonical → no overrides
      'stringConcat "a" "b"',
      "numberAdd 1 2",
      "add  1 2", // extra gap
      "  add 1 2  \t", // leading + trailing whitespace
      "add 1  2",
      "1",
      "[1, 2, 3]",
    ];

    it.each(cases)("round-trips %j", (raw) => {
      const ast = CodeLineToAST(raw);
      const canonical = ASTToCodeLine(ast);
      const overlay = computeCodeLineOverlay(raw, canonical);
      expect(applyCodeLineOverlay(canonical, overlay)).toBe(raw);
    });
  });

  describe("canonical input produces an empty overlay", () => {
    it("no overrides when raw equals canonical", () => {
      const raw = "add 1 2";
      const overlay = computeCodeLineOverlay(raw, raw);
      expect(overlay.mode).toBe(0);
      if (overlay.mode === 0) {
        expect(overlay.gapOverrides).toEqual([]);
        expect(overlay.spellingOverrides).toEqual([]);
        expect(overlay.hasTrailingGap).toBe(false);
      }
      expect(applyCodeLineOverlay(raw, overlay)).toBe(raw);
    });
  });
});
