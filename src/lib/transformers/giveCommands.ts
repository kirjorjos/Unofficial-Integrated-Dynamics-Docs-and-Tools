import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { getVariableIds } from "lib/transformers/cardAst";
import {
  parseSnbtInput,
  type ParsedCard,
  type ParsedInput,
  type ParsedPart,
} from "lib/transformers/inputParser";
import { KEPT_PART_FIELDS } from "lib/transformers/partFields";
import { getPartItemId } from "lib/transformers/partItemIds";
import { TagToSNBT, type SNBTSerializeOptions } from "lib/transformers/SNBT";

export const CHAT_LIMIT = 256;
export const VARSTORE_CAPACITY = 45;

export const VARIABLE_ITEM_ID = "integrateddynamics:variable";
export const VARIABLESTORE_ITEM_ID = "integrateddynamics:variablestore";
export const overlongMarker = (length: number): string =>
  ` -- Warning: ${length} chars is too long for chat, use a command block.`;

export interface GiveCommandOptions {
  materialize?: boolean;
  outputShape?: "cards" | "varstore";
  layout?: "minimize" | "readable";
  indentation?: number;
  cardIds?: "preserve" | "remap";
  missingParts?: "error" | "warn";
  conflicts?: "error" | "warn";
  startVariableId?: number;
  target?: string;
  markOverlong?: boolean;
}

export interface GiveOutput {
  lines: string[];
  text: string;
  warnings: string[];
  overlong: { line: number; length: number }[];
  parsed: ParsedInput;
}

interface Remap {
  card: (id: string) => string;
  part: (id: string) => string;
}

const identityRemap: Remap = { card: (id) => id, part: (id) => id };
const buildRemap = (parsed: ParsedInput, start: number, on: boolean): Remap => {
  if (!on) return identityRemap;

  const cards = new Map<string, string>();
  parsed.cards.forEach((card, index) => {
    if (card.id !== undefined && !cards.has(card.id)) {
      cards.set(card.id, String(start + index));
    }
  });

  const parts = new Map<string, string>();
  for (const part of parsed.parts) {
    if (part.partId !== undefined && !parts.has(part.partId)) {
      parts.set(part.partId, String(start + parts.size));
    }
  }

  return {
    card: (id) => cards.get(id) ?? id,
    part: (id) => parts.get(id) ?? id,
  };
};

const intTag = (id: string): IntTag => new IntTag(new Integer(id));
const byteTag = (value: number): ByteTag => new ByteTag(new Integer(value));

const intArrayTag = (ids: string[]): IntArrayTag =>
  new IntArrayTag(new iArrayEager(ids.map((id) => new Integer(id))));

const listTag = (entries: Tag<IntegratedValue>[]): ListTag =>
  new ListTag(new iArrayEager(entries));

const CARD_KEY_ORDER: readonly string[] = [
  "_id",
  "_type",
  "operatorName",
  "variableIds",
  "aspectName",
  "partId",
  "typeName",
  "value",
];

const reorderTag = (
  source: CompoundTag,
  overrides: Record<string, Tag<IntegratedValue>>,
  keyOrder: readonly string[],
  keepUnlisted = true
): CompoundTag => {
  let out = new CompoundTag({});
  const written = new Set<string>();
  for (const key of keyOrder) {
    const override = overrides[key];
    if (override !== undefined) out = out.set(key, override);
    else if (source.has(new iString(key))) {
      out = out.set(key, source.get(new iString(key)));
    } else continue;
    written.add(key);
  }
  if (!keepUnlisted) return out;
  for (const key of Object.keys(source.data)) {
    if (written.has(key)) continue;
    out = out.set(key, source.data[key]!);
  }
  return out;
};

const cardTag = (card: ParsedCard, remap: Remap): CompoundTag => {
  const id = card.id === undefined ? "0" : remap.card(card.id);
  const overrides: Record<string, Tag<IntegratedValue>> = {
    _id: intTag(id),
  };
  if (card.application) {
    overrides["variableIds"] = intArrayTag(
      getVariableIds(card.tag).map(remap.card)
    );
  }
  if (card.partId !== undefined) {
    overrides["partId"] = intTag(remap.part(card.partId));
  }
  return reorderTag(card.tag, overrides, CARD_KEY_ORDER);
};

const materializedCardTag = (
  card: ParsedCard,
  remap: Remap,
  warnings: string[]
): CompoundTag => {
  const cached = card.tag.get(new iString("value"));
  if (card.typeName === undefined || !card.cached || !(cached instanceof Tag)) {
    const label = card.id === undefined ? "A card" : `Card _id:${card.id}`;
    warnings.push(
      `${label}: has no cached value to materialize, so its application was kept`
    );
    return cardTag(card, remap);
  }

  const id = card.id === undefined ? "0" : remap.card(card.id);
  return new CompoundTag({
    _id: intTag(id),
    _type: "integrateddynamics:valuetype",
    typeName: card.typeName,
    value: cached,
  });
};

const partTag = (
  part: ParsedPart,
  inventory: ListTag,
  remap: Remap
): CompoundTag | undefined => {
  if (part.tag === undefined) return undefined;

  const overrides: Record<string, Tag<IntegratedValue>> = {
    id: intTag(part.partId === undefined ? "0" : remap.part(part.partId)),
    inventory,
  };

  return reorderTag(
    part.tag,
    overrides,
    ["id", ...KEPT_PART_FIELDS, "inventory"],
    false
  );
};

const cardInventoryEntry = (tag: CompoundTag, slot: number): CompoundTag =>
  new CompoundTag({
    Count: byteTag(1),
    Slot: byteTag(slot),
    id: VARIABLE_ITEM_ID,
    tag,
  });

const cardReaderPartIds = (card: ParsedCard): string[] => {
  const ids: string[] = [];
  const visit = (node: TypeAST.AST | undefined): void => {
    if (node === undefined) return;
    switch (node.type) {
      case "Reader":
        if (node.value.partId !== undefined) ids.push(node.value.partId);
        visit(node.value.simulatedOutput);
        return;
      case "Curry":
        visit(node.base);
        for (const arg of node.args) visit(arg);
        return;
      case "Pipe":
        visit(node.op1);
        visit(node.op2);
        return;
      case "Pipe2":
        visit(node.op1);
        visit(node.op2);
        visit(node.op3);
        return;
      case "Flip":
        visit(node.arg);
        return;
      case "List":
        for (const entry of node.value) visit(entry);
        return;
      case "Materialize":
      case "Dynamic":
      case "Static":
      case "Display":
      case "Card":
        visit(node.value);
        return;
      default:
        return;
    }
  };
  visit(card.ast);
  return ids.filter((id, index) => ids.indexOf(id) === index);
};

export const inputToGiveCommands = (
  input: string,
  options: GiveCommandOptions = {}
): GiveOutput => {
  const layout = options.layout ?? "minimize";
  const shape = options.outputShape ?? "cards";
  const materialize = options.materialize ?? false;
  const start = options.startVariableId ?? 0;
  const target = options.target ?? "@p";
  const markOverlong = options.markOverlong ?? true;
  const serializeOpts: SNBTSerializeOptions = {
    layout,
    indentation: options.indentation ?? 2,
  };

  const parsed = parseSnbtInput(input, {
    missingParts: options.missingParts ?? "error",
    conflicts: options.conflicts ?? "error",
  });
  const warnings: string[] = [...parsed.warnings];
  const remap = buildRemap(
    parsed,
    start,
    (options.cardIds ?? "remap") === "remap"
  );

  const tagOfCard = (card: ParsedCard): CompoundTag =>
    materialize
      ? materializedCardTag(card, remap, warnings)
      : cardTag(card, remap);

  const command = (itemId: string, tag: CompoundTag): string =>
    `/give ${target} ${itemId}${TagToSNBT(tag, serializeOpts)}`;

  const ownerOf = new Map<ParsedCard, ParsedPart>();
  for (const part of parsed.parts) {
    for (const card of part.cards) ownerOf.set(card, part);
  }

  const partsById = new Map<string, ParsedPart>();
  for (const part of parsed.parts) {
    if (part.partId !== undefined && !partsById.has(part.partId)) {
      partsById.set(part.partId, part);
    }
  }

  const lines: string[] = [];
  const emittedParts = new Set<string>();

  const partKey = (part: ParsedPart): string =>
    part.partId ?? `#${parsed.parts.indexOf(part)}`;

  const partCommand = (part: ParsedPart): string | null => {
    const itemId =
      part.itemId ??
      (part.partType === undefined ? undefined : getPartItemId(part.partType));
    if (itemId === undefined) {
      warnings.push(
        `Part ${part.partId ?? "(no id)"} is of a family this tool cannot emit; it was left out`
      );
      return null;
    }
    const inventory = listTag(
      part.cards.map((card, slot) => cardInventoryEntry(tagOfCard(card), slot))
    );
    const tag = partTag(part, inventory, remap);
    return tag === undefined ? null : command(itemId, tag);
  };

  const emitPart = (part: ParsedPart): void => {
    const key = partKey(part);
    if (emittedParts.has(key)) return;
    emittedParts.add(key);
    const line = partCommand(part);
    if (line !== null) lines.push(line);
  };

  const emitPartsFor = (card: ParsedCard): void => {
    for (const partId of cardReaderPartIds(card)) {
      const part = partsById.get(partId);
      if (part !== undefined) emitPart(part);
      else {
        warnings.push(
          `Card ${card.id ?? "(no id)"} reads part ${partId}, which is not in the paste, so no part command was emitted`
        );
      }
    }
  };

  const reportUnusedParts = (): void => {
    for (const part of parsed.parts) {
      const key = partKey(part);
      if (emittedParts.has(key)) continue;
      emittedParts.add(key);
      const read = parsed.cards.some((card) =>
        cardReaderPartIds(card).includes(part.partId ?? "")
      );
      if (!read && part.cards.length === 0) {
        warnings.push(
          `Part ${part.partId ?? "(no id)"} (${
            part.partType ?? "unknown type"
          }) is in the paste but no emitted card reads it; it was left out`
        );
      }
    }
  };

  const standalone = parsed.cards.filter((card) => !ownerOf.has(card));

  if (shape === "cards") {
    for (const card of parsed.cards) {
      const owner = ownerOf.get(card);
      if (owner !== undefined) {
        emitPart(owner);
        continue;
      }
      emitPartsFor(card);
      lines.push(command(VARIABLE_ITEM_ID, tagOfCard(card)));
    }
  } else {
    const stores: ParsedCard[][] = [];
    standalone.forEach((card, index) => {
      const storeIndex = Math.floor(index / VARSTORE_CAPACITY);
      (stores[storeIndex] ??= []).push(card);
    });

    stores.forEach((store) => {
      const inventory = listTag(
        store.map((card, slot) => cardInventoryEntry(tagOfCard(card), slot))
      );
      lines.push(
        command(VARIABLESTORE_ITEM_ID, new CompoundTag({ inventory }))
      );
      for (const card of store) emitPartsFor(card);
    });

    for (const card of parsed.cards) {
      const owner = ownerOf.get(card);
      if (owner !== undefined) emitPart(owner);
    }
  }

  reportUnusedParts();

  const overlong: { line: number; length: number }[] = [];
  const marked = lines.map((line, index) => {
    if (line.length <= CHAT_LIMIT) return line;
    overlong.push({ line: index, length: line.length });
    return markOverlong ? `${line}${overlongMarker(line.length)}` : line;
  });

  return {
    lines: marked,
    text: marked.join("\n"),
    warnings,
    overlong,
    parsed,
  };
};

export const remappedIds = (
  parsed: ParsedInput,
  startVariableId = 0
): { cards: Map<string, string>; parts: Map<string, string> } => {
  const remap = buildRemap(parsed, startVariableId, true);
  const cards = new Map<string, string>();
  const parts = new Map<string, string>();
  for (const card of parsed.cards) {
    if (card.id !== undefined) cards.set(card.id, remap.card(card.id));
  }
  for (const part of parsed.parts) {
    if (part.partId !== undefined)
      parts.set(part.partId, remap.part(part.partId));
  }
  return { cards, parts };
};

export const numericTagValue = (
  tag: Tag<IntegratedValue>
): number | undefined =>
  tag instanceof NumericTag ? tag.getAsDouble() : undefined;
