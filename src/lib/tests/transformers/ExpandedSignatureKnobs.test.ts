import { ExpandedToAST } from "lib/transformers/Expanded";
import {
  ASTToCompressed,
  CompressedToAST,
  compressWithInputState,
  decodeInputStateFromCompressed,
} from "lib/transformers/Compressed";
import {
  ASTToExpandedWithSignatureOptions,
  ASTToExpanded,
  type ExpandedSignatureOptions,
} from "lib/transformers/Expanded";
import {
  analyzeExpandedLines,
  computeExpandedOverlay,
  applyExpandedOverlay,
  computeSignatureDiff,
  applySignatureDiff,
  stripAutoCurryVarNames,
  type ExpandedOverlay,
} from "lib/transformers/inputState";

describe("ExpandedSignatureKnobs", () => {
  const DEPTH0: ExpandedSignatureOptions = {
    depth: 0,
    labels: false,
    arrow: "->",
    hideOperatorWrappers: false,
  };

  it("signatureKnobsAreHonoredByTheTunedCanonicalRenderer", () => {
    const ast = ExpandedToAST("x = numberAdd(1, 2)");
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const full = ASTToExpanded(stripped);
    const tuned = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );

    const fullSigs = analyzeExpandedLines(full)
      .filter((i) => i.kind === 2)
      .map((i) => (i as { text: string }).text);
    const tunedSigs = analyzeExpandedLines(tuned)
      .filter((i) => i.kind === 2)
      .map((i) => (i as { text: string }).text);

    expect(fullSigs.length).toBeGreaterThan(0);
    expect(tunedSigs.length).toBe(fullSigs.length);
    for (let i = 0; i < fullSigs.length; i++) {
      expect(tunedSigs[i]!.length).toBeLessThanOrEqual(fullSigs[i]!.length);
    }
  });

  const withDepth = (depth: number | null): ExpandedSignatureOptions => ({
    depth,
    labels: false,
    arrow: "->",
    hideOperatorWrappers: false,
  });

  const canonSigLine = (
    raw: string,
    name: string,
    opts: ExpandedSignatureOptions
  ): string => {
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      opts
    );
    const line = canon.split("\n").find((l) => l.startsWith(`${name} :: `));
    expect(line).toBeDefined();
    return line!.slice(name.length + 4);
  };

  it("depthSpendsOnlyOnGenericLevelsAndNeverReExpands (issue #94)", () => {
    const raw = "flipFilter = flip(filter)\nend = flipFilter";
    expect(canonSigLine(raw, "flipFilter", withDepth(null))).toBe(
      "Operator<List<Any> -> (Operator<Any -> Boolean> -> List<Any>)>"
    );
    // The budget is spent on `<...>` levels only: the root operator's one
    // generic level at depth 1, then fully collapsed at depth 0.
    expect(canonSigLine(raw, "flipFilter", withDepth(1))).toBe(
      "Operator<List -> (Operator -> List)>"
    );
    expect(canonSigLine(raw, "flipFilter", withDepth(0))).toBe(
      "List -> (Operator -> List)"
    );

    // The exhausted budget used to go negative, which re-expanded the tree: at
    // depth 1 the signature rendered in full again and depth 3 collapsed more
    // than depth 2. Raising the depth must never lose detail.
    let previous = -1;
    for (const depth of [0, 1, 2, 3, 4, 5, 6, null]) {
      const rendered = canonSigLine(raw, "flipFilter", withDepth(depth));
      expect(rendered.length).toBeGreaterThanOrEqual(previous);
      previous = rendered.length;
    }
  });

  it("depthZeroRendersBareNamesAndLeavesPrimitiveSignaturesAlone (issue #94)", () => {
    const raw = [
      "getByPipe = pipe(listGet, pipe)",
      'itemList = [Item("")]',
      "primitive = numberAdd(1, 2)",
      "end = primitive",
    ].join("\n");

    // Depth 0 is bare names: no generic slot survives, including nested ones
    // inside an arrow chain (the case that used to render `List<Any>`).
    for (const name of ["getByPipe", "itemList"]) {
      expect(canonSigLine(raw, name, withDepth(0))).not.toContain("<");
      expect(canonSigLine(raw, name, withDepth(null))).toContain("<");
    }

    // A signature with nothing generic to collapse is depth-invariant, so the
    // knob cannot appear to "do nothing" on an input that has no `<...>`.
    const primitive = canonSigLine(raw, "primitive", withDepth(null));
    expect(primitive).toBe("Number");
    for (const depth of [0, 1, 2, 3, 6]) {
      expect(canonSigLine(raw, "primitive", withDepth(depth))).toBe(primitive);
    }
  });

  it("byteMatchingSignatureLinesAreElidedIntoKind5Items", () => {
    const raw = 'itemList :: List\nitemList = [Item("")]';
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );
    const result = computeExpandedOverlay(raw, canon, DEPTH0);

    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    expect(result.overlay.sig).toEqual(DEPTH0);
    const hasKind7 = result.overlay.items.some((it) => it.kind === 7);
    expect(hasKind7).toBe(true);
    expect(result.overlay.items.some((it) => it.kind === 5)).toBe(false);

    const restored = applyExpandedOverlay(canon, result.overlay);
    expect(restored).toBe(raw);
  });

  it("roundTripsAMatchedSignatureOverlayThroughTheBitstreamByteExactly", () => {
    const raw = 'itemList :: List\nitemList = [Item("")]';
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );
    const result = computeExpandedOverlay(raw, canon, DEPTH0);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;

    const code = compressWithInputState(ast, "expanded", {
      format: "expanded",
      mode: "overlay",
      overlay: result.overlay,
    });

    const decoded = decodeInputStateFromCompressed(code, "expanded");
    expect(decoded).not.toBeNull();
    if (!decoded || decoded.mode === "raw") return;
    if (decoded.format !== "expanded") return;
    expect(decoded.overlay.sig).toEqual(DEPTH0);

    const astBack = stripAutoCurryVarNames(CompressedToAST(code));
    const decodeCanon = ASTToExpandedWithSignatureOptions(
      astBack,
      "Condensed",
      decoded.overlay.sig ?? null
    );
    expect(applyExpandedOverlay(decodeCanon, decoded.overlay)).toBe(raw);
  });

  it("fallsBackToRawWhenTheItemStreamIsNotSmaller", () => {
    const raw = "x = 5\n";
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );
    const result = computeExpandedOverlay(raw, canon, DEPTH0);
    expect(result.mode).toBe(1);
  });

  it("sparseDiffsASignatureLineAgainstItsCanonicalKind6Path", () => {
    const raw = "getByPipe :: List<A> -> A";
    const canon = "getByPipe :: List<Aggregate> -> Card";
    const diff = computeSignatureDiff(raw, canon);
    expect(diff).not.toBeNull();
    if (!diff) return;
    expect(diff.spellingOverrides).toEqual([
      [4, "A"],
      [7, "A"],
    ]);
    expect(applySignatureDiff(canon, diff)).toBe(raw);
  });

  it("signatureSparseDiffFallsBackToNullWhenStreamsDontAlign", () => {
    expect(computeSignatureDiff("x :: List<A>", "x :: List")).toBeNull();
  });

  it("kind6SparseSignatureRoundTripsThroughTheBitstream", () => {
    const raw = "itemList :: List<Item>";
    const canon = "itemList :: List<Any>";
    const diff = computeSignatureDiff(raw, canon);
    expect(diff).not.toBeNull();
    if (!diff) return;

    const overlay: ExpandedOverlay = {
      items: [{ kind: 6, name: "itemList", sigOverlay: diff }],
    };
    const ast = ExpandedToAST('itemList = Item("")');

    const code = compressWithInputState(ast, "expanded", {
      format: "expanded",
      mode: "overlay",
      overlay,
    });
    const decoded = decodeInputStateFromCompressed(code, "expanded");
    expect(decoded).not.toBeNull();
    if (!decoded || decoded.mode === "raw" || decoded.format !== "expanded")
      return;
    const item = decoded.overlay.items.find((it) => it.kind === 6);
    expect(item).toBeDefined();
    if (!item || item.kind !== 6) return;
    expect(applySignatureDiff(canon, item.sigOverlay)).toBe(raw);
  });

  it("curryDefNamesSurviveTheRoundTripByEqualsNotRenamedToByAnyEquals", () => {
    const raw = "byEquals = apply(pipe, equals)\nx = byEquals";
    const ast = ExpandedToAST(raw);
    const rt = stripAutoCurryVarNames(CompressedToAST(ASTToCompressed(ast)));
    const expanded = ASTToExpanded(rt);
    expect(expanded).toContain("byEquals :: ");
    expect(expanded).not.toContain("byAnyEquals");
  });

  // A full `Any`-form signature keeps its generic levels, so it needs the
  // hide-wrappers + full-resolution combo to byte-match. (Before issue #94's
  // depth fix, DEPTH0's root unwrap happened to render this line verbatim
  // because the exhausted depth counter went negative and re-expanded the
  // nested operators - see the depth ladder test in Expanded.test.ts.)
  const HIDE_WRAPPERS_FULL: ExpandedSignatureOptions = {
    depth: null,
    labels: false,
    arrow: "->",
    hideOperatorWrappers: true,
  };

  it("aNicknameBasedCurryDefByteMatchesItsTunedCanonicalSigLine", () => {
    const raw =
      "byEquals :: Operator<Any -> Boolean -> Any> -> Operator<Any -> Any>\nbyEquals = apply(pipe, equals)\nx = byEquals";
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      HIDE_WRAPPERS_FULL
    );
    expect(canon).toContain(
      "byEquals :: Operator<Any -> Boolean -> Any> -> Operator<Any -> Any>"
    );
    expect(canon).not.toContain("byAnyEquals");

    const result = computeExpandedOverlay(raw, canon, HIDE_WRAPPERS_FULL);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    expect(result.overlay.items.some((it) => it.kind === 7)).toBe(true);
    const restored = applyExpandedOverlay(canon, result.overlay);
    expect(restored).toBe(raw);
  });

  it("kind7DefsRoundTripThroughTheBitstreamAndRestoreTheSigPlusDef", () => {
    const raw = 'itemList :: List\nitemList = [Item("")]';
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );
    const result = computeExpandedOverlay(raw, canon, DEPTH0);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    expect(result.overlay.items).toHaveLength(1);
    const item = result.overlay.items[0]!;
    expect(item.kind).toBe(7);
    expect((item as { name: string }).name).toBe("itemList");

    const code = compressWithInputState(ast, "expanded", {
      format: "expanded",
      mode: "overlay",
      overlay: result.overlay,
    });
    const decoded = decodeInputStateFromCompressed(code, "expanded");
    expect(decoded).not.toBeNull();
    if (!decoded || decoded.mode === "raw" || decoded.format !== "expanded")
      return;
    const astBack = stripAutoCurryVarNames(CompressedToAST(code));
    const decodeCanon = ASTToExpandedWithSignatureOptions(
      astBack,
      "Condensed",
      decoded.overlay.sig ?? null
    );
    expect(applyExpandedOverlay(decodeCanon, decoded.overlay)).toBe(raw);
  });

  it("hidesNonRelevantOperatorWrappersWhenTheKnobIsOn", () => {
    const raw =
      "flipFilter = flip(filter)\nflipPipe = flip(pipe)\nend = flipPipe";
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const opts: ExpandedSignatureOptions = {
      depth: null,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: true,
    };
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      opts
    );
    expect(canon).toContain(
      "flipFilter :: List<Any> -> ((Any -> Boolean) -> List<Any>)"
    );
    expect(canon).toContain(
      "flipPipe :: (Any -> Any) -> ((Any -> Any) -> (Any -> Any))"
    );
    const full = ASTToExpandedWithSignatureOptions(stripped, "Condensed", {
      depth: null,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: false,
    });
    expect(full).toContain(
      "flipFilter :: Operator<List<Any> -> (Operator<Any -> Boolean> -> List<Any>)>"
    );
  });

  it("keepsWrappersWhereTheOperatorFunctionDistinctionIsRelevant", () => {
    const raw =
      "byEquals = apply(pipe, equals)\nonHead = apply(flip(pipe), head)\nend = onHead";
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const opts: ExpandedSignatureOptions = {
      depth: null,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: true,
    };
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      opts
    );
    expect(canon).toContain(
      "byEquals :: Operator<Any -> Boolean -> Any> -> Operator<Any -> Any>"
    );
    expect(canon).toContain(
      "onHead :: Operator<Any -> List<Any>> -> Operator<Any -> Any>"
    );
    const apply2Ast = ExpandedToAST("x = apply2\nend = x");
    const apply2Stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(apply2Ast))
    );
    const apply2Canon = ASTToExpandedWithSignatureOptions(
      apply2Stripped,
      "Condensed",
      opts
    );
    expect(apply2Canon).toContain(
      "x :: Operator<Any -> (Any -> Any)> -> (Any -> (Any -> Any))"
    );
  });
});
