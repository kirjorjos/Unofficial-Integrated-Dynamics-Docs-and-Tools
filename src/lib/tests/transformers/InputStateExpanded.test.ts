import { ExpandedToAST, ASTToExpanded } from "lib/transformers/Expanded";
import type { ExpandedSignatureOptions } from "lib/transformers/Expanded";
import {
  compressWithInputState,
  type InputStateSection,
} from "lib/transformers/Compressed";
import {
  analyzeExpandedLines,
  computeExpandedOverlay,
  applyExpandedOverlay,
  discoverSignatureRestoreModes,
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
  return compressWithInputState(ast, "snbt", section);
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
  return compressWithInputState(ast, "snbt", section);
};

describe("TestExpandedOverlay", () => {
  describe("AnalyzeExpandedLines", () => {
    it("classifiesCommentBlankSignatureDefinitionBare", () => {
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

  describe("ComputePlusApplyRoundTrips", () => {
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

    it.each(cases)("roundTrips%j", (raw) => {
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

  describe("OuterWhitespaceRoundTripsByteForByte", () => {
    it("leadingPlusTrailingBlankLinesAndSpaces", () => {
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

  describe("TailMode0SparseRHSDiff", () => {
    const LONG_STRING_RHS =
      'stringConcat("a very long first string value", "a very long second string value")';

    it("storesASparseRHSOverlayWhenTheRawRHSAlignsWithTheCanonicalRHS", () => {
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

    it("keepsTheInlineCommentAsTheRHSSuffix", () => {
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

    it("spellingDivergencesLandInTheRHSOverlayNotTheVerbatimTail", () => {
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

    it("fallsBackToAVerbatimTailWhenTheRHSSurfaceDivergesLambdaParams", () => {
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

    it("rawFallbackWhenTheItemStreamIsLargerThanTheInput", () => {
      const raw = "x :: Integer\nx = 5";
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      expect(result.mode).toBe(1);
      if (result.mode === 1) expect(result.rawText).toBe(raw);
    });

    it("repeatedSameASTDefinitionsEachGetTailMode0Items", () => {
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

    it("theOverlayIsStrictlySmallerThanTheRawInputThePointOfTailMode0", () => {
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

  describe("HeadDefaultElisionHasHead0", () => {
    const LONG_RHS =
      'stringConcat("a very long first string value", "a very long second string value")';

    it("elidesADefaultHeadToNullTailMode0Item", () => {
      const raw = `result = ${LONG_RHS} -- note`;
      const ast = ExpandedToAST(raw);
      const canonical = ASTToExpanded(ast);
      const result = computeExpandedOverlay(raw, canonical);
      if (result.mode !== 0) return;
      const item = result.overlay.items[0]!;
      expect(item).toMatchObject({ kind: 0, name: "result", head: null });
    });

    it("storesANonDefaultHeadVerbatim", () => {
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

    it("reconstructsTheDefaultHeadOnApplyBareAndVariableWrappedNames", () => {
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

    it("applyReconstructsTheDefaultHeadForTailMode0Items", () => {
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

    it("elidingTheHeadShrinksTheEncodedSectionSizeProof", () => {
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

  describe("SignatureRestoreModesHonorAResolvedBase", () => {
    const RAW =
      "byEquals = apply(pipe, equals)\nonHead = apply(flip(pipe), head)\nend = onHead";

    it("respectsBaseResolveAnysWhenDiscoveringModes", () => {
      const ast = ExpandedToAST(RAW);
      const base: ExpandedSignatureOptions = {
        depth: null,
        labels: false,
        arrow: "→",
        hideOperatorWrappers: false,
      };
      const resolvedBase: ExpandedSignatureOptions = {
        ...base,
        resolveAnys: true,
      };
      const modes = discoverSignatureRestoreModes(RAW, ast, resolvedBase);
      expect(modes.every((m) => m.opts.resolveAnys === true)).toBe(true);
    });

    it("doesNotConstrainModesWhenTheBaseHasNoResolveAnys", () => {
      const ast = ExpandedToAST(RAW);
      const base: ExpandedSignatureOptions = {
        depth: null,
        labels: false,
        arrow: "→",
        hideOperatorWrappers: false,
      };
      const modes = discoverSignatureRestoreModes(RAW, ast, base);
      expect(Array.isArray(modes)).toBe(true);
    });
  });
});
