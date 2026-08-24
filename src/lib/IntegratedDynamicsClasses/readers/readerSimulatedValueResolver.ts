import { blockRegistry } from "lib/IntegratedDynamicsClasses/registries/blockRegistry";
import { entityRegistry } from "lib/IntegratedDynamicsClasses/registries/entityRegistry";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import type { AspectStatic } from "lib/IntegratedDynamicsClasses/readers/AspectBase";

type TargetNodeType = "Block" | "Entity" | "Fluid" | "Item";

type ReaderClassLike = {
  typeName: string;
  aspects: Record<string, AspectStatic>;
};

const READER_TARGET_TYPES: Record<string, TargetNodeType[]> = {
  BlockReader: ["Block"],
  EntityReader: ["Entity"],
  FluidReader: ["Block"],
  InventoryReader: ["Block"],
};

export const getReaderTargetTypes = (readerClass: {
  typeName: string;
}): TargetNodeType[] | undefined => READER_TARGET_TYPES[readerClass.typeName];

const isOutputTypeAssignable = (actual: string, expected: string): boolean => {
  if (expected === "Any") return true;
  return (
    ParsedSignature.typeEquals(expected as never, actual as never) ||
    ParsedSignature.typeEquals(actual as never, expected as never)
  );
};

export type ResolvedReaderSimulatedValue =
  | { ok: true; value: TypeAST.AST }
  | { ok: false; error: string };

export const isResolvedReaderSimulatedValueError = (
  result: ResolvedReaderSimulatedValue
): result is { ok: false; error: string } => !result.ok;

type TargetDescriptor = {
  type: TargetNodeType;
  id: string;
  properties?: Record<string, unknown>;
};

const TARGET_NODE_TYPES: TargetNodeType[] = [
  "Block",
  "Entity",
  "Fluid",
  "Item",
];

const isTargetNode = (node: TypeAST.AST): node is TypeAST.Block => {
  return (TARGET_NODE_TYPES as string[]).includes(node.type);
};

const getNodeProperties = (
  value: Record<string, unknown>
): Record<string, unknown> | undefined => {
  const raw = value["properties"] ?? value["tag"];
  if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return undefined;
};

export const extractTargetDescriptor = (
  ast: TypeAST.AST
): TargetDescriptor | undefined => {
  if (isTargetNode(ast)) {
    const value = ast.value as {
      id?: string;
      properties?: unknown;
      tag?: unknown;
    };
    return {
      type: ast.type as TargetNodeType,
      id: String(value.id ?? ""),
      properties: getNodeProperties(value as Record<string, unknown>),
    };
  }
  if (ast.type === "Curry") {
    const base = ast.base as TypeAST.AST;
    if (isTargetNode(base)) {
      const baseValue = base.value as {
        id?: string;
        properties?: unknown;
        tag?: unknown;
      };
      const merged: Record<string, unknown> = {
        ...(getNodeProperties(baseValue as Record<string, unknown>) ?? {}),
      };
      for (const arg of ast.args) {
        if (arg.type === "NBT" && typeof arg.value === "object") {
          Object.assign(merged, arg.value);
        }
      }
      return {
        type: base.type as TargetNodeType,
        id: String(baseValue.id ?? ""),
        properties: Object.keys(merged).length > 0 ? merged : undefined,
      };
    }
  }
  return undefined;
};

const intAst = (value: number): TypeAST.Integer => ({
  type: "Integer",
  value: String(Math.trunc(value)) as TypeNumericString,
});

const doubleAst = (value: number): TypeAST.Double => ({
  type: "Double",
  value: String(value) as TypeNumericString,
});

const boolAst = (value: boolean): TypeAST.Boolean => ({
  type: "Boolean",
  value,
});

const itemAst = (id: string, size?: number): TypeAST.Item => ({
  type: "Item",
  value: {
    id,
    ...(size !== undefined ? { size: String(size) } : {}),
  },
});

const fluidAst = (id: string, amount?: number): TypeAST.Fluid => ({
  type: "Fluid",
  value: {
    id,
    ...(amount !== undefined ? { amount: String(amount) } : {}),
  },
});

const isAirId = (id: string): boolean => id === "minecraft:air";

const getAspectSetting = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  name: string
): number => {
  const settings = readerClass.aspects[aspectKey]?.settings ?? {};
  const raw = settings[name];
  return typeof raw === "number" ? Math.max(0, Math.trunc(raw)) : 0;
};

const error = (message: string): ResolvedReaderSimulatedValue => ({
  ok: false,
  error: message,
});

const ok = (value: TypeAST.AST): ResolvedReaderSimulatedValue => ({
  ok: true,
  value,
});

export const resolveReaderSimulatedValue = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  simulatedOutput: TypeAST.AST
): ResolvedReaderSimulatedValue => {
  const aspect = readerClass.aspects[aspectKey];
  if (aspect?.signature && aspect.signature.length > 0) {
    return error(
      `${aspect.fullDisplayName} does not support an overridden simulatedValue.`
    );
  }
  const expected = aspect?.outputType ?? "Any";

  const target = extractTargetDescriptor(simulatedOutput);
  if (target && isOutputTypeAssignable(target.type, expected)) {
    return ok(simulatedOutput);
  }

  if (!target) {
    if (isOutputTypeAssignable(simulatedOutput.type, expected)) {
      return ok(simulatedOutput);
    }
    return error(
      `Expected output type ${expected}, got simulatedOutput type ${simulatedOutput.type}`
    );
  }

  const targetTypes = getReaderTargetTypes(readerClass);
  if (targetTypes?.includes(target.type)) {
    return deriveReaderTargetValue(readerClass, aspectKey, target);
  }

  return error(
    `Expected output type ${expected}, got simulatedOutput type ${target.type}`
  );
};

const getNumberProperty = (
  target: TargetDescriptor,
  name: string,
  fallback: number
): number => {
  const raw = target.properties?.[name];
  if (typeof raw === "number") return raw;
  if (
    typeof raw === "string" &&
    raw.trim() !== "" &&
    !Number.isNaN(Number(raw))
  ) {
    return Number(raw);
  }
  return fallback;
};

const deriveReaderTargetValue = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  target: TargetDescriptor
): ResolvedReaderSimulatedValue => {
  switch (readerClass.typeName) {
    case "BlockReader":
      return deriveBlockReaderAspect(target, aspectKey);
    case "EntityReader":
      return deriveEntityReaderAspect(aspectKey, target);
    case "FluidReader":
      return deriveFluidReaderAspect(readerClass, aspectKey, target);
    case "InventoryReader":
      return deriveInventoryReaderAspect(readerClass, aspectKey, target);
    default:
      return error(
        `Cannot resolve ${target.type} for ${readerClass.typeName}.`
      );
  }
};

/* ------------------------------ BlockReader ------------------------------ */

const deriveBlockReaderAspect = (
  target: TargetDescriptor,
  aspectKey: string
): ResolvedReaderSimulatedValue => {
  switch (aspectKey) {
    case "BOOLEAN_BLOCK":
      return ok(boolAst(true));
    case "NBT": {
      const properties = target.properties;
      if (!properties) {
        return error(
          "Cannot resolve Tile Entity NBT from a Block with no NBT data."
        );
      }
      return ok({ type: "NBT", value: properties as jsonData });
    }
    default:
      return error(`Cannot resolve ${aspectKey} from a Block.`);
  }
};

/* ------------------------------ EntityReader ----------------------------- */

const isItemFrameEntity = (id: string): boolean =>
  id === "minecraft:item_frame" || id === "minecraft:glow_item_frame";

const deriveEntityReaderAspect = (
  aspectKey: string,
  target: TargetDescriptor
): ResolvedReaderSimulatedValue => {
  const entityCtor =
    entityRegistry.items[
      target.id.toLowerCase() as keyof typeof entityRegistry.items
    ];
  if (!entityCtor) {
    return error(`Unknown entity "${target.id}".`);
  }
  if (aspectKey === "LIST_ENTITIES") {
    return ok({
      type: "List",
      value: [{ type: "Entity", value: { id: target.id } }],
    });
  }
  if (
    aspectKey === "ITEMSTACK_ITEMFRAMECONTENTS" ||
    aspectKey === "INTEGER_ITEMFRAMEROTATION"
  ) {
    if (!isItemFrameEntity(target.id)) {
      return error(`Cannot resolve ${aspectKey} from a non-item-frame entity.`);
    }
    if (aspectKey === "ITEMSTACK_ITEMFRAMECONTENTS") {
      const contents = target.properties?.["itemFrameContents"];
      if (
        contents &&
        typeof contents === "object" &&
        (contents as { id?: string }).id
      ) {
        const item = contents as { id: string; size?: unknown };
        const size =
          typeof item.size === "number" || typeof item.size === "string"
            ? Number(item.size)
            : 1;
        return ok(itemAst(item.id, size));
      }
      return ok(itemAst("minecraft:air", 0));
    }
    return ok(intAst(getNumberProperty(target, "itemFrameRotation", 0) % 8));
  }
  if (aspectKey === "ENTITY") {
    return ok({ type: "Entity", value: { id: target.id } });
  }
  return error(`Cannot resolve ${aspectKey} from an Entity.`);
};

/* ------------------------------ FluidReader ------------------------------ */

type Tank = { fluid: string; amount: number; capacity: number };

const getTanks = (
  target: TargetDescriptor
): { tanks: Tank[]; fromNbt: boolean } => {
  const raw = target.properties?.["tanks"];
  if (Array.isArray(raw) && raw.length > 0) {
    const tanks: Tank[] = raw
      .map((entry) => {
        const t = entry as {
          fluid?: string;
          amount?: unknown;
          capacity?: unknown;
        };
        if (!t.fluid) return undefined;
        return {
          fluid: t.fluid,
          amount:
            typeof t.amount === "number" || typeof t.amount === "string"
              ? Number(t.amount)
              : 0,
          capacity:
            typeof t.capacity === "number" || typeof t.capacity === "string"
              ? Number(t.capacity)
              : 0,
        };
      })
      .filter((t): t is Tank => t !== undefined);
    if (tanks.length > 0) return { tanks, fromNbt: true };
  }
  const fluid = target.properties?.["fluid"];
  if (typeof fluid === "string" && fluid !== "") {
    const Ctor =
      blockRegistry.items[
        target.id.toLowerCase() as keyof typeof blockRegistry.items
      ];
    const capacity =
      Ctor !== undefined ? new Ctor().getFluidCapacity().toJSNumber() : 0;
    return {
      tanks: [
        {
          fluid,
          amount: getNumberProperty(target, "fluidAmount", 0),
          capacity: getNumberProperty(target, "fluidCapacity", capacity),
        },
      ],
      fromNbt: true,
    };
  }
  const Ctor =
    blockRegistry.items[
      target.id.toLowerCase() as keyof typeof blockRegistry.items
    ];
  if (Ctor !== undefined && new Ctor().getFluidCapacity().toJSNumber() > 0) {
    return {
      tanks: [
        {
          fluid: "",
          amount: 0,
          capacity: new Ctor().getFluidCapacity().toJSNumber(),
        },
      ],
      fromNbt: false,
    };
  }
  return { tanks: [], fromNbt: false };
};

const deriveFluidReaderAspect = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  target: TargetDescriptor
): ResolvedReaderSimulatedValue => {
  const { tanks } = getTanks(target);
  const tankId = Math.min(
    getAspectSetting(readerClass, aspectKey, "tankid"),
    Math.max(0, tanks.length - 1)
  );
  const active = tanks[tankId];

  const hasTank = (): ResolvedReaderSimulatedValue | undefined =>
    active ? undefined : error("Target block has no fluid tank.");

  switch (aspectKey) {
    case "BOOLEAN_APPLICABLE":
      return ok(boolAst(tanks.length > 0));
    case "INTEGER_TANKS":
      return ok(intAst(tanks.length));
    case "LIST_TANKCAPACITIES":
      return ok({ type: "List", value: tanks.map((t) => intAst(t.capacity)) });
    case "LIST_TANKFLUIDS":
      return ok({
        type: "List",
        value: tanks.map((t) => fluidAst(t.fluid, t.amount)),
      });
    case "BLOCK":
    case "FLUIDSTACK": {
      const noTank = hasTank();
      if (noTank) return noTank;
      if (!active!.fluid) {
        return error("Target block has no fluid tank.");
      }
      return ok(fluidAst(active!.fluid, active!.amount));
    }
    default: {
      const noTank = hasTank();
      if (noTank) return noTank;
      const amount = active!.amount;
      const capacity = active!.capacity;
      switch (aspectKey) {
        case "BOOLEAN_EMPTY":
          return ok(boolAst(amount <= 0));
        case "BOOLEAN_FULL":
          return ok(boolAst(capacity > 0 && amount >= capacity));
        case "BOOLEAN_NONEMPTY":
          return ok(boolAst(amount > 0));
        case "DOUBLE_FILLRATIO":
          return ok(doubleAst(capacity > 0 ? amount / capacity : 0));
        case "INTEGER_AMOUNT":
        case "INTEGER_AMOUNTTOTAL":
          return ok(intAst(amount));
        case "INTEGER_CAPACITY":
        case "INTEGER_CAPACITYTOTAL":
          return ok(intAst(capacity));
        default:
          return error(`Cannot resolve ${aspectKey} from a Block.`);
      }
    }
  }
};

/* ----------------------------- InventoryReader --------------------------- */

type Slot = { id: string; size: number };

const getInventory = (
  target: TargetDescriptor
): { slots: Slot[]; isContainer: boolean } => {
  const raw = target.properties?.["inventory"];
  const slots: Slot[] = Array.isArray(raw)
    ? raw
        .map((entry) => {
          const e = entry as { id?: string; size?: unknown };
          if (typeof e.id !== "string") return undefined;
          return {
            id: e.id,
            size:
              typeof e.size === "number" || typeof e.size === "string"
                ? Number(e.size)
                : 1,
          };
        })
        .filter((s): s is Slot => s !== undefined)
    : [];
  const Ctor =
    blockRegistry.items[
      target.id.toLowerCase() as keyof typeof blockRegistry.items
    ];
  const isContainer =
    Ctor !== undefined && new Ctor().isFeContainer().valueOf();
  return { slots, isContainer };
};

const deriveInventoryReaderAspect = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  target: TargetDescriptor
): ResolvedReaderSimulatedValue => {
  const { slots, isContainer } = getInventory(target);
  const hasInventory = slots.length > 0 || isContainer;

  const nonAir = slots.filter((slot) => !isAirId(slot.id));
  const totalCount = nonAir.reduce((sum, slot) => sum + slot.size, 0);

  switch (aspectKey) {
    case "BOOLEAN_APPLICABLE":
      return ok(boolAst(hasInventory));
    case "LIST_ITEMSTACKS":
      return ok({
        type: "List",
        value: nonAir.map((slot) => itemAst(slot.id, slot.size)),
      });
    default: {
      if (slots.length === 0) {
        return error("Target block has no inventory.");
      }
      switch (aspectKey) {
        case "BOOLEAN_EMPTY":
          return ok(boolAst(nonAir.length === 0));
        case "BOOLEAN_FULL":
          return ok(boolAst(nonAir.length === slots.length));
        case "BOOLEAN_NONEMPTY":
          return ok(boolAst(nonAir.length > 0));
        case "DOUBLE_FILLRATIO":
          return ok(
            doubleAst(slots.length > 0 ? nonAir.length / slots.length : 0)
          );
        case "INTEGER_COUNT":
          return ok(intAst(totalCount));
        case "INTEGER_SLOTS":
          return ok(intAst(slots.length));
        case "INTEGER_SLOTSFILLED":
          return ok(intAst(nonAir.length));
        case "OBJECT_ITEM_STACK_SLOT": {
          const slotId = getAspectSetting(readerClass, aspectKey, "slotid");
          const slot = slots[slotId];
          if (!slot) return ok(itemAst("minecraft:air", 0));
          return ok(itemAst(slot.id, slot.size));
        }
        default:
          return error(`Cannot resolve ${aspectKey} from a Block.`);
      }
    }
  }
};

export const assertReaderSimulatedOutputType = (
  readerClass: ReaderClassLike,
  aspectKey: string,
  simulatedOutput: { type: string } | undefined
): void => {
  if (!simulatedOutput) return;
  const aspect = readerClass.aspects[aspectKey];
  if (aspect?.signature && aspect.signature.length > 0) {
    throw new Error(
      `${aspect.fullDisplayName} does not support an overridden simulatedValue.`
    );
  }
  const expected = aspect?.outputType ?? "Any";
  if (isOutputTypeAssignable(simulatedOutput.type, expected)) return;
  const target = extractTargetDescriptor(simulatedOutput as TypeAST.AST);
  const targetTypes = READER_TARGET_TYPES[readerClass.typeName];
  if (target && targetTypes?.includes(target.type)) return;
  throw new Error(
    `Expected output type ${expected}, got simulatedOutput type ${simulatedOutput.type}`
  );
};

export type { TargetNodeType };
