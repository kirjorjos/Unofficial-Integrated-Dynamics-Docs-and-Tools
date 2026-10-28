import { StructuralParseError } from "lib/transformers/parseErrors";

export const KNOWN_PARAM_TYPE_NAMES = [
  "Any",
  "Integer",
  "Long",
  "Double",
  "Number",
  "Boolean",
  "String",
  "Null",
  "NBT",
  "Block",
  "Item",
  "Fluid",
  "Entity",
  "Ingredients",
  "Recipe",
  "Operator",
  "List",
  "UniquelyNamed",
  "Named",
] as const;

const isKnownTypeName = (name: string): boolean =>
  KNOWN_PARAM_TYPE_NAMES.some(
    (candidate) => candidate.toLowerCase() === name.toLowerCase()
  );

type TypeToken =
  | { type: "name"; value: string }
  | { type: "arrow" }
  | { type: "punct"; value: "(" | ")" | "<" | ">" | "," };

const tokenizeParamType = (input: string): TypeToken[] => {
  const tokens: TypeToken[] = [];
  let i = 0;
  while (i < input.length) {
    const char = input[i]!;
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    if (/[A-Za-z0-9_.]/.test(char)) {
      let j = i;
      while (j < input.length && /[A-Za-z0-9_.]/.test(input[j]!)) j++;
      tokens.push({ type: "name", value: input.slice(i, j) });
      i = j;
      continue;
    }
    if ("()<>,".includes(char)) {
      tokens.push({
        type: "punct",
        value: char as "(" | ")" | "<" | ">" | ",",
      });
      i++;
      continue;
    }
    if (char === "→") {
      tokens.push({ type: "arrow" });
      i++;
      continue;
    }
    if (char === "-" && input[i + 1] === ">") {
      tokens.push({ type: "arrow" });
      i += 2;
      continue;
    }
    throw new StructuralParseError(
      `Unexpected character "${char}" in parameter type "${input}"`
    );
  }
  return tokens;
};

export const parseParamType = (
  raw: string,
  paramName: string,
  paramIndex: number
): string => {
  const text = raw.trim();
  if (text.length === 0) {
    throw new StructuralParseError(
      `Missing type for parameter ${paramIndex + 1} ("${paramName}")`
    );
  }
  const tokens = tokenizeParamType(text);
  let pos = 0;
  const fail = (detail: string): never => {
    throw new StructuralParseError(
      `Invalid type "${text}" for parameter ${paramIndex + 1} ("${paramName}"): ${detail}`
    );
  };
  const peek = (): TypeToken | undefined => tokens[pos];
  const next = (): TypeToken | undefined => tokens[pos++];
  const isPunct = (
    token: TypeToken | undefined,
    value: "(" | ")" | "<" | ">" | ","
  ): boolean =>
    token !== undefined && token.type === "punct" && token.value === value;

  const parseArrow = (): void => {
    parsePrimary();
    if (peek()?.type === "arrow") {
      next();
      parseArrow();
    }
  };

  const parsePrimary = (): void => {
    const open = peek();
    if (isPunct(open, "(")) {
      next();
      parseArrow();
      if (!isPunct(peek(), ")")) fail("expected ')'");
      next();
      return;
    }
    const name = next();
    if (!name || name.type !== "name") {
      fail("expected a type name");
      return;
    }
    if (!isKnownTypeName(name.value)) {
      fail(`unknown type name "${name.value}"`);
    }
    if (isPunct(peek(), "<")) {
      next();
      parseArrow();
      while (isPunct(peek(), ",")) {
        next();
        parseArrow();
      }
      if (!isPunct(peek(), ">")) fail("expected '>'");
      next();
    }
  };

  parseArrow();
  if (pos !== tokens.length) fail("unexpected trailing characters");
  return text;
};

export const parseLambdaParamEntry = (
  parts: string[],
  paramIndex: number
): TypeAST.LambdaParam => {
  const first = parts[0];
  if (first === undefined) {
    throw new StructuralParseError(
      `Missing parameter name at position ${paramIndex + 1}`
    );
  }

  let name = first;
  let rest = parts.slice(1);
  let colonSeen = false;
  const colonIndex = first.indexOf(":");
  if (colonIndex === 0) {
    throw new StructuralParseError(
      `Missing parameter name at position ${paramIndex + 1}`
    );
  } else if (colonIndex > 0) {
    colonSeen = true;
    name = first.slice(0, colonIndex);
    const tail = first.slice(colonIndex + 1);
    rest = tail.length > 0 ? [tail, ...rest] : rest;
  } else if (rest[0]?.startsWith(":")) {
    colonSeen = true;
    const tail = rest[0]!.slice(1);
    rest = tail.length > 0 ? [tail, ...rest.slice(1)] : rest.slice(1);
  }

  const typeText = rest.join("");
  if (typeText.length === 0) {
    if (colonSeen) {
      throw new StructuralParseError(
        `Missing type for parameter ${paramIndex + 1} ("${name}")`
      );
    }
    return { name };
  }
  return { name, type: parseParamType(typeText, name, paramIndex) };
};
