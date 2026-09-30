import {
  CompressedToAST,
  decodeInputStateFromCompressed,
  type InputFormatKey,
} from "lib/transformers/Compressed";
import { ASTToCondensed } from "lib/transformers/Condensed";
import { ASTToCodeLine } from "lib/transformers/CodeLine";
import { ASTToExpandedWithSignatureOptions } from "lib/transformers/Expanded";
import {
  applyCodeLineOverlay,
  applyCondensedOverlay,
  applyExpandedOverlay,
  applySnbtOverlay,
  resolveExpandedOverlayNames,
  stripAutoCurryVarNames,
} from "lib/transformers/inputState";
import { ASTToSnbt } from "lib/transformers/snbtFormat";

export type UrlCodeOutputFormat = InputFormatKey | "visual";

export type DecodedUrlCode = {
  ast: TypeAST.AST;
  /** The raw transformer input, or null when the code has no stored input state. */
  input: string | null;
};

const canonicalInputForFormat = (
  ast: TypeAST.AST,
  format: InputFormatKey,
  initialVariableId: number
): string => {
  switch (format) {
    case "condensed":
      return ASTToCondensed(ast, true, initialVariableId);
    case "codeline":
      return ASTToCodeLine(ast, true, initialVariableId);
    case "expanded":
      return ASTToExpandedWithSignatureOptions(ast, "Condensed", null, true);
    case "snbt":
      return ASTToSnbt(ast);
  }
};

export const decodeTransformerUrlCode = (
  code: string,
  outputFormat: UrlCodeOutputFormat,
  opts?: { initialVariableId?: number }
): DecodedUrlCode => {
  const initialVariableId = opts?.initialVariableId ?? 0;
  const ast = stripAutoCurryVarNames(CompressedToAST(code));

  const inputState = decodeInputStateFromCompressed(code, outputFormat);
  if (!inputState) {
    return { ast, input: null };
  }

  if (inputState.mode === "raw") {
    return { ast, input: inputState.rawText };
  }

  const strippedAst = stripAutoCurryVarNames(ast);
  if (inputState.format === "expanded") {
    const decodedSigOpts = inputState.overlay.sig ?? null;
    const canonicalBase = ASTToExpandedWithSignatureOptions(
      strippedAst,
      "Condensed",
      decodedSigOpts,
      true
    );
    const overlay = resolveExpandedOverlayNames(
      inputState.overlay,
      canonicalBase
    );
    const modesMap = overlay.modes
      ? new Map(overlay.modes.map((m) => [m.name, m.opts]))
      : undefined;
    const canonicalInput = ASTToExpandedWithSignatureOptions(
      strippedAst,
      "Condensed",
      overlay.sig ?? null,
      true,
      modesMap
    );
    return { ast, input: applyExpandedOverlay(canonicalInput, overlay) };
  }

  const canonicalInput = canonicalInputForFormat(
    strippedAst,
    inputState.format,
    initialVariableId
  );
  if (inputState.format === "codeline") {
    return {
      ast,
      input: applyCodeLineOverlay(canonicalInput, inputState.overlay),
    };
  }
  if (inputState.format === "snbt") {
    return {
      ast,
      input: applySnbtOverlay(canonicalInput, inputState.overlay),
    };
  }
  return {
    ast,
    input: applyCondensedOverlay(canonicalInput, inputState.overlay),
  };
};
