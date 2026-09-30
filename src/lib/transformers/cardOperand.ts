import { parseSnbtInput } from "lib/transformers/inputParser";
import { StructuralParseError } from "lib/transformers/parseErrors";

export const CARD_OPERAND_IDENTIFIER_REGEX = /^__cardOperand(\d+)__$/;
export const cardOperandIdentifier = (index: number): string =>
  `__cardOperand${index}__`;

export const getCardOperandIndex = (name: string): number | null => {
  const match = CARD_OPERAND_IDENTIFIER_REGEX.exec(name);
  return match ? Number(match[1]) : null;
};

export interface ExtractedCardOperands {
  text: string;
  operands: string[];
}

const cardCallParen = (text: string, nameStart: number): number => {
  const name = text.slice(nameStart, nameStart + 5).toLowerCase();
  const length = name.startsWith("cards") ? 5 : name.startsWith("card") ? 4 : 0;
  if (length === 0) return -1;
  let i = nameStart + length;
  while (i < text.length && /\s/.test(text[i]!)) i++;
  return text[i] === "(" ? i : -1;
};

export const extractCardOperands = (text: string): ExtractedCardOperands => {
  let out = "";
  const operands: string[] = [];
  let index = 0;

  while (index < text.length) {
    const char = text[index]!;

    if (char === '"') {
      const end = skipString(text, index);
      out += text.slice(index, end);
      index = end;
      continue;
    }
    if (char === "'" || char === "\n" || !/[A-Za-z_]/.test(char)) {
      out += char;
      index++;
      continue;
    }
    if (index > 0 && /[\w$]/.test(text[index - 1]!)) {
      out += char;
      index++;
      continue;
    }

    const openParen = cardCallParen(text, index);
    if (openParen === -1) {
      out += char;
      index++;
      continue;
    }

    const close = findClosingParen(text, openParen);
    if (close === -1) {
      out += text.slice(index);
      return { text: out, operands };
    }

    operands.push(text.slice(openParen + 1, close));
    out += cardOperandIdentifier(operands.length - 1);
    index = close + 1;
  }

  return { text: out, operands };
};

const skipString = (text: string, start: number): number => {
  const triple = text.slice(start, start + 3) === '"""';
  const delimiter = triple ? '"""' : '"';
  let i = start + delimiter.length;
  while (i < text.length) {
    if (text[i] === "\\") {
      i += 2;
      continue;
    }
    if (text.startsWith(delimiter, i)) return i + delimiter.length;
    i++;
  }
  return text.length;
};

const findClosingParen = (text: string, open: number): number => {
  let depth = 0;
  let quote: '"' | "'" | '"""' | null = null;
  let escaped = false;

  for (let i = open; i < text.length; i++) {
    const char = text[i]!;

    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (quote === '"""') {
        if (char === '"' && text[i + 1] === '"' && text[i + 2] === '"') {
          quote = null;
          i += 2;
        }
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' && text[i + 1] === '"' && text[i + 2] === '"') {
      quote = '"""';
      i += 2;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "-" && text[i + 1] === "-") {
      while (i < text.length && text[i] !== "\n") i++;
      continue;
    }

    if (char === "(") depth++;
    else if (char === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
};

export const parseCardOperand = (operand: string): TypeAST.Card => {
  const trimmed = operand.trim();
  if (trimmed === "") {
    throw new StructuralParseError("Card(...) needs a pasted card or source");
  }

  let parsed;
  try {
    parsed = parseSnbtInput(trimmed, { missingParts: "warn" });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new StructuralParseError(
      `Card(...) could not read its operand: ${detail}`
    );
  }

  const definitions: TypeAST.NetworkCards["definitions"] = [];
  for (const card of parsed.cards) {
    if (card.ast === undefined) {
      throw new StructuralParseError(
        `Card(...) holds a card it cannot decode${
          card.id === undefined ? "" : ` (variable ${card.id})`
        }`
      );
    }
    definitions.push({
      name: card.id ?? String(definitions.length),
      node: card.ast,
    });
  }

  return { type: "Card", value: { type: "NetworkCards", definitions } };
};
