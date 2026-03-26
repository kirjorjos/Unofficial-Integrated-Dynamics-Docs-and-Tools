import { getArity } from "HelperClasses/UtilityFunctions";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";
import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const enum NodeKind {
  Call = 0b00,
  OperatorValue = 0b01,
  Literal = 0b10,
  Reference = 0b11,
}

const enum LiteralKind {
  Integer = 0,
  Long = 1,
  Double = 2,
  String = 3,
  Boolean = 4,
  Null = 5,
  Block = 6,
  Item = 7,
  Fluid = 8,
  Entity = 9,
  Ingredients = 10,
  Recipe = 11,
  NBT = 12,
  Variable = 13,
  Curry = 14,
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
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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
      throw new Error(`Decoded number exceeds safe integer width (${width} bits)`);
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
  const bytes = textEncoder.encode(value);
  writeVarUint(writer, bytes.length);
  writer.writeBytes(bytes);
};

const readString = (reader: BitReader): string => {
  const length = readVarUint(reader);
  return textDecoder.decode(reader.readBytes(length));
};

const writeNumericPayload = (writer: BitWriter, value: TypeNumericString, forceDouble: boolean) => {
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

    throw new Error(`Numeric encoding v1 does not support ${value} outside signed int32`);
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
          value: toSigned32(reader.readNumber(32)).toString() as TypeNumericString,
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
    if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
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
      throw new Error(`Operator ${key} exceeds the 9-bit compressed opcode limit`);
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

const writeNodeMetadata = (writer: BitWriter, node: ASTNode) => {
  writer.writeBit(Boolean(node.varName));
  if (node.varName) {
    writeString(writer, node.varName);
  }
};

const readNodeMetadata = (reader: BitReader, node: ASTNode) => {
  if (reader.readBit()) {
    node.varName = readString(reader);
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
  writer.writeBits(kind, 4);
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
      throw new Error(`Recipe reusable index must be a non-negative integer, got ${value}`);
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

const writeNode = (writer: BitWriter, node: ASTNode, seen: Map<ASTNode, number>) => {
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
      if (node.base.type === "Operator" && node.args.length === getArity(node.base)) {
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
      writeJSONValue(writer, node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Item":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Item);
      writeJSONValue(writer, node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Fluid":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Fluid);
      writeJSONValue(writer, node.value);
      writeNodeMetadata(writer, node);
      return;

    case "Entity":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Entity);
      writeJSONValue(writer, node.value);
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

    case "Variable":
      writer.writeBits(NodeKind.Literal, 2);
      writeLiteralKind(writer, LiteralKind.Variable);
      writeString(writer, node.name);
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
      const literalKind = reader.readNumber(4);
      let node: ASTNode;

      switch (literalKind) {
        case LiteralKind.Integer: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Integer") {
            throw new Error("Integer literal decoded as non-integer numeric payload");
          }
          node = { type: "Integer", value: numeric.value };
          break;
        }
        case LiteralKind.Long: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Integer") {
            throw new Error("Long literal decoded as non-integer numeric payload");
          }
          node = { type: "Long", value: numeric.value };
          break;
        }
        case LiteralKind.Double: {
          const numeric = readNumericPayload(reader);
          if (numeric.type !== "Double") {
            throw new Error("Double literal decoded as non-double numeric payload");
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
          node = { type: "Block", value: readJSONValue(reader) as jsonObject };
          break;
        case LiteralKind.Item:
          node = { type: "Item", value: readJSONValue(reader) as jsonObject };
          break;
        case LiteralKind.Fluid:
          node = { type: "Fluid", value: readJSONValue(reader) as jsonObject };
          break;
        case LiteralKind.Entity:
          node = { type: "Entity", value: readJSONValue(reader) as jsonObject };
          break;
        case LiteralKind.Ingredients:
          node = { type: "Ingredients", value: decodeIngredients(reader, decoded) };
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
        case LiteralKind.Variable:
          node = { type: "Variable", name: readString(reader) };
          break;
        case LiteralKind.Curry: {
          const base = readNode(reader, decoded);
          if (!isOperatorNode(base)) {
            throw new Error("Compressed curry base must decode to an operator node");
          }
          const argLength = readVarUint(reader);
          const args: ASTNode[] = [];
          for (let i = 0; i < argLength; i++) {
            args.push(readNode(reader, decoded));
          }
          node = { type: "Curry", base, args };
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
  if (!reader.isExhausted()) {
    throw new Error("Unexpected trailing bits in compressed AST");
  }
  return ast;
};
