import {
  ASTToCompressed,
  CompressedToAST,
  compressWithInputState,
  decodeInputStateFromCompressed,
  type InputStateSection,
} from "lib/transformers/Compressed";
import { CondensedToAST, ASTToCondensed } from "lib/transformers/Condensed";
import {
  computeCondensedOverlay,
  applyCondensedOverlay,
  computeCodeLineOverlay,
  applyCodeLineOverlay,
  computeExpandedOverlay,
  applyExpandedOverlay,
  stripAutoCurryVarNames,
  type CondensedOverlay,
} from "lib/transformers/inputState";
import { CodeLineToAST, ASTToCodeLine } from "lib/transformers/CodeLine";
import { ExpandedToAST, ASTToExpanded } from "lib/transformers/Expanded";
import { ASTtoJSON, JSONtoAST } from "lib/transformers/JSON";
import {
  computeJsonOverlay,
  applyJsonOverlay,
} from "lib/transformers/inputState";

const buildSection = (
  raw: string
): { section: InputStateSection; ast: TypeAST.AST; canonical: string } => {
  const ast = CondensedToAST(raw);
  const canonical = ASTToCondensed(ast);
  const overlay: CondensedOverlay = computeCondensedOverlay(raw, canonical);
  const section: InputStateSection =
    overlay.mode === 0
      ? { format: "condensed", mode: "overlay", overlay }
      : { format: "condensed", mode: "raw", rawText: raw };
  return { section, ast, canonical };
};

const restore = (
  canonical: string,
  decoded: NonNullable<ReturnType<typeof decodeInputStateFromCompressed>>
): string =>
  decoded.mode === "raw"
    ? decoded.rawText
    : decoded.format === "expanded"
      ? applyExpandedOverlay(canonical, decoded.overlay)
      : applyCondensedOverlay(canonical, decoded.overlay);

describe("TestInputStateSection", () => {
  describe("sectionless codes decode as today", () => {
    it("CompressedToAST still works on a plain AST", () => {
      const ast: TypeAST.AST = { type: "Integer", value: "10", varName: "ten" };
      const code = ASTToCompressed(ast);
      expect(CompressedToAST(code)).toEqual(ast);
    });

    it("decodeInputStateFromCompressed returns null for a sectionless code", () => {
      const code = ASTToCompressed({ type: "String", value: "hi" });
      expect(decodeInputStateFromCompressed(code, "condensed")).toBeNull();
    });
  });

  describe("existing negative tests still throw (decode errors, not trailing bits)", () => {
    it("testRejectUnknownOperatorID", () => {
      expect(() => CompressedToAST("f-A")).toThrow();
    });

    it("testRejectTruncatedNumericPayload", () => {
      expect(() => CompressedToAST("gA")).toThrow();
    });
  });

  describe("encode + decode the condensed overlay section", () => {
    const cases: Array<{ raw: string }> = [
      { raw: "add(1, 2)" },
      { raw: "add('a', 'b')" },
      { raw: "add  (1  , 2  )" },
      { raw: "  add(1, 2)  \t" },
    ];

    it.each(cases)("round-trips %j (output format json)", ({ raw }) => {
      const { section, ast, canonical } = buildSection(raw);
      const code = compressWithInputState(ast, "json", section);

      const roundTripped = CompressedToAST(code);
      expect(() => CompressedToAST(code)).not.toThrow();
      expect(roundTripped.type).toBe(ast.type);

      const decoded = decodeInputStateFromCompressed(code, "json");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.format).toBe("condensed");
      expect(restore(canonical, decoded)).toBe(raw);
    });

    it.each(["add 1 2", 'stringConcat "a" "b"', "  add 1 2  \t", "add  1 2"])(
      "codeline section round-trips %j (output format json)",
      (raw) => {
        const ast = CodeLineToAST(raw);
        const canonical = ASTToCodeLine(ast);
        const overlay = computeCodeLineOverlay(raw, canonical);
        const section: InputStateSection =
          overlay.mode === 0
            ? { format: "codeline", mode: "overlay", overlay }
            : { format: "codeline", mode: "raw", rawText: raw };
        const code = compressWithInputState(ast, "json", section);

        const decoded = decodeInputStateFromCompressed(code, "json");
        expect(decoded).not.toBeNull();
        if (!decoded) return;
        expect(decoded.format).toBe("codeline");
        const restored =
          decoded.mode !== "overlay" || decoded.format !== "codeline"
            ? raw
            : applyCodeLineOverlay(canonical, decoded.overlay);
        expect(restored).toBe(raw);
      }
    );

    it.each([
      "x = 5",
      "-- note\n\nx = 5",
      "x = 5 -- six",
      "x :: Integer = 5",
      "\n\nx = 5\n\n",
      'Variable("my var") = 5\nfinal = Variable("my var")',
      'result = stringConcat("a very long first string value", "a very long second string value") -- computed',
    ])("expanded section round-trips %j (output format json)", (raw) => {
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const overlay = computeExpandedOverlay(raw, canonical);
      if (overlay.mode !== 0) return;
      const section: InputStateSection = {
        format: "expanded",
        mode: "overlay",
        overlay: overlay.overlay,
      };
      const code = compressWithInputState(ast, "json", section);

      const decoded = decodeInputStateFromCompressed(code, "json");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.format).toBe("expanded");
      expect(decoded.mode).toBe("overlay");
      if (decoded.mode !== "overlay" || decoded.format !== "expanded") return;
      expect(applyExpandedOverlay(canonical, decoded.overlay)).toBe(raw);
    });

    it("expanded tail-mode-0 (sparse RHS) round-trips through the bitstream", () => {
      const raw =
        'result = stringConcat("a very long first string value", "a very long second string value") -- computed';
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const overlay = computeExpandedOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      if (overlay.mode !== 0) return;
      const item = overlay.overlay.items[0]!;
      expect(item).toMatchObject({
        kind: 0,
        name: "result",
        tailMode: 0,
        head: null,
      });

      const section: InputStateSection = {
        format: "expanded",
        mode: "overlay",
        overlay: overlay.overlay,
      };
      const code = compressWithInputState(ast, "json", section);
      const decoded = decodeInputStateFromCompressed(code, "json");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.format).toBe("expanded");
      expect(decoded.mode).toBe("overlay");
      if (decoded.mode !== "overlay" || decoded.format !== "expanded") return;
      const decodedItem = decoded.overlay.items[0]!;
      expect(decodedItem).toMatchObject({
        kind: 0,
        nameRef: 0,
        tailMode: 0,
        head: null,
      });
      expect(applyExpandedOverlay(canonical, decoded.overlay)).toBe(raw);
    });

    it("json section round-trips an operator payload with whitespace + spellings", () => {
      const baseAst: TypeAST.Curried = {
        type: "Curry",
        base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
        args: [{ type: "Integer", value: "10" }],
      };
      const minified = JSON.stringify(ASTtoJSON(baseAst));
      const raw =
        "\n  " + minified.replace('"value":10', '"value":1.0') + " \t";
      const ast = JSONtoAST(JSON.parse(raw) as jsonData);
      const canonical = JSON.stringify(ASTtoJSON(ast), null, 2);
      const overlay = computeJsonOverlay(raw, canonical);
      const section: InputStateSection =
        overlay.mode === 0
          ? { format: "json", mode: "overlay", overlay }
          : { format: "json", mode: "raw", rawText: raw };
      const code = compressWithInputState(ast, "json", section);

      const decoded = decodeInputStateFromCompressed(code, "json");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.format).toBe("json");
      const restored =
        decoded.mode !== "overlay" || decoded.format !== "json"
          ? raw
          : applyJsonOverlay(canonical, decoded.overlay);
      expect(restored).toBe(raw);
    });

    it("stores a section when formats match but canonical != raw (presence rule)", () => {
      const raw = "add(1, 2)";
      const { section, ast, canonical } = buildSection(raw);
      const code = compressWithInputState(ast, "condensed", section);

      const decoded = decodeInputStateFromCompressed(code, "condensed");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.format).toBe("condensed");
      expect(restore(canonical, decoded)).toBe(raw);
    });

    it("canonical string-arg curry round-trips via a sparse overlay", () => {
      const raw = 'stringConcat("a", "b")';
      const ast = CondensedToAST(raw);
      const canonical = ASTToCondensed(
        stripAutoCurryVarNames(CompressedToAST(ASTToCompressed(ast)))
      );
      expect(canonical).toBe(raw);
      const overlay = computeCondensedOverlay(raw, canonical);
      expect(overlay.mode).toBe(0);
      const section: InputStateSection =
        overlay.mode === 0
          ? { format: "condensed", mode: "overlay", overlay }
          : { format: "condensed", mode: "raw", rawText: raw };
      const code = compressWithInputState(ast, "condensed", section);

      const decoded = decodeInputStateFromCompressed(code, "condensed");
      expect(decoded).not.toBeNull();
      if (!decoded) return;
      expect(decoded.mode).toBe("overlay");
      const decodeCanonical = ASTToCondensed(
        stripAutoCurryVarNames(CompressedToAST(code))
      );
      expect(decodeCanonical).toBe(canonical);
      const restored =
        decoded.mode !== "overlay" || decoded.format !== "condensed"
          ? raw
          : applyCondensedOverlay(decodeCanonical, decoded.overlay);
      expect(restored).toBe(raw);
    });

    it("raw-text fallback decodes verbatim (mode 1 payload)", () => {
      const raw = 'stringConcat("a", "b")';
      const ast: TypeAST.AST = CondensedToAST("add(1, 2)");
      const section: InputStateSection = {
        format: "condensed",
        mode: "raw",
        rawText: raw,
      };
      const code = compressWithInputState(ast, "expanded", section);
      const decoded = decodeInputStateFromCompressed(code, "expanded");
      expect(decoded).toEqual({
        format: "condensed",
        mode: "raw",
        rawText: raw,
      });
    });

    it("clustered string codec round-trips every class tier + escape chars", () => {
      const raws = [
        "lowercaseName_2_With|pipe?and~tilde#hash",
        "UPPER lower 123 ()[]{},.:;-_<>= \t\n",
        "  add(1, 2)  \t",
      ];
      for (const raw of raws) {
        const ast: TypeAST.AST = CondensedToAST("add(1, 2)");
        const section: InputStateSection = {
          format: "condensed",
          mode: "raw",
          rawText: raw,
        };
        const code = compressWithInputState(ast, "expanded", section);
        const decoded = decodeInputStateFromCompressed(code, "expanded");
        expect(decoded).toEqual({
          format: "condensed",
          mode: "raw",
          rawText: raw,
        });
      }
    });

    it("clustered string codec falls back to legacy encoding for non-ascii", () => {
      const raws = ["héllo wörld", "名前に日本語", "emoji 🎉 in string"];
      for (const raw of raws) {
        const ast: TypeAST.AST = CondensedToAST("add(1, 2)");
        const section: InputStateSection = {
          format: "condensed",
          mode: "raw",
          rawText: raw,
        };
        const code = compressWithInputState(ast, "expanded", section);
        const decoded = decodeInputStateFromCompressed(code, "expanded");
        expect(decoded).toEqual({
          format: "condensed",
          mode: "raw",
          rawText: raw,
        });
      }
    });
  });

  describe("format-stored bit", () => {
    it("encodes the format when it differs from output, elides it otherwise", () => {
      const ast: TypeAST.AST = { type: "Integer", value: "1" };

      const same = compressWithInputState(ast, "condensed", {
        format: "condensed",
        mode: "raw",
        rawText: "x",
      });
      const decodedSame = decodeInputStateFromCompressed(same, "condensed");
      expect(decodedSame).toEqual({
        format: "condensed",
        mode: "raw",
        rawText: "x",
      });

      const diff = compressWithInputState(ast, "json", {
        format: "condensed",
        mode: "raw",
        rawText: "x",
      });
      const decodedDiff = decodeInputStateFromCompressed(diff, "json");
      expect(decodedDiff).toEqual({
        format: "condensed",
        mode: "raw",
        rawText: "x",
      });
    });
  });
});
