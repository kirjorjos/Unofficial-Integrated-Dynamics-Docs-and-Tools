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

  it("signature knobs are honored by the tuned canonical renderer", () => {
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

  it("byte-matching signature lines are elided into kind-5 items", () => {
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

  it("round-trips a matched-signature overlay through the bitstream byte-exactly", () => {
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

  it("falls back to raw when the item stream is not smaller", () => {
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

  it("sparse-diffs a signature line against its canonical (kind-6 path)", () => {
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

  it("signature sparse-diff falls back to null when streams don't align", () => {
    expect(computeSignatureDiff("x :: List<A>", "x :: List")).toBeNull();
  });

  it("kind-6 sparse signature round-trips through the bitstream", () => {
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

  it("curry def names survive the round-trip (byEquals not renamed to byAnyEquals)", () => {
    const raw = "byEquals = apply(pipe, equals)\nx = byEquals";
    const ast = ExpandedToAST(raw);
    const rt = stripAutoCurryVarNames(CompressedToAST(ASTToCompressed(ast)));
    const expanded = ASTToExpanded(rt);
    expect(expanded).toContain("byEquals :: ");
    expect(expanded).not.toContain("byAnyEquals");
  });

  it("a nickname-based curry def byte-matches its tuned canonical sig line", () => {
    const raw =
      "byEquals :: Operator<Any -> Boolean -> Any> -> Operator<Any -> Any>\nbyEquals = apply(pipe, equals)\nx = byEquals";
    const ast = ExpandedToAST(raw);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      DEPTH0
    );
    expect(canon).toContain("byEquals :: ");
    expect(canon).not.toContain("byAnyEquals");

    const result = computeExpandedOverlay(raw, canon, DEPTH0);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    expect(result.overlay.items.some((it) => it.kind === 7)).toBe(true);
    const restored = applyExpandedOverlay(canon, result.overlay);
    expect(restored).toBe(raw);
  });

  it("kind-7 defs round-trip through the bitstream and restore the sig + def", () => {
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

  it("hides non-relevant operator wrappers when the knob is on", () => {
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

  it("keeps wrappers where the operator/function distinction is relevant", () => {
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
