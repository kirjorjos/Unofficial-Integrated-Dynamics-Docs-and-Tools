import {
  BitReader,
  BitWriter,
  readVarUint,
  writeVarUint,
} from "lib/transformers/Compressed";

export interface TransformerSettings {
  initialVariableId: number;
  signatureDepth: number;
  depthLabels: boolean;
  arrowGlyph: "→" | "->";
  signatureLayout: "own-line" | "inline";
  inlinePlacement: "after" | "before";
  statementLayout: "same-line" | "newline";
  referenceStyle: "varId" | "refs";
  expandedRefForm: "varId" | "name";
  wrap: boolean;
  comments: boolean;
  variableWrapper: boolean;
  lambdaParamSugar: boolean;
  duplicateNames: "error" | "allow";
  hardening: "inGame" | "full";
  hideOperatorWrappers: boolean;
  resolve: boolean;
  preferSourceNames: boolean;
  declarationCards: "ignore" | "add";
}

export const DEFAULT_TRANSFORMER_SETTINGS: TransformerSettings = {
  initialVariableId: 0,
  signatureDepth: -1,
  depthLabels: false,
  arrowGlyph: "→",
  signatureLayout: "own-line",
  inlinePlacement: "after",
  statementLayout: "same-line",
  referenceStyle: "varId",
  expandedRefForm: "varId",
  wrap: false,
  comments: false,
  variableWrapper: false,
  lambdaParamSugar: false,
  duplicateNames: "error",
  hardening: "inGame",
  hideOperatorWrappers: false,
  resolve: false,
  preferSourceNames: false,
  declarationCards: "ignore",
};

export const isDefaultSettings = (settings: TransformerSettings): boolean => {
  const { initialVariableId, ...rest } = settings;
  const { initialVariableId: _defaultId, ...defaultRest } =
    DEFAULT_TRANSFORMER_SETTINGS;
  void initialVariableId;
  void _defaultId;
  return (
    settings.initialVariableId ===
      DEFAULT_TRANSFORMER_SETTINGS.initialVariableId &&
    Object.keys(defaultRest).every(
      (key) =>
        (rest as Record<string, unknown>)[key] ===
        (defaultRest as Record<string, unknown>)[key]
    )
  );
};

const FLAG_ORDER: {
  bit: (s: TransformerSettings) => boolean;
}[] = [
  { bit: (s) => s.depthLabels }, // row 3
  { bit: (s) => s.arrowGlyph === "->" }, // row 4
  { bit: (s) => s.signatureLayout === "inline" }, // row 5
  { bit: (s) => s.inlinePlacement === "before" }, // row 6
  { bit: (s) => s.statementLayout === "newline" }, // row 7
  { bit: (s) => s.referenceStyle === "refs" }, // row 8
  { bit: (s) => s.expandedRefForm === "name" }, // row 9
  { bit: (s) => s.wrap }, // row 10
  { bit: (s) => s.comments }, // row 11
  { bit: (s) => s.variableWrapper }, // row 12
  { bit: (s) => s.lambdaParamSugar }, // row 13
  { bit: (s) => s.duplicateNames === "allow" }, // row 14
  { bit: (s) => s.hardening === "full" }, // row 15
  { bit: (s) => s.hideOperatorWrappers }, // row 16
  { bit: (s) => s.resolve }, // row 17
  { bit: (s) => s.preferSourceNames }, // row 18
  { bit: (s) => s.declarationCards === "add" }, // row 19
];

const encodeDepth = (depth: number): number => (depth === -1 ? 0 : depth + 1);

const decodeDepth = (encoded: number): number =>
  encoded === 0 ? -1 : encoded - 1;

export const encodeSettingsOpts = (
  settings: TransformerSettings
): string | null => {
  if (isDefaultSettings(settings)) return null;

  const writer = new BitWriter();
  for (const { bit } of FLAG_ORDER) {
    writer.writeBit(bit(settings));
  }
  writeVarUint(writer, encodeDepth(settings.signatureDepth));
  return writer.toBase64URL();
};

export const decodeSettingsOpts = (
  opts: string | null
): TransformerSettings => {
  if (!opts) return { ...DEFAULT_TRANSFORMER_SETTINGS };

  const settings: TransformerSettings = { ...DEFAULT_TRANSFORMER_SETTINGS };
  const reader = new BitReader(opts);

  const setterFor = (index: number, enabled: boolean): void => {
    switch (index) {
      case 0:
        settings.depthLabels = enabled;
        break;
      case 1:
        settings.arrowGlyph = enabled ? "->" : "→";
        break;
      case 2:
        settings.signatureLayout = enabled ? "inline" : "own-line";
        break;
      case 3:
        settings.inlinePlacement = enabled ? "before" : "after";
        break;
      case 4:
        settings.statementLayout = enabled ? "newline" : "same-line";
        break;
      case 5:
        settings.referenceStyle = enabled ? "refs" : "varId";
        break;
      case 6:
        settings.expandedRefForm = enabled ? "name" : "varId";
        break;
      case 7:
        settings.wrap = enabled;
        break;
      case 8:
        settings.comments = enabled;
        break;
      case 9:
        settings.variableWrapper = enabled;
        break;
      case 10:
        settings.lambdaParamSugar = enabled;
        break;
      case 11:
        settings.duplicateNames = enabled ? "allow" : "error";
        break;
      case 12:
        settings.hardening = enabled ? "full" : "inGame";
        break;
      case 13:
        settings.hideOperatorWrappers = enabled;
        break;
      case 14:
        settings.resolve = enabled;
        break;
      case 15:
        settings.preferSourceNames = enabled;
        break;
      case 16:
        settings.declarationCards = enabled ? "add" : "ignore";
        break;
      default:
        break;
    }
  };

  for (let i = 0; i < FLAG_ORDER.length; i++) {
    setterFor(i, reader.readBit());
  }

  settings.signatureDepth = decodeDepth(readVarUint(reader));

  if (!reader.isExhausted()) {
    throw new Error("Trailing non-zero bits in opts param");
  }

  return settings;
};
