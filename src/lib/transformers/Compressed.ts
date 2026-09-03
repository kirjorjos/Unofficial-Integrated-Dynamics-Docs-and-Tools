import {
  getArity,
  getOpName,
  getOperatorSourceName,
  setOperatorSourceName,
} from "lib/transformers/helpers";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import {
  getReaderClassByNumericID,
  getReaderClassByTypeName,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import {
  getExpandedVarName,
  resetExpandedVarCounter,
  type ExpandedSignatureOptions,
} from "lib/transformers/Expanded";
import type {
  CondensedOverlay,
  ExpandedOverlay,
} from "lib/transformers/inputState";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const enum NodeKind {
  Call = 0b00,
  OperatorValue = 0b01,
  Literal = 0b10,
  Reference = 0b11,
}

/**
 * Literal kind IDs, ordered chronologically by when each type/reader was
 * added to the IntegratedDynamics mod (sourced from git history).
 * Abstract type groupings and our constructs are appended at the end.
 * Extended to 5 bits (32 slots) to accommodate all entries.
 */
const enum LiteralKind {
  Boolean = 0,
  RedstoneReader = 1,
  Integer = 2,
  InventoryReader = 3,
  WorldReader = 4,
  FluidReader = 5,
  String = 6,
  Double = 7,
  Block = 8,
  Item = 9,
  NetworkReader = 10,
  Long = 11,
  List = 12,
  Entity = 13,
  Fluid = 14,
  BlockReader = 15,
  EntityReader = 16,
  ExtraDimensionalReader = 17,
  MachineReader = 18,
  AudioReader = 19,
  Operator = 20,
  NBT = 21,
  Ingredients = 22,
  Recipe = 23,
  Number = 24,
  Named = 25,
  UniquelyNamed = 26,
  Null = 27,
  Variable = 28,
  Curry = 29,
  NetworkCards = 30,
}

const enum JSONKind {
  Null = 0,
  False = 1,
  True = 2,
  Integer = 3,
  Double = 4,
  String = 5,
  Array = 6,
  Object = 7,
}

type ASTNode = TypeAST.AST;

class BitWriter {
  private bits: number[] = [];

  writeBit(bit: boolean) {
    this.bits.push(bit ? 1 : 0);
  }

  writeBits(value: bigint | number, width: number) {
    const bigValue = typeof value === "bigint" ? value : BigInt(value);
    if (width < 0) throw new Error(`Invalid bit width ${width}`);
    for (let i = width - 1; i >= 0; i--) {
      this.bits.push(Number((bigValue >> BigInt(i)) & 1n));
    }
  }

  writeBytes(bytes: Uint8Array) {
    for (const byte of bytes) {
      this.writeBits(byte, 8);
    }
  }

  toBase64URL(): string {
    const byteLength = Math.ceil(this.bits.length / 8);
    const bytes = new Uint8Array(byteLength);
    for (let i = 0; i < this.bits.length; i++) {
      if (this.bits[i]) {
        bytes[Math.floor(i / 8)]! |= 1 << (7 - (i % 8));
      }
    }
    let binary = "";
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }
}

class BitReader {
  private readonly bits: number[];
  private pos = 0;

  constructor(base64URL: string) {
    const padded =
      base64URL + "=".repeat((4 - (base64URL.length % 4 || 4)) % 4);
    const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    this.bits = [];
    for (let i = 0; i < binary.length; i++) {
      const byte = binary.charCodeAt(i);
      for (let j = 7; j >= 0; j--) {
        this.bits.push((byte >> j) & 1);
      }
    }
  }

  readBit(): boolean {
    if (this.pos >= this.bits.length) {
      throw new Error("Unexpected end of compressed input");
    }
    return this.bits[this.pos++] === 1;
  }

  readBits(width: number): bigint {
    if (width < 0) throw new Error(`Invalid bit width ${width}`);
    let value = 0n;
    for (let i = 0; i < width; i++) {
      value = (value << 1n) | (this.readBit() ? 1n : 0n);
    }
    return value;
  }

  readNumber(width: number): number {
    const value = this.readBits(width);
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error(
        `Decoded number exceeds safe integer width (${width} bits)`
      );
    }
    return Number(value);
  }

  readBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = this.readNumber(8);
    }
    return bytes;
  }

  isExhausted() {
    for (let i = this.pos; i < this.bits.length; i++) {
      if (this.bits[i] !== 0) return false;
    }
    return true;
  }
}

const toSigned32 = (value: number): number => {
  return value >= 0x80000000 ? value - 0x100000000 : value;
};

const canonicalDoubleString = (value: number): TypeNumericString => {
  if (Number.isNaN(value)) return "NaN" as TypeNumericString;
  if (!Number.isFinite(value)) {
    return (value > 0 ? "Infinity" : "-Infinity") as TypeNumericString;
  }
  if (Object.is(value, -0)) return "-0.0" as TypeNumericString;
  if (Number.isInteger(value)) return `${value}.0` as TypeNumericString;
  return value.toString() as TypeNumericString;
};

const pow10 = (n: number) => 10n ** BigInt(n);

const bucketBitWidth = (n: number): number => {
  const maxDelta = pow10(n - 1);
  let bits = 0;
  let current = maxDelta;
  while (current > 0n) {
    bits++;
    current >>= 1n;
  }
  return bits;
};

const writeVarUint = (writer: BitWriter, value: bigint | number) => {
  let current = typeof value === "bigint" ? value : BigInt(value);
  if (current < 0n) throw new Error("Varuint can not encode negative values");
  const groups: bigint[] = [];
  do {
    groups.push(current & 0x7fn);
    current >>= 7n;
  } while (current > 0n);
  groups.reverse();
  for (let i = 0; i < groups.length; i++) {
    writer.writeBit(i < groups.length - 1);
    writer.writeBits(groups[i]!, 7);
  }
};

const readVarUint = (reader: BitReader): number => {
  let value = 0n;
  while (true) {
    const hasMore = reader.readBit();
    value = (value << 7n) | reader.readBits(7);
    if (!hasMore) break;
  }
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Decoded varuint exceeds safe integer range");
  }
  return Number(value);
};

const writeString = (writer: BitWriter, value: string) => {
  const sink = (globalThis as Record<string, unknown>)["__STRING_SINK__"] as
    | string[]
    | undefined;
  if (sink) sink.push(value);
  const asciiOnly = [...value].every((c) => c.charCodeAt(0) <= 127);
  writer.writeBit(asciiOnly);
  if (asciiOnly) {
    writeVarUint(writer, value.length);
    for (let i = 0; i < value.length; i++) {
      writer.writeBits(value.charCodeAt(i), 7);
    }
  } else {
    const bytes = textEncoder.encode(value);
    writeVarUint(writer, bytes.length);
    writer.writeBytes(bytes);
  }
};

const CLUSTERED_SYMBOLS = [
  " ",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  ",",
  ".",
  ":",
  ";",
  "-",
  "_",
  "<",
  ">",
  "=",
] as const;

const writeClusteredString = (writer: BitWriter, value: string) => {
  const asciiOnly = [...value].every((c) => c.charCodeAt(0) <= 127);
  if (!asciiOnly) {
    writer.writeBit(false); // legacy format
    writeString(writer, value);
    return;
  }
  writer.writeBit(true); // clustered format
  writeClusteredChars(writer, value);
};

const writeClusteredChars = (writer: BitWriter, value: string) => {
  writeVarUint(writer, value.length);
  for (const c of value) {
    const code = c.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      writer.writeBit(false);
      writer.writeBits(code - 97, 5);
    } else if (code >= 65 && code <= 90) {
      writer.writeBits(0b10, 2);
      writer.writeBits(code - 65, 5);
    } else if (code >= 48 && code <= 57) {
      writer.writeBits(0b110, 3);
      writer.writeBits(code - 48, 4);
    } else {
      const idx = CLUSTERED_SYMBOLS.indexOf(
        c as (typeof CLUSTERED_SYMBOLS)[number]
      );
      if (idx !== -1) {
        writer.writeBits(0b1110, 4);
        writer.writeBits(idx, 4);
      } else {
        writer.writeBits(0b1111, 4);
        writer.writeBits(code, 7);
      }
    }
  }
};

const readClusteredString = (reader: BitReader): string => {
  if (!reader.readBit()) return readString(reader); // legacy format
  return readClusteredChars(reader);
};

const readClusteredChar = (reader: BitReader): string => {
  if (!reader.readBit()) return String.fromCharCode(97 + reader.readNumber(5));
  if (!reader.readBit()) return String.fromCharCode(65 + reader.readNumber(5));
  if (!reader.readBit()) return String.fromCharCode(48 + reader.readNumber(4));
  if (!reader.readBit()) return CLUSTERED_SYMBOLS[reader.readNumber(4)]!;
  return String.fromCharCode(reader.readNumber(7));
};

const readClusteredChars = (reader: BitReader): string => {
  const length = readVarUint(reader);
  let result = "";
  for (let i = 0; i < length; i++) result += readClusteredChar(reader);
  return result;
};

const writeDefName = (writer: BitWriter, name: string) => {
  const chars = [...name];
  const asciiOnly = chars.every((c) => c.charCodeAt(0) <= 127);
  if (asciiOnly && name.length < 128) {
    let clusteredBits = 0;
    for (const c of chars) {
      const code = c.charCodeAt(0);
      if (code >= 97 && code <= 122) clusteredBits += 6;
      else if (code >= 65 && code <= 90) clusteredBits += 7;
      else if (code >= 48 && code <= 57) clusteredBits += 7;
      else if (
        CLUSTERED_SYMBOLS.includes(c as (typeof CLUSTERED_SYMBOLS)[number])
      )
        clusteredBits += 8;
      else clusteredBits += 11;
    }
    if (clusteredBits < 7 * chars.length - 1) {
      writer.writeBit(true); // 11: clustered
      writer.writeBit(true);
      writeClusteredChars(writer, name);
      return;
    }
    writer.writeBit(true); // 10: legacy ASCII (identical to old writeString)
    writeVarUint(writer, name.length);
    for (let i = 0; i < name.length; i++) {
      writer.writeBits(name.charCodeAt(i), 7);
    }
    return;
  }
  writer.writeBit(false);
  const bytes = textEncoder.encode(name);
  writeVarUint(writer, bytes.length);
  writer.writeBytes(bytes);
};

const readDefName = (reader: BitReader): string => {
  if (!reader.readBit()) {
    return textDecoder.decode(reader.readBytes(readVarUint(reader)));
  }
  if (reader.readBit()) return readClusteredChars(reader);
  const length = reader.readNumber(7);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(reader.readNumber(7));
  }
  return result;
};

const readString = (reader: BitReader): string => {
  const isAscii = reader.readBit();
  const length = readVarUint(reader);
  if (isAscii) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += String.fromCharCode(reader.readNumber(7));
    }
    return result;
  }
  return textDecoder.decode(reader.readBytes(length));
};

export type InputFormatKey = "condensed" | "expanded" | "codeline" | "json";

export type InputStateSection =
  | {
      format: "condensed" | "codeline" | "json";
      mode: "overlay";
      overlay: CondensedOverlay;
    }
  | { format: "expanded"; mode: "overlay"; overlay: ExpandedOverlay }
  | { format: InputFormatKey; mode: "raw"; rawText: string };

const FORMAT_IDS: Record<InputFormatKey, number> = {
  condensed: 0,
  expanded: 1,
  codeline: 2,
  json: 3,
};

const FORMATS_BY_ID: InputFormatKey[] = [
  "condensed",
  "expanded",
  "codeline",
  "json",
];

const writeCondensedOverlay = (
  writer: BitWriter,
  overlay: Extract<CondensedOverlay, { mode: 0 }>
) => {
  writeVarUint(writer, overlay.gapOverrides.length);
  for (const [index, gap] of overlay.gapOverrides) {
    writeVarUint(writer, index);
    writeClusteredString(writer, gap);
  }
  writer.writeBit(overlay.hasTrailingGap);
  if (overlay.hasTrailingGap) {
    writeClusteredString(writer, overlay.trailingGap);
  }
  writeVarUint(writer, overlay.spellingOverrides.length);
  for (const [index, value] of overlay.spellingOverrides) {
    writeVarUint(writer, index);
    writeClusteredString(writer, value);
  }
};

const readCondensedOverlay = (
  reader: BitReader
): Extract<CondensedOverlay, { mode: 0 }> => {
  const gapCount = readVarUint(reader);
  const gapOverrides: Array<[number, string]> = [];
  for (let i = 0; i < gapCount; i++) {
    gapOverrides.push([readVarUint(reader), readClusteredString(reader)]);
  }
  const hasTrailingGap = reader.readBit();
  const trailingGap = hasTrailingGap ? readClusteredString(reader) : "";
  const spellingCount = readVarUint(reader);
  const spellingOverrides: Array<[number, string]> = [];
  for (let i = 0; i < spellingCount; i++) {
    spellingOverrides.push([readVarUint(reader), readClusteredString(reader)]);
  }
  return {
    mode: 0,
    gapOverrides,
    hasTrailingGap,
    trailingGap,
    spellingOverrides,
  };
};

const writeExpandedSignatureOptions = (
  writer: BitWriter,
  sig: ExpandedSignatureOptions
) => {
  const depth = sig.depth;
  writer.writeBit(depth === null);
  if (depth !== null) writeVarUint(writer, depth);
  writer.writeBit(sig.labels);
  writer.writeBit(sig.arrow === "->");
  writer.writeBit(sig.hideOperatorWrappers);
};

const writeExpandedItemName = (
  writer: BitWriter,
  item: { name: string; nameRef?: number }
) => {
  if (item.nameRef !== undefined) {
    writer.writeBit(true);
    writeVarUint(writer, item.nameRef);
  } else {
    writer.writeBit(false);
    writeClusteredString(writer, item.name);
  }
};

const writeExpandedOverlay = (writer: BitWriter, overlay: ExpandedOverlay) => {
  if (overlay.sig) {
    writer.writeBit(true); // sig-marker
    writeExpandedSignatureOptions(writer, overlay.sig);
  } else {
    writer.writeBit(false);
  }
  writeVarUint(writer, overlay.items.length);
  for (const item of overlay.items) {
    writer.writeBits(item.kind, 3);
    if (item.kind === 0 || item.kind === 7) {
      writeExpandedItemName(writer, item);
      writer.writeBit(item.head !== null);
      if (item.head !== null) writeClusteredString(writer, item.head);
      writer.writeBit(item.tailMode === 1); // tail-mode: 1 = verbatim, 0 = sparse RHS
      if (item.tailMode === 1) {
        writeClusteredString(writer, item.tail);
      } else {
        writeCondensedOverlay(writer, item.rhsOverlay);
        writer.writeBit(item.suffix !== "");
        if (item.suffix !== "") writeClusteredString(writer, item.suffix);
      }
    } else if (item.kind === 5) {
      writeExpandedItemName(writer, item);
    } else if (item.kind === 6) {
      writeExpandedItemName(writer, item);
      writeCondensedOverlay(writer, item.sigOverlay);
    } else {
      writeClusteredString(writer, item.text);
    }
  }
  const modeCount = overlay.modes?.length ?? 0;
  const suffixCount = overlay.sigSuffixes?.size ?? 0;
  if (modeCount > 0 || suffixCount > 0) {
    writeVarUint(writer, modeCount);
    for (const m of overlay.modes ?? []) {
      if (m.nameRef !== undefined) {
        writer.writeBits(0b11, 2);
        writeVarUint(writer, m.nameRef);
      } else {
        writeClusteredString(writer, m.name);
      }
      writeExpandedSignatureOptions(writer, m.opts);
      writer.writeBit(Boolean(m.opts.forceUnwrapOperators));
      writer.writeBit(Boolean(m.opts.noReturnParens));
      writer.writeBit(Boolean(m.opts.resolveAnys));
      writer.writeBit(Boolean(m.opts.parenFromFns));
    }
    if (suffixCount > 0) {
      writeVarUint(writer, suffixCount);
      for (const [name, suffix] of overlay.sigSuffixes!) {
        writeClusteredString(writer, name);
        writeClusteredString(writer, suffix);
      }
    }
  }
};

const readExpandedSignatureOptions = (
  reader: BitReader
): ExpandedSignatureOptions => {
  const unlimited = reader.readBit();
  const depth = unlimited ? null : readVarUint(reader);
  const labels = reader.readBit();
  const arrow = reader.readBit() ? "->" : "→";
  const hideOperatorWrappers = reader.readBit();
  return { depth, labels, arrow, hideOperatorWrappers };
};

/** Read a named item's name: a nameRef ordinal when indexed, else the string. */
const readExpandedItemName = (
  reader: BitReader
): { name: string; nameRef?: number } => {
  if (reader.readBit()) {
    return { name: "", nameRef: readVarUint(reader) };
  }
  return { name: readClusteredString(reader) };
};

const readModeName = (reader: BitReader): { name?: string; ref?: number } => {
  if (!reader.readBit()) return { name: readString(reader) }; // 0: legacy
  if (reader.readBit()) return { ref: readVarUint(reader) }; // 11: nameRef
  const length = reader.readNumber(7);
  let name = "";
  for (let i = 0; i < length; i++) name += readClusteredChar(reader);
  return { name };
};

const readExpandedOverlay = (reader: BitReader): ExpandedOverlay => {
  const hasSig = reader.readBit();
  const sig = hasSig ? readExpandedSignatureOptions(reader) : undefined;
  const itemCount = readVarUint(reader);
  const items: ExpandedOverlay["items"] = [];
  for (let i = 0; i < itemCount; i++) {
    const kind = reader.readNumber(3);
    if (kind === 0 || kind === 7) {
      const { name, nameRef } = readExpandedItemName(reader);
      const hasHead = reader.readBit();
      const head = hasHead ? readClusteredString(reader) : null;
      const tailMode = reader.readBit() ? 1 : 0;
      if (tailMode === 1) {
        const tail = readClusteredString(reader);
        items.push({
          kind,
          name,
          ...(nameRef !== undefined ? { nameRef } : {}),
          head,
          tailMode: 1,
          tail,
        });
      } else {
        const rhsOverlay = readCondensedOverlay(reader);
        const hasSuffix = reader.readBit();
        const suffix = hasSuffix ? readClusteredString(reader) : "";
        items.push({
          kind,
          name,
          ...(nameRef !== undefined ? { nameRef } : {}),
          head,
          tailMode: 0,
          rhsOverlay,
          suffix,
        });
      }
    } else if (kind === 5) {
      const { name, nameRef } = readExpandedItemName(reader);
      items.push({
        kind: 5,
        name,
        ...(nameRef !== undefined ? { nameRef } : {}),
      });
    } else if (kind === 6) {
      const { name, nameRef } = readExpandedItemName(reader);
      items.push({
        kind: 6,
        name,
        ...(nameRef !== undefined ? { nameRef } : {}),
        sigOverlay: readCondensedOverlay(reader),
      });
    } else if (kind === 3) {
      items.push({ kind: 3, text: readClusteredString(reader) });
    } else if (kind >= 1 && kind <= 4) {
      const text = readClusteredString(reader);
      if (kind === 1) items.push({ kind: 1, text });
      else if (kind === 2) items.push({ kind: 2, text });
      else items.push({ kind: 4, text });
    } else {
      throw new Error(`Unknown expanded item kind ${kind}`);
    }
  }
  const modes: {
    name: string;
    nameRef?: number;
    opts: ExpandedSignatureOptions;
  }[] = [];
  const sigSuffixes = new Map<string, string>();
  if (!reader.isExhausted()) {
    const modeCount = readVarUint(reader);
    for (let i = 0; i < modeCount; i++) {
      const nameInfo = readModeName(reader);
      const name = nameInfo.name ?? "";
      const opts = readExpandedSignatureOptions(reader);
      const forceUnwrapOperators = reader.readBit();
      const noReturnParens = reader.readBit();
      const resolveAnys = reader.readBit();
      const parenFromFns = reader.readBit();
      modes.push({
        name,
        ...(nameInfo.ref !== undefined ? { nameRef: nameInfo.ref } : {}),
        opts: {
          ...opts,
          forceUnwrapOperators,
          noReturnParens,
          resolveAnys,
          parenFromFns,
        },
      });
    }
    if (!reader.isExhausted()) {
      const suffixCount = readVarUint(reader);
      for (let i = 0; i < suffixCount; i++) {
        sigSuffixes.set(
          readClusteredString(reader),
          readClusteredString(reader)
        );
      }
    }
  }
  return {
    items,
    ...(sig ? { sig } : {}),
    ...(modes.length > 0 ? { modes } : {}),
    ...(sigSuffixes.size > 0 ? { sigSuffixes } : {}),
  };
};

const writeInputStateSection = (
  writer: BitWriter,
  outputFormat: InputFormatKey | "visual",
  inputState: InputStateSection
) => {
  writer.writeBit(true);
  const formatStored = inputState.format !== outputFormat;
  writer.writeBit(formatStored);
  if (formatStored) {
    writer.writeBits(FORMAT_IDS[inputState.format], 2);
  }
  if (inputState.mode === "overlay") {
    writer.writeBit(false); // overlay-vs-raw: 0 = token overlay
    if (inputState.format === "expanded") {
      writeExpandedOverlay(writer, inputState.overlay);
    } else {
      if (inputState.overlay.mode !== 0) {
        throw new Error("Non-sparse overlay cannot be encoded as mode 0");
      }
      writeCondensedOverlay(writer, inputState.overlay);
    }
  } else {
    writer.writeBit(true); // overlay-vs-raw: 1 = raw text
    writeClusteredString(writer, inputState.rawText);
  }
};

export const compressWithInputState = (
  ast: TypeAST.AST,
  outputFormat: InputFormatKey | "visual",
  inputState: InputStateSection
): string => {
  const writer = new BitWriter();
  writeNode(writer, ast, new Map());
  writeInputStateSection(writer, outputFormat, inputState);
  return writer.toBase64URL();
};

export const decodeInputStateFromCompressed = (
  compressed: string,
  outputFormat: InputFormatKey | "visual"
): InputStateSection | null => {
  const reader = new BitReader(compressed);
  readNode(reader, []);
  if (reader.isExhausted()) return null;

  const presence = reader.readBit();
  if (!presence) {
    throw new Error("Invalid input-state section: missing presence bit");
  }

  const formatStored = reader.readBit();
  let format: InputFormatKey;
  if (formatStored) {
    const id = reader.readNumber(2);
    const key = FORMATS_BY_ID[id];
    if (key === undefined) throw new Error(`Unknown input format id ${id}`);
    format = key;
  } else {
    if (outputFormat === "visual") {
      throw new Error(
        "Input-state section elided its format but output format is visual"
      );
    }
    format = outputFormat;
  }

  const isRaw = reader.readBit();
  if (isRaw) {
    return { format, mode: "raw", rawText: readClusteredString(reader) };
  }
  if (format === "expanded") {
    return { format, mode: "overlay", overlay: readExpandedOverlay(reader) };
  }
  if (format === "json") {
    return { format, mode: "overlay", overlay: readCondensedOverlay(reader) };
  }
  return { format, mode: "overlay", overlay: readCondensedOverlay(reader) };
};

const writeNumericPayload = (
  writer: BitWriter,
  value: TypeNumericString,
  forceDouble: boolean
) => {
  if (!forceDouble) {
    const intValue = BigInt(value);
    for (let n = 1; n <= 9; n++) {
      const base = pow10(n);
      const max = base + pow10(n - 1);
      if (intValue >= base && intValue <= max) {
        const delta = intValue - base;
        writer.writeBits(0b00, 2);
        writer.writeBits(0b00, 2);
        writer.writeBits(n, 4);
        writer.writeBits(delta, bucketBitWidth(n));
        return;
      }
    }

    if (intValue >= -64n && intValue <= 63n) {
      writer.writeBits(0b00, 2);
      writer.writeBits(0b01, 2);
      writer.writeBits(Number(intValue + 64n), 7);
      return;
    }

    if (intValue >= -2147483648n && intValue <= 2147483647n) {
      writer.writeBits(0b00, 2);
      writer.writeBits(0b10, 2);
      writer.writeBits(BigInt.asUintN(32, intValue), 32);
      return;
    }

    throw new Error(
      `Numeric encoding v1 does not support ${value} outside signed int32`
    );
  }

  const num = Number(value);
  const dataView = new DataView(new ArrayBuffer(8));
  dataView.setFloat64(0, num, false);
  writer.writeBits(0b01, 2);
  for (let i = 0; i < 8; i++) {
    writer.writeBits(dataView.getUint8(i), 8);
  }
};

const readNumericPayload = (
  reader: BitReader
): { type: "Integer" | "Double"; value: TypeNumericString } => {
  const nk = reader.readNumber(2);
  if (nk === 0b00) {
    const strategy = reader.readNumber(2);
    switch (strategy) {
      case 0b00: {
        const n = reader.readNumber(4);
        if (n < 1 || n > 9) throw new Error(`Invalid bucket exponent ${n}`);
        const deltaBits = bucketBitWidth(n);
        const delta = reader.readBits(deltaBits);
        const maxDelta = pow10(n - 1);
        if (delta > maxDelta) throw new Error(`Invalid bucket delta ${delta}`);
        return {
          type: "Integer",
          value: (pow10(n) + delta).toString() as TypeNumericString,
        };
      }
      case 0b01:
        return {
          type: "Integer",
          value: (reader.readNumber(7) - 64).toString() as TypeNumericString,
        };
      case 0b10:
        return {
          type: "Integer",
          value: toSigned32(
            reader.readNumber(32)
          ).toString() as TypeNumericString,
        };
      default:
        throw new Error("Reserved integer numeric strategy");
    }
  }

  if (nk === 0b01) {
    const dataView = new DataView(new ArrayBuffer(8));
    for (let i = 0; i < 8; i++) {
      dataView.setUint8(i, reader.readNumber(8));
    }
    return {
      type: "Double",
      value: canonicalDoubleString(dataView.getFloat64(0, false)),
    };
  }

  throw new Error("Reserved numeric kind");
};

const writeJSONValue = (writer: BitWriter, value: jsonData) => {
  if (value === null) {
    writer.writeBits(JSONKind.Null, 3);
    return;
  }

  if (typeof value === "boolean") {
    writer.writeBits(value ? JSONKind.True : JSONKind.False, 3);
    return;
  }

  if (typeof value === "number") {
    if (
      Number.isInteger(value) &&
      value >= -2147483648 &&
      value <= 2147483647
    ) {
      writer.writeBits(JSONKind.Integer, 3);
      writeNumericPayload(writer, value.toString() as TypeNumericString, false);
      return;
    }
    writer.writeBits(JSONKind.Double, 3);
    writeNumericPayload(writer, canonicalDoubleString(value), true);
    return;
  }

  if (typeof value === "string") {
    writer.writeBits(JSONKind.String, 3);
    writeString(writer, value);
    return;
  }

  if (Array.isArray(value)) {
    writer.writeBits(JSONKind.Array, 3);
    writeVarUint(writer, value.length);
    for (const entry of value) {
      writeJSONValue(writer, entry);
    }
    return;
  }

  writer.writeBits(JSONKind.Object, 3);
  const keys = Object.keys(value).sort();
  writeVarUint(writer, keys.length);
  for (const key of keys) {
    writeString(writer, key);
    writeJSONValue(writer, value[key] as jsonData);
  }
};

const readJSONValue = (reader: BitReader): jsonData => {
  const kind = reader.readNumber(3);
  switch (kind) {
    case JSONKind.Null:
      return null;
    case JSONKind.False:
      return false;
    case JSONKind.True:
      return true;
    case JSONKind.Integer: {
      const numeric = readNumericPayload(reader);
      if (numeric.type !== "Integer") {
        throw new Error("Expected integer JSON numeric payload");
      }
      return Number(numeric.value);
    }
    case JSONKind.Double: {
      const numeric = readNumericPayload(reader);
      if (numeric.type !== "Double") {
        throw new Error("Expected double JSON numeric payload");
      }
      return Number(numeric.value);
    }
    case JSONKind.String:
      return readString(reader);
    case JSONKind.Array: {
      const length = readVarUint(reader);
      const out: jsonData[] = [];
      for (let i = 0; i < length; i++) {
        out.push(readJSONValue(reader));
      }
      return out;
    }
    case JSONKind.Object: {
      const length = readVarUint(reader);
      const out: jsonObject = {};
      for (let i = 0; i < length; i++) {
        out[readString(reader)] = readJSONValue(reader);
      }
      return out;
    }
    default:
      throw new Error(`Unknown JSON kind ${kind}`);
  }
};

// Bitmask-based object encoding for Block/Item/Fluid/Entity.
// Replaces JSON key-value encoding with a compact bitmask approach:
// [bitmask: N bits][values in key order for bits that are 1]

const BLOCK_KEYS = ["id", "properties"] as const;
const ITEM_KEYS = ["id", "size", "tag"] as const;
const FLUID_KEYS = ["id", "amount", "tag"] as const;
const ENTITY_KEYS = ["id", "properties"] as const;

const writeBitmaskObject = (
  writer: BitWriter,
  value: jsonObject,
  keys: readonly string[]
) => {
  for (const key of keys) {
    writer.writeBit(key in value);
  }
  for (const key of keys) {
    if (key in value) {
      writeJSONValue(writer, value[key] as jsonData);
    }
  }
};

const readBitmaskObject = (
  reader: BitReader,
  keys: readonly string[]
): jsonObject => {
  const result: jsonObject = {};
  const present = keys.map(() => reader.readBit());
  for (let i = 0; i < keys.length; i++) {
    if (present[i]) {
      result[keys[i]!] = readJSONValue(reader);
    }
  }
  return result;
};

const getOperatorMaps = () => {
  const byID = new Map<number, TypeOperatorKey>();
  const byName = new Map<TypeOperatorKey, number>();

  for (const [key, opClass] of Object.entries(operatorRegistry)) {
    if (key === "find" || key === "operatorByNickname") continue;
    if (typeof opClass !== "function") continue;

    const numericID = (opClass as typeof BaseOperator).numericID;
    if (!Number.isInteger(numericID) || numericID < 0) {
      throw new Error(`Operator ${key} is missing a valid numericID`);
    }
    if (numericID > 511) {
      throw new Error(
        `Operator ${key} exceeds the 9-bit compressed opcode limit`
      );
    }
    if (byID.has(numericID)) {
      throw new Error(
        `Duplicate compressed operator id ${numericID} for ${key} and ${byID.get(
          numericID
        )}`
      );
    }

    byID.set(numericID, key as TypeOperatorKey);
    byName.set(key as TypeOperatorKey, numericID);
  }

  return { byID, byName };
};

const operatorMaps = getOperatorMaps();

const getOperatorClassByOpName = (
  opName: TypeOperatorKey
): typeof BaseOperator | undefined => {
  const opClass = operatorRegistry[opName];
  if (
    opClass &&
    typeof opClass === "function" &&
    (opClass.prototype instanceof BaseOperator ||
      (opClass as unknown as { numericID?: number }).numericID !== undefined)
  ) {
    return opClass as unknown as typeof BaseOperator;
  }
  return undefined;
};

const getNicknamesForNode = (node: ASTNode): string[] | undefined => {
  let opName: TypeOperatorKey | undefined;
  if (node.type === "Operator") {
    opName = node.opName;
  } else if (node.type === "Flip") {
    opName = "OPERATOR_FLIP";
  } else if (node.type === "Pipe") {
    opName = "OPERATOR_PIPE";
  } else if (node.type === "Pipe2") {
    opName = "OPERATOR_PIPE2";
  }
  // Note: Curry nodes use getExpandedVarName() auto-generation check
  // in writeNodeMetadata/readNodeMetadata instead of nickname lookup
  if (opName) {
    const opClass = getOperatorClassByOpName(opName);
    if (opClass) return opClass.nicknames;
  }
  return undefined;
};

const writeSourceNameIfPresent = (writer: BitWriter, node: ASTNode) => {
  if (node.type === "Curry") return false;
  if (node.type === "Operator") {
    if (node.varName) return false;
    const sourceName = getOperatorSourceName(node);
    if (sourceName !== undefined && sourceName !== getOpName(node.opName)) {
      const nicknames = getNicknamesForNode(node);
      if (nicknames) {
        const nicknameIndex = nicknames.indexOf(sourceName);
        if (nicknameIndex !== -1) {
          writer.writeBit(true); // has source name
          writer.writeBit(false); // nickname index encoding
          writer.writeBits(nicknameIndex, 5);
          return true;
        }
      }
      writer.writeBit(true); // has source name
      writer.writeBit(true); // full string encoding
      writeString(writer, sourceName);
      return true;
    }
  }
  return false;
};

const writeNodeMetadata = (writer: BitWriter, node: ASTNode) => {
  if (node.varName && node.type === "Curry") {
    resetExpandedVarCounter();
    const savedVarName = node.varName;
    delete (node as { varName?: string }).varName;
    const autoName = getExpandedVarName(node);
    node.varName = savedVarName;
    if (savedVarName === autoName) {
      writer.writeBit(false); // hasVarName = 0 — derivable from structure
      return;
    }
  }

  if (writeSourceNameIfPresent(writer, node)) return;

  writer.writeBit(Boolean(node.varName));
  if (node.varName) {
    const nicknames = getNicknamesForNode(node);
    if (nicknames) {
      const nicknameIndex = nicknames.indexOf(node.varName);
      if (nicknameIndex !== -1) {
        writer.writeBit(false); // nickname index encoding
        writer.writeBits(nicknameIndex, 5);
        return;
      }
    }
    writer.writeBit(true); // full string encoding
    writeString(writer, node.varName);
  }
};

const readNodeMetadata = (reader: BitReader, node: ASTNode) => {
  if (reader.readBit()) {
    const encodingType = reader.readBit();
    let name: string;
    if (encodingType) {
      // Full string
      name = readString(reader);
    } else {
      // Nickname index
      const nicknames = getNicknamesForNode(node);
      const index = reader.readNumber(5);
      if (!nicknames || index >= nicknames.length) {
        throw new Error(
          `Invalid nickname index ${index} for node type ${node.type}`
        );
      }
      name = nicknames[index]!;
    }
    if (node.type === "Operator") {
      setOperatorSourceName(node as TypeAST.BaseOperator, name);
    } else {
      node.varName = name;
    }
  }

  // Reconstruct auto-generated name for Curry nodes where it wasn't stored
  if (node.type === "Curry" && !node.varName) {
    resetExpandedVarCounter();
    node.varName = getExpandedVarName(node);
  }
};

const writeOperatorID = (writer: BitWriter, opName: TypeOperatorKey) => {
  const numericID = operatorMaps.byName.get(opName);
  if (numericID === undefined) {
    throw new Error(`Unknown operator for compressed encoding: ${opName}`);
  }
  writer.writeBits(numericID, 9);
};

const readOperatorID = (reader: BitReader): TypeOperatorKey => {
  const numericID = reader.readNumber(9);
  const opName = operatorMaps.byID.get(numericID);
  if (!opName) throw new Error(`Unknown compressed operator id ${numericID}`);
  return opName;
};

const isOperatorNode = (node: ASTNode): node is TypeAST.Operator => {
  return (
    node.type === "Operator" ||
    node.type === "Curry" ||
    node.type === "Pipe" ||
    node.type === "Pipe2" ||
    node.type === "Flip"
  );
};

const writeLiteralKind = (writer: BitWriter, kind: LiteralKind) => {
  writer.writeBits(kind, 5);
};

const encodeIngredients = (
  writer: BitWriter,
  node: TypeAST.Ingredients,
  seen: Map<ASTNode, number>
) => {
  const items = node.value.items || [];
  const fluids = node.value.fluids || [];
  const energy = node.value.energy || [];

  writeVarUint(writer, items.length);
  for (const item of items) writeNode(writer, item, seen);

  writeVarUint(writer, fluids.length);
  for (const fluid of fluids) writeNode(writer, fluid, seen);

  writeVarUint(writer, energy.length);
  for (const longValue of energy) writeNode(writer, longValue, seen);
};

const decodeIngredients = (
  reader: BitReader,
  decoded: Array<ASTNode | undefined>
): TypeAST.Ingredients["value"] => {
  const itemsLength = readVarUint(reader);
  const items: TypeAST.Item[] = [];
  for (let i = 0; i < itemsLength; i++) {
    items.push(readNode(reader, decoded) as TypeAST.Item);
  }

  const fluidsLength = readVarUint(reader);
  const fluids: TypeAST.Fluid[] = [];
  for (let i = 0; i < fluidsLength; i++) {
    fluids.push(readNode(reader, decoded) as TypeAST.Fluid);
  }

  const energyLength = readVarUint(reader);
  const energy: TypeAST.Long[] = [];
  for (let i = 0; i < energyLength; i++) {
    energy.push(readNode(reader, decoded) as TypeAST.Long);
  }

  return { items, fluids, energy };
};

const writeReusableIndexes = (writer: BitWriter, values: number[]) => {
  writeVarUint(writer, values.length);
  for (const value of values) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(
        `Recipe reusable index must be a non-negative integer, got ${value}`
      );
    }
    writeVarUint(writer, value);
  }
};

const readReusableIndexes = (reader: BitReader): number[] => {
  const length = readVarUint(reader);
  const values: number[] = [];
  for (let i = 0; i < length; i++) {
    values.push(readVarUint(reader));
  }
  return values;
};

const writeNode = (
  writer: BitWriter,
  node: ASTNode,
  seen: Map<ASTNode, number>
) => {
  const existingID = seen.get(node);
  if (existingID !== undefined) {
    writer.writeBits(NodeKind.Reference, 2);
    writeVarUint(writer, existingID);
    return;
  }

  seen.set(node, seen.size);

  switch (node.type) {
    case "Operator":
      writer.writeBits(NodeKind.OperatorValue, 2);
      writeOperatorID(writer, node.opName);
      writeNodeMetadata(writer, node);
      return;

    case "Flip":
      writer.writeBits(NodeKind.Call, 2);
      writeOperatorID(writer, "OPERATOR_FLIP");
      writeNode(writer, node.arg, seen);
      writeNodeMetadata(writer, node);
      return;

    case "Pipe":
      writer.writeBits(NodeKind.Call, 2);
      writeOperatorID(writer, "OPERATOR_PIPE");
      writeNode(writer, node.op1, seen);
      writeNode(writer, node.op2, seen);
      writeNodeMetadata(writer, node);
      return;

    case "Pipe2":
      writer.writeBits(NodeKind.Call, 2);
      writeOperatorID(writer, "OPERATOR_PIPE2");
      writeNode(writer, node.op1, seen);
      writeNode(writer, node.op2, seen);
      writeNode(writer, node.op3, seen);
      writeNodeMetadata(writer, node);
      return;

    case "Curry": {
      if (
        node.base.type === "Operator" &&
        node.args.length === getArity(node.base)
      ) {
        writer.writeBits(NodeKind.Call, 2);
        writeOperatorID(writer, node.base.opName);
        for (const arg of node.args) {
          writeNode(writer, arg, seen);
        }
        writeNodeMetadata(writer, node);
        return;
      }

      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Curry);
      writeNode(writer, node.base, seen);
      writeVarUint(writer, node.args.length);
      for (const arg of node.args) {
        writeNode(writer, arg, seen);
      }
      writeNodeMetadata(writer, node);
      return;
    }

    case "Integer":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Integer);
      writeNumericPayload(writer, node.value, false);
      writeNodeMetadata(writer, node);
      return;

    case "Long":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Long);
      writeNumericPayload(writer, node.value, false);
      writeNodeMetadata(writer, node);
      return;

    case "Double":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Double);
      writeNumericPayload(writer, node.value, true);
      writeNodeMetadata(writer, node);
      return;

    case "String":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.String);
      writeString(writer, node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Boolean":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Boolean);
      writer.writeBit(node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Null":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Null);
      writeNodeMetadata(writer, node);
      return;

    case "Block":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Block);
      writeBitmaskObject(writer, node.value, BLOCK_KEYS);
      writeNodeMetadata(writer, node);
      return;

    case "Item":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Item);
      writeBitmaskObject(writer, node.value, ITEM_KEYS);
      writeNodeMetadata(writer, node);
      return;

    case "Fluid":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Fluid);
      writeBitmaskObject(writer, node.value, FLUID_KEYS);
      writeNodeMetadata(writer, node);
      return;

    case "Entity":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Entity);
      writeBitmaskObject(writer, node.value, ENTITY_KEYS);
      writeNodeMetadata(writer, node);
      return;

    case "Ingredients":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Ingredients);
      encodeIngredients(writer, node, seen);
      writeNodeMetadata(writer, node);
      return;

    case "Recipe":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Recipe);
      writeNode(writer, node.value.input, seen);
      writeNode(writer, node.value.output, seen);
      writeReusableIndexes(writer, node.value.inputReuseable.items);
      writeReusableIndexes(writer, node.value.inputReuseable.fluids);
      writeReusableIndexes(writer, node.value.inputReuseable.energies);
      writeNodeMetadata(writer, node);
      return;

    case "NBT":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.NBT);
      writeJSONValue(writer, node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Reader": {
      writer.writeBits(NodeKind.Literal, 2);
      const readerClass = getReaderClassByTypeName(node.value.reader);
      if (!readerClass) {
        throw new Error(`Unknown reader type: ${node.value.reader}`);
      }
      if (readerClass.numericID > 31) {
        throw new Error(
          `Reader ${readerClass.typeName} exceeds the 5-bit LiteralKind range`
        );
      }
      writeLiteralKind(writer, readerClass.numericID as LiteralKind);

      const aspectKeys = Object.keys(readerClass.aspects);
      const aspectIndex = aspectKeys.indexOf(node.value.aspect);
      if (aspectIndex === -1) {
        throw new Error(
          `Unknown aspect ${node.value.aspect} for ${readerClass.typeName}`
        );
      }
      writer.writeBits(aspectIndex, readerClass.getAspectBitWidth());

      const hasPartId = node.value.partId !== undefined;
      writer.writeBit(hasPartId);
      if (hasPartId) writeString(writer, node.value.partId!);

      const hasSettings = node.value.settings !== undefined;
      writer.writeBit(hasSettings);
      if (hasSettings) {
        writeJSONValue(writer, node.value.settings as jsonData);
      }

      const hasSimulatedOutput = node.value.simulatedOutput !== undefined;
      writer.writeBit(hasSimulatedOutput);
      if (hasSimulatedOutput) {
        writeNode(writer, node.value.simulatedOutput as ASTNode, seen);
      }

      writeNodeMetadata(writer, node);
      return;
    }

    case "List":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.List);
      writeVarUint(writer, node.value.length);
      for (const entry of node.value) {
        writeNode(writer, entry, seen);
      }
      writeNodeMetadata(writer, node);
      return;

    case "Variable":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Variable);
      writeString(writer, node.name);
      writeNodeMetadata(writer, node);
      return;

    case "NetworkCards":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.NetworkCards);
      writeVarUint(writer, node.definitions.length);
      for (const def of node.definitions) {
        const root = def.node as { varName?: string };
        const savedRootName = root.varName;
        delete root.varName;
        let storedName = def.name;
        if (def.name !== "") {
          resetExpandedVarCounter();
          if (getExpandedVarName(def.node) === def.name) storedName = "";
        }
        writeDefName(writer, storedName);
        writeNode(writer, def.node, seen);
        if (savedRootName !== undefined) root.varName = savedRootName;
      }
      writeNodeMetadata(writer, node);
      return;
  }
};

const readNode = (
  reader: BitReader,
  decoded: Array<ASTNode | undefined>
): ASTNode => {
  const kind = reader.readNumber(2);

  switch (kind) {
    case NodeKind.Reference: {
      const nodeID = readVarUint(reader);
      const node = decoded[nodeID];
      if (!node) throw new Error(`Invalid compressed node reference ${nodeID}`);
      return node;
    }

    case NodeKind.OperatorValue: {
      const slot = decoded.length;
      decoded.push(undefined);
      const node: TypeAST.BaseOperator = {
        type: "Operator",
        opName: readOperatorID(reader),
      };
      readNodeMetadata(reader, node);
      decoded[slot] = node;
      return node;
    }

    case NodeKind.Call: {
      const slot = decoded.length;
      decoded.push(undefined);
      const opName = readOperatorID(reader);
      const opNode: TypeAST.BaseOperator = { type: "Operator", opName };
      const arity = getArity(opNode);
      const args: ASTNode[] = [];
      for (let i = 0; i < arity; i++) {
        args.push(readNode(reader, decoded));
      }

      let node: ASTNode;
      if (opName === "OPERATOR_FLIP") {
        node = {
          type: "Flip",
          arg: args[0] as TypeAST.Operator,
        };
      } else if (opName === "OPERATOR_PIPE") {
        node = {
          type: "Pipe",
          op1: args[0] as TypeAST.Operator,
          op2: args[1] as TypeAST.Operator,
        };
      } else if (opName === "OPERATOR_PIPE2") {
        node = {
          type: "Pipe2",
          op1: args[0] as TypeAST.Operator,
          op2: args[1] as TypeAST.Operator,
          op3: args[2] as TypeAST.Operator,
        };
      } else {
        node = {
          type: "Curry",
          base: opNode,
          args,
        };
      }

      readNodeMetadata(reader, node);
      decoded[slot] = node;
      return node;
    }

    case NodeKind.Literal: {
      const slot = decoded.length;
      decoded.push(undefined);
      const literalKind = reader.readNumber(5);
      let node: ASTNode;

      switch (literalKind) {
        case LiteralKind.Integer: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Integer") {
            throw new Error(
              "Integer literal decoded as non-integer numeric payload"
            );
          }
          node = { type: "Integer", value: numeric.value };
          break;
        }
        case LiteralKind.Long: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Integer") {
            throw new Error(
              "Long literal decoded as non-integer numeric payload"
            );
          }
          node = { type: "Long", value: numeric.value };
          break;
        }
        case LiteralKind.Double: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Double") {
            throw new Error(
              "Double literal decoded as non-double numeric payload"
            );
          }
          node = { type: "Double", value: numeric.value };
          break;
        }
        case LiteralKind.String:
          node = { type: "String", value: readString(reader) };
          break;
        case LiteralKind.Boolean:
          node = { type: "Boolean", value: reader.readBit() };
          break;
        case LiteralKind.Null:
          node = { type: "Null" };
          break;
        case LiteralKind.Block:
          node = {
            type: "Block",
            value: readBitmaskObject(reader, BLOCK_KEYS),
          };
          break;
        case LiteralKind.Item:
          node = {
            type: "Item",
            value: readBitmaskObject(reader, ITEM_KEYS),
          };
          break;
        case LiteralKind.Fluid:
          node = {
            type: "Fluid",
            value: readBitmaskObject(reader, FLUID_KEYS),
          };
          break;
        case LiteralKind.Entity:
          node = {
            type: "Entity",
            value: readBitmaskObject(reader, ENTITY_KEYS),
          };
          break;
        case LiteralKind.Ingredients:
          node = {
            type: "Ingredients",
            value: decodeIngredients(reader, decoded),
          };
          break;
        case LiteralKind.Recipe:
          node = {
            type: "Recipe",
            value: {
              input: readNode(reader, decoded) as TypeAST.Ingredients,
              output: readNode(reader, decoded) as TypeAST.Ingredients,
              inputReuseable: {
                items: readReusableIndexes(reader),
                fluids: readReusableIndexes(reader),
                energies: readReusableIndexes(reader),
              },
            },
          };
          break;
        case LiteralKind.NBT:
          node = { type: "NBT", value: readJSONValue(reader) };
          break;
        case LiteralKind.List: {
          const length = readVarUint(reader);
          const value: ASTNode[] = [];
          for (let i = 0; i < length; i++) {
            value.push(readNode(reader, decoded));
          }
          node = { type: "List", value };
          break;
        }
        case LiteralKind.Variable:
          node = { type: "Variable", name: readString(reader) };
          break;
        case LiteralKind.NetworkCards: {
          const defLength = readVarUint(reader);
          const definitions: { name: string; node: ASTNode }[] = [];
          for (let i = 0; i < defLength; i++) {
            const storedName = readDefName(reader);
            const node = readNode(reader, decoded);
            let name = storedName;
            if (name === "") {
              resetExpandedVarCounter();
              name = getExpandedVarName(node);
            }
            (node as { varName?: string }).varName = name;
            definitions.push({ name, node });
          }
          node = { type: "NetworkCards", definitions };
          break;
        }
        case LiteralKind.Curry: {
          const base = readNode(reader, decoded);
          if (!isOperatorNode(base)) {
            throw new Error(
              "Compressed curry base must decode to an operator node"
            );
          }
          const argLength = readVarUint(reader);
          const args: ASTNode[] = [];
          for (let i = 0; i < argLength; i++) {
            args.push(readNode(reader, decoded));
          }
          node = { type: "Curry", base, args };
          break;
        }
        case LiteralKind.RedstoneReader:
        case LiteralKind.InventoryReader:
        case LiteralKind.WorldReader:
        case LiteralKind.FluidReader:
        case LiteralKind.NetworkReader:
        case LiteralKind.BlockReader:
        case LiteralKind.EntityReader:
        case LiteralKind.ExtraDimensionalReader:
        case LiteralKind.MachineReader:
        case LiteralKind.AudioReader: {
          const readerClass = getReaderClassByNumericID(literalKind);
          if (!readerClass) {
            throw new Error(`Unknown reader literal kind ${literalKind}`);
          }
          const aspectKeys = Object.keys(readerClass.aspects);
          const aspectIndex = reader.readNumber(
            readerClass.getAspectBitWidth()
          );
          if (aspectIndex >= aspectKeys.length) {
            throw new Error(
              `Invalid aspect index ${aspectIndex} for ${readerClass.typeName}`
            );
          }
          const aspect = aspectKeys[aspectIndex]!;

          const partId = reader.readBit() ? readString(reader) : undefined;
          const settings = reader.readBit()
            ? (readJSONValue(reader) as Record<
                string,
                number | boolean | string
              >)
            : undefined;
          const simulatedOutput = reader.readBit()
            ? readNode(reader, decoded)
            : undefined;

          node = {
            type: "Reader",
            value: {
              reader: readerClass.typeName,
              partId,
              aspect,
              settings,
              simulatedOutput,
            },
          };
          break;
        }
        default:
          throw new Error(`Unknown compressed literal kind ${literalKind}`);
      }

      readNodeMetadata(reader, node);
      decoded[slot] = node;
      return node;
    }

    default:
      throw new Error(`Unknown compressed node kind ${kind}`);
  }
};

export const ASTToCompressed = (ast: TypeAST.AST): string => {
  const writer = new BitWriter();
  writeNode(writer, ast, new Map());
  return writer.toBase64URL();
};

export const CompressedToAST = (compressed: string): TypeAST.AST => {
  const reader = new BitReader(compressed);
  const ast = readNode(reader, []);
  return ast;
};
