import { ASTToCodeLine } from "lib/transformers/CodeLine";
import { ASTToCondensed } from "lib/transformers/Condensed";
import {
  ASTToExpanded,
  ASTToExpandedWithSignatureOptions,
  ExpandedToAST,
} from "lib/transformers/Expanded";
import {
  decodeSettingsOpts,
  encodeSettingsOpts,
  DEFAULT_TRANSFORMER_SETTINGS,
  type TransformerSettings,
} from "lib/transformers/transformerSettings";

describe("TestTransformerSettingsOpts", () => {
  const atDefault: TransformerSettings = { ...DEFAULT_TRANSFORMER_SETTINGS };

  it("testOmitsOptsParamWhenEverythingIsDefault", () => {
    expect(encodeSettingsOpts(atDefault)).toBeNull();
  });

  it("testRoundTripsEverySettingThroughBitmap", () => {
    const settings: TransformerSettings = {
      ...atDefault,
      signatureDepth: 3,
      depthLabels: true,
      arrowGlyph: "->",
      signatureLayout: "inline",
      inlinePlacement: "before",
      statementLayout: "newline",
      referenceStyle: "refs",
      expandedRefForm: "name",
      wrap: true,
      comments: true,
      variableWrapper: true,
      lambdaParamSugar: true,
      duplicateNames: "allow",
      hardening: "full",
      hideOperatorWrappers: true,
      resolve: true,
      preferSourceNames: true,
      declarationCards: "add",
    };
    const encoded = encodeSettingsOpts(settings);
    expect(encoded).not.toBeNull();
    expect(decodeSettingsOpts(encoded)).toEqual(settings);
  });

  it("testRoundTripsDepthZeroOneOneTwoSevenAndOneTwoEight", () => {
    for (const depth of [0, 1, 127, 128]) {
      const settings: TransformerSettings = {
        ...atDefault,
        signatureDepth: depth,
      };
      const encoded = encodeSettingsOpts(settings);
      expect(encoded).not.toBeNull();
      expect(decodeSettingsOpts(encoded).signatureDepth).toBe(depth);
    }
  });

  it("testOmitsOptsWhenOnlyDepthIsAtDefault", () => {
    const settings: TransformerSettings = {
      ...atDefault,
      signatureDepth: -1,
    };
    expect(encodeSettingsOpts(settings)).toBeNull();
  });

  it("testDecodesNullAndEmptyToDefaults", () => {
    expect(decodeSettingsOpts(null)).toEqual(atDefault);
    expect(decodeSettingsOpts("")).toEqual(atDefault);
  });

  it("testEncodesOnlyNonDefaultFlagsToUrlSafeString", () => {
    const settings: TransformerSettings = {
      ...atDefault,
      comments: true,
    };
    const encoded = encodeSettingsOpts(settings)!;
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeSettingsOpts(encoded).comments).toBe(true);
    expect(decodeSettingsOpts(encoded).signatureDepth).toBe(-1);
  });

  it("testKeepsLegacyUrlsDecodableWhenOnlyDepthIsSet", () => {
    const settings: TransformerSettings = {
      ...atDefault,
      signatureDepth: 0,
    };
    const encoded = encodeSettingsOpts(settings)!;
    expect(decodeSettingsOpts(encoded).signatureDepth).toBe(0);
    expect(decodeSettingsOpts(encoded).depthLabels).toBe(false);
  });
});

describe("TestTransformerSettingsSnbtIndentationSlot", () => {
  const atDefault: TransformerSettings = { ...DEFAULT_TRANSFORMER_SETTINGS };

  it("testRoundTripsIndentationForSnbtOutput", () => {
    for (const indentation of [0, 1, 4, 127, 128]) {
      const settings: TransformerSettings = { ...atDefault, indentation };
      const encoded = encodeSettingsOpts(settings, "snbt");
      if (indentation === DEFAULT_TRANSFORMER_SETTINGS.indentation) {
        expect(encoded).toBeNull();
        expect(decodeSettingsOpts(encoded, "snbt").indentation).toBe(
          indentation
        );
        continue;
      }
      expect(encoded).not.toBeNull();
      expect(decodeSettingsOpts(encoded, "snbt").indentation).toBe(indentation);
    }
  });

  it("testReadsTheSameSlotAsSignatureDepthWithoutSnbtOutput", () => {
    const settings: TransformerSettings = { ...atDefault, indentation: 8 };
    const encoded = encodeSettingsOpts(settings, "snbt")!;
    const decoded = decodeSettingsOpts(encoded);
    expect(decoded.signatureDepth).toBe(7);
    expect(decoded.indentation).toBe(DEFAULT_TRANSFORMER_SETTINGS.indentation);
  });

  it("testKeepsIndentationUntouchedWhileFlagsRoundTripForSnbt", () => {
    const settings: TransformerSettings = {
      ...atDefault,
      materialize: true,
      outputShape: "varstore",
      layout: "readable",
      indentation: 3,
      cardIds: "preserve",
      missingParts: "warn",
      conflicts: "warn",
    };
    const encoded = encodeSettingsOpts(settings, "snbt")!;
    expect(decodeSettingsOpts(encoded, "snbt")).toEqual(settings);
  });

  it("testOmitsConflictsAtItsDefaultAndRoundTripsItOtherwise", () => {
    expect(
      encodeSettingsOpts({ ...atDefault, conflicts: "error" }, "snbt")
    ).toBeNull();
    const encoded = encodeSettingsOpts(
      { ...atDefault, conflicts: "warn" },
      "snbt"
    )!;
    expect(decodeSettingsOpts(encoded, "snbt").conflicts).toBe("warn");
  });
});

describe("TestTransformerStatementLayout", () => {
  const ast = ExpandedToAST("a = 5\nfinal = a");

  it("testJoinsStatementsWithSemicolonByDefaultInCondensed", () => {
    expect(ASTToCondensed(ast)).toBe("5; 5");
  });

  it("testJoinsStatementsWithNewlineInCondensedWhenRequested", () => {
    expect(ASTToCondensed(ast, true, 0, false, { joinStatements: "\n" })).toBe(
      "5\n5"
    );
  });

  it("testJoinsStatementsWithSemicolonByDefaultInCodeLine", () => {
    expect(ASTToCodeLine(ast)).toBe("5; 5");
  });

  it("testJoinsStatementsWithNewlineInCodeLineWhenRequested", () => {
    expect(ASTToCodeLine(ast, true, 0, { joinStatements: "\n" })).toBe("5\n5");
  });
});

describe("TestTransformerSegmentRefs", () => {
  const ast = ExpandedToAST("a = 5\nb = numberAdd a 1\nfinal = [a, b]");

  it("testEmitsSegmentRefsInCondensed", () => {
    const condensed = ASTToCondensed(ast, true, 0, false, {
      refStyle: "refs",
    });
    expect(condensed).toContain("@0");
    expect(condensed).toContain("@1");
    expect(condensed).not.toContain("[0, 1]");
  });

  it("testEmitsSegmentRefsInCodeLine", () => {
    const codeLine = ASTToCodeLine(ast, true, 0, {
      refStyle: "refs",
    });
    expect(codeLine).toContain("@0");
    expect(codeLine).toContain("@1");
  });

  it("testDefaultsToNumericVarIdsWhenRefStyleIsVarId", () => {
    const ast2 = ExpandedToAST("a = 5\nfinal = a");
    expect(ASTToCondensed(ast2)).toBe("5; 5");
    expect(ASTToCodeLine(ast2)).toBe("5; 5");
  });
});

describe("TestTransformerDuplicateNames", () => {
  it("testHardErrorsOnDifferentAstRedefinitionByDefault", () => {
    expect(() => ExpandedToAST("x = 5\nx = 6")).toThrow(/already defined/);
  });

  it("testKeepsBothCardsAndWarnsWhenAllowed", () => {
    const warnings: string[] = [];
    const ast = ExpandedToAST("x = 5\nx = 6\nfinal = x", 0, {
      allowDuplicateNames: true,
      warnings,
    }) as TypeAST.NetworkCards;
    expect(ast.definitions).toHaveLength(3);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain("redefined");
  });

  it("testErrorsOnAtRefsToADuplicatedName", () => {
    expect(() =>
      ExpandedToAST("x = 5\nx = 6\nfinal = @x", 0, {
        allowDuplicateNames: true,
        warnings: [],
      })
    ).toThrow(/ambiguous/);
  });
});

describe("TestTransformerExpandedDisplayOptions", () => {
  const ast = ExpandedToAST("x = 5\nfinal = x");

  it("testRendersInlineSignaturesAfterDefinition", () => {
    const out = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      null,
      false,
      undefined,
      { signatureLayout: "inline", inlinePlacement: "after" }
    );
    expect(out).toContain("x = 5 :: Integer");
  });

  it("testRendersInlineSignaturesBeforeDefinition", () => {
    const out = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      null,
      false,
      undefined,
      { signatureLayout: "inline", inlinePlacement: "before" }
    );
    expect(out).toContain("x :: Integer = 5");
  });

  it("testRendersVariableWrapperWhenEnabled", () => {
    const out = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      null,
      false,
      undefined,
      { variableWrapper: true }
    );
    expect(out).toContain('Variable("x") = 5');
  });

  it("testRendersCommentAboveSingleBlockDefinitionWhenEnabled", () => {
    const commented = ExpandedToAST("-- note\nx = 5\nfinal = x");
    const out = ASTToExpandedWithSignatureOptions(
      commented,
      "Condensed",
      null,
      false,
      undefined,
      { comments: true }
    );
    expect(out).toContain("-- note");
    expect(out.indexOf("-- note")).toBeLessThan(out.indexOf("x = 5"));
  });

  it("testDropsCommentsByDefault", () => {
    const commented = ExpandedToAST("-- note\nx = 5\nfinal = x");
    expect(ASTToExpanded(commented)).not.toContain("-- note");
  });

  it("testRendersEveryCorrelatedCommentLineWhenEnabled", () => {
    const commented = ExpandedToAST(
      "-- defines one\none = 1 -- int1\nfinal = one"
    );
    const out = ASTToExpandedWithSignatureOptions(
      commented,
      "Condensed",
      null,
      false,
      undefined,
      { comments: true }
    );
    expect(out).toContain("-- defines one");
    expect(out).toContain("-- int1");
    expect(out.indexOf("-- defines one")).toBeLessThan(out.indexOf("-- int1"));
    expect(out.indexOf("-- int1")).toBeLessThan(out.indexOf("one = 1"));

    const reparsed = ExpandedToAST(out) as TypeAST.NetworkCards;
    expect(reparsed.definitions.find((d) => d.name === "one")!.comment).toEqual(
      ["-- defines one", "-- int1"]
    );
  });
});

describe("TestTransformerHardeningLogic", () => {
  const ast = ExpandedToAST("x = 5\nfinal = x");

  it("testInGameHardeningRendersSameAsDefaultExpanded", () => {
    const out = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      {
        depth: null,
        labels: false,
        arrow: "→",
        hideOperatorWrappers: false,
        resolveAnys: false,
      },
      false
    );
    expect(out).toBe(ASTToExpanded(ast));
  });
});
