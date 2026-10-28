import { CompressedToAST } from "lib/transformers/Compressed";
import { detectInputFormat } from "lib/transformers/detectFormat";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { SNBTToTag } from "lib/transformers/SNBT";
import {
  buildExpandedSource,
  buildNbtConstantAst,
  buildNbtTree,
  buildPreviewAst,
  decodeNbtPaste,
  encodeNbtPaste,
  extractNbtBlobs,
  findNbtNode,
  formatNbtTag,
  isValidSelectionName,
  minimizeNamedPath,
  pathForSegments,
  substituteTemplate,
  verifyPathMatches,
  type NbtPathSegment,
  type NbtTreeNode,
} from "lib/transformers/nbtTools";

const treeOf = (snbt: string): NbtTreeNode => buildNbtTree(SNBTToTag(snbt));

const key = (name: string): NbtPathSegment => ({ kind: "key", key: name });
const index = (value: number): NbtPathSegment => ({
  kind: "index",
  index: value,
});

const node = (
  root: NbtTreeNode,
  ...segments: NbtPathSegment[]
): NbtTreeNode => {
  const found = findNbtNode(root, segments);
  if (!found) throw new Error(`Missing node at ${JSON.stringify(segments)}`);
  return found;
};

describe("nbtTools/extract", () => {
  it("testBareCompoundAndValueBlobs", () => {
    const { blobs, warnings } = extractNbtBlobs("{a:1}\n\n5");
    expect(warnings).toEqual([]);
    expect(blobs).toHaveLength(2);
    expect(blobs[0]!.kind).toBe("compound");
    expect(blobs[1]!.kind).toBe("value");
  });

  it("testExtractsGiveAndDataGetEnvelopes", () => {
    const give = extractNbtBlobs("/give @p minecraft:stone{foo:1}");
    expect(give.blobs).toHaveLength(1);
    expect(give.blobs[0]!.kind).toBe("give");

    const dataGet = extractNbtBlobs(
      "Wolf has the following entity data: {Health:20.0f}"
    );
    expect(dataGet.blobs).toHaveLength(1);
    expect(dataGet.blobs[0]!.kind).toBe("entity");
  });

  it("testCommandWithoutNbtIsReported", () => {
    const { blobs, warnings } = extractNbtBlobs("/give @p minecraft:stone");
    expect(blobs).toEqual([]);
    expect(warnings).toEqual(["Blob 1: this command has no NBT to format"]);
  });

  it("testInvalidSnbtIsReported", () => {
    const { blobs, warnings } = extractNbtBlobs("{a:");
    expect(blobs).toEqual([]);
    expect(warnings[0]).toMatch(/^Blob 1: not valid SNBT \(/);
  });
});

describe("nbtTools/paths", () => {
  it("testSinglePaths", () => {
    const root = treeOf('{a:1,"my key":2,list:[{b:3}]}');
    expect(root.path).toBe("$");
    expect(node(root, key("a")).path).toBe(".a");
    expect(node(root, key("my key")).path).toBe('["my key"]');
    expect(node(root, key("list"), index(0), key("b")).path).toBe(".list[0].b");
  });

  it("testEscapesQuotesAndBackslashesInBracketForm", () => {
    expect(pathForSegments([key('a"b')])).toBe('["a\\"b"]');
    expect(pathForSegments([key("a\\b")])).toBe('["a\\\\b"]');
  });

  it("testAllChildrenMinimisesToWildcard", () => {
    const root = treeOf("{a:1,b:2}");
    const result = minimizeNamedPath(root, [
      node(root, key("a")),
      node(root, key("b")),
    ]);
    expect(result).toEqual({ path: "$.*" });
  });

  it("testSliceAndStepRuns", () => {
    const root = treeOf("{list:[0,1,2,3,4,5]}");
    const list = (values: number[]): NbtTreeNode[] =>
      values.map((value) => node(root, key("list"), index(value)));

    expect(minimizeNamedPath(root, list([1, 2, 3]))).toEqual({
      path: ".list[1:3]",
    });
    expect(minimizeNamedPath(root, list([1, 3, 5]))).toEqual({
      path: ".list[1:5:2]",
    });
  });

  it("testIndexAndNameUnions", () => {
    const listRoot = treeOf("{list:[0,1,2,3,4,5]}");
    expect(
      minimizeNamedPath(listRoot, [
        node(listRoot, key("list"), index(0)),
        node(listRoot, key("list"), index(2)),
        node(listRoot, key("list"), index(3)),
      ])
    ).toEqual({ path: ".list[0,2,3]" });

    const compoundRoot = treeOf("{a:1,b:2,c:3}");
    expect(
      minimizeNamedPath(compoundRoot, [
        node(compoundRoot, key("a")),
        node(compoundRoot, key("c")),
      ])
    ).toEqual({ path: "$[a,c]" });
  });

  it("testKeysThatCannotJoinANameUnionAreRejected", () => {
    const root = treeOf('{"1":1,"2":2,z:3}');
    const result = minimizeNamedPath(root, [
      node(root, key("1")),
      node(root, key("2")),
    ]);
    expect("error" in result).toBe(true);
    expect((result as { error: string }).error).toMatch(/union/);
  });

  it("testNoCommonParentIsRejected", () => {
    const root = treeOf("{a:{x:1},b:{y:2}}");
    const result = minimizeNamedPath(root, [
      node(root, key("a"), key("x")),
      node(root, key("b"), key("y")),
    ]);
    expect(result).toEqual({
      error:
        "These selections do not share a parent, so one path cannot match exactly them.",
    });
  });

  it("testVerificationRejectsExtraMatches", () => {
    const root = treeOf("{a:1,b:2}");
    const verification = verifyPathMatches(root, "$.*", [node(root, key("a"))]);
    expect(verification.ok).toBe(false);
    expect(verification.extra).toBe(1);
  });

  it("testArrayTagHasAPathButNoElementChildren", () => {
    const root = treeOf("{bytes:[B;1b,2b]}");
    const array = node(root, key("bytes"));
    expect(array.path).toBe(".bytes");
    expect(array.container).toBe("array");
    expect(array.children).toEqual([]);
  });

  it("testReadableFormatRoundTrips", () => {
    const source = '{a:1,b:{c:"x"},list:[1L,2L],bytes:[B;1b,2b]}';
    const original = SNBTToTag(source);
    const formatted = formatNbtTag(original);
    expect(formatted).toContain("\n  b: {");
    expect(SNBTToTag(formatted).equals(original).valueOf()).toBe(true);
  });
});

describe("nbtTools/template", () => {
  it("testSubstitutesNamedPaths", () => {
    expect(substituteTemplate("$a > 5", { a: ".stats.health" })).toEqual({
      ok: true,
      path: ".stats.health > 5",
    });
    expect(substituteTemplate('$name == "Steve"', { name: ".name" })).toEqual({
      ok: true,
      path: '.name == "Steve"',
    });
    expect(substituteTemplate("$stats", { stats: "$" })).toEqual({
      ok: true,
      path: "$",
    });
  });

  it("testUnknownNameIsReported", () => {
    expect(substituteTemplate("$foo > 1", {})).toEqual({
      ok: false,
      error: 'Unknown path name "$foo"',
    });
  });

  it("testRejectsLogicalOperatorsAndGrouping", () => {
    for (const construct of ["&&", "||", "!"]) {
      const template = construct === "!" ? "!$a" : `$a ${construct} .b`;
      const result = substituteTemplate(template, { a: ".a" });
      expect(result.ok).toBe(false);
      expect((result as { error: string }).error).toBe(
        `1.19.2 NBT paths do not support "${construct}"`
      );
    }
    const parenthesised = substituteTemplate("($a)", { a: ".a" });
    expect(parenthesised.ok).toBe(false);
    expect((parenthesised as { error: string }).error).toMatch(
      /do not support "\("/
    );
  });

  it("testFilterExpressionsKeepTheirParentheses", () => {
    expect(substituteTemplate(".items[?($a)]", { a: ".x" })).toEqual({
      ok: true,
      path: ".items[?(.x)]",
    });
  });
});

describe("nbtTools/preview", () => {
  it("testBuildsPartialApplicationAstAndSource", () => {
    expect(buildExpandedSource("matchFirst", ".a")).toBe(
      'path = nbtPathMatchFirst ".a"'
    );
    expect(detectInputFormat(buildExpandedSource("matchFirst", ".a"))).toBe(
      "expanded"
    );
    const ast = buildPreviewAst("matchAll", "[a,c]");
    expect(ast.type).toBe("Curry");
    if (ast.type === "Curry") {
      expect(ast.base).toEqual({
        type: "Operator",
        opName: "NBT_PATH_MATCH_ALL",
      });
      expect(ast.args).toEqual([{ type: "String", value: "[a,c]" }]);
    }
  });

  it("testExpandedSourceParsesToThePartialApplication", () => {
    const source = buildExpandedSource("matchFirst", ".a");
    const ast = ExpandedToAST(source);
    expect(ast.type).toBe("NetworkCards");
    const definition =
      ast.type === "NetworkCards" ? ast.definitions[0]!.node : ast;
    expect(definition.type).toBe("Curry");
    if (definition.type === "Curry") {
      expect(definition.base).toMatchObject({ type: "Operator" });
      expect(definition.args).toEqual([{ type: "String", value: ".a" }]);
    }
  });

  it("testSelectionNames", () => {
    expect(isValidSelectionName("a_1")).toBe(true);
    expect(isValidSelectionName("1a")).toBe(false);
    expect(isValidSelectionName("")).toBe(false);
    expect(isValidSelectionName("a b")).toBe(false);
  });
});

describe("nbtTools/pasteCode", () => {
  const code = (text: string): string =>
    encodeNbtPaste(extractNbtBlobs(text).blobs, text);

  it("testRoundTripsThePasteVerbatim", () => {
    const pastes = [
      '{stats:{health:20,name:"Steve"}}',
      "{a:1}\n\n{b:2}",
      '/give @p minecraft:stone{display:{Name:\'{"text":"Hi"}\'}}',
      "Wolf has the following entity data: {Health:20.0f}",
      '{bytes:[B;1b,2b],short:5s,long:7L,float:1.5f,byte:3b,name:"Stève"}',
      "5",
      "{a:1",
      "not nbt at all",
    ];

    for (const paste of pastes) {
      expect(decodeNbtPaste(code(paste))).toBe(paste);
    }
  });

  it("testKeepsTheBlobsAsNbtConstantsInTheAst", () => {
    const ast = CompressedToAST(code("/give @p minecraft:stone{foo:1}"));
    expect(ast).toEqual({ type: "NBT", value: { foo: 1 } });

    const multi = CompressedToAST(code("{a:1}\n\n{b:2}"));
    expect(multi).toEqual({
      type: "List",
      value: [
        { type: "NBT", value: { a: 1 } },
        { type: "NBT", value: { b: 2 } },
      ],
    });
  });

  it("testUnparsablePastesStillGetANullConstant", () => {
    expect(buildNbtConstantAst([])).toEqual({ type: "Null" });
    expect(
      CompressedToAST(encodeNbtPaste([], "/give @p minecraft:stone"))
    ).toEqual({ type: "Null" });
    expect(decodeNbtPaste(encodeNbtPaste([], "/give @p minecraft:stone"))).toBe(
      "/give @p minecraft:stone"
    );
  });

  it("testRejectsCodesWithoutAPaste", () => {
    expect(decodeNbtPaste("")).toBeNull();
    expect(decodeNbtPaste("not a code")).toBeNull();
    expect(decodeNbtPaste("gA")).toBeNull();
  });

  it("testCompressesThePasteIntoAShareableCode", () => {
    const paste =
      '/give @p minecraft:diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:5s}],Unbreakable:1b}'.repeat(
        4
      );
    const base64 = btoa(paste);
    const encoded = code(paste);
    expect(encoded.length).toBeLessThan(base64.length);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeNbtPaste(encoded)).toBe(paste);
  });
});
