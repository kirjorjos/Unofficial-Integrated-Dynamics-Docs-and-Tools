import { BlockReader } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockReader";
import { EntityReader } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityReader";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidReader";
import { InventoryReader } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneReader";
import { parseSimulatedValueText } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import {
  assertReaderSimulatedOutputType,
  getReaderTargetTypes,
  isResolvedReaderSimulatedValueError,
  resolveReaderSimulatedValue,
} from "lib/IntegratedDynamicsClasses/readers/readerSimulatedValueResolver";
import type { AspectStatic } from "lib/IntegratedDynamicsClasses/readers/AspectBase";

const parseAst = (text: string): TypeAST.AST => {
  const result = parseSimulatedValueText(text);
  if (!result.ok || !result.ast) {
    throw new Error(`Failed to parse "${text}": ${JSON.stringify(result)}`);
  }
  return result.ast;
};

describe("getReaderTargetTypes", () => {
  it("exposesAcceptedTargetTypesPerReader", () => {
    expect(getReaderTargetTypes(BlockReader)).toEqual(["Block"]);
    expect(getReaderTargetTypes(EntityReader)).toEqual(["Entity"]);
    expect(getReaderTargetTypes(FluidReader)).toEqual(["Block"]);
    expect(getReaderTargetTypes(InventoryReader)).toEqual(["Block"]);
  });

  it("isUndefinedForReadersWithoutTarget", () => {
    expect(getReaderTargetTypes(RedstoneReader)).toBeUndefined();
    expect(getReaderTargetTypes(NetworkReader)).toBeUndefined();
  });
});

describe("returnInputPath", () => {
  it("returnsBlockForBlockReaderBlockAspect", () => {
    const input = parseAst(`block "minecraft:stone"`);
    const result = resolveReaderSimulatedValue(BlockReader, "BLOCK", input);
    expect(result).toEqual({ ok: true, value: input });
  });

  it("returnsEntityForEntityReaderEntityAspect", () => {
    const input = parseAst(`entity "minecraft:cow"`);
    const result = resolveReaderSimulatedValue(EntityReader, "ENTITY", input);
    expect(result).toEqual({ ok: true, value: input });
  });

  it("returnsFluidForFluidReaderBlockFluidAspect", () => {
    const input = parseAst(`fluid "minecraft:water"`);
    const result = resolveReaderSimulatedValue(FluidReader, "BLOCK", input);
    expect(result).toEqual({ ok: true, value: input });
  });

  it("returnsPlainValueForNonTargetReaders", () => {
    const input = parseAst("5");
    const result = resolveReaderSimulatedValue(
      RedstoneReader,
      "INTEGER_VALUE",
      input
    );
    expect(result).toEqual({ ok: true, value: input });
  });
});

describe("blockReaderDerivation", () => {
  it("derivesBooleanBlockTrueFromAnyBlock", () => {
    const result = resolveReaderSimulatedValue(
      BlockReader,
      "BOOLEAN_BLOCK",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Boolean", value: true },
    });
  });

  it("derivesNbtFromBlockWithNbtData", () => {
    const result = resolveReaderSimulatedValue(
      BlockReader,
      "NBT",
      parseAst(`block "minecraft:chest" {"foo":1}`)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "NBT", value: { foo: 1 } },
    });
  });

  it("errorsOnNbtForBlockWithNoNbtData", () => {
    const result = resolveReaderSimulatedValue(
      BlockReader,
      "NBT",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain("no NBT data");
    }
  });

  it("errorsOnNonDerivableWorldPositionAspects", () => {
    const result = resolveReaderSimulatedValue(
      BlockReader,
      "INTEGER_LIGHT",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain(
        "Cannot resolve INTEGER_LIGHT from a Block"
      );
    }
  });
});

describe("entityReaderDerivation", () => {
  it("derivesListEntitiesAsSingleElementList", () => {
    const result = resolveReaderSimulatedValue(
      EntityReader,
      "LIST_ENTITIES",
      parseAst(`entity "minecraft:cow"`)
    );
    expect(result).toEqual({
      ok: true,
      value: {
        type: "List",
        value: [{ type: "Entity", value: { id: "minecraft:cow" } }],
      },
    });
  });

  it("derivesItemFrameRotationFromItemFrame", () => {
    const result = resolveReaderSimulatedValue(
      EntityReader,
      "INTEGER_ITEMFRAMEROTATION",
      parseAst(`entity "minecraft:item_frame" {"itemFrameRotation":3}`)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Integer", value: "3" },
    });
  });

  it("derivesItemFrameContentsFromItemFrame", () => {
    const result = resolveReaderSimulatedValue(
      EntityReader,
      "ITEMSTACK_ITEMFRAMECONTENTS",
      parseAst(
        `entity "minecraft:item_frame" {"itemFrameContents":{"id":"minecraft:apple","size":2}}`
      )
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Item", value: { id: "minecraft:apple", size: "2" } },
    });
  });

  it("errorsOnItemFrameAspectsForNonItemFrameEntities", () => {
    const result = resolveReaderSimulatedValue(
      EntityReader,
      "INTEGER_ITEMFRAMEROTATION",
      parseAst(`entity "minecraft:cow"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain("non-item-frame");
    }
  });

  it("errorsOnUnknownEntities", () => {
    const result = resolveReaderSimulatedValue(
      EntityReader,
      "LIST_ENTITIES",
      parseAst(`entity "minecraft:not_a_real_entity"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain(
        'Unknown entity "minecraft:not_a_real_entity"'
      );
    }
  });
});

describe("inventoryReaderDerivation", () => {
  const chestWithInventory = `block "minecraft:chest" {"inventory":[{"id":"minecraft:stone","size":5},{"id":"minecraft:apple","size":2},{"id":"minecraft:air","size":0}]}`;

  it("derivesIntegerCountFromNbtInventory", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "INTEGER_COUNT",
      parseAst(chestWithInventory)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Integer", value: "7" },
    });
  });

  it("derivesIntegerSlotsAndSlotsFilled", () => {
    const slots = resolveReaderSimulatedValue(
      InventoryReader,
      "INTEGER_SLOTS",
      parseAst(chestWithInventory)
    );
    expect(slots).toEqual({ ok: true, value: { type: "Integer", value: "3" } });
    const filled = resolveReaderSimulatedValue(
      InventoryReader,
      "INTEGER_SLOTSFILLED",
      parseAst(chestWithInventory)
    );
    expect(filled).toEqual({
      ok: true,
      value: { type: "Integer", value: "2" },
    });
  });

  it("derivesBooleanEmptyFullAndFillRatio", () => {
    const empty = resolveReaderSimulatedValue(
      InventoryReader,
      "BOOLEAN_EMPTY",
      parseAst(chestWithInventory)
    );
    expect(empty).toEqual({
      ok: true,
      value: { type: "Boolean", value: false },
    });
    const full = resolveReaderSimulatedValue(
      InventoryReader,
      "BOOLEAN_FULL",
      parseAst(chestWithInventory)
    );
    expect(full).toEqual({
      ok: true,
      value: { type: "Boolean", value: false },
    });
    const ratio = resolveReaderSimulatedValue(
      InventoryReader,
      "DOUBLE_FILLRATIO",
      parseAst(chestWithInventory)
    );
    expect(ratio).toEqual({
      ok: true,
      value: { type: "Double", value: "0.6666666666666666" },
    });
  });

  it("derivesListItemStacksWithoutAirSlots", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "LIST_ITEMSTACKS",
      parseAst(chestWithInventory)
    );
    expect(result).toEqual({
      ok: true,
      value: {
        type: "List",
        value: [
          { type: "Item", value: { id: "minecraft:stone", size: "5" } },
          { type: "Item", value: { id: "minecraft:apple", size: "2" } },
        ],
      },
    });
  });

  it("derivesObjectItemStackSlotFromSlotidSetting", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "OBJECT_ITEM_STACK_SLOT",
      parseAst(chestWithInventory)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Item", value: { id: "minecraft:stone", size: "5" } },
    });

    const slotOneReader = {
      typeName: "InventoryReader",
      aspects: {
        OBJECT_ITEM_STACK_SLOT: {
          ...(InventoryReader.aspects[
            "OBJECT_ITEM_STACK_SLOT"
          ] as AspectStatic),
          settings: { slotid: 1 },
        },
      },
    };
    const slotOne = resolveReaderSimulatedValue(
      slotOneReader,
      "OBJECT_ITEM_STACK_SLOT",
      parseAst(chestWithInventory)
    );
    expect(slotOne).toEqual({
      ok: true,
      value: { type: "Item", value: { id: "minecraft:apple", size: "2" } },
    });
  });

  it("errorsWhenTargetBlockHasNoInventoryData", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "INTEGER_COUNT",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain("no inventory");
    }
  });

  it("treatsRegistryContainersAsApplicable", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "BOOLEAN_APPLICABLE",
      parseAst(`block "minecraft:chest"`)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Boolean", value: true },
    });
  });
});

describe("fluidReaderDerivation", () => {
  const tankedBlock = `block "minecraft:chest" {"tanks":[{"fluid":"minecraft:water","amount":500,"capacity":1000}]}`;

  it("derivesIntegerAmountAndCapacityFromActiveTank", () => {
    const amount = resolveReaderSimulatedValue(
      FluidReader,
      "INTEGER_AMOUNT",
      parseAst(tankedBlock)
    );
    expect(amount).toEqual({
      ok: true,
      value: { type: "Integer", value: "500" },
    });
    const capacity = resolveReaderSimulatedValue(
      FluidReader,
      "INTEGER_CAPACITY",
      parseAst(tankedBlock)
    );
    expect(capacity).toEqual({
      ok: true,
      value: { type: "Integer", value: "1000" },
    });
  });

  it("derivesBooleanEmptyFullAndFillRatio", () => {
    const empty = resolveReaderSimulatedValue(
      FluidReader,
      "BOOLEAN_EMPTY",
      parseAst(tankedBlock)
    );
    expect(empty).toEqual({
      ok: true,
      value: { type: "Boolean", value: false },
    });
    const ratio = resolveReaderSimulatedValue(
      FluidReader,
      "DOUBLE_FILLRATIO",
      parseAst(tankedBlock)
    );
    expect(ratio).toEqual({
      ok: true,
      value: { type: "Double", value: "0.5" },
    });
  });

  it("derivesIntegerTanksAndListTankFluidsAcrossTanks", () => {
    const twoTanks = `block "minecraft:chest" {"tanks":[{"fluid":"minecraft:water","amount":500,"capacity":1000},{"fluid":"minecraft:lava","amount":0,"capacity":1000}]}`;
    const count = resolveReaderSimulatedValue(
      FluidReader,
      "INTEGER_TANKS",
      parseAst(twoTanks)
    );
    expect(count).toEqual({ ok: true, value: { type: "Integer", value: "2" } });
    const fluids = resolveReaderSimulatedValue(
      FluidReader,
      "LIST_TANKFLUIDS",
      parseAst(twoTanks)
    );
    expect(fluids).toEqual({
      ok: true,
      value: {
        type: "List",
        value: [
          { type: "Fluid", value: { id: "minecraft:water", amount: "500" } },
          { type: "Fluid", value: { id: "minecraft:lava", amount: "0" } },
        ],
      },
    });
  });

  it("derivesBlockFluidStackFromActiveTank", () => {
    const result = resolveReaderSimulatedValue(
      FluidReader,
      "BLOCK",
      parseAst(tankedBlock)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Fluid", value: { id: "minecraft:water", amount: "500" } },
    });
  });

  it("errorsWhenTargetBlockHasNoFluidTank", () => {
    const result = resolveReaderSimulatedValue(
      FluidReader,
      "BLOCK",
      parseAst(`block "minecraft:chest"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain("no fluid tank");
    }
  });

  it("derivesBooleanApplicableFalseForBlockWithNoTank", () => {
    const result = resolveReaderSimulatedValue(
      FluidReader,
      "BOOLEAN_APPLICABLE",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result).toEqual({
      ok: true,
      value: { type: "Boolean", value: false },
    });
  });
});

describe("errorCases", () => {
  it("rejectsValuesNeitherOutputTypeNorTarget", () => {
    const result = resolveReaderSimulatedValue(
      InventoryReader,
      "INTEGER_COUNT",
      parseAst(`"hello"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toBe(
        "Expected output type Integer, got simulatedOutput type String"
      );
    }
  });

  it("rejectsTargetInputsForReadersWithoutTargetType", () => {
    const result = resolveReaderSimulatedValue(
      RedstoneReader,
      "INTEGER_VALUE",
      parseAst(`block "minecraft:stone"`)
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toBe(
        "Expected output type Integer, got simulatedOutput type Block"
      );
    }
  });

  it("rejectsOverriddenSimulatedValuesOnOperatorAspects", () => {
    const result = resolveReaderSimulatedValue(
      NetworkReader,
      "OPERATOR_GETVARIABLEBYID",
      parseAst("5")
    );
    expect(result.ok).toBe(false);
    if (isResolvedReaderSimulatedValueError(result)) {
      expect(result.error).toContain(
        "does not support an overridden simulatedValue"
      );
    }
  });
});

describe("assertReaderSimulatedOutputType", () => {
  it("passesForOutputTypeValues", () => {
    expect(() =>
      assertReaderSimulatedOutputType(
        InventoryReader,
        "INTEGER_COUNT",
        parseAst("5")
      )
    ).not.toThrow();
  });

  it("passesForTargetTypeInputs", () => {
    expect(() =>
      assertReaderSimulatedOutputType(
        InventoryReader,
        "INTEGER_COUNT",
        parseAst(`block "minecraft:chest"`)
      )
    ).not.toThrow();
  });

  it("passesForTargetInputsWrappedInCurryWithNbt", () => {
    expect(() =>
      assertReaderSimulatedOutputType(
        InventoryReader,
        "INTEGER_COUNT",
        parseAst(`block "minecraft:chest" {"inventory":[]}`)
      )
    ).not.toThrow();
  });

  it("throwsForValuesNeitherOutputTypeNorTarget", () => {
    expect(() =>
      assertReaderSimulatedOutputType(
        InventoryReader,
        "INTEGER_COUNT",
        parseAst(`"hello"`)
      )
    ).toThrow("Expected output type Integer, got simulatedOutput type String");
  });

  it("throwsForOverriddenSimulatedValuesOnOperatorAspects", () => {
    expect(() =>
      assertReaderSimulatedOutputType(
        NetworkReader,
        "OPERATOR_GETVARIABLEBYID",
        parseAst("5")
      )
    ).toThrow("does not support an overridden simulatedValue");
  });
});
