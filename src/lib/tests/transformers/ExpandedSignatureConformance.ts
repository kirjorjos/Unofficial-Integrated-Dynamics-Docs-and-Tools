import {
  ExpandedToAST,
  ASTToExpanded,
  ASTToExpandedWithSignatureOptions,
} from "lib/transformers/Expanded";
import {
  ASTToCompressed,
  CompressedToAST,
  compressWithInputState,
  decodeInputStateFromCompressed,
} from "lib/transformers/Compressed";
import {
  computeExpandedOverlay,
  applyExpandedOverlay,
  stripAutoCurryVarNames,
} from "lib/transformers/inputState";

const RAW = [
  "getByPipe :: List<Any> -> (Operator<Any -> Any> -> Operator<Integer -> Any>)",
  "getByPipe = pipe(listGet, pipe)",
  "byEquals :: Operator<Any -> Boolean -> Any> -> Operator<Any -> Any>",
  "byEquals = apply(pipe, equals)",
  "gbpWithBe :: List<Any> -> Operator<Any -> Operator<Integer -> Boolean>>",
  "gbpWithBe = pipe(getByPipe, byEquals)",
  "infiniteList :: List",
  "infiniteList = lazybuilt(0, increment)",
  "sliceInfiniteList :: Integer -> List<Integer>",
  "sliceInfiniteList = apply2(slice, infiniteList, 0)",
  "indexList :: List<Any> -> List<Integer>",
  "indexList = pipe(listLength, sliceInfiniteList)",
  "flipFilter :: List<Any> -> (Operator<Any -> Boolean> -> List<Any>)",
  "flipFilter = flip(filter)",
  "indexListWithFlipFilter :: List<Any> -> (Operator<Integer -> Boolean> -> List<Integer>)",
  "indexListWithFlipFilter = pipe(indexList, flipFilter)",
  "pipeWithGbpwbeAndIlwff :: List<Any> -> Operator<Any -> List<Integer>>",
  "pipeWithGbpwbeAndIlwff = pipe2(gbpWithBe, indexListWithFlipFilter, pipe)",
  "flipPipe :: Operator<Any -> Any> -> (Operator<Any -> Any> -> Operator<Any -> Any>)",
  "flipPipe = flip(pipe)",
  "onHead :: Operator<Any -> List<Any>> -> Operator<Any -> Any>",
  "onHead = apply(flipPipe, head)",
  "index0f :: List<Any> -> Operator<Any -> Any>",
  "index0f = pipe(pipeWithGbpwbeAndIlwff, onHead)",
  "mobImprisonmentTools :: List",
  'mobImprisonmentTools = [Item(""), Item("")]',
  "index0fTool :: Any -> Any",
  "index0fTool = apply(index0f, mobImprisonmentTools)",
  "flipModulus :: Number -> (Number -> Number)",
  "flipModulus = flip(modulus)",
  "modFifteen :: Number -> Number",
  "modFifteen = apply(flipModulus, 15)",
  "modFifteenPlusOne :: Number -> Number",
  "modFifteenPlusOne = pipe(modFifteen, increment)",
  "flipDivide :: Number -> (Number -> Number)",
  "flipDivide = flip(divide)",
  "divideFifteen :: Number -> Number",
  "divideFifteen = apply(flipDivide, 15)",
  "getReaderValue :: Integer -> Integer",
  "getReaderValue = apply(listGet, [2, 3])",
  "getCurrentReaderValue :: Number -> Integer",
  "getCurrentReaderValue = pipe(divideFifteen, getReaderValue)",
  "notFull :: Number -> Boolean",
  "notFull = pipe2(modFifteenPlusOne, getCurrentReaderValue, equals)",
  "isNotFull :: Any -> Boolean",
  "isNotFull = pipe(index0fTool, notFull)",
  "neededTools :: List",
  "neededTools = filter(isNotFull, mobImprisonmentTools)",
  "exportItem :: Item",
  'exportItem = getOrDefault(neededTools, 0, Item(""))',
  "importPredicate :: Any -> Boolean -- this is a comment",
  "importPredicate = negation(isNotFull)",
].join("\n");

describe("ExpandedSignatureConformance", () => {
  it("parses the migrated example and byte-matches most signature lines", () => {
    const ast = ExpandedToAST(RAW);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(stripped, "Condensed", {
      depth: 0,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: false,
    });
    const result = computeExpandedOverlay(RAW, canon, {
      depth: 0,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: false,
    });
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;

    const kinds: Record<number, number> = {};
    for (const it of result.overlay.items) {
      kinds[it.kind] = (kinds[it.kind] ?? 0) + 1;
    }
    const sigItems = result.overlay.items.filter(
      (it) => it.kind === 5 || it.kind === 6 || it.kind === 7
    ).length;
    expect((kinds[7] ?? 0) + (kinds[5] ?? 0)).toBeGreaterThan(
      (kinds[6] ?? 0) + (kinds[2] ?? 0)
    );
    expect(sigItems).toBeGreaterThan(0);

    const code = compressWithInputState(ast, "expanded", {
      format: "expanded",
      mode: "overlay",
      overlay: result.overlay,
    });
    expect(code.length).toBeLessThan(ASTToExpanded(stripped).length);

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
    expect(applyExpandedOverlay(decodeCanon, decoded.overlay)).toBe(RAW);
  });

  it("computed signatures stay precise through alias chains (loose-sig fix)", () => {
    const A_FORM = [
      "getByPipe :: List<A> -> ((A -> B) -> (Integer -> B))",
      "getByPipe = pipe(listGet, pipe)",
      "byEquals :: ((A -> Boolean) -> B) -> (A -> B)",
      "byEquals = apply(pipe, equals)",
      "gbpWithBe :: List<A> -> (A -> (Integer -> Boolean))",
      "gbpWithBe = pipe(getByPipe, byEquals)",
      "infiniteList :: List<Integer>",
      "infiniteList = lazybuilt(0, increment)",
      "sliceInfiniteList :: Integer -> List<Integer>",
      "sliceInfiniteList = apply2(slice, infiniteList, 0)",
      "indexList :: List<A> -> List<Integer>",
      "indexList = pipe(listLength, sliceInfiniteList)",
      "flipFilter :: List<A> -> (A -> Boolean) -> List<A>",
      "flipFilter = flip(filter)",
      "indexListWithFlipFilter :: List<A> -> ((Integer -> Boolean) -> List<Integer>)",
      "indexListWithFlipFilter = pipe(indexList, flipFilter)",
      "pipeWithGbpwbeAndIlwff :: List<A> -> (A -> List<Integer>)",
      "pipeWithGbpwbeAndIlwff = pipe2(gbpWithBe, indexListWithFlipFilter, pipe)",
      "flipPipe :: (B -> C) -> (A -> B) -> (A -> C)",
      "flipPipe = flip(pipe)",
      "onHead :: (A -> List<B>) -> (A -> B)",
      "onHead = apply(flipPipe, head)",
      "index0f :: List<A> -> (A -> Integer)",
      "index0f = pipe(pipeWithGbpwbeAndIlwff, onHead)",
      'mobImprisonmentTools :: List = [Item(""), Item("")]',
      "index0fTool :: Item -> Integer",
      "index0fTool = apply(index0f, mobImprisonmentTools)",
      "flipModulus :: Number -> Number -> Number",
      "flipModulus = flip(modulus)",
      "modFifteen :: Number -> Number",
      "modFifteen = apply(flipModulus, 15)",
      "modFifteenPlusOne :: Number -> Number",
      "modFifteenPlusOne = pipe(modFifteen, increment)",
      "flipDivide :: Number -> Number -> Number",
      "flipDivide = flip(divide)",
      "divideFifteen :: Number -> Number",
      "divideFifteen = apply(flipDivide, 15)",
      "getReaderValue :: Integer -> Integer",
      "getReaderValue = apply(listGet, [2, 3])",
      "getCurrentReaderValue :: Number -> Integer",
      "getCurrentReaderValue = pipe(divideFifteen, getReaderValue)",
      "notFull :: Integer -> Boolean",
      "notFull = pipe2(modFifteenPlusOne, getCurrentReaderValue, equals)",
      "isNotFull :: Item -> Boolean",
      "isNotFull = pipe(index0fTool, notFull)",
      "neededTools :: List",
      "neededTools = filter(isNotFull, mobImprisonmentTools)",
      "exportItem :: Item",
      'exportItem = getOrDefault(neededTools, 0, Item(""))',
      "importPredicate :: Item -> Boolean -- comment",
      "importPredicate = negation(isNotFull)",
    ].join("\n");
    const ast = ExpandedToAST(A_FORM);
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain(
      "index0f :: Operator<List<Any> → Operator<Any → Any>>"
    );
    expect(expanded).toContain("index0fTool :: Operator<Any → Any>");
    expect(expanded).toContain("isNotFull :: Operator<Any → Boolean>");
  });

  it("splits sig-line comments into the per-name suffix block", () => {
    const ast = ExpandedToAST(RAW);
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const sigOpts = {
      depth: 0,
      labels: false,
      arrow: "->" as const,
      hideOperatorWrappers: false,
    };
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      sigOpts
    );
    const result = computeExpandedOverlay(RAW, canon, sigOpts);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;

    expect(result.overlay.sigSuffixes?.get("importPredicate")).toBe(
      " -- this is a comment"
    );
    const anyVerbatimComment = result.overlay.items.some(
      (it) => it.kind === 2 && (it as { text: string }).text.includes("comment")
    );
    expect(anyVerbatimComment).toBe(false);
    const impItem = result.overlay.items.find(
      (it) => (it as { name?: string }).name === "importPredicate"
    );
    expect(impItem?.kind).toBe(7);

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
    expect(decoded.overlay.sigSuffixes?.get("importPredicate")).toBe(
      " -- this is a comment"
    );
    expect(applyExpandedOverlay(decodeCanon, decoded.overlay)).toBe(RAW);
  });

  it("folds a resolved-face sig with comment as kind 6 + suffix", () => {
    const aForm = RAW.replace(
      "importPredicate :: Any -> Boolean -- this is a comment",
      "importPredicate :: Item -> Boolean -- this is a comment"
    );
    const ast = ExpandedToAST(aForm); // must not throw (resolved input is valid)
    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const sigOpts = {
      depth: 0,
      labels: false,
      arrow: "->" as const,
      hideOperatorWrappers: false,
    };
    const canon = ASTToExpandedWithSignatureOptions(
      stripped,
      "Condensed",
      sigOpts
    );
    expect(canon).toContain("importPredicate :: Any -> Boolean");
    const result = computeExpandedOverlay(aForm, canon, sigOpts);
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    expect(result.overlay.sigSuffixes?.get("importPredicate")).toBe(
      " -- this is a comment"
    );
    const impItem = result.overlay.items.find(
      (it) => (it as { name?: string }).name === "importPredicate"
    );
    expect(impItem?.kind).toBe(6);
    expect(applyExpandedOverlay(canon, result.overlay)).toBe(aForm);
  });

  it("accepts bare-name signatures as Any<X> sugar and round-trips them", () => {
    const bare = `${RAW}\nf :: A -> B\nf = identity\nend = f`;
    const ast = ExpandedToAST(bare); // must not throw

    const stripped = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const canon = ASTToExpandedWithSignatureOptions(stripped, "Condensed", {
      depth: 0,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: false,
    });
    expect(canon).toContain("f :: Any -> Any");
    const result = computeExpandedOverlay(bare, canon, {
      depth: 0,
      labels: false,
      arrow: "->",
      hideOperatorWrappers: false,
    });
    expect(result.mode).toBe(0);
    if (result.mode !== 0) return;
    const sigItem = result.overlay.items.find(
      (it) => it.kind === 6 && (it as { name?: string }).name === "f"
    );
    expect(sigItem).toBeDefined();
    expect(applyExpandedOverlay(canon, result.overlay)).toBe(bare);
  });
});

describe("DefNameElision", () => {
  const asDefs = (ast: TypeAST.AST) => {
    if (ast.type !== "NetworkCards") throw new Error("expected NetworkCards");
    return ast.definitions;
  };

  it("elides def-table names equal to the root's auto-generated name", () => {
    const src = [
      "byEquals = apply(pipe, equals)",
      "flipPipe = flip(pipe)",
      "end = byEquals",
    ].join("\n");
    const ast = ExpandedToAST(src);
    const names = asDefs(ast).map((d) => d.name);
    const code = ASTToCompressed(ast);
    const back = CompressedToAST(code);
    expect(asDefs(back).map((d) => d.name)).toEqual(names);
    expect(CompressedToAST(ASTToCompressed(back))).toEqual(back);
  });

  it("stores non-derivable def names verbatim", () => {
    const ast = ExpandedToAST(
      [
        "infiniteList = lazybuilt(0, increment)",
        "sliceInfiniteList = apply2(slice, infiniteList, 0)",
        "indexList = pipe(listLength, sliceInfiniteList)",
        "flipFilter = flip(filter)",
        "indexListWithFlipFilter = pipe(indexList, flipFilter)",
        "byEquals = apply(pipe, equals)",
        "getByPipe = pipe(listGet, pipe)",
        "gbpWithBe = pipe(getByPipe, byEquals)",
        "flipPipe = flip(pipe)",
        "onHead = apply(flipPipe, head)",
        "pipeWithGbpwbeAndIlwff = pipe2(gbpWithBe, indexListWithFlipFilter, pipe)",
        "index0f = pipe(pipeWithGbpwbeAndIlwff, onHead)",
      ].join("\n")
    );
    const code = ASTToCompressed(ast);
    const back = CompressedToAST(code);
    expect(CompressedToAST(ASTToCompressed(back))).toEqual(back);
    const elided = asDefs(ast)
      .filter((d) => d.name !== "") // keep only real names
      .map((d) => d.name);
    expect(asDefs(back).map((d) => d.name)).toEqual(elided);
  });

  it("full long example: def names survive the eliding codec", () => {
    const ast = ExpandedToAST(RAW);
    const names = asDefs(ast).map((d) => d.name);
    const back = CompressedToAST(ASTToCompressed(ast));
    expect(asDefs(back).map((d) => d.name)).toEqual(names);
    const code1 = ASTToCompressed(ast);
    const code2 = ASTToCompressed(back);
    expect(code2.length).toBe(code1.length);
    expect(CompressedToAST(code2)).toEqual(back);
  });
});
