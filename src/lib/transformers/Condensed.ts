import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { assertReaderSimulatedOutputType } from "lib/IntegratedDynamicsClasses/readers/readerSimulatedValueResolver";
import {
  getReaderAspectDisplayName,
  getReaderAspectKey,
  getReaderClassByName,
  getReaderClassByTypeName,
  getReaderConstructorClass,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import {
  attachNodeComments,
  getOpName,
  getArity,
  expectsOperatorArgument,
  getNicknameCharacterRegex,
  getNicknameRegex,
  formatVarName,
  isVarNameExpandedSafe,
  resolveImplicitFlipOperator,
  setOperatorSourceName,
  getOperatorSourceName,
  flattenAnonymousBaseOperatorApplication,
  parseNumericLiteralToken,
  unwrapParamWrapper,
  type CommentSpan,
  type TokenComment,
} from "lib/transformers/helpers";
import {
  assertNoTopLevelVarRefs,
  buildNetworkCards,
  getNetworkDefLastCardIds,
  getNetworkSegmentRefs,
  getRefInfo,
  getRefName,
} from "lib/transformers/NetworkCards";
import { BinderScope } from "lib/transformers/binderScope";
import { parseLambdaParamEntry } from "lib/transformers/lambdaParams";
import { variableFromAt, variableFromName } from "lib/transformers/variableRef";
import { normalizeSegments } from "lib/transformers/MixedLists";
import {
  isReservedName,
  operatorLabel,
  reservedNameMessage,
  shadowedOperatorKey,
  type NameShadowOptions,
} from "lib/transformers/nicknameShadow";
import {
  buildBlockLikeConstructor,
  buildIngredientsConstructor,
  buildRecipeConstructor,
  ingredientsToText,
  recipeToText,
} from "lib/transformers/constructors";
import {
  extractCardOperands,
  getCardOperandIndex,
  parseCardOperand,
} from "lib/transformers/cardOperand";
import { sourceToNetworkCards } from "lib/transformers/sourceNodes";
import {
  isConvenienceExpression,
  markConvenienceExpression,
  resolveConvenienceOperator,
} from "lib/transformers/convenienceOperators";
import {
  InvalidArityParseError,
  InvalidEscapeParseError,
  InternalParseError,
  StructuralParseError,
  UnknownIdentifierParseError,
} from "lib/transformers/parseErrors";

type char = string;
export type QuoteDelimiter = '"' | "'" | '"""';

interface State {
  quote: QuoteDelimiter | null;
  isEscaped: boolean;
  inJSON: number;
}

const unescapeDelimited = (s: string, escapeQuote: "'" | '"'): string => {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]!;
    if (ch !== "\\") {
      out += ch;
      continue;
    }
    const next = s[i + 1];
    if (next === undefined) {
      out += "\\";
      break;
    }
    if (next === escapeQuote) {
      out += escapeQuote;
      i++;
    } else if (next === "\\") {
      out += "\\";
      i++;
    } else if (next === "n") {
      out += "\n";
      i++;
    } else if (next === "t") {
      out += "\t";
      i++;
    } else if (next === "r") {
      out += "\r";
      i++;
    } else if (next === "b") {
      out += "\b";
      i++;
    } else if (next === "f") {
      out += "\f";
      i++;
    } else if (next === "/") {
      out += "/";
      i++;
    } else {
      throw new InvalidEscapeParseError(
        `Invalid escape sequence "\\${next}" in string literal`
      );
    }
  }
  return out;
};

const assertKnownEscapes = (body: string): void => {
  for (let i = 0; i < body.length; i++) {
    if (body[i] !== "\\") continue;
    const next = body[i + 1];
    if (next === undefined) {
      throw new InvalidEscapeParseError(
        "String literal ends with a lone backslash"
      );
    }
    if (!/^[nrtbf"'\\/]$/.test(next)) {
      throw new InvalidEscapeParseError(
        `Invalid escape sequence "\\${next}" in string literal`
      );
    }
    i++;
  }
};

const hasEscapedDoubleQuote = (body: string): boolean => {
  let backslashes = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === "\\") {
      backslashes++;
      continue;
    }
    if (body[i] === '"' && backslashes % 2 === 1) {
      if (body[i + 1] === '"' && body[i + 2] === '"') {
        backslashes = 0;
        continue;
      }
      return true;
    }
    backslashes = 0;
  }
  return false;
};

export const unquoteString = (raw: string): string => {
  if (raw.startsWith('"""') && raw.endsWith('"""') && raw.length >= 6) {
    const body = raw.slice(3, -3);
    if (hasEscapedDoubleQuote(body)) {
      throw new InvalidEscapeParseError(
        "A triple-quoted string takes a bare quote, not an escaped one"
      );
    }
    return unescapeDelimited(body, '"');
  }
  if (raw.startsWith("'") && raw.endsWith("'") && raw.length >= 2) {
    return unescapeDelimited(raw.slice(1, -1), "'");
  }
  if (raw.startsWith('"') && raw.endsWith('"') && raw.length >= 2) {
    assertKnownEscapes(raw.slice(1, -1));
    return JSON.parse(raw);
  }
  return JSON.parse(raw);
};

const charTokenCheckers: Record<string, (c: char, state: State) => boolean> = {
  integer: (c, state) =>
    state.quote === null && state.inJSON === 0 && /^-|\d$/.test(c),
  long: (c, state) =>
    state.quote === null && state.inJSON === 0 && /^[-\dlL]$/.test(c),
  double: (c, state) =>
    state.quote === null && state.inJSON === 0 && /^[-\d\.dD]$/.test(c),
  string: (c, state) => state.quote !== null || c === '"' || c === "'",
  nbt: (c, state) => state.inJSON > 0 || c === "{",
  boolean: (c, state) =>
    state.quote === null && state.inJSON === 0 && /^[truefalse]$/i.test(c),
  null: (c, state) =>
    state.quote === null && state.inJSON === 0 && /^[nul]$/i.test(c),
  identifier: (c, state) =>
    state.quote === null &&
    (getNicknameCharacterRegex().test(c) || c === "=" || c === "@"),
};

const resolveType = (value: string, possible: string[]): string => {
  const lower = value.toLowerCase();
  if (lower === "null" && possible.includes("null")) return "null";
  if ((lower === "true" || lower === "false") && possible.includes("boolean"))
    return "boolean";
  const numeric = parseNumericLiteralToken(value);
  if (numeric !== null) {
    const numericType = numeric.type.toLowerCase();
    if (possible.includes(numericType)) return numericType;
    if (/^[-.\d]/.test(value)) return numericType;
  }
  if (value.startsWith('"') || value.startsWith("'") || value.startsWith('"""'))
    return "string";
  if (value.startsWith("{")) {
    const isBraceVarName = value !== "{}" && getNicknameRegex().test(value);
    if (!isBraceVarName) return "nbt";
  }
  return "identifier";
};

export interface CondensedTokenStream {
  tokens: { type: string; value: string }[];
  comments: TokenComment[];
}

export const tokenizeWithComments = (
  condensed: string
): CondensedTokenStream => {
  const tokens: { type: string; value: string }[] = [];
  const comments: TokenComment[] = [];
  let currentToken = "";
  let state: State = { quote: null, isEscaped: false, inJSON: 0 };
  let possibleTypes = Object.keys(charTokenCheckers);

  for (let i = 0; i < condensed.length; i++) {
    const char = condensed[i]!;

    if (
      state.quote === null &&
      state.inJSON === 0 &&
      char === "=" &&
      condensed[i + 1] === ">"
    ) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      tokens.push({ type: "structural", value: "=>" });
      i++; // Skip ">"
      continue;
    }

    if (
      state.quote === null &&
      state.inJSON === 0 &&
      char === "-" &&
      condensed[i + 1] === ">"
    ) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      tokens.push({ type: "structural", value: "->" });
      i++; // Skip ">"
      continue;
    }

    if (
      state.quote === null &&
      state.inJSON === 0 &&
      char === "-" &&
      condensed[i + 1] === "-"
    ) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      const commentStart = i;
      while (i < condensed.length && condensed[i] !== "\n") i++;
      comments.push({
        afterToken: tokens.length,
        text: condensed.slice(commentStart, i).trim(),
      });
      continue;
    }

    const isStructural =
      state.quote === null && state.inJSON === 0 && /^[()[\],;\\]$/.test(char);
    const isWhitespace =
      state.quote === null && state.inJSON === 0 && /^\s$/.test(char);

    if (isStructural || isWhitespace) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      if (isStructural) {
        tokens.push({ type: "structural", value: char });
      }
      continue;
    }

    if (state.quote !== null) {
      if (state.isEscaped) {
        if (!/^[nrtbf"'\\\/]$/.test(char)) {
          throw new InvalidEscapeParseError(
            `Invalid escape sequence "\\${char}" at position ${i}`
          );
        }
        state.isEscaped = false;
      } else if (char === "\\") {
        state.isEscaped = true;
      } else if (state.quote === '"' && char === '"') {
        state.quote = null;
      } else if (state.quote === "'" && char === "'") {
        state.quote = null;
      } else if (
        state.quote === '"""' &&
        char === '"' &&
        condensed[i + 1] === '"' &&
        condensed[i + 2] === '"'
      ) {
        let run = 1;
        while (condensed[i + run] === '"') run++;
        if (run > 3) {
          currentToken += char;
          continue;
        }
        currentToken += '\"\"\"';
        i += 2; // Skip the other two closing quotes
        state.quote = null;
        possibleTypes = Object.keys(charTokenCheckers);
        continue;
      }
    } else {
      if (
        char === '"""' ||
        (char === '"' && condensed[i + 1] === '"' && condensed[i + 2] === '"')
      ) {
        // Open triple-quoted string; consume all three quotes (without the extra chars).
        state.quote = '"""';
        state.isEscaped = false;
        currentToken += '\"\"\"';
        i += 2; // Skip the other two opening quotes
        possibleTypes = ["string"];
        continue;
      } else if (char === '"') {
        state.quote = '"';
        state.isEscaped = false;
      } else if (char === "'") {
        state.quote = "'";
        state.isEscaped = false;
      } else if (char === "{") {
        state.inJSON++;
      }
    }

    const nextPossible = possibleTypes.filter((t) =>
      charTokenCheckers[t]!(char, state)
    );

    if (nextPossible.length === 0) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
        i--; // cause recheck of current char to start next token
        continue;
      } else {
        throw new StructuralParseError(
          `Unexpected character "${char}" at position ${i}`
        );
      }
    }

    if (state.quote === null && char === "}") {
      state.inJSON--;
    }

    currentToken += char;
    possibleTypes = nextPossible;
  }

  if (currentToken) {
    tokens.push({
      type: resolveType(currentToken, possibleTypes),
      value: currentToken,
    });
  }

  return { tokens, comments };
};

export const tokenize = (condensed: string) =>
  tokenizeWithComments(condensed).tokens;

const convenienceInProgress = new Set<string>();

export const convenienceAstFor = (name: string): TypeAST.AST | undefined => {
  if (convenienceInProgress.has(name)) return undefined;
  const entry = resolveConvenienceOperator(name);
  if (!entry) return undefined;
  convenienceInProgress.add(name);
  try {
    return markConvenienceExpression(
      CondensedToAST(entry.expression, new Map(), 0, true, false, {})
    );
  } catch {
    return undefined;
  } finally {
    convenienceInProgress.delete(name);
  }
};

export const CondensedToAST = (
  condensed: string,
  externalScope: Map<string, TypeAST.AST> = new Map(),
  startVariableId = 0,
  allowVarRefs = false,
  normalizeMixedLists = true,
  opts: NameShadowOptions = {}
): TypeAST.AST => {
  const { text, operands } = extractCardOperands(condensed);
  const { tokens, comments } = tokenizeWithComments(text);
  let pos = 0;
  const spans: CommentSpan[] = [];

  type InternalAST =
    | { type: "Integer"; value: TypeNumericString; varName?: string }
    | { type: "Long"; value: TypeNumericString; varName?: string }
    | { type: "Double"; value: TypeNumericString; varName?: string }
    | { type: "String"; value: string; varName?: string }
    | { type: "Boolean"; value: boolean; varName?: string }
    | { type: "Null"; varName?: string }
    | { type: "List"; value: InternalAST[]; varName?: string }
    | { type: "Block"; value: jsonObject; varName?: string }
    | { type: "Item"; value: jsonObject; varName?: string }
    | { type: "Fluid"; value: jsonObject; varName?: string }
    | { type: "Entity"; value: jsonObject; varName?: string }
    | { type: "Ingredients"; value: any; varName?: string }
    | {
        type: "Recipe";
        value: TypeAST.Recipe["value"];
        varName?: string;
      }
    | { type: "NBT"; value: jsonData; varName?: string }
    | { type: "Operator"; opName: TypeOperatorKey; varName?: string }
    | { type: "Flip"; arg: InternalAST; varName?: string }
    | { type: "Pipe"; op1: InternalAST; op2: InternalAST; varName?: string }
    | {
        type: "Pipe2";
        op1: InternalAST;
        op2: InternalAST;
        op3: InternalAST;
        varName?: string;
      }
    | {
        type: "Curry";
        base: InternalAST;
        args: InternalAST[];
        varName?: string;
      }
    | {
        type: "Variable";
        id?: string;
        label?: string;
        valueType?: string;
        varName?: string;
      }
    | {
        type: "Param";
        index: number;
        binderDepth?: number;
        name?: string;
        varName?: string;
      }
    | {
        type: "Lambda";
        params: TypeAST.LambdaParam[];
        body: InternalAST;
        text?: string;
        varName?: string;
      }
    | { type: "Identifier"; value: string }
    | {
        type: "Reader";
        value: TypeAST.Reader["value"];
        varName?: string;
      }
    | { type: "Materialize"; value: InternalAST; varName?: string }
    | { type: "Dynamic"; value: InternalAST; varName?: string }
    | { type: "Static"; value: InternalAST; varName?: string }
    | { type: "Display"; value: InternalAST; varName?: string }
    | { type: "Card"; value: InternalAST; varName?: string };

  const checkParamShadow = (name: string): void => {
    if (isReservedName(name)) {
      throw new StructuralParseError(reservedNameMessage(name));
    }
    const aliasKey = shadowedOperatorKey(name);
    if (!aliasKey) return;
    if ((opts.operatorShadow ?? "error") === "error") {
      throw new StructuralParseError(
        `Variable name "${name}" clashes with an existing operator nickname (${operatorLabel(
          aliasKey
        )}). Rename it, or set "Operator shadow" to Warn.`
      );
    }
    opts.warnings?.push(
      `Parameter "${name}" clashes with an existing operator nickname (${operatorLabel(
        aliasKey
      )}).`
    );
  };

  function tryParseParams(): TypeAST.LambdaParam[] | null {
    const startPos = pos;
    const next = tokens[pos];
    if (!next) return null;

    if (next.type === "structural" && next.value === "(") {
      pos++; // consume (
      const entries: string[][] = [];
      let entry: string[] = [];
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
      ) {
        const p = tokens[pos++]!;
        if (p.type === "structural" && p.value === ",") {
          entries.push(entry);
          entry = [];
          continue;
        }
        entry.push(p.value);
      }
      if (!tokens[pos]) {
        pos = startPos;
        return null;
      }
      pos++; // consume )
      const arrow = tokens[pos];
      if (
        !arrow ||
        arrow.type !== "structural" ||
        (arrow.value !== "=>" && arrow.value !== "->")
      ) {
        pos = startPos;
        return null;
      }
      entries.push(entry);
      const params = entries
        .filter((parts) => !(entries.length === 1 && parts.length === 0))
        .map((parts, index) => {
          const param = parseLambdaParamEntry(parts, index);
          if (!getNicknameRegex().test(param.name)) {
            throw new StructuralParseError(
              `Invalid lambda parameter name: "${param.name}"`
            );
          }
          checkParamShadow(param.name);
          return param;
        });
      const seenParams = new Set<string>();
      for (const param of params) {
        if (seenParams.has(param.name)) {
          throw new StructuralParseError(
            `Duplicate variable name "${param.name}" in lambda`
          );
        }
        seenParams.add(param.name);
      }
      return params;
    } else if (next.type === "structural" && next.value === "\\") {
      pos++; // consume \
      const paramToken = tokens[pos];
      if (!paramToken || paramToken.type !== "identifier") {
        pos = startPos;
        return null;
      }
      const dotIdx = paramToken.value.lastIndexOf(".");
      if (dotIdx !== -1) {
        const param = paramToken.value.substring(0, dotIdx);
        const rest = paramToken.value.substring(dotIdx + 1);
        tokens[pos] = { type: "structural", value: "." };
        if (rest)
          tokens.splice(pos + 1, 0, { type: "identifier", value: rest });
        tokens.splice(pos, 0, { type: "identifier", value: param });
        pos++;
        checkParamShadow(param);
        return [{ name: param }];
      }
    } else if (next.type === "identifier") {
      const p = tokens[pos++]!;
      const arrow = tokens[pos];
      if (
        arrow &&
        arrow.type === "structural" &&
        (arrow.value === "=>" || arrow.value === "->")
      ) {
        checkParamShadow(p.value);
        return [{ name: p.value }];
      }
    }
    pos = startPos;
    return null;
  }

  function parseExpression(scope: BinderScope): InternalAST {
    const start = pos;
    const node = parseExpressionInner(scope);
    if (pos > start) spans.push({ start, end: pos, node: node as TypeAST.AST });
    return node;
  }

  function tryParseWrapperExpression(
    scope: BinderScope
  ): InternalAST | undefined {
    const token = tokens[pos];
    if (!token || token.type !== "identifier") return undefined;
    const lower = token.value.toLowerCase();
    const canonical =
      lower === "materialize"
        ? "Materialize"
        : lower === "dynamic"
          ? "Dynamic"
          : lower === "static"
            ? "Static"
            : lower === "display"
              ? "Display"
              : undefined;
    if (!canonical) return undefined;
    if (scope.has(token.value) || externalScope.has(token.value)) {
      return undefined;
    }
    const open = tokens[pos + 1];
    if (!open || open.type !== "structural" || open.value !== "(") {
      return undefined;
    }
    pos += 2; // consume name and '('
    const value = parseExpression(scope);
    if (
      !tokens[pos] ||
      tokens[pos]!.type !== "structural" ||
      tokens[pos]!.value !== ")"
    ) {
      throw new StructuralParseError(
        `Expected ')' after ${canonical} argument`
      );
    }
    pos++; // consume ')'
    return unwrapParamWrapper({
      type: canonical,
      value,
    } as TypeAST.Materialize) as InternalAST;
  }

  const CALLABLE_IDENTIFIER_KEYWORDS = [
    "block",
    "item",
    "fluid",
    "entity",
    "ingredients",
    "recipe",
    "operator",
    "variable",
  ];

  function isKnownCallName(name: string, scope: BinderScope): boolean {
    if (name.startsWith("@")) return true;
    if (scope.has(name) || externalScope.has(name)) return true;
    if (operatorRegistry.operatorByNickname(name)) return true;
    if (CALLABLE_IDENTIFIER_KEYWORDS.includes(name.toLowerCase())) return true;
    if (resolveConvenienceOperator(name)) return true;
    return resolveImplicitFlipOperator(name) !== undefined;
  }

  function parseExpressionInner(scope: BinderScope): InternalAST {
    const params = tryParseParams();
    if (params !== null) {
      const sep = tokens[pos];
      if (
        sep &&
        sep.type === "structural" &&
        (sep.value === "=>" || sep.value === "->" || sep.value === ".")
      ) {
        pos++; // consume separator
        const body = parseExpression(
          scope.push(params.map((param) => param.name))
        );
        return { type: "Lambda", params, body };
      }
    }

    const wrapperExpr = tryParseWrapperExpression(scope);
    if (wrapperExpr !== undefined) return wrapperExpr;

    const readerExpr = tryParseReaderExpression(scope);
    if (readerExpr !== undefined) return readerExpr;

    const token = tokens[pos++];
    if (!token) throw new StructuralParseError("Unexpected end of input");

    if (token.type === "structural") {
      if (token.value === "(") {
        const expr = parseExpression(scope);
        if (!tokens[pos] || tokens[pos]!.value !== ")")
          throw new StructuralParseError("Expected ')' after grouping");
        pos++; // consume ')'
        return expr;
      }
      if (token.value === "[") {
        const values: InternalAST[] = [];
        while (
          tokens[pos] &&
          !(tokens[pos]!.type === "structural" && tokens[pos]!.value === "]") &&
          !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ";")
        ) {
          values.push(parseExpression(scope));
          if (
            tokens[pos] &&
            tokens[pos]!.type === "structural" &&
            tokens[pos]!.value === ","
          ) {
            pos++;
          }
        }
        if (
          !tokens[pos] ||
          !(tokens[pos]!.type === "structural" && tokens[pos]!.value === "]")
        ) {
          throw new StructuralParseError("Expected ']'");
        }
        pos++;
        if (values.some((value) => value.type === "Card")) {
          throw new StructuralParseError(
            "Card(...) cannot be used inside a list; give it a name of its own"
          );
        }
        return { type: "List", value: values };
      }
      if (token.value === ";") {
        throw new StructuralParseError("Unexpected ';' inside expression");
      }
      throw new StructuralParseError(
        `Unexpected structural token: ${token.value}`
      );
    }

    if (
      tokens[pos] &&
      tokens[pos]!.type === "structural" &&
      tokens[pos]!.value === "("
    ) {
      if (!isKnownCallName(token.value, scope)) {
        throw new UnknownIdentifierParseError(
          `Unknown identifier: ${token.value}`
        );
      }
      pos++; // consume '('
      const args: InternalAST[] = [];
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")") &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ";")
      ) {
        const arg = parseExpression(scope);
        args.push(arg);
        const next = tokens[pos];
        if (next && next.type === "structural" && next.value === ",") {
          pos++; // consume ','
        } else if (!next || next.value !== ")") {
          throw new StructuralParseError("Expected ',' between arguments");
        }
      }
      if (!tokens[pos]) throw new StructuralParseError("Expected ')'");
      pos++; // consume ')'

      return handleCall(token.value, args, scope);
    }

    return handleLiteral(token, scope);
  }

  function handleCall(
    name: string,
    args: InternalAST[],
    scope: BinderScope
  ): InternalAST {
    for (const arg of args) {
      if (arg.type === "Card") {
        throw new StructuralParseError(
          "Card(...) cannot be used inside a call; give it a name of its own"
        );
      }
    }
    if (name.startsWith("@") && name.slice(1).toLowerCase() === "variable") {
      if (args.length !== 1 || args[0]!.type !== "String") {
        throw new InvalidArityParseError(
          "Variable(...) expects exactly one string argument"
        );
      }
      return variableFromName((args[0] as { value: string }).value);
    }
    if (
      [
        "block",
        "item",
        "fluid",
        "entity",
        "ingredients",
        "recipe",
        "operator",
        "variable",
      ].includes(name.toLowerCase())
    ) {
      return handleCallInternal({ type: "Identifier", value: name }, args);
    }

    if (scope.has(name)) {
      throw new InvalidArityParseError(
        `Non-base operator not directly callable, use apply`
      );
    }
    const internalKey = operatorRegistry.operatorByNickname(name);
    const base: InternalAST = externalScope.has(name)
      ? (externalScope.get(name)! as InternalAST)
      : internalKey
        ? setOperatorSourceName({ type: "Operator", opName: internalKey }, name)
        : handleLiteral({ type: "identifier", value: name }, scope);

    return handleCallInternal(base, args);
  }

  const parseReaderExtraArgs = (
    args: InternalAST[]
  ): {
    settings?: Record<string, number | boolean | string>;
    simulatedOutput?: InternalAST;
  } => {
    let settings: Record<string, number | boolean | string> | undefined;
    let simulatedOutput: InternalAST | undefined;
    for (const arg of args) {
      if (arg.type === "NBT") {
        if (settings !== undefined) {
          throw new InvalidArityParseError(
            "Reader call may only contain one settings json object"
          );
        }
        const value = arg.value;
        if (
          typeof value !== "object" ||
          value === null ||
          Array.isArray(value)
        ) {
          throw new InvalidArityParseError(
            "Reader settings must be a json object"
          );
        }
        settings = value as Record<string, number | boolean | string>;
      } else {
        if (simulatedOutput !== undefined) {
          throw new InvalidArityParseError(
            "Reader call may only contain one simulated output"
          );
        }
        simulatedOutput = arg;
      }
    }
    return { settings, simulatedOutput };
  };

  const parseReaderCallArgs = (
    scope: BinderScope
  ): {
    settings?: Record<string, number | boolean | string>;
    simulatedOutput?: InternalAST;
  } => {
    const next = tokens[pos];
    if (!next || !(next.type === "structural" && next.value === "(")) {
      return {};
    }
    pos++; // consume (
    const args: InternalAST[] = [];
    while (
      tokens[pos] &&
      !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
    ) {
      args.push(parseExpression(scope));
      if (
        tokens[pos] &&
        tokens[pos]!.type === "structural" &&
        tokens[pos]!.value === ","
      ) {
        pos++;
      }
    }
    if (!tokens[pos]) {
      throw new StructuralParseError("Expected ')' after reader aspect args");
    }
    pos++; // consume )
    return parseReaderExtraArgs(args);
  };

  const peekDotAspectName = (): string | undefined => {
    const next = tokens[pos];
    if (!next || next.type !== "identifier") return undefined;
    if (next.value === ".") {
      const after = tokens[pos + 1];
      if (
        after &&
        after.type === "identifier" &&
        !after.value.startsWith(".")
      ) {
        return after.value;
      }
      return undefined;
    }
    if (next.value.startsWith(".")) return next.value.slice(1);
    return undefined;
  };

  const consumeDotAspectName = (): string => {
    const next = tokens[pos];
    if (!next || next.type !== "identifier") {
      throw new StructuralParseError("Expected '.' before aspect name");
    }
    if (next.value === ".") {
      pos++;
      const after = tokens[pos];
      if (!after || after.type !== "identifier") {
        throw new StructuralParseError("Expected aspect name after '.'");
      }
      pos++;
      return after.value;
    }
    if (next.value.startsWith(".")) {
      pos++;
      return next.value.slice(1);
    }
    throw new StructuralParseError("Expected '.' before aspect name");
  };

  const tryParseReaderExpression = (
    scope: BinderScope
  ): InternalAST | undefined => {
    const token = tokens[pos];
    if (!token || token.type !== "identifier") return undefined;
    const raw = token.value;
    if (scope.has(raw) || externalScope.has(raw)) return undefined;

    const lower = raw.toLowerCase();

    if (lower === "reader") {
      if (
        !tokens[pos + 1] ||
        !(
          tokens[pos + 1]!.type === "structural" &&
          tokens[pos + 1]!.value === "("
        )
      ) {
        return undefined;
      }
      pos++; // consume reader
      pos++; // consume (
      const args: InternalAST[] = [];
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
      ) {
        args.push(parseExpression(scope));
        if (
          tokens[pos] &&
          tokens[pos]!.type === "structural" &&
          tokens[pos]!.value === ","
        ) {
          pos++;
        }
      }
      if (!tokens[pos])
        throw new StructuralParseError("Expected ')' in reader(...)");
      pos++; // consume )
      if (args.length < 2) {
        throw new InvalidArityParseError(
          "reader(...) requires a reader name and an aspect"
        );
      }
      const readerNameArg = args[0]!;
      const aspectArg = args[1]!;
      if (readerNameArg.type !== "String" || aspectArg.type !== "String") {
        throw new InvalidArityParseError(
          "reader(...) expects reader name and aspect as strings"
        );
      }
      const readerClass = getReaderClassByName(readerNameArg.value);
      if (!readerClass) {
        throw new UnknownIdentifierParseError(
          `Unknown reader: ${readerNameArg.value}`
        );
      }
      const aspectKey = getReaderAspectKey(readerClass, aspectArg.value);
      if (!aspectKey) {
        throw new UnknownIdentifierParseError(
          `Unknown aspect "${aspectArg.value}" for ${readerClass.typeName}`
        );
      }
      const { settings, simulatedOutput } = parseReaderExtraArgs(args.slice(2));
      assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
      return {
        type: "Reader",
        value: {
          reader: readerClass.typeName,
          aspect: aspectKey,
          settings,
          simulatedOutput: simulatedOutput as TypeAST.AST,
        },
      };
    }

    let constructorToken = raw;
    let gluedAspect: string | undefined;
    const readersPrefix = "readers.";
    if (lower.startsWith(readersPrefix)) {
      const rest = lower.slice(readersPrefix.length);
      const dotIdx = rest.indexOf(".");
      if (dotIdx !== -1) {
        constructorToken = raw.slice(0, readersPrefix.length + dotIdx);
        gluedAspect = raw.slice(readersPrefix.length + dotIdx + 1);
      }
    } else {
      const dotIdx = raw.indexOf(".");
      if (dotIdx !== -1) {
        constructorToken = raw.slice(0, dotIdx);
        gluedAspect = raw.slice(dotIdx + 1);
      }
    }
    const readerClass = getReaderConstructorClass(constructorToken);
    if (!readerClass) return undefined;

    if (
      gluedAspect === undefined &&
      tokens[pos + 1] &&
      tokens[pos + 1]!.type === "structural" &&
      tokens[pos + 1]!.value === "("
    ) {
      pos += 2; // consume name + (
      const args: InternalAST[] = [];
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
      ) {
        args.push(parseExpression(scope));
        if (
          tokens[pos] &&
          tokens[pos]!.type === "structural" &&
          tokens[pos]!.value === ","
        ) {
          pos++;
        }
      }
      if (!tokens[pos])
        throw new StructuralParseError("Expected ')' after reader name");
      pos++; // consume )

      if (peekDotAspectName() !== undefined) {
        if (args.length > 1) {
          throw new InvalidArityParseError(
            "Reader constructor takes at most one part id"
          );
        }
        let partId: string | undefined;
        if (args.length === 1) {
          const a = args[0]!;
          if (
            a.type !== "Integer" &&
            a.type !== "Long" &&
            a.type !== "Double" &&
            a.type !== "String"
          ) {
            throw new InvalidArityParseError(
              "Reader part id must be a literal value"
            );
          }
          partId = (a as { value: string }).value;
          if (!/^\d+$/.test(partId)) {
            throw new StructuralParseError(
              `Reader part id must be a non-negative integer, got "${partId}"`
            );
          }
        }
        const aspectName = consumeDotAspectName();
        const aspectKey = getReaderAspectKey(readerClass, aspectName);
        if (!aspectKey) {
          throw new UnknownIdentifierParseError(
            `Unknown aspect "${aspectName}" for ${readerClass.typeName}`
          );
        }
        const { settings, simulatedOutput } = parseReaderCallArgs(scope);
        assertReaderSimulatedOutputType(
          readerClass,
          aspectKey,
          simulatedOutput
        );
        return {
          type: "Reader",
          value: {
            reader: readerClass.typeName,
            partId,
            aspect: aspectKey,
            settings,
            simulatedOutput: simulatedOutput as TypeAST.AST,
          },
        };
      }

      if (args.length < 1) {
        throw new InvalidArityParseError(
          "Reader constructor requires an aspect"
        );
      }
      const aspectArg = args[0]!;
      if (aspectArg.type !== "String") {
        throw new InvalidArityParseError("Reader aspect must be a string");
      }
      const aspectKey = getReaderAspectKey(readerClass, aspectArg.value);
      if (!aspectKey) {
        throw new UnknownIdentifierParseError(
          `Unknown aspect "${aspectArg.value}" for ${readerClass.typeName}`
        );
      }
      const { settings, simulatedOutput } = parseReaderExtraArgs(args.slice(1));
      assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
      return {
        type: "Reader",
        value: {
          reader: readerClass.typeName,
          aspect: aspectKey,
          settings,
          simulatedOutput: simulatedOutput as TypeAST.AST,
        },
      };
    }

    let aspectName = gluedAspect;
    if (aspectName === undefined) aspectName = peekDotAspectName();
    if (aspectName === undefined) return undefined;
    if (gluedAspect !== undefined) {
      pos++; // consume the glued constructor.aspect token
    } else {
      consumeDotAspectName();
    }
    const aspectKey = getReaderAspectKey(readerClass, aspectName);
    if (!aspectKey) {
      throw new UnknownIdentifierParseError(
        `Unknown aspect "${aspectName}" for ${readerClass.typeName}`
      );
    }
    const { settings, simulatedOutput } = parseReaderCallArgs(scope);
    assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
    return {
      type: "Reader",
      value: {
        reader: readerClass.typeName,
        aspect: aspectKey,
        settings,
        simulatedOutput: simulatedOutput as TypeAST.AST,
      },
    };
  };

  function handleCallInternal(
    base: InternalAST,
    args: InternalAST[]
  ): InternalAST {
    if (args.length > 1) {
      for (let i = 0; i < args.length - 1; i++) {
        const arg = args[i]!;
        if (
          arg.type === "Operator" ||
          (arg.type === "Identifier" &&
            operatorRegistry.operatorByNickname(arg.value))
        ) {
          if (!expectsOperatorArgument(base as TypeAST.AST, i)) {
            throw new InvalidArityParseError(`Incorrect arity`);
          }
        }
      }
    }

    if (
      base.type === "Curry" &&
      !base.varName &&
      !isConvenienceExpression(base)
    ) {
      return handleCallInternal(base.base, [...base.args, ...args]);
    }

    let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
    if (base.type === "Operator") {
      const opClass = operatorRegistry[base.opName];
      if (opClass) {
        try {
          op = new opClass(false);
        } catch (e) {}
      }
      if (!op) op = operatorRegistry.find(base.opName);

      const arity = getArity(base as TypeAST.Operator);
      if (args.length > arity && arity !== 0) {
        if (!op || op.serializer !== "integrateddynamics:curry") {
          throw new InvalidArityParseError(
            `Incorrect arity: operator expects ${arity} arguments but received ${args.length}.`
          );
        }
      }
    }

    let isApplyOp = false;
    if (op && (op as any).serializer === "integrateddynamics:curry") {
      isApplyOp = true;
    }

    if (isApplyOp && args.length >= 1) {
      const [newBase, ...rest] = args;
      if (
        newBase!.type === "Operator" ||
        (newBase!.type === "Curry" && !newBase.varName)
      ) {
        const remainingArity = getArity(newBase as any);
        if (rest.length <= remainingArity) {
          return handleCallInternal(newBase!, rest);
        }
      }
    }

    if (base.type === "Identifier") {
      const name = base.value;
      const lowerName = name.toLowerCase();
      if (lowerName === "operator") {
        const opName = (args[0] as { value: string }).value;
        const internalKey = operatorRegistry.operatorByNickname(opName);
        if (!internalKey) {
          throw new UnknownIdentifierParseError(`Unknown operator: ${opName}`);
        }
        return setOperatorSourceName(
          { type: "Operator", opName: internalKey },
          opName
        );
      }
      if (lowerName === "variable") {
        if (args.length !== 1 || args[0]!.type !== "String") {
          throw new InvalidArityParseError(
            "Variable(...) expects exactly one string argument"
          );
        }
        const varName = (args[0] as { value: string }).value;
        if (externalScope.has(varName)) {
          return externalScope.get(varName)! as InternalAST;
        }
        if (isReservedName(varName)) {
          throw new StructuralParseError(reservedNameMessage(varName));
        }
        const aliasKey = shadowedOperatorKey(varName);
        if (aliasKey) {
          if ((opts.operatorShadow ?? "error") === "error") {
            throw new StructuralParseError(
              `Variable("${varName}") overshadows an operator nickname (${operatorLabel(
                aliasKey
              )}). Rename it, or set "Operator shadow" to Warn.`
            );
          }
          opts.warnings?.push(
            `Variable("${varName}") refers to the operator ${operatorLabel(
              aliasKey
            )} because the setting allows overshadowing.`
          );
          return setOperatorSourceName(
            { type: "Operator", opName: aliasKey },
            varName
          ) as InternalAST;
        }
        return variableFromName(varName);
      }
      if (["block", "item", "fluid", "entity"].includes(lowerName)) {
        return buildBlockLikeConstructor(
          lowerName as "block" | "item" | "fluid" | "entity",
          args as TypeAST.AST[]
        ) as InternalAST;
      }

      if (lowerName === "ingredients") {
        return buildIngredientsConstructor(
          args as TypeAST.AST[]
        ) as unknown as InternalAST;
      }

      if (lowerName === "recipe") {
        return buildRecipeConstructor(
          args as TypeAST.AST[]
        ) as unknown as InternalAST;
      }
    }

    if (base.type === "Operator") {
      const name = base.opName;
      if (name === "OPERATOR_PIPE" && args.length === 2) {
        return {
          type: "Pipe",
          op1: args[0] as InternalAST,
          op2: args[1] as InternalAST,
        };
      }
      if (name === "OPERATOR_PIPE2" && args.length === 3) {
        return {
          type: "Pipe2",
          op1: args[0] as InternalAST,
          op2: args[1] as InternalAST,
          op3: args[2] as InternalAST,
        };
      }
      if (name === "OPERATOR_FLIP" && args.length === 1) {
        return { type: "Flip", arg: args[0] as InternalAST };
      }
    }

    if (args.length === 0) return base;
    return {
      type: "Curry",
      base: base as InternalAST,
      args: args as InternalAST[],
    };
  }

  function handleLiteral(
    token: { type: string; value: string },
    scope: BinderScope
  ): InternalAST {
    switch (token.type) {
      case "integer":
      case "long":
      case "double": {
        const numeric = parseNumericLiteralToken(token.value);
        if (numeric === null) {
          throw new StructuralParseError(
            `Invalid numeric literal: ${token.value}`
          );
        }
        return { type: numeric.type, value: numeric.value };
      }
      case "string":
        return { type: "String", value: unquoteString(token.value) };
      case "boolean":
        return { type: "Boolean", value: token.value.toLowerCase() === "true" };
      case "null":
        return { type: "Null" };
      case "nbt":
        return { type: "NBT", value: JSON.parse(token.value) };
      case "identifier": {
        const operandIndex = getCardOperandIndex(token.value);
        if (operandIndex !== null) {
          const operand = operands[operandIndex];
          if (operand === undefined) {
            throw new StructuralParseError(
              `Unknown card operand ${token.value}`
            );
          }
          return parseCardOperand(operand) as InternalAST;
        }
        if (token.value.startsWith("@"))
          return variableFromAt(token.value) as InternalAST;
        const binding = scope.lookup(token.value);
        if (binding) {
          return {
            type: "Param",
            index: binding.index,
            ...(binding.binderDepth > 0
              ? { binderDepth: binding.binderDepth }
              : {}),
            name: token.value,
          };
        }
        if (externalScope.has(token.value))
          return externalScope.get(token.value)! as InternalAST;
        const lower = token.value.toLowerCase();
        if (
          [
            "block",
            "item",
            "fluid",
            "entity",
            "ingredients",
            "recipe",
            "operator",
            "variable",
          ].includes(lower)
        ) {
          return { type: "Identifier", value: token.value };
        }
        const implicitFlip = resolveImplicitFlipOperator(token.value);
        if (implicitFlip) return implicitFlip as InternalAST;
        const internalName = operatorRegistry.operatorByNickname(token.value);
        if (internalName) {
          return setOperatorSourceName(
            { type: "Operator", opName: internalName },
            token.value
          );
        }
        const convenience = convenienceAstFor(token.value);
        if (convenience) return convenience as InternalAST;
        throw new UnknownIdentifierParseError(
          `Unknown identifier: ${token.value}`
        );
      }
      default:
        throw new InternalParseError(`Unexpected token type: ${token.type}`);
    }
  }

  const segments: InternalAST[] = [];
  while (pos < tokens.length) {
    segments.push(parseExpression(new BinderScope()));
    if (
      pos < tokens.length &&
      tokens[pos]!.type === "structural" &&
      tokens[pos]!.value === ";"
    ) {
      pos++;
      continue;
    }
    break;
  }
  if (pos < tokens.length) {
    throw new StructuralParseError(
      `Unexpected trailing tokens in Condensed: ${tokens
        .slice(pos)
        .map((t) => t.value)
        .join(" ")}`
    );
  }

  attachNodeComments(spans, comments);

  const normalized = normalizeMixedLists
    ? normalizeSegments(segments as TypeAST.AST[])
    : (segments as TypeAST.AST[]).map((segment) => ({
        hoisted: [],
        node: segment,
      }));

  if (normalized.length === 1 && normalized[0]!.hoisted.length === 0) {
    if (!allowVarRefs) assertNoTopLevelVarRefs(normalized[0]!.node);
    return normalized[0]!.node;
  }
  return buildNetworkCards(normalized, startVariableId);
};

export interface CondensedOutputOptions {
  joinStatements?: ";" | "\n";
  refStyle?: "varId" | "refs";
  atNameRefs?: boolean;
  useNames?: boolean;
  varIdRefsByName?: Map<string, string>;
}

export const ASTToCondensed = (
  ast: TypeAST.AST,
  isTopLevel = true,
  startVariableId = 0,
  preferSourceNames = false,
  outputOpts: CondensedOutputOptions = {}
): string => {
  const defLastCardIds = getNetworkDefLastCardIds(ast, startVariableId);
  const segmentRefs = getNetworkSegmentRefs(ast);

  const refString = (node: TypeAST.AST): string | null => {
    const lastCardId = defLastCardIds.get(node);
    const refInfo = getRefInfo(node);
    if (lastCardId === undefined && refInfo === undefined) return null;
    const cardId =
      lastCardId !== undefined
        ? String(lastCardId)
        : (node as unknown as { value: string }).value;

    if (outputOpts.refStyle === "refs") {
      const seg = segmentRefs?.get(node);
      if (seg) {
        return seg.segmentIndex === seg.totalSegments - 1
          ? "@calculation"
          : `@${seg.segmentIndex}`;
      }
      if (refInfo) {
        if (refInfo.isFinalCalculation) return "@calculation";
        if (refInfo.segmentIndex !== undefined)
          return `@${refInfo.segmentIndex}`;
      }
    }
    return cardId;
  };

  const paramStack: TypeAST.LambdaParam[][] = [];

  const stringifyParamHeader = (params: TypeAST.LambdaParam[]): string => {
    if (params.length === 1 && params[0]!.type === undefined) {
      return params[0]!.name;
    }
    const entries = params.map((param) =>
      param.type === undefined ? param.name : `${param.name}: ${param.type}`
    );
    return `(${entries.join(", ")})`;
  };

  const stringifyParamReference = (node: TypeAST.Param): string => {
    const depth = node.binderDepth ?? 0;
    const binder = paramStack[paramStack.length - 1 - depth];
    if (!binder) {
      throw new StructuralParseError(
        `Parameter #${node.index + 1} has no enclosing lambda for binder depth ${depth}`
      );
    }
    const param = binder[node.index];
    if (!param) {
      throw new StructuralParseError(
        `Parameter index ${node.index} is out of range for the enclosing lambda`
      );
    }
    if (node.name !== undefined && node.name !== param.name) {
      throw new StructuralParseError(
        `Parameter #${node.index + 1} is named "${node.name}" but its binder calls it "${param.name}"`
      );
    }
    return param.name;
  };

  const stringify = (node: TypeAST.AST, topLevel = false): string => {
    if (outputOpts.useNames) {
      const refName = getRefName(node);
      if (refName !== undefined && !/^@\d+$/.test(refName)) {
        const name = refName.slice(1);
        return isVarNameExpandedSafe(name)
          ? refName
          : `Variable(${JSON.stringify(name)})`;
      }
    }
    const ref = outputOpts.useNames ? null : refString(node);
    if (ref !== null && !topLevel) {
      return ref;
    }

    if (!topLevel && node.varName && outputOpts.varIdRefsByName) {
      const varId = outputOpts.varIdRefsByName.get(node.varName);
      if (varId !== undefined) return varId;
    }

    if (node.varName && !topLevel) {
      const formatted = formatVarName(node.varName);
      if (
        outputOpts.atNameRefs &&
        isVarNameExpandedSafe(node.varName) &&
        !formatted.startsWith("@")
      ) {
        return `@${formatted}`;
      }
      return formatted;
    }

    let result = "UNKNOWN";

    switch (node.type) {
      case "Integer":
        result = node.value;
        break;
      case "Long":
        result = node.value + "l";
        break;
      case "Double": {
        let val = node.value;
        if (!val.includes(".") && !/[dD]$/.test(val)) {
          val += ".0";
        }
        result = val;
        break;
      }
      case "String":
        result = JSON.stringify(node.value);
        break;
      case "Boolean":
        result = node.value ? "true" : "false";
        break;
      case "Null":
        result = "null";
        break;
      case "Variable": {
        const refName = node.label ?? node.id;
        if (refName === undefined) {
          throw new StructuralParseError(
            "A Variable node requires an id or a label"
          );
        }
        if (node.label === undefined) {
          result = `@${node.id}`;
          break;
        }
        const varId = outputOpts.varIdRefsByName?.get(node.label);
        if (varId !== undefined) {
          result = varId;
          break;
        }
        result = isVarNameExpandedSafe(refName)
          ? `@${refName}`
          : `Variable(${JSON.stringify(refName)})`;
        break;
      }
      case "Param":
        result = stringifyParamReference(node);
        break;
      case "Lambda": {
        paramStack.push(node.params);
        let body: string;
        try {
          body = stringify(node.body, false);
        } finally {
          paramStack.pop();
        }
        result = `${stringifyParamHeader(node.params)} => ${body}`;
        break;
      }
      case "List":
        result = `[${node.value.map((entry) => stringify(entry, false)).join(", ")}]`;
        break;
      case "NBT":
        result = JSON.stringify(node.value);
        break;

      case "Block":
      case "Item":
      case "Fluid":
      case "Entity": {
        if (node.type === "Entity" && typeof node.value === "string") {
          result = `Entity(${JSON.stringify(node.value)})`;
          break;
        }
        const val = node.value as jsonObject;
        const args = [JSON.stringify(val["id"])];
        if (node.type === "Block" && val["size"] !== undefined) {
          args.push(val["size"] as string);
        }
        if (node.type === "Item" && val["size"] !== undefined) {
          args.push(val["size"] as string);
        }
        if (node.type === "Fluid" && val["amount"] !== undefined) {
          args.push(val["amount"] as string);
        }
        if (node.type === "Block" && val["properties"] !== undefined) {
          args.push(JSON.stringify(val["properties"]));
        } else if (val["tag"] !== undefined) {
          args.push(JSON.stringify(val["tag"]));
        }
        result = `${node.type}(${args.join(", ")})`;
        break;
      }

      case "Ingredients":
        result = ingredientsToText(node, (entry) => stringify(entry, false));
        break;

      case "Recipe":
        result = recipeToText(node, (entry) => stringify(entry, false));
        break;

      case "Materialize":
        result = `Materialize(${stringify(node.value, false)})`;
        break;

      case "Dynamic":
        result = `Dynamic(${stringify(node.value, false)})`;
        break;

      case "Static":
        result = `Static(${stringify(node.value, false)})`;
        break;

      case "Display":
      case "Card":
        result = stringify(node.value, false);
        break;

      case "VarStore":
      case "DisplayPanel":
      case "Writer":
      case "Exporter":
      case "Importer":
        return sourceToNetworkCards(node)
          .definitions.map((def) => {
            const oldVarName = def.node.varName;
            delete def.node.varName;
            const statement = stringify(def.node, true);
            if (oldVarName) def.node.varName = oldVarName;
            return statement;
          })
          .join(outputOpts.joinStatements === "\n" ? "\n" : "; ");

      case "Reader": {
        const val = node.value;
        const partIdStr =
          val.partId !== undefined
            ? /^-?\d+(\.\d+)?$/.test(val.partId)
              ? val.partId
              : JSON.stringify(val.partId)
            : "";
        const constructor = `${val.reader}${partIdStr ? `(${partIdStr})` : ""}`;
        const args: string[] = [];
        if (val.settings !== undefined) {
          args.push(JSON.stringify(val.settings));
        }
        if (val.simulatedOutput !== undefined) {
          args.push(stringify(val.simulatedOutput, false));
        }
        const readerClass = getReaderClassByTypeName(val.reader);
        const aspectName = readerClass
          ? getReaderAspectDisplayName(readerClass, val.aspect)
          : val.aspect;
        result = `${constructor}.${aspectName}${
          args.length > 0 ? `(${args.join(", ")})` : ""
        }`;
        break;
      }

      case "Operator": {
        const sourceName = preferSourceNames
          ? getOperatorSourceName(node)
          : undefined;
        result = sourceName ?? getOpName(node.opName);
        break;
      }

      case "Curry": {
        const flattened = flattenAnonymousBaseOperatorApplication(node);
        if (flattened?.fullyApplied) {
          const base = stringify(flattened.operator, false);
          const argsStr = flattened.args
            .map((a) => stringify(a, false))
            .join(", ");
          result = `${base}(${argsStr})`;
        } else {
          let currentBase = stringify(node.base, false);
          let i = 0;
          const n = node.args.length;
          if (n === 0) {
            result = currentBase;
          } else {
            while (i < n) {
              const take = Math.min(n - i, 3);
              const argsChunk = node.args
                .slice(i, i + take)
                .map((a) => stringify(a, false))
                .join(", ");
              const applyName = take === 1 ? "apply" : `apply${take}`;
              currentBase = `${applyName}(${currentBase}, ${argsChunk})`;
              i += take;
            }
            result = currentBase;
          }
        }
        break;
      }

      case "Pipe":
        result = `${getOpName("OPERATOR_PIPE")}(${stringify(node.op1, false)}, ${stringify(
          node.op2,
          false
        )})`;
        break;

      case "Pipe2":
        result = `${getOpName("OPERATOR_PIPE2")}(${stringify(node.op1, false)}, ${stringify(
          node.op2,
          false
        )}, ${stringify(node.op3, false)})`;
        break;

      case "Flip":
        result = `${getOpName("OPERATOR_FLIP")}(${stringify(node.arg, false)})`;
        break;

      case "NetworkCards":
        return node.definitions
          .map((def) => {
            const oldVarName = def.node.varName;
            delete def.node.varName;
            const statement = stringify(def.node, true);
            if (oldVarName) def.node.varName = oldVarName;
            return statement;
          })
          .join(outputOpts.joinStatements === "\n" ? "\n" : "; ");
    }

    if (node.varName && topLevel) {
      return `${formatVarName(node.varName)} = ${result}`;
    }
    return result;
  };

  return stringify(ast, isTopLevel);
};
