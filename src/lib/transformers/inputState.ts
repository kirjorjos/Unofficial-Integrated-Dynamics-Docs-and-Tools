import {
  formatVarName,
  getNicknameCharacterRegex,
  getNicknameRegex,
  getOperatorSourceName,
  setOperatorSourceName,
} from "lib/transformers/helpers";
import {
  InvalidEscapeParseError,
  StructuralParseError,
} from "lib/transformers/parseErrors";
import {
  ASTToExpandedWithSignatureOptions,
  getExpandedVarName,
  resetExpandedVarCounter,
  type ExpandedSignatureOptions,
} from "lib/transformers/Expanded";

type char = string;
type QuoteDelimiter = '"' | "'" | '"""';

interface State {
  quote: QuoteDelimiter | null;
  isEscaped: boolean;
  inJSON: number;
}

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
  if (possible.includes("integer") && /^-?\d+$/.test(value)) {
    const num = BigInt(value);
    if (num >= BigInt(-2147483648) && num <= BigInt(2147483647))
      return "integer";
    return "long";
  }
  if (possible.includes("long") && /^-?\d+[lL]$/.test(value)) return "long";
  if (possible.includes("double")) {
    if (/^-?(?:\d+\.\d+[dD]?|\d+\.|\d+[dD])$/.test(value)) return "double";
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
  gaps: string[];
  trailingGap: string;
}

export const tokenizeWithGaps = (condensed: string): CondensedTokenStream => {
  const tokens: { type: string; value: string }[] = [];
  const gaps: string[] = [];
  let pendingGap = "";
  let currentToken = "";
  let state: State = { quote: null, isEscaped: false, inJSON: 0 };
  let possibleTypes = Object.keys(charTokenCheckers);

  const pushToken = (type: string, value: string): void => {
    gaps.push(pendingGap);
    pendingGap = "";
    tokens.push({ type, value });
  };

  for (let i = 0; i < condensed.length; i++) {
    const char = condensed[i]!;

    if (
      state.quote === null &&
      state.inJSON === 0 &&
      char === "=" &&
      condensed[i + 1] === ">"
    ) {
      if (currentToken) {
        pushToken(resolveType(currentToken, possibleTypes), currentToken);
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      pushToken("structural", "=>");
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
        pushToken(resolveType(currentToken, possibleTypes), currentToken);
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      pushToken("structural", "->");
      i++; // Skip ">"
      continue;
    }

    const isStructural =
      state.quote === null && state.inJSON === 0 && /^[()[\],;\\]$/.test(char);
    const isWhitespace =
      state.quote === null && state.inJSON === 0 && /^\s$/.test(char);

    if (isStructural || isWhitespace) {
      if (currentToken) {
        pushToken(resolveType(currentToken, possibleTypes), currentToken);
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      if (isStructural) {
        pushToken("structural", char);
      } else {
        pendingGap += char;
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
        currentToken += '"""';
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
        state.quote = '"""';
        state.isEscaped = false;
        currentToken += '"""';
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
        pushToken(resolveType(currentToken, possibleTypes), currentToken);
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
    pushToken(resolveType(currentToken, possibleTypes), currentToken);
  }

  return { tokens, gaps, trailingGap: pendingGap };
};

export type CondensedOverlay =
  | {
      mode: 0;
      gapOverrides: Array<[index: number, gap: string]>;
      hasTrailingGap: boolean;
      trailingGap: string;
      spellingOverrides: Array<[index: number, value: string]>;
    }
  | { mode: 1; rawText: string };

const varUintBits = (value: number): number => {
  let v = value;
  let groups = 1;
  while (v >= 128) {
    groups++;
    v = Math.floor(v / 128);
  }
  return groups * 8;
};

const stringBits = (s: string): number => {
  let ascii = true;
  for (const c of s) {
    if (c.charCodeAt(0) > 127) {
      ascii = false;
      break;
    }
  }
  const length = ascii ? s.length : new TextEncoder().encode(s).length;
  return 1 + varUintBits(length) + length * (ascii ? 7 : 8);
};

const overlayBits = (
  overlay: Extract<CondensedOverlay, { mode: 0 }>
): number => {
  let bits = varUintBits(overlay.gapOverrides.length);
  for (const [index, gap] of overlay.gapOverrides) {
    bits += varUintBits(index) + stringBits(gap);
  }
  bits += 1; // has-trailing-gap
  if (overlay.hasTrailingGap) {
    bits += stringBits(overlay.trailingGap);
  }
  bits += varUintBits(overlay.spellingOverrides.length);
  for (const [index, value] of overlay.spellingOverrides) {
    bits += varUintBits(index) + stringBits(value);
  }
  return bits;
};

export const computeCondensedOverlay = (
  rawInput: string,
  canonicalInput: string
): CondensedOverlay => {
  const raw = tokenizeWithGaps(rawInput);
  const canon = tokenizeWithGaps(canonicalInput);

  if (raw.tokens.length !== canon.tokens.length) {
    return { mode: 1, rawText: rawInput };
  }
  for (let i = 0; i < raw.tokens.length; i++) {
    if (raw.tokens[i]!.type !== canon.tokens[i]!.type) {
      return { mode: 1, rawText: rawInput };
    }
  }

  const gapOverrides: Array<[number, string]> = [];
  const spellingOverrides: Array<[number, string]> = [];
  for (let i = 0; i < raw.tokens.length; i++) {
    if (raw.gaps[i] !== canon.gaps[i]) gapOverrides.push([i, raw.gaps[i]!]);
    if (raw.tokens[i]!.value !== canon.tokens[i]!.value) {
      spellingOverrides.push([i, raw.tokens[i]!.value]);
    }
  }

  const overlay: CondensedOverlay = {
    mode: 0,
    gapOverrides,
    spellingOverrides,
    hasTrailingGap: raw.trailingGap !== canon.trailingGap,
    trailingGap: raw.trailingGap,
  };

  if (overlayBits(overlay) >= stringBits(rawInput)) {
    return { mode: 1, rawText: rawInput };
  }
  return overlay;
};

export const applyCondensedOverlay = (
  canonicalInput: string,
  overlay: CondensedOverlay
): string => {
  if (overlay.mode === 1) return overlay.rawText;

  const canon = tokenizeWithGaps(canonicalInput);
  const gaps = new Map(overlay.gapOverrides);
  const spellings = new Map(overlay.spellingOverrides);

  let out = gaps.has(0) ? gaps.get(0)! : (canon.gaps[0] ?? "");
  for (let i = 0; i < canon.tokens.length; i++) {
    out += spellings.has(i) ? spellings.get(i)! : canon.tokens[i]!.value;
    if (i < canon.tokens.length - 1) {
      out += gaps.has(i + 1) ? gaps.get(i + 1)! : (canon.gaps[i + 1] ?? "");
    }
  }
  if (overlay.hasTrailingGap) out += overlay.trailingGap;
  return out;
};

export type ExpandedOverlayItem =
  | {
      kind: 0;
      name: string;
      nameRef?: number;
      head: string | null;
      tailMode: 0;
      rhsOverlay: Extract<CondensedOverlay, { mode: 0 }>;
      suffix: string;
    }
  | {
      kind: 0;
      name: string;
      nameRef?: number;
      head: string | null;
      tailMode: 1;
      tail: string;
    }
  | { kind: 1; text: string } // comment
  | { kind: 2; text: string } // signature-line (verbatim)
  | { kind: 3; text: string } // blank/whitespace-only line (exact bytes, no-trim)
  | { kind: 4; text: string } // bare-expr-line
  | { kind: 5; name: string; nameRef?: number } // signature-line that equals the canonical re-render
  | {
      kind: 6;
      name: string;
      nameRef?: number;
      sigOverlay: Extract<CondensedOverlay, { mode: 0 }>; // sparse token diff vs. canonical signature
    }
  | {
      kind: 7;
      name: string;
      nameRef?: number;
      head: string | null;
      tailMode: 0;
      rhsOverlay: Extract<CondensedOverlay, { mode: 0 }>;
      suffix: string;
    }
  | {
      kind: 7;
      name: string;
      nameRef?: number;
      head: string | null;
      tailMode: 1;
      tail: string;
    };

export type ExpandedAnalysisItem =
  | { kind: 0; name: string; head: string | null; tailMode: 1; tail: string }
  | { kind: 1; text: string }
  | { kind: 2; text: string }
  | { kind: 3; text: string }
  | { kind: 4; text: string };

export type ExpandedOverlay = {
  items: ExpandedOverlayItem[];
  sig?: ExpandedSignatureOptions;
  modes?: { name: string; nameRef?: number; opts: ExpandedSignatureOptions }[];
  sigSuffixes?: Map<string, string>;
};

export type ExpandedOverlayResult =
  | { mode: 0; overlay: ExpandedOverlay }
  | { mode: 1; rawText: string };

const computeStringRegionsExpanded = (line: string): boolean[] => {
  const inside = new Array<boolean>(line.length).fill(false);
  let quote: QuoteDelimiter | null = null;
  for (let i = 0; i < line.length; i++) {
    const char = line[i]!;
    if (quote !== null) {
      inside[i] = true;
      if (quote === '"') {
        if (char === '"' && line[i - 1] !== "\\") quote = null;
      } else if (quote === "'") {
        if (char === "'" && line[i - 1] !== "\\") quote = null;
      } else if (
        char === '"' &&
        line[i + 1] === '"' &&
        line[i + 2] === '"' &&
        line[i - 1] !== "\\"
      ) {
        quote = null;
        inside[i + 1] = true;
        inside[i + 2] = true;
        i += 2;
      }
    } else if (char === '"' && line[i + 1] === '"' && line[i + 2] === '"') {
      quote = '"""';
      inside[i] = true;
      inside[i + 1] = true;
      inside[i + 2] = true;
      i += 2;
    } else if (char === '"') {
      quote = '"';
    } else if (char === "'") {
      quote = "'";
    }
  }
  return inside;
};

const topologicalOccurrence = (
  line: string,
  ch: string,
  disallowNext: (next: string | undefined) => boolean
): number => {
  const inside = computeStringRegionsExpanded(line);
  let inNBT = 0;
  for (let j = 0; j < line.length; j++) {
    if (inside[j]) continue;
    const c = line[j]!;
    if (c === "{") inNBT++;
    if (c === "}") inNBT--;
    if (inNBT === 0 && c === ch && disallowNext(line[j + 1])) return j;
  }
  return -1;
};

const topLevelAssignIndex = (line: string): number =>
  topologicalOccurrence(line, "=", (next) => next !== ">");

const expandHeadName = (head: string): string => {
  let lhs = head.replace(/\s*=$/, ""); // drop trailing '='
  const colonIdx = topologicalOccurrence(lhs, ":", (next) => next === ":");
  if (colonIdx !== -1) lhs = lhs.slice(0, colonIdx);
  lhs = lhs.trim();
  const wrapper = lhs.match(/^Variable\s*\(\s*(.*?)\s*\)$/i);
  if (wrapper) {
    const inner = wrapper[1]!.trim();
    if (
      inner.length >= 2 &&
      ((inner.startsWith('"') && inner.endsWith('"')) ||
        (inner.startsWith("'") && inner.endsWith("'")))
    ) {
      return inner.slice(1, -1); // unquote
    }
  }
  return lhs.split(/\s+/)[0] || "";
};

export const analyzeExpandedLines = (
  expanded: string
): ExpandedAnalysisItem[] => {
  const rawLines = expanded.split("\n");
  const items: ExpandedAnalysisItem[] = [];

  for (const line of rawLines) {
    if (line.trim() === "") {
      items.push({ kind: 3, text: line });
      continue;
    }

    let commentIdx = -1;
    const inside = computeStringRegionsExpanded(line);
    for (let i = 1; i < line.length; i++) {
      if (
        !inside[i] &&
        !inside[i - 1] &&
        line[i - 1] === "-" &&
        line[i] === "-"
      ) {
        commentIdx = i - 1;
        break;
      }
    }
    const prefix = commentIdx === -1 ? line : line.slice(0, commentIdx);

    if (prefix.trim() === "") {
      items.push({ kind: 1, text: line });
      continue;
    }

    const assignIdx = topLevelAssignIndex(line);
    if (assignIdx !== -1) {
      const head = line.slice(0, assignIdx + 1);
      const tail = line.slice(assignIdx + 1);
      const name = expandHeadName(head);
      items.push({ kind: 0, name, head, tailMode: 1, tail });
      continue;
    }

    const hasColon =
      topologicalOccurrence(line, ":", (next) => next === ":") !== -1;
    if (hasColon) {
      items.push({ kind: 2, text: line }); // signature-line
      continue;
    }

    items.push({ kind: 4, text: line }); // bare-expr-line
  }

  return items;
};

const parseExpandedDefs = (canonicalInput: string): Map<string, string> => {
  const defs = new Map<string, string>();
  for (const item of analyzeExpandedLines(canonicalInput)) {
    if (item.kind === 0) defs.set(item.name, item.tail);
  }
  return defs;
};

const splitExpandedTail = (tail: string): { rhs: string; suffix: string } => {
  let commentIdx = -1;
  const inside = computeStringRegionsExpanded(tail);
  for (let i = 1; i < tail.length; i++) {
    if (
      !inside[i] &&
      !inside[i - 1] &&
      tail[i - 1] === "-" &&
      tail[i] === "-"
    ) {
      commentIdx = i - 1;
      break;
    }
  }
  const region = commentIdx === -1 ? tail : tail.slice(0, commentIdx);
  const rhs = region.trimEnd();
  return { rhs, suffix: tail.slice(rhs.length) };
};

const elideExpandedHead = (item: ExpandedOverlayItem): ExpandedOverlayItem => {
  if (item.kind !== 0 && item.kind !== 7) return item;
  return item.head === formatVarName(item.name) + " ="
    ? { ...item, head: null }
    : item;
};

const expandedSigHeaderBits = (sig: ExpandedSignatureOptions): number => {
  let bits = 1; // sig-marker
  if (sig.depth === null) {
    bits += 1; // unlimited-flat
  } else {
    bits += 1; // unlimited-flat = 0
    bits += varUintBits(sig.depth);
  }
  bits += 1; // labels
  bits += 1; // arrow
  bits += 1; // hide-operator-wrappers
  return bits;
};

const namedItemNameBits = (item: ExpandedOverlayItem): number => {
  const ref = (item as { nameRef?: number }).nameRef;
  if (ref !== undefined) return 1 + varUintBits(ref);
  return 1 + stringBits((item as { name: string }).name);
};

const expandedOverlayBits = (overlay: ExpandedOverlay): number => {
  let bits = overlay.sig ? expandedSigHeaderBits(overlay.sig) : 1; // sig-marker = 0
  bits += varUintBits(overlay.items.length);
  for (const item of overlay.items) {
    bits += 3; // kind
    if (item.kind === 0 || item.kind === 7) {
      bits += namedItemNameBits(item);
      bits += 1; // has-head
      if (item.head !== null) bits += stringBits(item.head);
      bits += 1; // tail-mode
      if (item.tailMode === 1) {
        bits += stringBits(item.tail);
      } else {
        bits += overlayBits(item.rhsOverlay);
        bits += 1; // rhs-suffix flag
        if (item.suffix !== "") bits += stringBits(item.suffix);
      }
    } else if (item.kind === 5) {
      bits += namedItemNameBits(item);
    } else if (item.kind === 6) {
      bits += namedItemNameBits(item);
      bits += overlayBits(item.sigOverlay);
    } else {
      bits += stringBits(item.text);
    }
  }
  // Trailing per-name signature suffix block (see ExpandedOverlay.sigSuffixes).
  if (overlay.sigSuffixes && overlay.sigSuffixes.size > 0) {
    bits += varUintBits(overlay.sigSuffixes.size);
    for (const [name, suffix] of overlay.sigSuffixes) {
      bits += stringBits(name) + stringBits(suffix);
    }
  }
  return bits;
};

const signatureLineName = (line: string): string =>
  line.slice(0, line.indexOf("::")).trim();

const splitSigLineComment = (
  line: string
): { typePart: string; suffix: string } => {
  let commentIdx = -1;
  const inside = computeStringRegionsExpanded(line);
  for (let i = 1; i < line.length; i++) {
    if (
      !inside[i] &&
      !inside[i - 1] &&
      line[i - 1] === "-" &&
      line[i] === "-"
    ) {
      commentIdx = i - 1;
      break;
    }
  }
  const typePart = (
    commentIdx === -1 ? line : line.slice(0, commentIdx)
  ).trimEnd();
  return { typePart, suffix: line.slice(typePart.length) };
};

export const tokenizeSignatureType = (line: string): CondensedTokenStream => {
  const tokens: { type: string; value: string }[] = [];
  const gaps: string[] = [];
  let pendingGap = "";
  let current = "";
  let i = 0;

  const isIdChar = (c: string): boolean => /[A-Za-z0-9_.]/.test(c);
  const pushToken = (value: string, type?: string): void => {
    gaps.push(pendingGap);
    pendingGap = "";
    tokens.push({
      type: type ?? (isIdChar(value[0]!) ? "id" : "sym"),
      value,
    });
  };

  while (i < line.length) {
    const char = line[i]!;
    if (/\s/.test(char)) {
      if (current) {
        pushToken(current);
        current = "";
      }
      pendingGap += char;
      i++;
      continue;
    }
    if (line.startsWith("::", i)) {
      if (current) {
        pushToken(current);
        current = "";
      }
      pushToken("::");
      i += 2;
      continue;
    }
    if (line.startsWith("->", i)) {
      if (current) {
        pushToken(current);
        current = "";
      }
      pushToken("->");
      i += 2;
      continue;
    }
    if (char === "→") {
      if (current) {
        pushToken(current);
        current = "";
      }
      pushToken("→");
      i++;
      continue;
    }
    if (/[()\[\]{}<>,;:=]/.test(char)) {
      if (current) {
        pushToken(current);
        current = "";
      }
      pushToken(char, "sym");
      i++;
      continue;
    }
    if (isIdChar(char)) {
      current += char;
      i++;
      continue;
    }
    if (current) {
      pushToken(current);
      current = "";
    }
    pushToken(char);
    i++;
  }
  if (current) pushToken(current);
  return { tokens, gaps, trailingGap: pendingGap };
};

export const computeSignatureDiff = (
  raw: string,
  canon: string
): Extract<CondensedOverlay, { mode: 0 }> | null => {
  const r = tokenizeSignatureType(raw);
  const c = tokenizeSignatureType(canon);
  if (r.tokens.length !== c.tokens.length) return null;
  for (let i = 0; i < r.tokens.length; i++) {
    if (r.tokens[i]!.type !== c.tokens[i]!.type) return null;
  }

  const gapOverrides: Array<[number, string]> = [];
  const spellingOverrides: Array<[number, string]> = [];
  for (let i = 0; i < r.tokens.length; i++) {
    if (r.gaps[i] !== c.gaps[i]) gapOverrides.push([i, r.gaps[i]!]);
    if (r.tokens[i]!.value !== c.tokens[i]!.value) {
      spellingOverrides.push([i, r.tokens[i]!.value]);
    }
  }

  const overlay: Extract<CondensedOverlay, { mode: 0 }> = {
    mode: 0,
    gapOverrides,
    spellingOverrides,
    hasTrailingGap: r.trailingGap !== c.trailingGap,
    trailingGap: r.trailingGap,
  };
  if (overlayBits(overlay) >= stringBits(raw)) return null;
  return overlay;
};

export const applySignatureDiff = (
  canon: string,
  overlay: Extract<CondensedOverlay, { mode: 0 }>
): string => {
  const c = tokenizeSignatureType(canon);
  const gaps = new Map(overlay.gapOverrides);
  const spellings = new Map(overlay.spellingOverrides);
  let out = gaps.has(0) ? gaps.get(0)! : (c.gaps[0] ?? "");
  for (let i = 0; i < c.tokens.length; i++) {
    out += spellings.has(i) ? spellings.get(i)! : c.tokens[i]!.value;
    if (i < c.tokens.length - 1) {
      out += gaps.has(i + 1) ? gaps.get(i + 1)! : (c.gaps[i + 1] ?? "");
    }
  }
  if (overlay.hasTrailingGap) out += overlay.trailingGap;
  return out;
};

const canonicalSignatureLines = (expanded: string): Map<string, string> => {
  const map = new Map<string, string>();
  for (const it of analyzeExpandedLines(expanded)) {
    if (it.kind === 2) map.set(signatureLineName(it.text), it.text);
  }
  return map;
};

export const computeExpandedOverlay = (
  rawInput: string,
  canonicalInput: string,
  sigOpts?: ExpandedSignatureOptions
): ExpandedOverlayResult => {
  const defs = parseExpandedDefs(canonicalInput);
  const canonNameOrder = [...defs.keys()];
  const nameRefIndex = new Map<string, number>();
  canonNameOrder.forEach((n, i) => nameRefIndex.set(n, i));
  const canonSigs = sigOpts
    ? canonicalSignatureLines(canonicalInput)
    : undefined;
  const sigSuffixes = new Map<string, string>();

  const items = analyzeExpandedLines(rawInput).map(
    (item): ExpandedOverlayItem => {
      if (item.kind === 2 && canonSigs) {
        const name = signatureLineName(item.text);
        const canon = canonSigs.get(name);
        const { typePart, suffix } = splitSigLineComment(item.text);
        const suffixCost = suffix === "" ? 0 : stringBits(suffix);
        if (canon === typePart) {
          if (suffix !== "") sigSuffixes.set(name, suffix);
          return { kind: 5, name };
        }
        if (canon !== undefined) {
          const sigOverlay = computeSignatureDiff(typePart, canon);
          if (
            sigOverlay &&
            overlayBits(sigOverlay) + suffixCost < stringBits(item.text)
          ) {
            if (suffix !== "") sigSuffixes.set(name, suffix);
            return { kind: 6, name, sigOverlay };
          }
        }
        return item;
      }
      if (item.kind !== 0) return item;
      const rhsCanon = defs.get(item.name);
      if (rhsCanon === undefined) return item; // no canonical anchor → verbatim

      const { rhs, suffix } = splitExpandedTail(item.tail);
      const rhsOverlay = computeCondensedOverlay(rhs, rhsCanon);
      if (rhsOverlay.mode === 1) return item; // RHS surface diverges → verbatim

      const mode0Bits =
        overlayBits(rhsOverlay) + 1 + (suffix === "" ? 0 : stringBits(suffix));
      if (mode0Bits >= stringBits(item.tail)) return item; // verbatim smaller

      return {
        kind: 0,
        name: item.name,
        head: item.head,
        tailMode: 0,
        rhsOverlay,
        suffix,
      };
    }
  );

  const matchedSigs =
    sigOpts &&
    items.some((item) => item.kind === 5 || item.kind === 6 || item.kind === 7)
      ? sigOpts
      : undefined;
  const indexed: ExpandedOverlayItem[] = items
    .map(elideExpandedHead)
    .reduce(mergeSigRefIntoDef, [] as ExpandedOverlayItem[]);
  for (const it of indexed) {
    if (
      (it.kind === 0 || it.kind === 5 || it.kind === 6 || it.kind === 7) &&
      nameRefIndex.has(it.name)
    ) {
      (it as { nameRef?: number }).nameRef = nameRefIndex.get(it.name)!;
    }
  }
  const overlay: ExpandedOverlay = {
    items: indexed,
    ...(matchedSigs ? { sig: matchedSigs } : {}),
    ...(sigSuffixes.size > 0 ? { sigSuffixes } : {}),
  };
  if (expandedOverlayBits(overlay) >= stringBits(rawInput)) {
    return { mode: 1, rawText: rawInput };
  }
  return { mode: 0, overlay };
};

const bestModeForSigLine = (
  name: string,
  rawLine: string,
  ast: TypeAST.AST,
  sigOpts: ExpandedSignatureOptions
): ExpandedSignatureOptions | undefined => {
  const base = sigOpts;
  const candidates: ExpandedSignatureOptions[] = [];
  const seen = new Set<string>();
  const push = (o: ExpandedSignatureOptions) => {
    const key = [
      o.depth ?? "u",
      o.labels,
      o.arrow,
      o.hideOperatorWrappers,
      Boolean(o.forceUnwrapOperators),
      Boolean(o.noReturnParens),
      Boolean(o.resolveAnys),
      Boolean(o.parenFromFns),
    ].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(o);
  };
  const depths: (number | null)[] = [base.depth, 0];
  const hides: boolean[] = [base.hideOperatorWrappers, true];
  for (const depth of depths) {
    for (const hide of hides) {
      for (const force of hide ? [false, true] : [false]) {
        for (const noParens of [false, true]) {
          for (const resolved of [false, true]) {
            for (const parenFns of [false, true]) {
              push({
                depth,
                labels: base.labels,
                arrow: base.arrow,
                hideOperatorWrappers: hide,
                ...(force ? { forceUnwrapOperators: true } : {}),
                ...(noParens ? { noReturnParens: true } : {}),
                ...(resolved ? { resolveAnys: true } : {}),
                ...(parenFns ? { parenFromFns: true } : {}),
              });
            }
          }
        }
      }
    }
  }

  let bestSparse:
    | {
        diff: Extract<CondensedOverlay, { mode: 0 }>;
        opts: ExpandedSignatureOptions;
      }
    | undefined;
  for (const cand of candidates) {
    const withOverride = ASTToExpandedWithSignatureOptions(
      ast,
      "Condensed",
      sigOpts,
      true,
      new Map([[name, cand]])
    );
    const anchor = canonicalSignatureLines(withOverride).get(name);
    if (anchor === undefined) continue;
    if (anchor === rawLine) return cand; // byte-match is the cheapest outcome
    const diff = computeSignatureDiff(rawLine, anchor);
    if (
      diff &&
      (!bestSparse || overlayBits(diff) < overlayBits(bestSparse.diff))
    ) {
      bestSparse = { diff, opts: cand };
    }
  }
  return bestSparse?.opts;
};

export const discoverSignatureRestoreModes = (
  rawInput: string,
  ast: TypeAST.AST,
  sigOpts: ExpandedSignatureOptions
): { name: string; nameRef?: number; opts: ExpandedSignatureOptions }[] => {
  const baseCanon = ASTToExpandedWithSignatureOptions(
    ast,
    "Condensed",
    sigOpts,
    true
  );
  const baseSigs = canonicalSignatureLines(baseCanon);
  const canonNameOrder = [...parseExpandedDefs(baseCanon).keys()];
  const nameRefIndex = new Map<string, number>();
  canonNameOrder.forEach((n, i) => nameRefIndex.set(n, i));

  const divergent: { name: string; raw: string }[] = [];
  const seenNames = new Set<string>();
  for (const it of analyzeExpandedLines(rawInput)) {
    if (it.kind !== 2) continue;
    const name = signatureLineName(it.text);
    if (seenNames.has(name)) continue;
    seenNames.add(name);
    const canon = baseSigs.get(name);
    const { typePart } = splitSigLineComment(it.text);
    if (canon === typePart) continue; // already folds (kind 5/7 + suffix)
    if (canon !== undefined && computeSignatureDiff(typePart, canon) !== null) {
      continue; // already sparse-diffs (kind 6 + suffix)
    }
    divergent.push({ name, raw: typePart });
  }
  if (divergent.length === 0) return [];

  const modes: {
    name: string;
    nameRef?: number;
    opts: ExpandedSignatureOptions;
  }[] = [];
  for (const { name, raw } of divergent) {
    const opts = bestModeForSigLine(name, raw, ast, sigOpts);
    if (opts) {
      modes.push({
        name,
        ...(nameRefIndex.has(name) ? { nameRef: nameRefIndex.get(name)! } : {}),
        opts,
      });
    }
  }
  return modes;
};

export const resolveExpandedOverlayNames = (
  overlay: ExpandedOverlay,
  canonicalInput: string
): ExpandedOverlay => {
  const modes = overlay.modes;
  if (!modes || !modes.some((m) => m.nameRef !== undefined)) return overlay;
  const order = [...parseExpandedDefs(canonicalInput).keys()];
  return {
    ...overlay,
    modes: modes.map((m) => {
      if (m.nameRef === undefined) return m;
      const resolved = order[m.nameRef];
      return resolved === undefined ? m : { ...m, name: resolved };
    }),
  };
};

const mergeSigRefIntoDef = (
  acc: ExpandedOverlayItem[],
  item: ExpandedOverlayItem
): ExpandedOverlayItem[] => {
  const prev = acc[acc.length - 1];
  if (prev && prev.kind === 5 && item.kind === 0 && prev.name === item.name) {
    acc[acc.length - 1] = { ...item, kind: 7 } as ExpandedOverlayItem;
    return acc;
  }
  acc.push(item);
  return acc;
};

export const applyExpandedOverlay = (
  canonicalInput: string,
  overlay: ExpandedOverlay
): string => {
  const defs = parseExpandedDefs(canonicalInput);
  const canonNameOrder = [...defs.keys()];
  const canonSigs = overlay.sig
    ? canonicalSignatureLines(canonicalInput)
    : undefined;
  const lines: string[] = [];
  for (const item of overlay.items) {
    const named = item as { name: string; nameRef?: number };
    const name = resolveExpandedItemName(named, canonNameOrder);
    const suffix = overlay.sigSuffixes?.get(name) ?? "";
    if (item.kind === 5 || item.kind === 6) {
      if (!canonSigs) {
        throw new Error(
          "Expanded overlay has a canonical-signature item but no sig knobs stored"
        );
      }
      const sig = canonSigs.get(name);
      if (sig === undefined) {
        throw new Error(`Unknown signature for definition "${name}"`);
      }
      lines.push(
        (item.kind === 5 ? sig : applySignatureDiff(sig, item.sigOverlay)) +
          suffix
      );
    } else if (item.kind === 0 || item.kind === 7) {
      if (item.kind === 7) {
        if (!canonSigs) {
          throw new Error(
            "Expanded overlay has a kind-7 def (preceding matched sig) but no sig knobs stored"
          );
        }
        const sig = canonSigs.get(name);
        if (sig === undefined) {
          throw new Error(`Unknown signature for definition "${name}"`);
        }
        lines.push(sig + suffix);
      }
      const head = item.head ?? formatVarName(name) + " =";
      if (item.tailMode === 1) {
        lines.push(head + item.tail);
      } else {
        const rhsCanon = defs.get(name);
        if (rhsCanon === undefined) {
          throw new Error(
            `Expanded overlay references unknown definition "${name}"`
          );
        }
        lines.push(
          head + applyCondensedOverlay(rhsCanon, item.rhsOverlay) + item.suffix
        );
      }
    } else {
      lines.push(item.text);
    }
  }
  return lines.join("\n");
};

const resolveExpandedItemName = (
  item: { name: string; nameRef?: number },
  canonNameOrder: string[]
): string => {
  if (item.nameRef === undefined) return item.name;
  const n = canonNameOrder[item.nameRef];
  if (n === undefined) {
    throw new Error(
      `Expanded overlay references unknown name index ${item.nameRef}`
    );
  }
  return n;
};

export interface CodeLineTokenStream {
  tokens: string[];
  gaps: string[];
  trailingGap: string;
}

export const tokenizeCodeLineWithGaps = (
  codeLine: string
): CodeLineTokenStream => {
  const tokens: string[] = [];
  const gaps: string[] = [];
  let pendingGap = "";
  let current = "";
  let quote: QuoteDelimiter | null = null;
  let inNBT = 0;

  const pushToken = (value: string): void => {
    gaps.push(pendingGap);
    pendingGap = "";
    tokens.push(value);
  };

  for (let i = 0; i < codeLine.length; i++) {
    const char = codeLine[i]!;

    if (quote !== null) {
      current += char;
      if (quote === '"') {
        if (char === '"' && codeLine[i - 1] !== "\\") quote = null;
      } else if (quote === "'") {
        if (char === "'" && codeLine[i - 1] !== "\\") quote = null;
      } else {
        if (
          char === '"' &&
          codeLine[i + 1] === '"' &&
          codeLine[i + 2] === '"' &&
          codeLine[i - 1] !== "\\"
        ) {
          quote = null;
          current += '""';
          i += 2;
        }
      }
    } else if (inNBT > 0) {
      current += char;
      if (char === "{") inNBT++;
      else if (char === "}") inNBT--;
    } else if (
      char === '"' &&
      codeLine[i + 1] === '"' &&
      codeLine[i + 2] === '"'
    ) {
      quote = '"""';
      current += '"""';
      i += 2;
    } else if (char === '"') {
      quote = '"';
      current += char;
    } else if (char === "'") {
      quote = "'";
      current += char;
    } else if (char === "{") {
      inNBT = 1;
      current += char;
    } else if (char === "=" && codeLine[i + 1] === ">") {
      if (current.trim()) pushToken(current.trim());
      pushToken("=>");
      current = "";
      i++;
    } else if (char === "-" && codeLine[i + 1] === ">") {
      if (current.trim()) pushToken(current.trim());
      pushToken("->");
      current = "";
      i++;
    } else if (
      char === "(" ||
      char === ")" ||
      char === "," ||
      char === "\\" ||
      char === "[" ||
      char === "]" ||
      char === ";"
    ) {
      if (current.trim()) pushToken(current.trim());
      pushToken(char);
      current = "";
    } else if (/\s/.test(char)) {
      if (current.trim()) pushToken(current.trim());
      current = "";
      pendingGap += char;
    } else {
      current += char;
    }
  }
  if (current.trim()) pushToken(current.trim());

  return { tokens, gaps, trailingGap: pendingGap };
};

export const computeCodeLineOverlay = (
  rawInput: string,
  canonicalInput: string
): CondensedOverlay => {
  const raw = tokenizeCodeLineWithGaps(rawInput);
  const canon = tokenizeCodeLineWithGaps(canonicalInput);

  if (raw.tokens.length !== canon.tokens.length) {
    return { mode: 1, rawText: rawInput };
  }

  const gapOverrides: Array<[number, string]> = [];
  const spellingOverrides: Array<[number, string]> = [];
  for (let i = 0; i < raw.tokens.length; i++) {
    if (raw.gaps[i] !== canon.gaps[i]) gapOverrides.push([i, raw.gaps[i]!]);
    if (raw.tokens[i] !== canon.tokens[i]) {
      spellingOverrides.push([i, raw.tokens[i]!]);
    }
  }

  const overlay: CondensedOverlay = {
    mode: 0,
    gapOverrides,
    spellingOverrides,
    hasTrailingGap: raw.trailingGap !== canon.trailingGap,
    trailingGap: raw.trailingGap,
  };

  if (overlayBits(overlay) >= stringBits(rawInput)) {
    return { mode: 1, rawText: rawInput };
  }
  return overlay;
};

export const applyCodeLineOverlay = (
  canonicalInput: string,
  overlay: CondensedOverlay
): string => {
  if (overlay.mode === 1) return overlay.rawText;

  const canon = tokenizeCodeLineWithGaps(canonicalInput);
  const gaps = new Map(overlay.gapOverrides);
  const spellings = new Map(overlay.spellingOverrides);

  let out = gaps.has(0) ? gaps.get(0)! : (canon.gaps[0] ?? "");
  for (let i = 0; i < canon.tokens.length; i++) {
    out += spellings.has(i) ? spellings.get(i)! : canon.tokens[i]!;
    if (i < canon.tokens.length - 1) {
      out += gaps.has(i + 1) ? gaps.get(i + 1)! : (canon.gaps[i + 1] ?? "");
    }
  }
  if (overlay.hasTrailingGap) out += overlay.trailingGap;
  return out;
};

export interface JsonTokenStream {
  tokens: { type: string; value: string }[];
  gaps: string[];
  trailingGap: string;
}

export const tokenizeJson = (json: string): JsonTokenStream => {
  const tokens: { type: string; value: string }[] = [];
  const gaps: string[] = [];
  let pendingGap = "";
  let i = 0;

  const pushToken = (type: string, value: string): void => {
    gaps.push(pendingGap);
    pendingGap = "";
    tokens.push({ type, value });
  };

  const fail = (msg: string): never => {
    throw new StructuralParseError(msg);
  };

  while (i < json.length) {
    const char = json[i]!;

    if (/^\s$/.test(char)) {
      pendingGap += char;
      i++;
      continue;
    }

    if (
      char === "{" ||
      char === "}" ||
      char === "[" ||
      char === "]" ||
      char === ":" ||
      char === ","
    ) {
      const type =
        char === "{"
          ? "lbrace"
          : char === "}"
            ? "rbrace"
            : char === "["
              ? "lbracket"
              : char === "]"
                ? "rbracket"
                : char === ":"
                  ? "colon"
                  : "comma";
      pushToken(type, char);
      i++;
      continue;
    }

    if (char === '"') {
      let j = i + 1;
      let value = '"';
      let closed = false;
      while (j < json.length) {
        const c = json[j]!;
        value += c;
        if (c === "\\") {
          j++;
          if (j >= json.length) break;
          value += json[j]!;
          j++;
          continue;
        }
        if (c === '"') {
          closed = true;
          j++;
          break;
        }
        j++;
      }
      if (!closed) fail(`Unterminated JSON string at position ${i}`);
      pushToken("string", value);
      i = j;
      continue;
    }

    if (char === "-" || (char >= "0" && char <= "9")) {
      const at = (k: number): string => (k < json.length ? json[k]! : "");
      let j = i;
      if (at(j) === "-") j++;
      if (at(j) === "0") {
        j++;
      } else if (at(j) >= "1" && at(j) <= "9") {
        while (at(j) >= "0" && at(j) <= "9") j++;
      } else {
        fail(`Invalid JSON number at position ${i}`);
      }
      if (at(j) === ".") {
        j++;
        if (!(at(j) >= "0" && at(j) <= "9")) {
          fail(`Invalid JSON number at position ${i}`);
        }
        while (at(j) >= "0" && at(j) <= "9") j++;
      }
      if (at(j) === "e" || at(j) === "E") {
        j++;
        if (at(j) === "+" || at(j) === "-") j++;
        if (!(at(j) >= "0" && at(j) <= "9")) {
          fail(`Invalid JSON number at position ${i}`);
        }
        while (at(j) >= "0" && at(j) <= "9") j++;
      }
      pushToken("number", json.slice(i, j));
      i = j;
      continue;
    }

    if (json.startsWith("true", i)) {
      pushToken("boolean", "true");
      i += 4;
      continue;
    }
    if (json.startsWith("false", i)) {
      pushToken("boolean", "false");
      i += 5;
      continue;
    }
    if (json.startsWith("null", i)) {
      pushToken("null", "null");
      i += 4;
      continue;
    }

    fail(`Unexpected character "${char}" at position ${i}`);
  }

  return { tokens, gaps, trailingGap: pendingGap };
};

export const computeJsonOverlay = (
  rawInput: string,
  canonicalInput: string
): CondensedOverlay => {
  const raw = tokenizeJson(rawInput);
  const canon = tokenizeJson(canonicalInput);

  if (raw.tokens.length !== canon.tokens.length) {
    return { mode: 1, rawText: rawInput };
  }
  for (let i = 0; i < raw.tokens.length; i++) {
    if (raw.tokens[i]!.type !== canon.tokens[i]!.type) {
      return { mode: 1, rawText: rawInput };
    }
  }

  const gapOverrides: Array<[number, string]> = [];
  const spellingOverrides: Array<[number, string]> = [];
  for (let i = 0; i < raw.tokens.length; i++) {
    if (raw.gaps[i] !== canon.gaps[i]) gapOverrides.push([i, raw.gaps[i]!]);
    if (raw.tokens[i]!.value !== canon.tokens[i]!.value) {
      spellingOverrides.push([i, raw.tokens[i]!.value]);
    }
  }

  const overlay: CondensedOverlay = {
    mode: 0,
    gapOverrides,
    spellingOverrides,
    hasTrailingGap: raw.trailingGap !== canon.trailingGap,
    trailingGap: raw.trailingGap,
  };

  if (overlayBits(overlay) >= stringBits(rawInput)) {
    return { mode: 1, rawText: rawInput };
  }
  return overlay;
};

export const applyJsonOverlay = (
  canonicalInput: string,
  overlay: CondensedOverlay
): string => {
  if (overlay.mode === 1) return overlay.rawText;

  const canon = tokenizeJson(canonicalInput);
  const gaps = new Map(overlay.gapOverrides);
  const spellings = new Map(overlay.spellingOverrides);

  let out = gaps.has(0) ? gaps.get(0)! : (canon.gaps[0] ?? "");
  for (let i = 0; i < canon.tokens.length; i++) {
    out += spellings.has(i) ? spellings.get(i)! : canon.tokens[i]!.value;
    if (i < canon.tokens.length - 1) {
      out += gaps.has(i + 1) ? gaps.get(i + 1)! : (canon.gaps[i + 1] ?? "");
    }
  }
  if (overlay.hasTrailingGap) out += overlay.trailingGap;
  return out;
};

export const stripAutoCurryVarNames = (ast: TypeAST.AST): TypeAST.AST => {
  const clone = structuredClone(ast);

  const reattachSourceNames = (
    original: TypeAST.AST,
    copied: TypeAST.AST
  ): void => {
    if (original.type === "Operator") {
      const sourceName = getOperatorSourceName(original);
      if (sourceName !== undefined) {
        setOperatorSourceName(copied as TypeAST.BaseOperator, sourceName);
      }
    }
  };
  const visitPair = (original: TypeAST.AST, copied: TypeAST.AST): void => {
    reattachSourceNames(original, copied);
    switch (original.type) {
      case "Curry":
        original.args.forEach((arg, i) =>
          visitPair(arg, (copied as TypeAST.Curried).args[i]!)
        );
        break;
      case "Pipe":
        visitPair(original.op1, (copied as TypeAST.Pipe).op1);
        visitPair(original.op2, (copied as TypeAST.Pipe).op2);
        break;
      case "Pipe2":
        visitPair(original.op1, (copied as TypeAST.Pipe2).op1);
        visitPair(original.op2, (copied as TypeAST.Pipe2).op2);
        visitPair(original.op3, (copied as TypeAST.Pipe2).op3);
        break;
      case "Flip":
        visitPair(original.arg, (copied as TypeAST.Flip).arg);
        break;
      case "List":
        original.value.forEach((entry, i) =>
          visitPair(
            entry as TypeAST.AST,
            (copied as TypeAST.List).value[i] as TypeAST.AST
          )
        );
        break;
      case "NetworkCards":
        original.definitions.forEach((def, i) =>
          visitPair(
            def.node,
            (copied as TypeAST.NetworkCards).definitions[i]!.node
          )
        );
        break;
      case "Reader":
        if (
          original.value.simulatedOutput &&
          (copied as any).value.simulatedOutput
        ) {
          visitPair(
            original.value.simulatedOutput as TypeAST.AST,
            (copied as any).value.simulatedOutput as TypeAST.AST
          );
        }
        break;
      case "Recipe":
        visitPair(original.value.input, (copied as TypeAST.Recipe).value.input);
        visitPair(
          original.value.output,
          (copied as TypeAST.Recipe).value.output
        );
        break;
      default:
        break;
    }
  };
  visitPair(ast, clone);

  const visit = (node: TypeAST.AST): void => {
    if (node.type === "Curry" && node.varName) {
      resetExpandedVarCounter();
      const saved = node.varName;
      delete (node as { varName?: string }).varName;
      const autoName = getExpandedVarName(node);
      node.varName = saved;
      if (saved === autoName) {
        delete (node as { varName?: string }).varName;
      }
    }

    switch (node.type) {
      case "Curry":
        for (const arg of node.args) visit(arg);
        break;
      case "Pipe":
        visit(node.op1);
        visit(node.op2);
        break;
      case "Pipe2":
        visit(node.op1);
        visit(node.op2);
        visit(node.op3);
        break;
      case "Flip":
        visit(node.arg);
        break;
      case "List":
        for (const entry of node.value) visit(entry as TypeAST.AST);
        break;
      case "NetworkCards":
        for (const def of node.definitions) visit(def.node);
        break;
      case "Reader":
        if (node.value.simulatedOutput) {
          visit(node.value.simulatedOutput as TypeAST.AST);
        }
        break;
      case "Recipe":
        visit(node.value.input);
        visit(node.value.output);
        break;
      default:
        break; // literals and value-holding nodes have no AST children
    }
  };

  visit(clone);
  return clone;
};
