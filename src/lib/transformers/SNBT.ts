import { StructuralParseError } from "lib/transformers/parseErrors";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { LongArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { ShortTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { FloatTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Long } from "lib/JavaNumberClasses/Long";
import { Double } from "lib/JavaNumberClasses/Double";

const UNQUOTED_CHARACTER = /^[0-9A-Za-z_\-.+]$/;

const isAllowedInUnquotedString = (character: string): boolean =>
  character.length === 1 && UNQUOTED_CHARACTER.test(character);

const BYTE_PATTERN = /^[-+]?[0-9]+[bB]$/;
const SHORT_PATTERN = /^[-+]?[0-9]+[sS]$/;
const INT_PATTERN = /^[-+]?[0-9]+$/;
const LONG_PATTERN = /^[-+]?[0-9]+[lL]$/;
const FLOAT_PATTERN =
  /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)(?:[eE][-+]?[0-9]+)?[fF]$/;
const DOUBLE_SUFFIX_PATTERN =
  /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)(?:[eE][-+]?[0-9]+)?[dD]$/;
const DOUBLE_PATTERN =
  /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)(?:[eE][-+]?[0-9]+)?$/;

class SNBTReader {
  private index = 0;

  constructor(
    readonly text: string,
    start = 0
  ) {
    this.index = start;
  }

  get position(): number {
    return this.index;
  }

  canRead(): boolean {
    return this.index < this.text.length;
  }

  peek(offset = 0): string {
    return this.text[this.index + offset] ?? "";
  }

  next(): string {
    return this.text[this.index++] ?? "";
  }

  skip(): void {
    this.index++;
  }

  skipWhitespace(): void {
    while (this.canRead() && /\s/.test(this.peek())) this.index++;
  }

  expect(character: string): void {
    if (this.peek() !== character) {
      this.fail(`Expected '${character}'`);
    }
    this.skip();
  }

  fail(message: string): never {
    const consumed = this.text.slice(0, this.index);
    const line = consumed.split("\n").length;
    const column = this.index - consumed.lastIndexOf("\n");
    const found = this.canRead() ? `'${this.peek()}'` : "the end of the input";
    throw new StructuralParseError(
      `${message}, found ${found} at line ${line}, column ${column}`
    );
  }
}

const normaliseNumericToken = (token: string): string =>
  token.startsWith("+") ? token.slice(1) : token;

const readQuoted = (reader: SNBTReader): string => {
  const quote = reader.next();
  let result = "";
  for (;;) {
    if (!reader.canRead()) {
      reader.fail(`Unterminated string, missing closing ${quote}`);
    }
    const character = reader.next();
    if (character === "\\") {
      if (!reader.canRead()) {
        reader.fail("Unterminated escape sequence");
      }
      result += reader.next();
      continue;
    }
    if (character === quote) {
      return result;
    }
    result += character;
  }
};

const readKey = (reader: SNBTReader): string => {
  const character = reader.peek();
  if (character === '"' || character === "'") {
    return readQuoted(reader);
  }
  const start = reader.position;
  while (reader.canRead() && isAllowedInUnquotedString(reader.peek())) {
    reader.next();
  }
  if (reader.position === start) {
    reader.fail("Expected a key");
  }
  return reader.text.slice(start, reader.position);
};

const readUnquoted = (reader: SNBTReader): Tag<IntegratedValue> => {
  const start = reader.position;
  while (reader.canRead() && isAllowedInUnquotedString(reader.peek())) {
    reader.next();
  }
  const token = reader.text.slice(start, reader.position);
  if (token === "") {
    reader.fail("Expected a value");
  }

  if (token === "true") return new ByteTag(Integer.ONE);
  if (token === "false") return new ByteTag(Integer.ZERO);

  const digits = normaliseNumericToken(token);
  try {
    if (BYTE_PATTERN.test(token)) {
      return new ByteTag(new Integer(digits.slice(0, -1)));
    }
    if (SHORT_PATTERN.test(token)) {
      return new ShortTag(new Integer(digits.slice(0, -1)));
    }
    if (LONG_PATTERN.test(token)) {
      return new LongTag(new Long(digits.slice(0, -1)));
    }
    if (INT_PATTERN.test(token)) {
      return new IntTag(new Integer(digits));
    }
    if (FLOAT_PATTERN.test(token)) {
      return new FloatTag(new Double(digits.slice(0, -1)));
    }
    if (DOUBLE_SUFFIX_PATTERN.test(token)) {
      return new DoubleTag(new Double(digits.slice(0, -1)));
    }
    if (DOUBLE_PATTERN.test(token)) {
      return new DoubleTag(new Double(digits));
    }
  } catch {}
  return new StringTag(new iString(token));
};

const readCompound = (reader: SNBTReader): CompoundTag => {
  reader.expect("{");
  const data: Record<string, Tag<IntegratedValue>> = {};
  reader.skipWhitespace();
  if (reader.peek() === "}") {
    reader.skip();
    return new CompoundTag(data);
  }
  for (;;) {
    reader.skipWhitespace();
    const key = readKey(reader);
    reader.skipWhitespace();
    reader.expect(":");
    data[key] = readValue(reader);
    reader.skipWhitespace();
    if (reader.peek() === ",") {
      reader.skip();
      reader.skipWhitespace();
      if (reader.peek() === "}") break;
      continue;
    }
    break;
  }
  reader.skipWhitespace();
  reader.expect("}");
  return new CompoundTag(data);
};

const readList = (reader: SNBTReader): ListTag => {
  const elements: Tag<IntegratedValue>[] = [];
  reader.skipWhitespace();
  if (reader.peek() === "]") {
    reader.skip();
    return new ListTag(new iArrayEager(elements));
  }
  for (;;) {
    elements.push(readValue(reader));
    reader.skipWhitespace();
    if (reader.peek() === ",") {
      reader.skip();
      reader.skipWhitespace();
      if (reader.peek() === "]") break;
      continue;
    }
    break;
  }
  reader.skipWhitespace();
  reader.expect("]");
  return new ListTag(new iArrayEager(elements));
};

type ArrayMarker = "B" | "I" | "L";

const readArray = (
  reader: SNBTReader,
  marker: ArrayMarker
): Tag<IntegratedValue> => {
  const expected =
    marker === "B"
      ? { type: Tag.TAG_BYTE, label: "byte" }
      : marker === "I"
        ? { type: Tag.TAG_INT, label: "int" }
        : { type: Tag.TAG_LONG, label: "long" };

  const readElement = (): Tag<IntegratedValue> => {
    const element = readValue(reader);
    if (element.getType() !== expected.type) {
      reader.fail(
        `Expected a ${expected.label} element in a [${marker};...] array`
      );
    }
    return element;
  };

  const elements: Tag<IntegratedValue>[] = [];
  reader.skipWhitespace();
  if (reader.peek() === "]") {
    reader.skip();
  } else {
    for (;;) {
      elements.push(readElement());
      reader.skipWhitespace();
      if (reader.peek() === ",") {
        reader.skip();
        reader.skipWhitespace();
        if (reader.peek() === "]") break;
        continue;
      }
      break;
    }
    reader.skipWhitespace();
    reader.expect("]");
  }

  if (marker === "B") {
    return new ByteArrayTag(
      new iArrayEager(elements.map((element) => element.valueOf() as Integer))
    );
  }
  if (marker === "I") {
    return new IntArrayTag(
      new iArrayEager(elements.map((element) => element.valueOf() as Integer))
    );
  }
  return new LongArrayTag(
    new iArrayEager(elements.map((element) => element.valueOf() as Long))
  );
};

const readListOrArray = (reader: SNBTReader): Tag<IntegratedValue> => {
  reader.expect("[");
  const marker = reader.peek();
  if (
    (marker === "B" || marker === "I" || marker === "L") &&
    reader.peek(1) === ";"
  ) {
    reader.skip();
    reader.skip();
    return readArray(reader, marker);
  }
  return readList(reader);
};

const readValue = (reader: SNBTReader): Tag<IntegratedValue> => {
  reader.skipWhitespace();
  if (!reader.canRead()) {
    reader.fail("Expected a value");
  }
  const character = reader.peek();
  if (character === "{") return readCompound(reader);
  if (character === "[") return readListOrArray(reader);
  if (character === '"' || character === "'") {
    return new StringTag(new iString(readQuoted(reader)));
  }
  return readUnquoted(reader);
};

export const SNBTToTagPrefix = (
  text: string,
  start = 0
): { tag: Tag<IntegratedValue>; end: number } => {
  const reader = new SNBTReader(text, start);
  const tag = readValue(reader);
  return { tag, end: reader.position };
};

export const SNBTToTag = (text: string): Tag<IntegratedValue> => {
  const reader = new SNBTReader(text);
  const tag = readValue(reader);
  reader.skipWhitespace();
  if (reader.canRead()) {
    reader.fail("Unexpected trailing data after the SNBT value");
  }
  return tag;
};

export interface SNBTSerializeOptions {
  layout?: "minimize" | "readable";
  indentation?: number;
}

interface WriteContext {
  layout: "minimize" | "readable";
  indentation: number;
  depth: number;
}

const writeQuoted = (text: string): string => {
  const quote = text.includes('"') && !text.includes("'") ? "'" : '"';
  let escaped = "";
  for (const character of text) {
    if (character === "\\") escaped += "\\\\";
    else if (character === quote) escaped += "\\" + character;
    else escaped += character;
  }
  return quote + escaped + quote;
};

const writeFloatingPoint = (value: Double): string => {
  const text = value.toString();
  if (!Number.isFinite(value.toJSNumber())) return text;
  return /[.eE]/.test(text) ? text : `${text}.0`;
};

const writeKey = (key: string): string => {
  if (key !== "" && [...key].every(isAllowedInUnquotedString)) return key;
  return writeQuoted(key);
};

const indentFor = (context: WriteContext, depth: number): string =>
  " ".repeat(context.indentation * depth);
const writeCompound = (tag: CompoundTag, context: WriteContext): string => {
  const entries = Object.entries(tag.data);
  if (context.layout === "minimize") {
    return `{${entries
      .map(
        ([key, value]) => `${writeKey(key)}:${writeTagValue(value, context)}`
      )
      .join(",")}}`;
  }
  if (entries.length === 0) return "{}";
  const child: WriteContext = { ...context, depth: context.depth + 1 };
  const inner = indentFor(context, child.depth);
  const body = entries
    .map(
      ([key, value]) =>
        `${inner}${writeKey(key)}: ${writeTagValue(value, child)}`
    )
    .join(",\n");
  return `{\n${body}\n${indentFor(context, context.depth)}}`;
};

const writeList = (tag: ListTag, context: WriteContext): string => {
  const elements = tag.valueOf().valueOf();
  if (context.layout === "minimize") {
    return `[${elements.map((element) => writeTagValue(element, context)).join(",")}]`;
  }
  if (elements.length === 0) return "[]";
  const child: WriteContext = { ...context, depth: context.depth + 1 };
  const inner = indentFor(context, child.depth);
  const body = elements
    .map((element) => `${inner}${writeTagValue(element, child)}`)
    .join(",\n");
  return `[\n${body}\n${indentFor(context, context.depth)}]`;
};

const writeTagValue = (
  tag: Tag<IntegratedValue>,
  context: WriteContext
): string => {
  switch (tag.getType()) {
    case Tag.TAG_COMPOUND:
      return writeCompound(tag as CompoundTag, context);
    case Tag.TAG_LIST:
      return writeList(tag as ListTag, context);
    case Tag.TAG_BYTE:
      return `${tag.valueOf()}b`;
    case Tag.TAG_SHORT:
      return `${tag.valueOf()}s`;
    case Tag.TAG_INT:
      return `${tag.valueOf()}`;
    case Tag.TAG_LONG:
      return `${tag.valueOf()}L`;
    case Tag.TAG_FLOAT:
      return `${writeFloatingPoint(tag.valueOf() as Double)}f`;
    case Tag.TAG_DOUBLE:
      return `${writeFloatingPoint(tag.valueOf() as Double)}d`;
    case Tag.TAG_STRING:
      return writeQuoted(String(tag.valueOf()));
    case Tag.TAG_BYTE_ARRAY: {
      const values = (tag as ByteArrayTag).valueOf().valueOf();
      return `[B;${values.map((value) => `${value}B`).join(",")}]`;
    }
    case Tag.TAG_INT_ARRAY: {
      const values = (tag as IntArrayTag).valueOf().valueOf();
      return `[I;${values.map((value) => `${value}`).join(",")}]`;
    }
    case Tag.TAG_LONG_ARRAY: {
      const values = (tag as LongArrayTag).valueOf().valueOf();
      return `[L;${values.map((value) => `${value}L`).join(",")}]`;
    }
    case Tag.TAG_NULL:
      throw new StructuralParseError(
        "Cannot write a NullTag as SNBT: NBT has no null representation"
      );
    default:
      throw new StructuralParseError(
        `Cannot write a tag of type ${tag.getType()} as SNBT`
      );
  }
};

export const TagToSNBT = (
  tag: Tag<IntegratedValue>,
  options: SNBTSerializeOptions = {}
): string => {
  const layout = options.layout ?? "minimize";
  const indentation = Math.max(0, Math.floor(options.indentation ?? 2));
  return writeTagValue(tag, { layout, indentation, depth: 0 });
};

export const SNBTToCompoundTag = (text: string): CompoundTag => {
  const tag = SNBTToTag(text);
  if (!(tag instanceof CompoundTag)) {
    throw new StructuralParseError(
      `Expected a compound as the root of the SNBT value, found ${tag
        .getTypeAsString()
        .valueOf()}`
    );
  }
  return tag;
};
