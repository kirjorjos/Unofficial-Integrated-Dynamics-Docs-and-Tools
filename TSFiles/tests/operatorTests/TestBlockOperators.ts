import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { blockRegistry } from "IntegratedDynamicsClasses/registries/blockRegistry";
import { itemRegistry } from "IntegratedDynamicsClasses/registries/itemRegistry";
import { fluidRegistry } from "IntegratedDynamicsClasses/registries/fluidRegistry";
import { Block } from "../../IntegratedDynamicsClasses/Block";
import { Item } from "../../IntegratedDynamicsClasses/Item";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";
import { Integer } from "../../JavaNumberClasses/Integer";
import { CompoundTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { StringTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { ListTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

/**
 * Test the different block operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();
blockRegistry.load();
itemRegistry.load();
fluidRegistry.load();

describe("TestBlockOperators", () => {
  let bAir: Block;
  let bCoal: Block;
  let bDarkOakLeaves: Block;
  let bLogicProgrammer: Block;
  let bLeaves: Block;
  let bReed: Block;
  let bSand: Block;
  let bCarrot: Block;
  let bCarrotGrown: Block;

  let sSponge: iString;
  let sSand: iString;

  let nbtCarrotGrown: CompoundTag;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    bAir = new blockRegistry.items["minecraft:air"]();
    bCoal = new blockRegistry.items["minecraft:coal_block"]();
    bDarkOakLeaves = new blockRegistry.items["minecraft:dark_oak_leaves"]();
    bLogicProgrammer = new blockRegistry.items[
      "integrateddynamics:logic_programmer"
    ]();
    bLeaves = new blockRegistry.items["minecraft:oak_leaves"]();
    bReed = new blockRegistry.items["minecraft:sugar_cane"]();
    bSand = new blockRegistry.items["minecraft:sand"]();
    bCarrot = new blockRegistry.items["minecraft:carrots"]();
    bCarrotGrown = new blockRegistry.items["minecraft:carrots"]({
      plantAge: new Integer(1),
      age: new Integer(1),
    });

    sSponge = new iString("minecraft:sponge");
    sSand = new iString("minecraft:sand");

    nbtCarrotGrown = new CompoundTag({
      age: new IntTag(new Integer(1)),
      plantAge: new IntTag(new Integer(1)),
    });

    DUMMY_VARIABLE = new iNull();
  });

  /**
   * ----------------------------------- OPAQUE -----------------------------------
   */

  it("testBlockOpaque", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_OPAQUE().evaluate(bAir);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_BLOCK_OPAQUE().evaluate(bCoal);
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeOpaqueLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_OPAQUE().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeOpaqueSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_OPAQUE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeOpaque", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_OPAQUE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ITEMSTACK -----------------------------------
   */

  it("testBlockItemStack", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate(bAir);
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe("minecraft:air");

    const res2 = new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate(bCoal);
    expect((res2 as Item).getUniqueName().valueOf()).toBe(
      "minecraft:coal_block"
    );

    const res3 = new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate(
      bDarkOakLeaves
    );
    expect((res3 as Item).getUniqueName().valueOf()).toBe(
      "minecraft:dark_oak_leaves"
    );
  });

  it("testInvalidInputSizeItemStackLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeItemStackSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeItemStack", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ITEMSTACK().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- MODNAME -----------------------------------
   */

  it("testBlockModName", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_MODNAME().evaluate(bAir);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("Minecraft");

    const res2 = new operatorRegistry.OBJECT_BLOCK_MODNAME().evaluate(
      bLogicProgrammer
    );
    expect((res2 as iString).valueOf()).toBe("IntegratedDynamics");
  });

  it("testInvalidInputSizeModNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_MODNAME().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeModNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_MODNAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeModName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_MODNAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- SOUNDS -----------------------------------
   */

  it("testBlockSound", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_BREAKSOUND().evaluate(bCoal);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("minecraft:block.stone.break");

    const res2 = new operatorRegistry.OBJECT_BLOCK_PLACESOUND().evaluate(bCoal);
    expect((res2 as iString).valueOf()).toBe("minecraft:block.stone.place");

    const res3 = new operatorRegistry.OBJECT_BLOCK_STEPSOUND().evaluate(bCoal);
    expect((res3 as iString).valueOf()).toBe("minecraft:block.stone.step");
  });

  it("testInvalidInputSizeSoundLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BREAKSOUND().evaluate(bAir, bAir);
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLACESOUND().evaluate(bAir, bAir);
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_STEPSOUND().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeSoundSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BREAKSOUND().evaluate();
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLACESOUND().evaluate();
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_STEPSOUND().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSound", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BREAKSOUND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLACESOUND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_STEPSOUND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISSHEARABLE -----------------------------------
   */

  it("testBlockIsShearable", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_ISSHEARABLE().evaluate(bAir);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_BLOCK_ISSHEARABLE().evaluate(
      bLeaves
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsShearableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISSHEARABLE().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeIsShearableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISSHEARABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsShearable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISSHEARABLE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISPLANTABLE -----------------------------------
   */

  it("testBlockIsPlantable", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_ISPLANTABLE().evaluate(bAir);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_BLOCK_ISPLANTABLE().evaluate(
      bReed
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsPlantableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISPLANTABLE().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizeIsPlantableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISPLANTABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsPlantable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_ISPLANTABLE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- PLANTTYPE -----------------------------------
   */

  it("testBlockPlantType", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_PLANTTYPE().evaluate(bAir);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("none");

    const res2 = new operatorRegistry.OBJECT_BLOCK_PLANTTYPE().evaluate(bReed);
    expect((res2 as iString).valueOf()).toBe("beach");
  });

  it("testInvalidInputSizePlantTypeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTTYPE().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizePlantTypeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTTYPE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypePlantType", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTTYPE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- PLANT -----------------------------------
   */

  it("testBlockPlant", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_PLANT().evaluate(bAir);
    expect(res1).toBeInstanceOf(Block);
    expect((res1 as Block).getUniqueName().valueOf()).toBe("");

    const res2 = new operatorRegistry.OBJECT_BLOCK_PLANT().evaluate(bReed);
    expect((res2 as Block).getUniqueName().valueOf()).toBe(
      "minecraft:sugar_cane"
    );
  });

  it("testInvalidInputSizePlantLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANT().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizePlantSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypePlant", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- PLANTAGE -----------------------------------
   */

  it("testBlockPlantAge", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate(bAir);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate(bCarrot);
    expect((res2 as Integer).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate(
      bCarrotGrown
    );
    expect((res3 as Integer).toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizePlantAgeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate(bAir, bAir);
    }).toThrow();
  });

  it("testInvalidInputSizePlantAgeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypePlantAge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PLANTAGE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCKBYNAME -----------------------------------
   */

  it("testBlockBlockByName", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_BY_NAME().evaluate(sSponge);
    expect(res1).toBeInstanceOf(Block);
    expect((res1 as Block).getUniqueName().valueOf()).toBe("minecraft:sponge");
  });

  it("testInvalidInputSizeBlockByNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BY_NAME().evaluate(sSponge, sSponge);
    }).toThrow();
  });

  it("testInvalidInputSizeBlockByNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BY_NAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBlockByName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_BY_NAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCK_PROPERTIES -----------------------------------
   */

  it("testBlockBlockProperties", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_PROPERTIES().evaluate(
      bCarrotGrown
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    expect(
      ((res1 as CompoundTag).get(new iString("age")) as IntTag)
        .valueOf()
        .toJSNumber()
    ).toBe(1);
    expect(
      ((res1 as CompoundTag).get(new iString("plantAge")) as IntTag)
        .valueOf()
        .toJSNumber()
    ).toBe(1);
  });

  it("testInvalidInputSizeBlockPropertiesLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PROPERTIES().evaluate(bLeaves, bLeaves);
    }).toThrow();
  });

  it("testInvalidInputSizeBlockPropertiesSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PROPERTIES().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBlockProperties", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_PROPERTIES().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCK_WITH_PROPERTIES -----------------------------------
   */

  it("testBlockBlockWithProperties", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_WITH_PROPERTIES().evaluate(
      bCarrot,
      nbtCarrotGrown
    );
    expect(res1).toBeInstanceOf(Block);
    expect((res1 as Block).getPlantAge().toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizeBlockWithPropertiesLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_WITH_PROPERTIES().evaluate(
        bLeaves,
        nbtCarrotGrown,
        bLeaves
      );
    }).toThrow();
  });

  it("testInvalidInputSizeBlockWithPropertiesSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_WITH_PROPERTIES().evaluate(bLeaves);
    }).toThrow();
  });

  it("testInvalidInputTypeBlockWithProperties", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_WITH_PROPERTIES().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCK_POSSIBLE_PROPERTIES -----------------------------------
   */

  it("testBlockBlockPossibleProperties", () => {
    const res1 =
      new operatorRegistry.OBJECT_BLOCK_POSSIBLE_PROPERTIES().evaluate(
        bCarrotGrown
      );
    expect(res1).toBeInstanceOf(CompoundTag);

    const ageList = (res1 as CompoundTag).get(new iString("age")) as ListTag;
    expect(ageList).toBeInstanceOf(ListTag);
    const vals = (ageList.valueOf().valueOf() as Array<Tag<any>>).map((v) =>
      (v as StringTag).valueOf().valueOf()
    );
    expect(vals).toEqual(["0", "1", "2", "3", "4", "5", "6", "7"]);
  });

  it("testInvalidInputSizeBlockPossiblePropertiesLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_POSSIBLE_PROPERTIES().evaluate(
        bLeaves,
        bLeaves
      );
    }).toThrow();
  });

  it("testInvalidInputSizeBlockPossiblePropertiesSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_POSSIBLE_PROPERTIES().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBlockPossibleProperties", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_POSSIBLE_PROPERTIES().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG -----------------------------------
   */

  it("testBlockTag", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_TAG().evaluate(bSand);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(14);

    const res2 = new operatorRegistry.OBJECT_BLOCK_TAG().evaluate(bLeaves);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(5);
  });

  it("testInvalidInputSizeTagLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG().evaluate(bLeaves, bLeaves);
    }).toThrow();
  });

  it("testInvalidInputSizeTagSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTag", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG_STACKS -----------------------------------
   */

  it("testBlockTagStacks", () => {
    const res1 = new operatorRegistry.OBJECT_BLOCK_TAG_STACKS().evaluate(sSand);
    expect(res1).toBeInstanceOf(iArrayEager);

    const expectedCount = Object.values(blockRegistry.items).filter(
      (BlockClass) => {
        const block = new (BlockClass as any)();
        return block.getTagNames().includes(sSand).valueOf();
      }
    ).length;

    expect((res1 as iArrayEager<Block>).size().toJSNumber()).toBe(
      expectedCount
    );
  });

  it("testInvalidInputSizeTagStacksLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG_STACKS().evaluate(sSand, sSand);
    }).toThrow();
  });

  it("testInvalidInputSizeTagStacksSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG_STACKS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTagStacks", () => {
    expect(() => {
      new operatorRegistry.OBJECT_BLOCK_TAG_STACKS().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
});
