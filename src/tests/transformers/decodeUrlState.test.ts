import { CondensedToAST, ASTToCondensed } from "lib/transformers/Condensed";
import {
  ASTToCompressed,
  CompressedToAST,
  compressWithInputState,
} from "lib/transformers/Compressed";
import {
  computeCondensedOverlay,
  stripAutoCurryVarNames,
} from "lib/transformers/inputState";
import { decodeTransformerUrlCode } from "lib/transformers/decodeUrlState";
import { globalMap } from "lib/HelperClasses/TypeMap";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { resetExpandedVarCounter } from "lib/transformers/Expanded";

const INPUT = 'stringConcat("a", "b")';

const beforeEachDecode = (): void => {
  globalMap.clear();
  ParsedSignature.resetTypeIDCounter();
  resetExpandedVarCounter();
};

describe("decodeTransformerUrlCode", () => {
  beforeEach(beforeEachDecode);

  it("testDecodesRawInputStateSection", () => {
    const ast = CondensedToAST(INPUT);
    const code = compressWithInputState(ast, "visual", {
      format: "condensed",
      mode: "raw",
      rawText: INPUT,
    });

    const decoded = decodeTransformerUrlCode(code, "visual");
    expect(decoded.input).toBe(INPUT);
  });

  it("testDecodesOverlayInputStateSection", () => {
    const ast = CondensedToAST(INPUT);
    const canonical = ASTToCondensed(
      stripAutoCurryVarNames(CompressedToAST(ASTToCompressed(ast))),
      true,
      0
    );
    expect(canonical).toBe(INPUT);
    const overlay = computeCondensedOverlay(INPUT, canonical);
    expect(overlay.mode).toBe(0);

    const code = compressWithInputState(ast, "visual", {
      format: "condensed",
      mode: "overlay",
      overlay,
    });

    const decoded = decodeTransformerUrlCode(code, "visual");
    expect(decoded.input).toBe(INPUT);
  });

  it("testReturnsNullInputWhenNoInputStateStored", () => {
    const ast = CondensedToAST(INPUT);
    const code = ASTToCompressed(ast);

    const decoded = decodeTransformerUrlCode(code, "visual");
    expect(decoded.input).toBeNull();
    expect(decoded.ast).toBeDefined();
  });
});
