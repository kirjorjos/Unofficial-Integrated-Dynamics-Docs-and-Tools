import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import {
  getReaderClassByName,
  type ReaderClass,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";
import { Double } from "lib/JavaNumberClasses/Double";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { getAspectName, getReaderPartType } from "lib/transformers/aspectNames";
import {
  CHAT_LIMIT,
  VARIABLE_ITEM_ID,
  VARIABLESTORE_ITEM_ID,
  VARSTORE_CAPACITY,
  overlongMarker,
} from "lib/transformers/giveCommands";
import { flattenAnonymousBaseOperatorApplication } from "lib/transformers/helpers";
import { astContentKey, getCurryChunks } from "lib/transformers/NetworkCards";
import { ASTtoOperator } from "lib/transformers/Operator";
import { KEPT_PART_FIELDS } from "lib/transformers/partFields";
import { getPartItemId } from "lib/transformers/partItemIds";
import { StructuralParseError } from "lib/transformers/parseErrors";
import { TagToSNBT, type SNBTSerializeOptions } from "lib/transformers/SNBT";
import { getSourceCards, isSourceNode } from "lib/transformers/sourceNodes";

export interface AstGiveOptions {
  materialize?: boolean;
  outputShape?: "cards" | "varstore";
  layout?: "minimize" | "readable";
  indentation?: number;
  cardIds?: "preserve" | "remap";
  startVariableId?: number;
  target?: string;
  markOverlong?: boolean;
}

export interface AstGiveOutput {
  lines: string[];
  text: string;
  warnings: string[];
  overlong: { line: number; length: number }[];
}

const DISPLAY_PANEL_PART_TYPE = "integrateddynamics:display_panel";
const OPERATOR_APPLY = "OPERATOR_APPLY";
const OPERATOR_PIPE = "OPERATOR_PIPE";
const OPERATOR_PIPE2 = "OPERATOR_PIPE2";
const OPERATOR_FLIP = "OPERATOR_FLIP";
const DEFAULT_PART_UPDATE_INTERVAL = 1;

interface EmittedPart {
  id: number;
  partType: string;
  itemId: string;
  aspects: {
    aspectName: string;
    settings: Record<string, number | boolean | string> | undefined;
  }[];
  settings?: TypeAST.PartSettings;
  inventory?: ListTag;
}

const intTag = (value: number): IntTag => new IntTag(new Integer(value));
const byteTag = (value: number): ByteTag => new ByteTag(new Integer(value));
const intArrayTag = (values: number[]): IntArrayTag =>
  new IntArrayTag(new iArrayEager(values.map((v) => new Integer(v))));
const listTag = (entries: Tag<IntegratedValue>[]): ListTag =>
  new ListTag(new iArrayEager(entries));

class PartIds {
  private next: number;
  private readonly used = new Set<number>();

  constructor(
    start: number,
    private readonly reserved: Set<number> = new Set()
  ) {
    this.next = start;
  }

  take(): number {
    let candidate = this.next;
    while (this.reserved.has(candidate) || this.used.has(candidate))
      candidate++;
    this.next = candidate + 1;
    this.used.add(candidate);
    return candidate;
  }

  keep(id: number): boolean {
    if (this.used.has(id)) return false;
    this.used.add(id);
    return true;
  }
}

const authoredPartId = (id: string | undefined): number | undefined => {
  if (id === undefined) return undefined;
  const parsed = Number(id);
  return Number.isInteger(parsed) ? parsed : undefined;
};

const givenPartId = (
  id: string | undefined,
  warnings: string[]
): number | undefined => {
  if (id === undefined) return undefined;
  const parsed = authoredPartId(id);
  if (parsed === undefined) {
    warnings.push(
      `The part id "${id}" is not a number, so a new part id was chosen for it`
    );
  }
  return parsed;
};

export const operatorNameValue = (
  operator: TypeAST.Operator
): Tag<IntegratedValue> => {
  const serialized = ValueHelpers.serializeRaw(ASTtoOperator(operator));
  if (serialized instanceof CompoundTag) {
    const name = serialized.get(new iString("operatorName"));
    if (
      name instanceof StringTag &&
      Object.keys(serialized.data).length === 1
    ) {
      return name;
    }
  }
  return serialized;
};

const valueCardTag = (id: number, node: TypeAST.AST): CompoundTag => {
  const value = ASTtoOperator(node);
  return new CompoundTag({
    _id: intTag(id),
    _type: "integrateddynamics:valuetype",
    typeName: new StringTag(new iString(ValueHelpers.getTypeName(value))),
    value:
      node.type === "Operator"
        ? operatorNameValue(node)
        : ValueHelpers.serializeRaw(value),
  });
};

const operatorCardTag = (
  id: number,
  operator: TypeAST.Operator,
  variableIds: number[]
): CompoundTag =>
  new CompoundTag({
    _id: intTag(id),
    _type: "integrateddynamics:operator",
    operatorName: operatorNameValue(operator),
    variableIds: intArrayTag(variableIds),
  });

const aspectCardTag = (
  id: number,
  aspectName: string,
  partId: number
): CompoundTag =>
  new CompoundTag({
    _id: intTag(id),
    _type: "integrateddynamics:aspect",
    aspectName: new StringTag(new iString(aspectName)),
    partId: intTag(partId),
  });

const PROPERTY_LABEL_PREFIX = "aspect.aspecttypes.integrateddynamics.";

const propertyTag = (
  key: string,
  value: number | boolean | string,
  warnings: string[]
): Tag<IntegratedValue> | undefined => {
  if (typeof value === "boolean") {
    return new CompoundTag({
      key: new StringTag(new iString("integrateddynamics:boolean")),
      label: new StringTag(
        new iString(`${PROPERTY_LABEL_PREFIX}boolean.${key}`)
      ),
      value: byteTag(value ? 1 : 0),
    });
  }
  if (typeof value === "number") {
    return new CompoundTag({
      key: new StringTag(new iString("integrateddynamics:integer")),
      label: new StringTag(
        new iString(`${PROPERTY_LABEL_PREFIX}integer.${key}`)
      ),
      value: intTag(value),
    });
  }
  warnings.push(
    `The reader setting "${key}" is not a number or a boolean, so the part was left with the default`
  );
  return undefined;
};

const aspectPropertiesTag = (
  aspects: EmittedPart["aspects"],
  warnings: string[]
): CompoundTag => {
  const entries: Tag<IntegratedValue>[] = [];
  for (const { aspectName, settings } of aspects) {
    const properties: Tag<IntegratedValue>[] = [];
    for (const [key, value] of Object.entries(settings ?? {})) {
      const property = propertyTag(key, value, warnings);
      if (property !== undefined) properties.push(property);
    }
    if (properties.length === 0) continue;
    entries.push(
      new CompoundTag({
        key: new StringTag(new iString(aspectName)),
        value: new CompoundTag({ map: listTag(properties) }),
      })
    );
  }
  return new CompoundTag({ map: listTag(entries) });
};

const jsonValueTag = (
  value: jsonData,
  field: string,
  warnings: string[]
): Tag<IntegratedValue> | undefined => {
  if (value === null) {
    warnings.push(
      `The part setting "${field}" is null, which has no NBT spelling, so it was left out`
    );
    return undefined;
  }
  if (typeof value === "boolean") return byteTag(value ? 1 : 0);
  if (typeof value === "number") {
    return Number.isInteger(value) &&
      value >= -2147483648 &&
      value <= 2147483647
      ? intTag(value)
      : new DoubleTag(new Double(value.toString()));
  }
  if (typeof value === "string") return new StringTag(new iString(value));
  if (Array.isArray(value)) {
    const entries: Tag<IntegratedValue>[] = [];
    for (const entry of value) {
      const tag = jsonValueTag(entry, field, warnings);
      if (tag !== undefined) entries.push(tag);
    }
    return listTag(entries);
  }
  const fields: Record<string, Tag<IntegratedValue>> = {};
  for (const [key, entry] of Object.entries(value)) {
    const tag = jsonValueTag(entry, field, warnings);
    if (tag !== undefined) fields[key] = tag;
  }
  return new CompoundTag(fields);
};

const partTag = (part: EmittedPart, warnings: string[]): CompoundTag => {
  const settings = part.settings ?? {};
  const fields: Record<string, Tag<IntegratedValue>> = {
    id: intTag(part.id),
  };
  for (const field of KEPT_PART_FIELDS) {
    if (field === "aspectProperties") {
      fields[field] = aspectPropertiesTag(part.aspects, warnings);
      continue;
    }
    const value = settings[field];
    if (value !== undefined) {
      const tag = jsonValueTag(value, field, warnings);
      if (tag !== undefined) fields[field] = tag;
      continue;
    }
    if (field === "enabled") fields[field] = byteTag(1);
    if (field === "updateInterval") {
      fields[field] = intTag(DEFAULT_PART_UPDATE_INTERVAL);
    }
  }
  if (part.inventory !== undefined) fields["inventory"] = part.inventory;
  return new CompoundTag(fields);
};

const isTransparent = (node: TypeAST.AST): boolean =>
  node.type === "Materialize" ||
  node.type === "Dynamic" ||
  node.type === "Static" ||
  node.type === "Display" ||
  node.type === "Card";

const applicationChildren = (node: TypeAST.AST): TypeAST.AST[] => {
  switch (node.type) {
    case "Curry": {
      const flattened = flattenAnonymousBaseOperatorApplication(node);
      if (flattened?.fullyApplied) return flattened.args;
      return [node.base, ...node.args];
    }
    case "Pipe":
      return [node.op1, node.op2];
    case "Pipe2":
      return [node.op1, node.op2, node.op3];
    case "Flip":
      return [node.arg];
    case "List":
      return node.value;
    case "Reader":
      return node.value.simulatedOutput === undefined
        ? []
        : [node.value.simulatedOutput];
    default:
      return [];
  }
};

class CardWriter {
  readonly cards: { id: number; tag: CompoundTag }[] = [];
  private readonly byKey = new Map<string, number>();
  readonly refs = new Map<string, number>();
  readonly parts = new Map<number, EmittedPart>();
  private readonly partRefs = new Map<string, number>();

  constructor(
    private nextId: number,
    private readonly partIds: PartIds,
    private readonly materialize: boolean,
    private readonly preservePartIds: boolean,
    private readonly warnings: string[]
  ) {}

  partIdFor(authored?: number): number {
    if (authored === undefined || !this.preservePartIds) {
      return this.partIds.take();
    }
    if (!this.partIds.keep(authored)) {
      this.warnings.push(
        `The part id ${authored} is used by two parts, and parts share one id space, so only one of them can be placed`
      );
    }
    return authored;
  }

  partForCard(index: number): EmittedPart | undefined {
    const partId = this.cards[index]!.tag.get(new iString("partId"));
    if (!(partId instanceof NumericTag)) return undefined;
    return this.parts.get(partId.getAsDouble());
  }

  cardIndicesIn(node: TypeAST.AST): number[] {
    const indices: number[] = [];
    const visit = (current: TypeAST.AST): void => {
      if (isTransparent(current)) {
        return visit((current as { value: TypeAST.AST }).value);
      }
      const index = this.indexOfNode(current);
      if (index >= 0 && !indices.includes(index)) indices.push(index);
      for (const child of applicationChildren(current)) visit(child);
    };
    visit(node);
    return indices.sort((a, b) => a - b);
  }

  private indexOfNode(node: TypeAST.AST): number {
    const id = this.byKey.get(astContentKey(node));
    return id === undefined
      ? -1
      : this.cards.findIndex((card) => card.id === id);
  }

  write(node: TypeAST.AST): number {
    if (isTransparent(node)) {
      return this.write((node as { value: TypeAST.AST }).value);
    }

    if (node.type === "Variable" && node.name.startsWith("@")) {
      const original = node.name.slice(1);
      const id = this.refs.get(original);
      if (id !== undefined) return id;
      this.warnings.push(
        `The card refers to variable ${original}, which is not in the same paste; its id was left as it was`
      );
      return Number(original);
    }

    const key = astContentKey(node);
    const existing = this.byKey.get(key);
    if (existing !== undefined) return existing;

    switch (node.type) {
      case "Reader":
        return this.writeReader(node);
      case "Curry":
        return this.writeCurry(node);
      case "Pipe": {
        const ids = [this.write(node.op1), this.write(node.op2)];
        return this.add(key, (id) =>
          operatorCardTag(id, { type: "Operator", opName: OPERATOR_PIPE }, ids)
        );
      }
      case "Pipe2": {
        const ids = [
          this.write(node.op1),
          this.write(node.op2),
          this.write(node.op3),
        ];
        return this.add(key, (id) =>
          operatorCardTag(id, { type: "Operator", opName: OPERATOR_PIPE2 }, ids)
        );
      }
      case "Flip": {
        const arg = this.write(node.arg);
        return this.add(key, (id) =>
          operatorCardTag(id, { type: "Operator", opName: OPERATOR_FLIP }, [
            arg,
          ])
        );
      }
      case "List": {
        for (const entry of node.value) this.write(entry);
        return this.add(key, (id) => valueCardTag(id, node));
      }
      default:
        return this.add(key, (id) => valueCardTag(id, node));
    }
  }

  private writeReader(node: TypeAST.Reader): number {
    const { reader, aspect, simulatedOutput } = node.value;
    const key = astContentKey(node);

    if (this.materialize) {
      if (simulatedOutput === undefined) {
        this.warnings.push(
          `${reader} ${aspect}: has no value to materialize, so it was written as an aspect card`
        );
      } else {
        return this.write(simulatedOutput);
      }
    }

    const readerClass = getReaderClassByName(reader);
    const aspectName =
      readerClass === undefined
        ? undefined
        : getAspectName(readerClass, aspect);
    if (readerClass === undefined || aspectName === undefined) {
      throw new StructuralParseError(
        `The aspect "${aspect}" of ${reader} is not one this tool knows`
      );
    }
    const partId = this.readerPartId(node, readerClass, aspectName);
    return this.add(key, (id) => aspectCardTag(id, aspectName, partId));
  }

  private readerPartId(
    node: TypeAST.Reader,
    readerClass: ReaderClass,
    aspectName: string
  ): number {
    const authored = givenPartId(node.value.partId, this.warnings);
    const partType = getReaderPartType(readerClass);
    const key =
      authored === undefined
        ? `type:${partType ?? readerClass.typeName}`
        : `id:${authored}`;

    const existing = this.partRefs.get(key);
    if (existing !== undefined) {
      const known = this.parts.get(existing);
      if (known === undefined) return existing;
      if (partType !== undefined && known.partType !== partType) {
        this.warnings.push(
          `Part ${existing} is claimed by both a ${known.partType} and a ${partType}; the first one was kept`
        );
        return existing;
      }
      this.addAspect(known, aspectName, node.value.settings);
      return existing;
    }

    const id = this.partIdFor(authored);
    this.partRefs.set(key, id);

    const itemId = partType === undefined ? undefined : getPartItemId(partType);
    if (partType === undefined || itemId === undefined) {
      this.warnings.push(
        `${readerClass.typeName} is a reader whose part this tool cannot emit, so no part command was written for ${aspectName}; the card still reads part ${id}`
      );
      return id;
    }

    this.parts.set(id, {
      id,
      partType,
      itemId,
      aspects: [{ aspectName, settings: node.value.settings }],
    });
    return id;
  }

  private addAspect(
    part: EmittedPart,
    aspectName: string,
    settings: Record<string, number | boolean | string> | undefined
  ): void {
    const known = part.aspects.find((entry) => entry.aspectName === aspectName);
    if (known === undefined) {
      part.aspects.push({ aspectName, settings });
      return;
    }
    if (known.settings === undefined) {
      known.settings = settings;
      return;
    }
    if (
      settings !== undefined &&
      JSON.stringify(settings) !== JSON.stringify(known.settings)
    ) {
      this.warnings.push(
        `The settings of the aspect ${aspectName} of part ${part.id} were given twice; the first ones were kept`
      );
    }
  }

  private writeCurry(node: TypeAST.Curried): number {
    const key = astContentKey(node);
    const flattened = flattenAnonymousBaseOperatorApplication(node);

    if (flattened?.fullyApplied && flattened.operator.type === "Operator") {
      const ids = flattened.args.map((arg) => this.write(arg));
      return this.add(key, (id) =>
        operatorCardTag(id, flattened.operator, ids)
      );
    }

    let current = this.write(node.base);
    getCurryChunks(node).forEach((chunk, step) => {
      const ids = [current, ...chunk.args.map((arg) => this.write(arg))];
      current = this.add(`${key}#${step}`, (id) =>
        operatorCardTag(id, { type: "Operator", opName: OPERATOR_APPLY }, ids)
      );
    });
    return current;
  }

  private add(key: string, tag: (id: number) => CompoundTag): number {
    const id = this.nextId++;
    this.cards.push({ id, tag: tag(id) });
    this.byKey.set(key, id);
    return id;
  }
}

type Emission =
  | { kind: "card"; index: number }
  | { kind: "part"; part: EmittedPart }
  | { kind: "item"; itemId: string; tag: CompoundTag; holds: number[] };

const emitCard = (
  writer: CardWriter,
  emissions: Emission[],
  index: number
): void => {
  const part = writer.partForCard(index);
  if (part !== undefined) emissions.push({ kind: "part", part });
  emissions.push({ kind: "card", index });
};

const inventoryOf = (writer: CardWriter, indices: number[]): ListTag =>
  listTag(
    indices.map(
      (index, slot) =>
        new CompoundTag({
          Count: byteTag(1),
          Slot: byteTag(slot),
          id: VARIABLE_ITEM_ID,
          tag: writer.cards[index]!.tag,
        })
    )
  );

const emitHeldParts = (
  writer: CardWriter,
  emissions: Emission[],
  indices: number[]
): void => {
  for (const index of indices) {
    const part = writer.partForCard(index);
    if (part !== undefined) emissions.push({ kind: "part", part });
  }
};

const writeHeldCards = (writer: CardWriter, cards: TypeAST.AST[]): number[] => {
  for (const card of cards) writer.write(card);
  const indices: number[] = [];
  for (const card of cards) {
    for (const index of writer.cardIndicesIn(card)) {
      if (!indices.includes(index)) indices.push(index);
    }
  }
  return indices.sort((a, b) => a - b);
};

const expandSource = (
  node: TypeAST.Source,
  writer: CardWriter,
  emissions: Emission[],
  warnings: string[]
): void => {
  if (node.type === "VarStore") {
    const indices = writeHeldCards(writer, node.value.cards);
    emitHeldParts(writer, emissions, indices);
    emissions.push({
      kind: "item",
      itemId: VARIABLESTORE_ITEM_ID,
      tag: new CompoundTag({ inventory: inventoryOf(writer, indices) }),
      holds: indices,
    });
    return;
  }

  const partType =
    node.type === "DisplayPanel"
      ? DISPLAY_PANEL_PART_TYPE
      : node.value.partType;
  const itemId = getPartItemId(partType);
  if (itemId === undefined) {
    warnings.push(
      `${partType} is not a part this tool can emit as an item, so its cards were left out`
    );
    return;
  }

  const indices = writeHeldCards(writer, node.value.inventory);
  emitHeldParts(writer, emissions, indices);
  emissions.push({
    kind: "item",
    itemId,
    tag: partTag(
      {
        id: writer.partIdFor(givenPartId(node.value.id, warnings)),
        partType,
        itemId,
        aspects: [],
        settings: node.value.settings,
        inventory: inventoryOf(writer, indices),
      },
      warnings
    ),
    holds: indices,
  });
};

const expandUnit = (
  node: TypeAST.AST,
  writer: CardWriter,
  emissions: Emission[],
  options: AstGiveOptions,
  warnings: string[]
): void => {
  if (isSourceNode(node)) {
    expandSource(node, writer, emissions, warnings);
    return;
  }

  if (node.type === "Display") {
    const operand = node.value;
    const partType = DISPLAY_PANEL_PART_TYPE;
    const itemId = getPartItemId(partType);
    if (itemId === undefined) {
      throw new StructuralParseError(
        `${partType} is not an item this tool knows`
      );
    }
    const before = writer.cards.length;
    writer.write(operand);
    const fresh: number[] = [];
    for (let index = before; index < writer.cards.length; index++) {
      fresh.push(index);
    }
    const held = writer.cardIndicesIn(operand);
    const inventory = held.length > 0 ? held : fresh;
    emitHeldParts(writer, emissions, inventory);
    emissions.push({
      kind: "item",
      itemId,
      tag: partTag(
        {
          id: writer.partIdFor(),
          partType,
          itemId,
          aspects: [],
          inventory: inventoryOf(writer, inventory),
        },
        warnings
      ),
      holds: inventory,
    });
    return;
  }

  if (node.type === "Card") {
    const inner = node.value;
    if (inner.type !== "NetworkCards") {
      throw new StructuralParseError("Card(...) holds no cards");
    }
    const preserve = (options.cardIds ?? "remap") === "preserve";
    if (preserve) {
      for (const definition of inner.definitions) {
        const parsed = Number(definition.name);
        if (Number.isFinite(parsed)) {
          writer.refs.set(definition.name, parsed);
        }
      }
    }
    for (const definition of inner.definitions) {
      const before = writer.cards.length;
      const id = writer.write(definition.node);
      const index = writer.cards.findIndex((card) => card.id === id);
      const parsed = Number(definition.name);
      if (
        preserve &&
        Number.isFinite(parsed) &&
        writer.cards.length === before + 1
      ) {
        writer.cards[before]!.tag = writer.cards[before]!.tag.set(
          "_id",
          intTag(parsed)
        );
      }
      emitCard(writer, emissions, index);
    }
    return;
  }

  const before = writer.cards.length;
  writer.write(node);
  for (let index = before; index < writer.cards.length; index++) {
    emitCard(writer, emissions, index);
  }
};

const authoredPartIds = (node: TypeAST.AST): Set<number> => {
  const ids = new Set<number>();
  const visit = (current: TypeAST.AST): void => {
    if (current.type === "Reader") {
      const id = authoredPartId(current.value.partId);
      if (id !== undefined) ids.add(id);
    }
    if (isSourceNode(current)) {
      const id = authoredPartId(current.value.id);
      if (id !== undefined) ids.add(id);
      for (const card of getSourceCards(current)) visit(card);
      return;
    }
    if (isTransparent(current)) {
      visit((current as { value: TypeAST.AST }).value);
      return;
    }
    if (current.type === "NetworkCards") {
      for (const definition of current.definitions) visit(definition.node);
      return;
    }
    for (const child of applicationChildren(current)) visit(child);
  };
  visit(node);
  return ids;
};

const assertDisplayPlacement = (node: TypeAST.AST, root: boolean): void => {
  if (node.type === "Display") return;
  if (node.type === "Materialize" && node.value.type === "Display") return;
  for (const child of applicationChildren(node)) {
    if (child.type === "Display") {
      throw new StructuralParseError(
        root
          ? "Display(...) cannot be buried inside another expression; give it a definition of its own"
          : "Display(...) cannot be used inside a call; give it a definition of its own"
      );
    }
    assertDisplayPlacement(child, root);
  }
};

export const astToGiveCommands = (
  ast: TypeAST.AST,
  options: AstGiveOptions = {}
): AstGiveOutput => {
  const layout = options.layout ?? "minimize";
  const shape = options.outputShape ?? "cards";
  const target = options.target ?? "@p";
  const markOverlong = options.markOverlong ?? true;
  const serializeOpts: SNBTSerializeOptions = {
    layout,
    indentation: options.indentation ?? 2,
  };
  const warnings: string[] = [];

  let root = ast;
  let wrapped = options.materialize ?? false;
  if (root.type === "Materialize") {
    root = root.value;
    wrapped = true;
  }
  if (root.type === "Display" && root.value.type === "Materialize") {
    root = { type: "Display", value: root.value.value };
    wrapped = true;
  }

  const preserveIds = (options.cardIds ?? "remap") === "preserve";
  const start = options.startVariableId ?? 0;
  const writer = new CardWriter(
    start,
    new PartIds(start, preserveIds ? authoredPartIds(root) : new Set<number>()),
    wrapped,
    preserveIds,
    warnings
  );
  const emissions: Emission[] = [];

  const units =
    root.type === "NetworkCards"
      ? root.definitions.map((definition) => definition.node)
      : [root];

  for (const unit of units) {
    assertDisplayPlacement(unit, true);
    expandUnit(unit, writer, emissions, options, warnings);
  }

  const command = (itemId: string, tag: CompoundTag): string =>
    `/give ${target} ${itemId}${TagToSNBT(tag, serializeOpts)}`;

  const lines: string[] = [];
  const placedParts = new Set<number>();
  const partCommand = (part: EmittedPart): void => {
    if (placedParts.has(part.id)) return;
    placedParts.add(part.id);
    lines.push(command(part.itemId, partTag(part, warnings)));
  };

  const holders = new Map<number, string>();
  for (const emission of emissions) {
    if (emission.kind !== "item") continue;
    for (const index of emission.holds) holders.set(index, emission.itemId);
  }
  for (const emission of emissions) {
    if (emission.kind !== "card") continue;
    const holder = holders.get(emission.index);
    if (holder === undefined) continue;
    warnings.push(
      `Card _id:${writer.cards[emission.index]!.id} is held by ${holder}, so it was not given as an item of its own`
    );
  }

  if (shape === "cards") {
    for (const emission of emissions) {
      if (emission.kind === "part") {
        partCommand(emission.part);
      } else if (emission.kind === "item") {
        lines.push(command(emission.itemId, emission.tag));
      } else if (!holders.has(emission.index)) {
        lines.push(
          command(VARIABLE_ITEM_ID, writer.cards[emission.index]!.tag)
        );
      }
    }
  } else {
    const cards = emissions
      .filter((emission) => emission.kind === "card")
      .map((emission) => (emission as { index: number }).index)
      .filter((index) => !holders.has(index));
    for (let index = 0; index < cards.length; index += VARSTORE_CAPACITY) {
      const store = cards.slice(index, index + VARSTORE_CAPACITY);
      lines.push(
        command(
          VARIABLESTORE_ITEM_ID,
          new CompoundTag({ inventory: inventoryOf(writer, store) })
        )
      );
      for (const cardIndex of store) {
        const part = writer.partForCard(cardIndex);
        if (part !== undefined) partCommand(part);
      }
    }
    for (const emission of emissions) {
      if (emission.kind === "part") partCommand(emission.part);
    }
    for (const emission of emissions) {
      if (emission.kind === "item") {
        lines.push(command(emission.itemId, emission.tag));
      }
    }
  }

  const overlong: { line: number; length: number }[] = [];
  const marked = lines.map((line, index) => {
    if (line.length <= CHAT_LIMIT) return line;
    overlong.push({ line: index, length: line.length });
    return markOverlong ? `${line}${overlongMarker(line.length)}` : line;
  });

  return { lines: marked, text: marked.join("\n"), warnings, overlong };
};
