import {
  ExpandedToAST,
  ASTToExpandedWithSignatureOptions,
} from "lib/transformers/Expanded";
import { CompressedToAST, ASTToCompressed } from "lib/transformers/Compressed";
import { stripAutoCurryVarNames } from "lib/transformers/inputState";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { globalMap } from "lib/HelperClasses/TypeMap";

const DEFS_A = [
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
];

const canon = (program: string[]): string[] => {
  globalMap.clear();
  ParsedSignature.resetTypeIDCounter();
  const ast = ExpandedToAST(program.join("\n"));
  const stripped = stripAutoCurryVarNames(
    CompressedToAST(ASTToCompressed(ast))
  );
  return ASTToExpandedWithSignatureOptions(stripped, "Condensed", {
    depth: 0,
    labels: false,
    arrow: "->",
    hideOperatorWrappers: false,
  }).split("\n");
};

const UNRELATED = [
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
];

describe("order independence of computed signatures", () => {
  it("defs render identically when unrelated defs precede them", () => {
    const solo = canon(DEFS_A);
    const polluted = canon([...UNRELATED, ...DEFS_A]);

    const sigOf = (lines: string[]) => {
      const m = new Map<string, string>();
      for (const line of lines) {
        const i = line.indexOf("::");
        if (i > 0) m.set(line.slice(0, i).trim(), line.slice(i + 2).trim());
      }
      return m;
    };
    const s = sigOf(solo);
    const p = sigOf(polluted);

    for (const [name, sig] of s) {
      const pSig = p.get(name);
      if (pSig !== sig) {
        console.log(
          `DIFF ${name}:\n  solo      = ${sig}\n  unrelated = ${pSig}`
        );
      }
    }

    for (const [name, sig] of s) {
      expect(p.get(name)).toBe(sig);
    }
  });
});
