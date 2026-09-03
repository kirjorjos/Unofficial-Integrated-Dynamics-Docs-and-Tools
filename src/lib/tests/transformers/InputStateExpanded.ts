import { ExpandedToAST, ASTToExpanded } from "lib/transformers/Expanded";
import {
  compressWithInputState,
  type InputStateSection,
} from "lib/transformers/Compressed";
import {
  analyzeExpandedLines,
  computeExpandedOverlay,
  applyExpandedOverlay,
  type ExpandedOverlay,
} from "lib/transformers/inputState";

const compressExpandedSection = (
  ast: ReturnType<typeof ExpandedToAST>,
  overlay: ExpandedOverlay
): string => {
  const section: InputStateSection = {
    format: "expanded",
    mode: "overlay",
    overlay,
  };
  return compressWithInputState(ast, "json", section);
};

const compressExpandedRaw = (
  ast: ReturnType<typeof ExpandedToAST>,
  rawText: string
): string => {
  const section: InputStateSection = {
    format: "expanded",
    mode: "raw",
    rawText,
  };
  return compressWithInputState(ast, "json", section);
};

describe("TestExpandedOverlay", () => {
  describe("analyzeExpandedLines", () => {
    it("classifies comment / blank / signature / definition / bare", () => {
      const items = analyzeExpandedLines("\n-- hi\nx = 5\n\ns :: Type\nend");
      expect(items).toEqual([
        { kind: 3, text: "" },
        { kind: 1, text: "-- hi" },
        { kind: 0, name: "x", head: "x =", tailMode: 1, tail: " 5" },
        { kind: 3, text: "" },
        { kind: 2, text: "s :: Type" },
        { kind: 4, text: "end" },
      ]);
    });
  });

  describe("compute + apply round-trips", () => {
    const cases = [
      "x = 5",
      "-- note\n\nx = 5",
      "x = 5 -- six",
      "x :: Integer = 5",
      "x :: Integer\nx = 5",
      "x = 5\nx = 5", // repeated def resolving to same AST
      "\n\nx = 5\n\n", // outer blanks
      'Variable("my var") = 5\nfinal = Variable("my var")',
      "x = 5\nadd(x, 1)", // bare-expr final line
      "inc x = numberAdd x 1", // lambda new-form
      "inc = x => numberAdd x 1", // arrow-form
    ];

    it.each(cases)("round-trips %j", (raw) => {
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode === 0) {
        expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
      } else {
        expect(result.rawText).toBe(raw);
      }
    });
  });

  describe("outer whitespace round-trips byte-for-byte", () => {
    it("leading + trailing blank lines and spaces", () => {
      const raw = "  \n\n\tx = 5  \n\n  ";
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode === 0) {
        expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
      } else {
        expect(result.rawText).toBe(raw);
      }
    });
  });

  describe("tail-mode 0 (sparse RHS diff)", () => {
    const LONG_STRING_RHS =
      'stringConcat("a very long first string value", "a very long second string value")';

    it("stores a sparse RHS overlay when the raw RHS aligns with the canonical RHS", () => {
      const raw = `result = ${LONG_STRING_RHS}`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      expect(result.overlay.items).toEqual([
        {
          kind: 0,
          name: "result",
          nameRef: 0,
          head: null,
          tailMode: 0,
          rhsOverlay: {
            mode: 0,
            gapOverrides: [],
            hasTrailingGap: false,
            trailingGap: "",
            spellingOverrides: [],
          },
          suffix: "",
        },
      ]);
      expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
    });

    it("keeps the inline comment as the RHS suffix", () => {
      const raw = `result = ${LONG_STRING_RHS} -- computed`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({
        kind: 0,
        name: "result",
        tailMode: 0,
        suffix: " -- computed",
      });
      expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
    });

    it("spelling divergences land in the RHS overlay, not the verbatim tail", () => {
      const raw =
        "result = stringConcat(\"a very long first string value\", 'a very long second string value')";
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({
        kind: 0,
        name: "result",
        tailMode: 0,
        suffix: "",
      });
      if (item.kind !== 0 || item.tailMode !== 0) return;
      expect(item.rhsOverlay.mode).toBe(0);
      if (item.rhsOverlay.mode !== 0) return;
      expect(item.rhsOverlay.spellingOverrides).toEqual([
        [4, "'a very long second string value'"],
      ]);
      expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
    });

    it("falls back to a verbatim tail when the RHS surface diverges (lambda params)", () => {
      const raw = "inc x = numberAdd x 1";
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode === 0) {
        const item = result.overlay.items[0]!;
        expect(item).toMatchObject({
          kind: 0,
          name: "inc",
          tailMode: 1,
          tail: " numberAdd x 1",
        });
      } else {
        expect(result.rawText).toBe(raw);
      }
      const restored =
        result.mode === 0
          ? applyExpandedOverlay(canonical, result.overlay)
          : result.rawText;
      expect(restored).toBe(raw);
    });

    it("raw fallback when the item stream is larger than the input", () => {
      const raw = "x :: Integer\nx = 5";
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(1);
      if (result.mode === 1) expect(result.rawText).toBe(raw);
    });

    it("repeated same-AST definitions each get tail-mode 0 items", () => {
      const raw = `result = ${LONG_STRING_RHS}\nresult = ${LONG_STRING_RHS}`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      expect(result.overlay.items).toHaveLength(2);
      for (const item of result.overlay.items) {
        expect(item).toMatchObject({ kind: 0, name: "result", tailMode: 0 });
      }
      expect(applyExpandedOverlay(canonical, result.overlay)).toBe(raw);
    });

    it("the overlay is strictly smaller than the raw input (the point of tail-mode 0)", () => {
      const raw = `result = ${LONG_STRING_RHS}`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      const sectionOverlay = compressExpandedSection(ast, result.overlay);
      const sectionRaw = compressExpandedRaw(ast, raw);
      expect(sectionOverlay.length).toBeLessThan(sectionRaw.length);
    });
  });

  describe("head-default elision (has-head=0)", () => {
    const LONG_RHS =
      'stringConcat("a very long first string value", "a very long second string value")';

    it("elides a default head to null (tail-mode 0 item)", () => {
      const raw = `result = ${LONG_RHS} -- note`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({ kind: 0, name: "result", head: null });
    });

    it("stores a non-default head verbatim", () => {
      const raw = `Variable("result") = ${LONG_RHS}`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({
        kind: 0,
        name: "result",
        head: 'Variable("result") =',
      });
    });

    it("reconstructs the default head on apply (bare and Variable-wrapped names)", () => {
      for (const [name, head] of [
        ["result", "result ="],
        ["my var", 'Variable("my var") ='],
      ] as const) {
        const canonical = `${head} 5`;
        const overlay: ExpandedOverlay = {
          items: [
            {
              kind: 0,
              name,
              head: null,
              tailMode: 1,
              tail: " 5",
            },
          ],
        };
        expect(applyExpandedOverlay(canonical, overlay)).toBe(`${head} 5`);
      }
    });

    it("apply reconstructs the default head for tail-mode-0 items", () => {
      const canonical = `result = ${LONG_RHS}`;
      const overlay: ExpandedOverlay = {
        items: [
          {
            kind: 0,
            name: "result",
            head: null,
            tailMode: 0,
            rhsOverlay: {
              mode: 0,
              gapOverrides: [],
              hasTrailingGap: false,
              trailingGap: "",
              spellingOverrides: [],
            },
            suffix: "",
          },
        ],
      };
      expect(applyExpandedOverlay(canonical, overlay)).toBe(
        `result = ${LONG_RHS}`
      );
    });

    it("eliding the head shrinks the encoded section (size proof)", () => {
      const raw = `result = ${LONG_RHS}`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(0);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({ kind: 0, head: null });
      if (item.kind !== 0 || item.head !== null) return;
      const withHead: ExpandedOverlay = {
        items: [{ ...item, head: `${item.name} =` }],
      };
      const elidedSection = compressExpandedSection(ast, result.overlay);
      const headedSection = compressExpandedSection(ast, withHead);
      expect(elidedSection.length).toBeLessThan(headedSection.length);
    });
  });
});
