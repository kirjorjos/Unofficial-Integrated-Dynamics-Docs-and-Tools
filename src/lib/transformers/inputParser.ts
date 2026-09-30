import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import {
  CARD_TYPE_ASPECT,
  CARD_TYPE_DELAY,
  CARD_TYPE_OPERATOR,
  CARD_TYPE_PROXY,
  cardToAST,
  getCardId,
  getCardPartId,
  getCardType,
  getStringField,
  hasApplication,
  hasCachedValue,
  isVariableCard,
} from "lib/transformers/cardAst";
import { astContentKey } from "lib/transformers/NetworkCards";
import { KEPT_PART_FIELDS } from "lib/transformers/partFields";
import { StructuralParseError } from "lib/transformers/parseErrors";
import {
  derivePartItemId,
  getPartFamily,
  getPartItemId,
  getPartTypeForItemId,
  type PartFamily,
} from "lib/transformers/partItemIds";
import { SNBTToCompoundTag, TagToSNBT } from "lib/transformers/SNBT";

export type EnvelopeKind =
  | "setblock"
  | "give"
  | "block"
  | "entity"
  | "compound"
  | "unknown";

export interface ParsedEnvelope {
  kind: EnvelopeKind;
  raw: string;
  prefix: string;
  payload: string;
  id?: string;
  state?: string;
  coordinates?: string;
  prose?: string;
  marker?: string;
  tag: CompoundTag;
}

export interface ParsedCard {
  lineIndex: number;
  id?: string;
  type: string;
  typeName?: string;
  aspectName?: string;
  partId?: string;
  application: boolean;
  cached: boolean;
  ast?: TypeAST.AST;
  decodeWarnings: string[];
  tag: CompoundTag;
}

export interface ParsedPart {
  lineIndex: number;
  partType?: string;
  itemId?: string;
  family: PartFamily;
  partId?: string;
  tag?: CompoundTag;
  cards: ParsedCard[];
}

export interface ParsedVarStore {
  lineIndex: number;
  cards: ParsedCard[];
}

export interface ParsedSource {
  lineIndex: number;
  envelope: ParsedEnvelope;
  cards: ParsedCard[];
  parts: ParsedPart[];
  varStores: ParsedVarStore[];
}

export interface ParsedInput {
  sources: ParsedSource[];
  cards: ParsedCard[];
  parts: ParsedPart[];
  warnings: string[];
  missingPartIds: string[];
}

export interface ParseInputOptions {
  missingParts?: "error" | "warn";
  conflicts?: "error" | "warn";
}

const VARIABLE_ITEM_ID = "integrateddynamics:variable";
const VARIABLE_STORE_ITEM_ID = "integrateddynamics:variablestore";

const CONTAINER_ITEM_IDS: readonly string[] = [
  VARIABLE_STORE_ITEM_ID,
  "integrateddynamics:materializer",
  "integrateddynamics:proxy",
  "integrateddynamics:delay",
];

export const splitInputBlobs = (text: string): string[] => {
  const blobs: string[] = [];
  let lines: string[] = [];
  let depth = 0;
  let quote: '"' | "'" | null = null;
  let escaped = false;

  const flush = () => {
    const blob = lines.join("\n").trim();
    if (blob !== "") blobs.push(blob);
    lines = [];
  };

  for (const line of text.split(/\r?\n/)) {
    if (depth === 0 && quote === null && line.trim() === "") {
      flush();
      continue;
    }
    if (lines.length > 0 || line.trim() !== "") lines.push(line.trim());

    for (let i = 0; i < line.length; i++) {
      const char = line[i]!;
      if (quote !== null) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === quote) quote = null;
        continue;
      }
      if (char === '"' || char === "'") {
        quote = char;
        continue;
      }
      if (char === "{" || char === "[") depth++;
      else if (char === "}" || char === "]") depth = Math.max(0, depth - 1);
    }

    if (depth === 0 && quote === null) flush();
  }

  flush();
  return blobs;
};

// ---------------------------------------------------------------- envelopes

const SETBLOCK_REGEX =
  /^\/setblock\s+(\S+\s+\S+\s+\S+)\s+([^\s[{]+)(\[[^\]]*\])?(\{[\s\S]*\})$/;
const GIVE_REGEX = /^\/give\s+\S+\s+([^\s[{]+)(\[[^\]]*\])?(\{[\s\S]*\})$/;
const DATA_GET_REGEX =
  /^([\s\S]*?)has the following (block data|entity data|contents):\s*(\{[\s\S]*\})$/;
const BARE_COMPOUND_REGEX = /^(\{[\s\S]*\})$/;

const stripBrackets = (state: string | undefined): string | undefined =>
  state === undefined ? undefined : state.slice(1, -1);

const OVERLONG_MARKER_REGEX =
  / -- Warning: \d+ chars is too long for chat, use a command block\.$/;

const stripOverlongMarker = (
  blob: string
): { blob: string; marker?: string } => {
  const match = OVERLONG_MARKER_REGEX.exec(blob);
  if (!match) return { blob };
  return { blob: blob.slice(0, match.index), marker: match[0] };
};

const identifyPayload = (
  tag: CompoundTag
): { kind?: EnvelopeKind; id?: string } => {
  const id = getStringField(tag, "id");
  const hasCoordinates =
    tag.get(new iString("x")) instanceof NumericTag &&
    tag.get(new iString("y")) instanceof NumericTag &&
    tag.get(new iString("z")) instanceof NumericTag;
  if (id !== undefined && hasCoordinates) return { kind: "block", id };
  if (
    tag.has(new iString("Pos")) ||
    tag.has(new iString("UUID")) ||
    tag.has(new iString("Item"))
  ) {
    return { kind: "entity" };
  }
  return {};
};

const parseEnvelope = (rawBlob: string): ParsedEnvelope | undefined => {
  const { blob, marker } = stripOverlongMarker(rawBlob);

  const setblock = SETBLOCK_REGEX.exec(blob);
  if (setblock) {
    const payload = setblock[4]!;
    return {
      kind: "setblock",
      raw: rawBlob,
      prefix: blob.slice(0, blob.length - payload.length),
      payload,
      coordinates: setblock[1]!,
      id: setblock[2]!,
      state: stripBrackets(setblock[3]),
      marker,
      tag: SNBTToCompoundTag(payload),
    };
  }

  const give = GIVE_REGEX.exec(blob);
  if (give) {
    const payload = give[3]!;
    return {
      kind: "give",
      raw: rawBlob,
      prefix: blob.slice(0, blob.length - payload.length),
      payload,
      id: give[1]!,
      state: stripBrackets(give[2]),
      marker,
      tag: SNBTToCompoundTag(payload),
    };
  }

  const dataGet = DATA_GET_REGEX.exec(blob);
  if (dataGet) {
    const payload = dataGet[3]!;
    const wording = dataGet[2]!;
    const tag = SNBTToCompoundTag(payload);
    return {
      kind: wording === "block data" ? "block" : "entity",
      raw: rawBlob,
      prefix: blob.slice(0, blob.length - payload.length),
      payload,
      prose: `${dataGet[1]}has the following ${wording}:`,
      id: identifyPayload(tag).id,
      marker,
      tag,
    };
  }

  const bare = BARE_COMPOUND_REGEX.exec(blob);
  if (bare) {
    const payload = bare[1]!;
    const tag = SNBTToCompoundTag(payload);
    const identified = identifyPayload(tag);
    return {
      kind: identified.kind ?? "compound",
      raw: rawBlob,
      prefix: "",
      payload,
      id: identified.id,
      marker,
      tag,
    };
  }

  return undefined;
};

interface ScanState {
  lineIndex: number;
  cards: ParsedCard[];
  parts: ParsedPart[];
  varStores: ParsedVarStore[];
  warnings: string[];
}

const listEntries = (tag: CompoundTag, key: string): CompoundTag[] => {
  const node = tag.get(new iString(key));
  if (!(node instanceof ListTag)) return [];
  return node
    .valueOf()
    .valueOf()
    .filter((entry): entry is CompoundTag => entry instanceof CompoundTag);
};

const toCard = (tag: CompoundTag, state: ScanState): ParsedCard => ({
  lineIndex: state.lineIndex,
  id: getCardId(tag),
  type: getCardType(tag) ?? "",
  typeName: getStringField(tag, "typeName"),
  aspectName: getStringField(tag, "aspectName"),
  partId: getCardPartId(tag),
  application: getCardType(tag) === CARD_TYPE_OPERATOR && hasApplication(tag),
  cached: hasCachedValue(tag),
  decodeWarnings: [],
  tag,
});

const scanItemList = (
  tag: CompoundTag,
  key: string,
  state: ScanState
): ParsedCard[] => {
  const cards: ParsedCard[] = [];
  for (const entry of listEntries(tag, key)) {
    const card = scanItemEntry(entry, state);
    if (card !== undefined) cards.push(card);
  }
  return cards;
};

const partIdOf = (tag: CompoundTag): string | undefined => {
  const id = tag.get(new iString("id"));
  return id instanceof NumericTag ? String(id.getAsDouble()) : undefined;
};

const partTypeOfItemId = (itemId: string): string | undefined => {
  const known = getPartTypeForItemId(itemId);
  if (known !== undefined) return known;
  const separator = itemId.indexOf(":");
  if (separator === -1) return undefined;
  const name = itemId.slice(separator + 1);
  if (!name.startsWith("part_")) return undefined;
  const partType = `${itemId.slice(0, separator)}:${name.slice("part_".length)}`;
  return derivePartItemId(partType) === itemId ? partType : undefined;
};

const addPart = (
  state: ScanState,
  tag: CompoundTag | undefined,
  itemId: string | undefined
): void => {
  const partType =
    (tag === undefined ? undefined : getStringField(tag, "__partType")) ??
    (itemId === undefined ? undefined : partTypeOfItemId(itemId));
  state.parts.push({
    lineIndex: state.lineIndex,
    partType,
    itemId:
      itemId ?? (partType === undefined ? undefined : getPartItemId(partType)),
    family: partType === undefined ? "other" : getPartFamily(partType),
    partId: tag === undefined ? undefined : partIdOf(tag),
    tag,
    cards: tag === undefined ? [] : scanItemList(tag, "inventory", state),
  });
};

const scanItemEntry = (
  entry: CompoundTag,
  state: ScanState
): ParsedCard | undefined => {
  const itemId = getStringField(entry, "id");
  if (itemId === undefined) return undefined;
  const entryTag = entry.get(new iString("tag"));
  const tag = entryTag instanceof CompoundTag ? entryTag : undefined;

  if (itemId === VARIABLE_ITEM_ID) {
    if (tag === undefined || !isVariableCard(tag)) return undefined;
    const card = toCard(tag, state);
    state.cards.push(card);
    return card;
  }

  if (partTypeOfItemId(itemId) !== undefined) {
    addPart(state, tag, itemId);
    return undefined;
  }

  if (tag !== undefined && CONTAINER_ITEM_IDS.includes(itemId)) {
    scanPayload(tag, state, itemId);
  }
  return undefined;
};

const scanParts = (tag: CompoundTag, state: ScanState): void => {
  const container = tag.get(new iString("partContainer"));
  if (!(container instanceof CompoundTag)) return;
  for (const part of listEntries(container, "parts")) {
    addPart(state, part, undefined);
  }
};

const scanPayload = (
  tag: CompoundTag,
  state: ScanState,
  itemId?: string
): ParsedCard[] => {
  const cards = scanItemList(tag, "inventory", state);
  scanItemList(tag, "Items", state);
  scanItemList(tag, "Inventory", state);

  const item = tag.get(new iString("Item"));
  if (item instanceof CompoundTag) scanItemEntry(item, state);

  scanParts(tag, state);

  if (itemId === VARIABLE_STORE_ITEM_ID) {
    state.varStores.push({ lineIndex: state.lineIndex, cards });
  }

  return cards;
};

const scanBlob = (envelope: ParsedEnvelope, state: ScanState): void => {
  const tag = envelope.tag;
  const itemId = envelope.id;

  if (itemId === VARIABLE_ITEM_ID) {
    if (isVariableCard(tag)) state.cards.push(toCard(tag, state));
    return;
  }

  if (itemId !== undefined && partTypeOfItemId(itemId) !== undefined) {
    addPart(state, tag, itemId);
    return;
  }

  if (isVariableCard(tag)) {
    state.cards.push(toCard(tag, state));
    return;
  }

  scanPayload(tag, state, itemId);
};

const collectRefs = (ast: TypeAST.AST, into: string[]): void => {
  switch (ast.type) {
    case "Variable":
      if (ast.name.startsWith("@")) into.push(ast.name.slice(1));
      return;
    case "Curry":
      collectRefs(ast.base, into);
      for (const arg of ast.args) collectRefs(arg, into);
      return;
    case "Pipe":
      collectRefs(ast.op1, into);
      collectRefs(ast.op2, into);
      return;
    case "Pipe2":
      collectRefs(ast.op1, into);
      collectRefs(ast.op2, into);
      collectRefs(ast.op3, into);
      return;
    case "Flip":
      collectRefs(ast.arg, into);
      return;
    case "List":
      for (const entry of ast.value) collectRefs(entry, into);
      return;
    case "Reader":
      if (ast.value.simulatedOutput)
        collectRefs(ast.value.simulatedOutput, into);
      return;
    case "Materialize":
    case "Dynamic":
    case "Static":
      collectRefs(ast.value, into);
      return;
    default:
      return;
  }
};

export const getCardReferences = (card: ParsedCard): string[] => {
  if (card.ast === undefined) return [];
  const refs: string[] = [];
  collectRefs(card.ast, refs);
  return [...new Set(refs)];
};

const cardKey = (card: ParsedCard): string =>
  card.ast === undefined ? TagToSNBT(card.tag) : astContentKey(card.ast);

const dedupeCards = (
  cards: ParsedCard[],
  warnings: string[],
  conflicts: "error" | "warn"
): ParsedCard[] => {
  const seen = new Map<string, string>();
  const unique: ParsedCard[] = [];
  let collapsed = 0;

  for (const card of cards) {
    if (card.id === undefined) {
      unique.push(card);
      continue;
    }
    const key = cardKey(card);
    const existing = seen.get(card.id);
    if (existing === undefined) {
      seen.set(card.id, key);
      unique.push(card);
      continue;
    }
    if (existing !== key) {
      const message =
        `Variable _id:${card.id} is defined twice with different values; ` +
        `refusing to guess which one to use`;
      if (conflicts === "error") throw new StructuralParseError(message);
      warnings.push(`${message.replace(/;.*$/, "")}. The first was kept`);
      continue;
    }
    collapsed++;
  }

  if (collapsed > 0) {
    warnings.push(
      `${collapsed} duplicate ${
        collapsed === 1 ? "card was" : "cards were"
      } collapsed onto an identical definition`
    );
  }

  return unique;
};

const partKey = (part: ParsedPart): string => {
  const fields: string[] = [];
  for (const field of KEPT_PART_FIELDS) {
    if (part.tag?.has(new iString(field)) !== true) {
      fields.push(`${field}=`);
      continue;
    }
    const value = part.tag.get(new iString(field));
    fields.push(`${field}=${value instanceof Tag ? TagToSNBT(value) : ""}`);
  }
  return (
    `${part.partType ?? ""}|${part.itemId ?? ""}|${part.family}|` +
    `${fields.join("&")}|[${part.cards.map(cardKey).join(",")}]`
  );
};

const dedupeParts = (
  parts: ParsedPart[],
  warnings: string[],
  conflicts: "error" | "warn"
): ParsedPart[] => {
  const seen = new Map<string, string>();
  const unique: ParsedPart[] = [];

  for (const part of parts) {
    if (part.partId === undefined) {
      unique.push(part);
      continue;
    }
    const key = partKey(part);
    const existing = seen.get(part.partId);
    if (existing === undefined) {
      seen.set(part.partId, key);
      unique.push(part);
      continue;
    }
    if (existing !== key) {
      const message =
        `Part ${part.partId} is present twice with different contents; ` +
        `refusing to guess which one to use`;
      if (conflicts === "error") throw new StructuralParseError(message);
      warnings.push(`${message.replace(/;.*$/, "")}. The first was kept`);
    }
  }

  return unique;
};

const orderByDependency = (
  cards: ParsedCard[],
  warnings: string[]
): ParsedCard[] => {
  const byId = new Map<string, ParsedCard>();
  for (const card of cards) {
    if (card.id !== undefined) byId.set(card.id, card);
  }

  const ordered: ParsedCard[] = [];
  const state = new Map<ParsedCard, "visiting" | "done">();
  let sawCycle = false;

  const visit = (card: ParsedCard) => {
    const seen = state.get(card);
    if (seen === "done") return;
    if (seen === "visiting") {
      sawCycle = true;
      return;
    }
    state.set(card, "visiting");
    for (const ref of getCardReferences(card)) {
      const dependency = byId.get(ref);
      if (dependency !== undefined && dependency !== card) visit(dependency);
    }
    state.set(card, "done");
    ordered.push(card);
  };

  for (const card of cards) visit(card);

  if (sawCycle) {
    warnings.push(
      "The pasted cards refer to each other in a cycle, so they are left in the paste's order"
    );
    return cards;
  }

  return ordered;
};

export const parseSnbtInput = (
  text: string,
  options: ParseInputOptions = {}
): ParsedInput => {
  const missingParts = options.missingParts ?? "error";
  const conflicts = options.conflicts ?? "error";
  const warnings: string[] = [];
  const sources: ParsedSource[] = [];
  const allCards: ParsedCard[] = [];
  const allParts: ParsedPart[] = [];
  const scanned: ScanState[] = [];
  const envelopes = new Map<ScanState, ParsedEnvelope>();

  splitInputBlobs(text).forEach((blob, lineIndex) => {
    let envelope: ParsedEnvelope | undefined;
    try {
      envelope = parseEnvelope(blob);
    } catch (e) {
      warnings.push(
        `Blob ${lineIndex + 1}: not valid SNBT (${
          e instanceof Error ? e.message : String(e)
        })`
      );
      return;
    }
    if (!envelope) {
      warnings.push(
        `Blob ${lineIndex + 1}: not a /setblock, /give, data get or compound input`
      );
      return;
    }

    const state: ScanState = {
      lineIndex,
      cards: [],
      parts: [],
      varStores: [],
      warnings,
    };
    scanBlob(envelope, state);
    scanned.push(state);
    envelopes.set(state, envelope);

    if (
      state.cards.length === 0 &&
      state.parts.length === 0 &&
      state.varStores.length === 0
    ) {
      warnings.push(
        `Blob ${lineIndex + 1}: no variable cards or parts were found in it`
      );
    }
  });

  for (const state of scanned) {
    sources.push({
      lineIndex: state.lineIndex,
      envelope: envelopes.get(state)!,
      cards: state.cards,
      parts: state.parts,
      varStores: state.varStores,
    });
    allCards.push(...state.cards);
    allParts.push(...state.parts);
  }

  const partsById = new Map<string, ParsedPart>();
  for (const part of allParts) {
    if (part.partId !== undefined && !partsById.has(part.partId)) {
      partsById.set(part.partId, part);
    }
  }
  for (const card of allCards) {
    const decoded = cardToAST(card.tag, {
      getPart: (partId) => partsById.get(partId),
    });
    card.ast = decoded.value;
    card.decodeWarnings = decoded.warnings;
  }

  const cards = orderByDependency(
    dedupeCards(allCards, warnings, conflicts),
    warnings
  );

  for (const card of cards) {
    const label = card.id === undefined ? "A card" : `Card _id:${card.id}`;
    warnings.push(...card.decodeWarnings);
    for (const ref of getCardReferences(card)) {
      if (!cards.some((other) => other.id === ref)) {
        warnings.push(
          `${label} refers to variable ${ref}, which is not in the paste`
        );
      }
    }
  }

  const cardPartIds = cards
    .filter(
      (card) =>
        card.partId !== undefined &&
        (card.type === CARD_TYPE_ASPECT ||
          card.type === CARD_TYPE_PROXY ||
          card.type === CARD_TYPE_DELAY)
    )
    .map((card) => card.partId!);
  const missingPartIds = [
    ...new Set(
      cardPartIds.filter(
        (partId) => !allParts.some((part) => part.partId === partId)
      )
    ),
  ];

  if (missingPartIds.length > 0) {
    const isSingular = missingPartIds.length === 1;
    const message =
      `The paste refers to part${isSingular ? "" : "s"} ` +
      `${missingPartIds.join(", ")}, which ${isSingular ? "is" : "are"} not in it`;
    if (missingParts === "error") fail(message, warnings);
    warnings.push(message);
  }

  if (cards.length === 0) {
    fail("No variable cards were found in the input", warnings);
  }

  return {
    sources,
    cards,
    parts: dedupeParts(allParts, warnings, conflicts),
    warnings,
    missingPartIds,
  };
};

const fail = (message: string, warnings: string[]): never => {
  throw new StructuralParseError(
    warnings.length === 0 ? message : `${message}\n${warnings.join("\n")}`
  );
};
