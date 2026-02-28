import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { Item } from "../../IntegratedDynamicsClasses/Item";
import { itemRegistry } from "IntegratedDynamicsClasses/registries/itemRegistry";
import { blockRegistry } from "IntegratedDynamicsClasses/registries/blockRegistry";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";
import { Integer } from "../../JavaNumberClasses/Integer";
import { Double } from "../../JavaNumberClasses/Double";
import { Block } from "../../IntegratedDynamicsClasses/Block";
import { Fluid } from "../../IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ListTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ShortTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { StringTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { NullTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { fluidRegistry } from "IntegratedDynamicsClasses/registries/fluidRegistry";

/**
 * Test the different logical operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();
itemRegistry.load();
blockRegistry.load();
fluidRegistry.load();

describe("TestItemStackOperators", () => {
  let iApple: Item;
  let iAppleNoData: Item;
  let iApple2: Item;
  let iAppleTag: Item;
  let iBeef: Item;
  let iEnderPearl: Item;
  let iHoe: Item;
  let iHoe100: Item;
  let iHoeEnchanted: Item;
  let iPickaxe: Item;
  let iStone: Item;
  let iDarkOakLeaves: Item;
  let iBucketLava: Item;
  let iWrench: Item;
  let iEnergyBatteryEmpty: Item;
  let iEnergyBatteryFull: Item;
  let iIronOre: Item;
  let iShulkerBox: Item;
  let iEmpty: Item;

  let bStone: Block;
  let bObsidian: Block;

  let sPlankWood: iString;
  let sMaxStackSize: iString;

  let int100: Integer;
  let int200: Integer;

  let sApple: iString;

  let lApples: iArrayEager<Item>;

  let t4: IntTag;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    iApple = new itemRegistry.items["minecraft:apple"]();
    iAppleNoData = new itemRegistry.items["minecraft:apple"]({
      rarity: new iString(""),
      enchantable: new iBoolean(false),
      NBT: new NullTag(),
    });
    iApple2 = new itemRegistry.items["minecraft:apple"]({
      size: new Integer(2),
    });

    const appleTagNbt = new CompoundTag({}).set(
      "minecraft:ominous_bottle_amplifier",
      IntTag.valueOf(new Integer(2))
    );
    iAppleTag = new itemRegistry.items["minecraft:apple"]({ NBT: appleTagNbt });

    iBeef = new itemRegistry.items["minecraft:red_bed"]();
    iEnderPearl = new itemRegistry.items["minecraft:ender_pearl"]();
    iHoe = new itemRegistry.items["minecraft:diamond_hoe"]();
    iHoe100 = new itemRegistry.items["minecraft:diamond_hoe"]({
      damage: new Integer(100),
    });
    iHoeEnchanted = new itemRegistry.items["minecraft:diamond_hoe"]({
      enchanted: new iBoolean(true),
      repairCost: new Integer(10),
      NBT: new CompoundTag({
        Enchantments: new ListTag(
          new iArrayEager([
            new CompoundTag({
              id: new StringTag(new iString("minecraft:silk_touch")),
              lvl: new ShortTag(new Integer(1)),
            }),
          ])
        ),
      }),
    });
    iPickaxe = new itemRegistry.items["minecraft:diamond_pickaxe"]();
    iStone = new itemRegistry.items["minecraft:stone"]();
    iDarkOakLeaves = new itemRegistry.items["minecraft:dark_oak_leaves"]({
      size: new Integer(1),
    });
    iBucketLava = new itemRegistry.items["minecraft:lava_bucket"]();
    iWrench = new itemRegistry.items["integrateddynamics:wrench"]();
    iEnergyBatteryEmpty = new itemRegistry.items[
      "integrateddynamics:energy_battery"
    ]();
    iEnergyBatteryFull = new itemRegistry.items[
      "integrateddynamics:energy_battery"
    ]({
      feStored: new Integer(1000000),
    });
    iIronOre = new itemRegistry.items["minecraft:iron_ore"]();

    iShulkerBox = new itemRegistry.items["minecraft:shulker_box"]({
      inventorySize: new Integer(27),
      inventory: new iArrayEager([iApple, iBucketLava]),
    });

    iEmpty = new itemRegistry.items["minecraft:air"]();

    bStone = new blockRegistry.items["minecraft:stone"]();
    bObsidian = new blockRegistry.items["minecraft:obsidian"]();

    sPlankWood = new iString("minecraft:planks");
    sMaxStackSize = new iString("minecraft:max_stack_size");

    int100 = new Integer(100);
    int200 = new Integer(200);

    sApple = new iString("minecraft:apple");

    lApples = new iArrayEager([
      iApple,
      iApple2,
      iIronOre,
      iApple,
      iApple,
      iHoe,
      iHoe100,
      iApple2,
    ]);

    t4 = IntTag.valueOf(new Integer(4));
    DUMMY_VARIABLE = new iNull();
  });

  /**
   * ----------------------------------- SIZE -----------------------------------
   */

  it("testItemStackSize", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_SIZE().evaluate(iApple);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_SIZE().evaluate(iApple2);
    expect((res2 as Integer).toJSNumber()).toBe(2);
  });

  it("testInvalidInputSizeSizeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_SIZE().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputSizeSizeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_SIZE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSize", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_SIZE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- MAXSIZE -----------------------------------
   */

  it("testItemStackMaxSize", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_MAXSIZE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(64);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_MAXSIZE().evaluate(
      iEnderPearl
    );
    expect((res2 as Integer).toJSNumber()).toBe(16);
  });

  it("testInvalidInputMaxSizeMaxSizeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXSIZE().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputMaxSizeMaxSizeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXSIZE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeMaxSize", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXSIZE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISSTACKABLE -----------------------------------
   */

  it("testItemStackIsStackable", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISSTACKABLE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISSTACKABLE().evaluate(
      iHoe
    );
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputIsStackableIsStackableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISSTACKABLE().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsStackableIsStackableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISSTACKABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsStackable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISSTACKABLE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISDAMAGEABLE -----------------------------------
   */

  it("testItemStackIsDamageable", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISDAMAGEABLE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISDAMAGEABLE().evaluate(
      iHoe
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsDamageableIsDamageableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDAMAGEABLE().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsDamageableIsDamageableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDAMAGEABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsDamageable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDAMAGEABLE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- DAMAGE -----------------------------------
   */

  it("testItemStackDamage", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_DAMAGE().evaluate(iHoe);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_DAMAGE().evaluate(
      iHoe100
    );
    expect((res2 as Integer).toJSNumber()).toBe(100);
  });

  it("testInvalidInputDamageDamageLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DAMAGE().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputDamageDamageSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DAMAGE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDamage", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DAMAGE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- MAXDAMAGE -----------------------------------
   */

  it("testItemStackMaxDamage", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_MAXDAMAGE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_MAXDAMAGE().evaluate(
      iHoe
    );
    expect((res2 as Integer).toJSNumber()).toBe(1561);
  });

  it("testInvalidInputMaxDamageMaxDamageLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXDAMAGE().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputMaxDamageMaxDamageSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXDAMAGE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeMaxDamage", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MAXDAMAGE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISENCHANTED -----------------------------------
   */

  it("testItemStackIsEnchanted", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTED().evaluate(
      iHoe
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTED().evaluate(
      iHoeEnchanted
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsEnchantedIsEnchantedLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTED().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsEnchantedIsEnchantedSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTED().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsEnchanted", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTED().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISENCHANTABLE -----------------------------------
   */

  it("testItemStackIsEnchantable", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTABLE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTABLE().evaluate(
      iHoe
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsEnchantableIsEnchantableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTABLE().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsEnchantableIsEnchantableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsEnchantable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISENCHANTABLE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REPAIRCOST -----------------------------------
   */

  it("testItemStackRepairCost", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_REPAIRCOST().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_REPAIRCOST().evaluate(
      iHoeEnchanted
    );
    expect((res2 as Integer).toJSNumber()).toBe(10);
  });

  it("testInvalidInputRepairCostRepairCostLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_REPAIRCOST().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputRepairCostRepairCostSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_REPAIRCOST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeRepairCost", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_REPAIRCOST().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- RARITY -----------------------------------
   */

  it("testItemStackRarity", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_RARITY().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("COMMON");

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_RARITY().evaluate(
      iHoeEnchanted
    );
    expect((res2 as iString).valueOf()).toBe("RARE");
  });

  it("testInvalidInputRarityRarityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_RARITY().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputRarityRaritySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_RARITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeRarity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_RARITY().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- STRENGTH_VS_BLOCK -----------------------------------
   */

  it("testItemStackStrengthVsBlock", () => {
    const res1 =
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        iHoe,
        bStone
      );
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(1.0);

    const res2 =
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        iPickaxe,
        bStone
      );
    expect((res2 as Double).toJSNumber()).toBe(8.0);

    const res3 =
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        iPickaxe,
        bObsidian
      );
    expect((res3 as Double).toJSNumber()).toBe(8.0);
  });

  it("testInvalidInputStrengthVsBlockStrengthVsBlockLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        iApple,
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputStrengthVsBlockStrengthVsBlockSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputTypeStrengthVsBlock", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CAN_HARVEST_BLOCK -----------------------------------
   */

  it("testItemStackCanHarvestBlock", () => {
    const res1 =
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(
        iHoe,
        bStone
      );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 =
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(
        iPickaxe,
        bStone
      );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 =
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(
        iPickaxe,
        bObsidian
      );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputCanHarvestBlockCanHarvestBlockLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(
        iApple,
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputCanHarvestBlockCanHarvestBlockSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(iApple);
    }).toThrow();
  });

  it("testInvalidInputTypeCanHarvestBlock", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_CANHARVESTBLOCK().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCK -----------------------------------
   */

  it("testItemStackBlock", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_BLOCK().evaluate(iStone);
    expect(res1).toBeInstanceOf(Block);
    expect((res1 as Block).getBlockName().valueOf()).toBe("minecraft:stone");

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_BLOCK().evaluate(
      iDarkOakLeaves
    );
    expect((res2 as Block).getBlockName().valueOf()).toBe(
      "minecraft:dark_oak_leaves"
    );
  });

  it("testInvalidInputBlockBlockLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_BLOCK().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputBlockBlockSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_BLOCK().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBlock", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_BLOCK().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISFLUIDSTACK -----------------------------------
   */

  it("testItemStackIsFluidStack", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISFLUIDSTACK().evaluate(
      iHoe
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISFLUIDSTACK().evaluate(
      iBucketLava
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsFluidStackIsFluidStackLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISFLUIDSTACK().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsFluidStackIsFluidStackSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISFLUIDSTACK().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsFluidStack", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISFLUIDSTACK().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- FLUIDSTACK -----------------------------------
   */

  it("testItemStackFluidStack", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate(
      iHoe
    );
    expect(res1).toBeInstanceOf(Fluid);
    expect((res1 as Fluid).getUniqueName().valueOf()).toBe("");

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate(
      iBucketLava
    );
    expect((res2 as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:lava (1000)"
    );

    const res3 = new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate(
      iEmpty
    );
    expect((res3 as Fluid).getUniqueName().valueOf()).toBe("");
  });

  it("testInvalidInputFluidStackFluidStackLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputFluidStackFluidStackSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeFluidStack", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACK().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- FLUIDSTACK_CAPACITY -----------------------------------
   */

  it("testItemStackFluidStackCapacity", () => {
    const res1 =
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY().evaluate(iHoe);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 =
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY().evaluate(
        iBucketLava
      );
    expect((res2 as Integer).toJSNumber()).toBe(1000);
  });

  it("testInvalidInputFluidStackCapacityFluidStackCapacityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputFluidStackCapacityFluidStackCapacitySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeFluidStackCapacity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISNBTEQUAL -----------------------------------
   */

  it("testItemStackIsNBTEqual", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(
      iHoe,
      iPickaxe
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(
      iHoe,
      iHoeEnchanted
    );
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(
      iPickaxe,
      iPickaxe
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsNBTEqualIsNBTEqualLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(
        iApple,
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsNBTEqualIsNBTEqualSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(iApple);
    }).toThrow();
  });

  it("testInvalidInputTypeIsNBTEqual", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISDATAEQUAL().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISRAWITEMEQUAL -----------------------------------
   */

  it("testItemStackIsRawItemEqual", () => {
    const res1 =
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        iHoe,
        iPickaxe
      );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 =
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        iHoe,
        iHoeEnchanted
      );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 =
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        iPickaxe,
        iPickaxe
      );
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 =
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        iHoe,
        iHoe100
      );
    expect((res4 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputIsRawItemEqualIsRawItemEqualLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        iApple,
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputIsRawItemEqualIsRawItemEqualSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(iApple);
    }).toThrow();
  });

  it("testInvalidInputTypeIsRawItemEqual", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_ISRAWITEMEQUAL().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- MODNAME -----------------------------------
   */

  it("testItemStackModName", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_MODNAME().evaluate(iHoe);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("Minecraft");

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_MODNAME().evaluate(
      iWrench
    );
    expect((res2 as iString).valueOf()).toBe("IntegratedDynamics");
  });

  it("testInvalidInputSizeModNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MODNAME().evaluate(iHoe, iHoe);
    }).toThrow();
  });

  it("testInvalidInputSizeModNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MODNAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeModName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_MODNAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FUELBURNTIME -----------------------------------
   */

  it("testItemStackFuelBurnTime", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_FUELBURNTIME().evaluate(
      iBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(20000);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_FUELBURNTIME().evaluate(
      iApple
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputFuelBurnTimeFuelBurnTimeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FUELBURNTIME().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputFuelBurnTimeFuelBurnTimeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FUELBURNTIME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeFuelBurnTime", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FUELBURNTIME().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CANBURN -----------------------------------
   */

  it("testItemStackCanBurn", () => {
    const res1 = new operatorRegistry.ITEMSTACK_CANBURN().evaluate(iBucketLava);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.ITEMSTACK_CANBURN().evaluate(iApple);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputCanBurnCanBurnLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_CANBURN().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputCanBurnCanBurnSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_CANBURN().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeCanBurn", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_CANBURN().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG -----------------------------------
   */

  it("testItemStackTag", () => {
    const res1 = new operatorRegistry.ITEMSTACK_TAG().evaluate(iStone);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(2);

    const res2 = new operatorRegistry.ITEMSTACK_TAG().evaluate(iWrench);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizeTagLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TAG().evaluate(iHoe, iHoe);
    }).toThrow();
  });

  it("testInvalidInputSizeTagSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TAG().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTag", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TAG().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG_STACKS -----------------------------------
   */

  it("testItemStackTagStacks", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_TAG_STACKS().evaluate(
      sPlankWood
    );
    expect(res1).toBeInstanceOf(iArrayEager);

    const expectedCount = Object.values(itemRegistry.items).filter(
      (ItemClass) => {
        const item = new (ItemClass as any)();
        return item.getTagNames().includes(sPlankWood).valueOf();
      }
    ).length;

    expect((res1 as iArrayEager<Item>).size().toJSNumber()).toBe(expectedCount);
  });

  it("testInvalidInputSizeTagStacksLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_TAG_STACKS().evaluate(
        sPlankWood,
        sPlankWood
      );
    }).toThrow();
  });

  it("testInvalidInputSizeTagStacksSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_TAG_STACKS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTagStacks", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_TAG_STACKS().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITHSIZE -----------------------------------
   */

  it("testItemStackWithSize", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_WITHSIZE().evaluate(
      iApple,
      int100
    );
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getSize().toJSNumber()).toBe(100);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_WITHSIZE().evaluate(
      iBeef,
      int200
    );
    expect((res2 as Item).getSize().toJSNumber()).toBe(200);
  });

  it("testInvalidInputSizeWithSizeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_WITHSIZE().evaluate(
        iApple,
        int100,
        int100
      );
    }).toThrow();
  });

  it("testInvalidInputSizeWithSizeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_WITHSIZE().evaluate(iApple);
    }).toThrow();
  });

  it("testInvalidInputTypeWithSize", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_WITHSIZE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISFECONTAINER -----------------------------------
   */

  it("testItemStackIsFeContainer", () => {
    const res1 = new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate(
      iEnergyBatteryEmpty
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate(
      iEnergyBatteryFull
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsFeContainerLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputSizeIsFeContainerSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsFeContainer", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ISFECONTAINER().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- STOREDFE -----------------------------------
   */

  it("testItemStackStoredFe", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate(
      iEnergyBatteryEmpty
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate(
      iEnergyBatteryFull
    );
    expect((res3 as Integer).toJSNumber()).toBe(1000000);
  });

  it("testInvalidInputSizeStoredFeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate(
        iEnergyBatteryEmpty,
        iEnergyBatteryEmpty
      );
    }).toThrow();
  });

  it("testInvalidInputSizeStoredFeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeStoredFe", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_STORED_FE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- FECAPACITY -----------------------------------
   */

  it("testItemStackFeCapacity", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate(
      iEnergyBatteryEmpty
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate(
      iEnergyBatteryFull
    );
    expect((res3 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeFeCapacityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate(
        iEnergyBatteryEmpty,
        iEnergyBatteryEmpty
      );
    }).toThrow();
  });

  it("testInvalidInputSizeFeCapacitySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeFeCapacity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_FE_CAPACITY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- HASINVENTORY -----------------------------------
   */

  it("testItemStackHasInventory", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_HASINVENTORY().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_HASINVENTORY().evaluate(
      iShulkerBox
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeHasInventoryLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASINVENTORY().evaluate(
        iApple,
        int100
      );
    }).toThrow();
  });

  it("testInvalidInputSizeHasInventorySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASINVENTORY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHasInventory", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASINVENTORY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INVENTORYSIZE -----------------------------------
   */

  it("testItemStackInventorySize", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_INVENTORYSIZE().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_INVENTORYSIZE().evaluate(
      iShulkerBox
    );
    expect((res2 as Integer).toJSNumber()).toBe(27);
  });

  it("testInvalidInputSizeInventorySizeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORYSIZE().evaluate(
        iApple,
        int100
      );
    }).toThrow();
  });

  it("testInvalidInputSizeInventorySizeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORYSIZE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeInventorySize", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORYSIZE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INVENTORY -----------------------------------
   */

  it("testItemStackInventory", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate(
      iApple
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate(
      iShulkerBox
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(2);

    const res3 = new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate(
      iShulkerBox
    );
    expect((res3 as iArrayEager<Item>).get(new Integer(1))).toBeInstanceOf(
      Item
    );
  });

  it("testInvalidInputInventoryLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate(
        iApple,
        int100
      );
    }).toThrow();
  });

  it("testInvalidInputInventorySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeInventory", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_INVENTORY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ITEMBYNAME -----------------------------------
   */

  it("testItemItemByName", () => {
    const res1 = new operatorRegistry.ITEMSTACK_ITEMBYNAME().evaluate(sApple);
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getName().valueOf()).toBe("Apple");
  });

  it("testInvalidInputSizeItemByNameLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMBYNAME().evaluate(sApple, sApple);
    }).toThrow();
  });

  it("testInvalidInputSizeItemByNameSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMBYNAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeItemByName", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMBYNAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- LIST_COUNT -----------------------------------
   */

  it("testItemStackListCount", () => {
    const res1 = new operatorRegistry.ITEMSTACK_ITEMLISTCOUNT().evaluate(
      lApples,
      iApple
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(7);

    const res2 = new operatorRegistry.ITEMSTACK_ITEMLISTCOUNT().evaluate(
      lApples,
      iStone
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeListCountLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMLISTCOUNT().evaluate(
        lApples,
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputSizeListCountSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMLISTCOUNT().evaluate(lApples);
    }).toThrow();
  });

  it("testInvalidInputTypeListCount", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_ITEMLISTCOUNT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- NBT -----------------------------------
   */

  it("testItemStackNbt", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_NBT().evaluate(
      iAppleNoData
    );
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_NBT().evaluate(
      iEnergyBatteryFull
    );
    expect(res2).not.toBeInstanceOf(NullTag);
  });

  it("testInvalidInputNbtNbtLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_NBT().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputNbtNbtSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_NBT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbt", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_NBT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HASNBT -----------------------------------
   */

  it("testItemStackHasNbt", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_HASNBT().evaluate(
      iAppleNoData
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_HASNBT().evaluate(
      iAppleTag
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputHasNbtHasNbtLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASNBT().evaluate(iApple, iApple);
    }).toThrow();
  });

  it("testInvalidInputHasNbtHasNbtSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASNBT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHasNbt", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_HASNBT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- NBT_KEYS -----------------------------------
   */

  it("testItemStackDataKeys", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMSTACK_DATA_KEYS().evaluate(
      iAppleNoData
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_ITEMSTACK_DATA_KEYS().evaluate(
      iAppleTag
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(2);
  });

  it("testInvalidInputDataKeysDataKeysLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DATA_KEYS().evaluate(
        iApple,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputDataKeysDataKeysSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DATA_KEYS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDataKeys", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMSTACK_DATA_KEYS().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- NBT_VALUE -----------------------------------
   */

  it("testItemStackDataValue", () => {
    const res1 = new operatorRegistry.ITEMSTACK_DATAVALUE().evaluate(
      iAppleNoData,
      sMaxStackSize
    );
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.ITEMSTACK_DATAVALUE().evaluate(
      iAppleTag,
      new iString("minecraft:ominous_bottle_amplifier")
    );
    expect(res2).toBeInstanceOf(IntTag);
    expect((res2 as IntTag).valueOf().toJSNumber()).toBe(2);
  });

  it("testInvalidInputDataValueDataValueLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_DATAVALUE().evaluate(
        iApple,
        sMaxStackSize,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputDataValueDataValueSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_DATAVALUE().evaluate(iApple);
    }).toThrow();
  });

  it("testInvalidInputTypeDataValue", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_DATAVALUE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_NBT -----------------------------------
   */

  it("testItemStackWithData", () => {
    const res1 = new operatorRegistry.ITEMSTACK_WITHDATA().evaluate(
      iAppleNoData,
      sMaxStackSize,
      t4
    );
    expect(res1).toBeInstanceOf(Item);
    const retrievedTag = ((res1 as Item).getNBT() as CompoundTag).get(
      sMaxStackSize
    );
    expect(retrievedTag.valueOf().equals(t4.valueOf()).valueOf()).toBe(true);
  });

  it("testInvalidInputWithDataWithDataLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_WITHDATA().evaluate(
        iApple,
        sMaxStackSize,
        t4,
        iApple
      );
    }).toThrow();
  });

  it("testInvalidInputWithDataWithDataSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_WITHDATA().evaluate(iApple, sMaxStackSize);
    }).toThrow();
  });

  it("testInvalidInputTypeWithData", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_WITHDATA().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- TOOLTIPLINES -----------------------------------
   */

  it("testItemStackTooltip", () => {
    const res1 = new operatorRegistry.ITEMSTACK_TOOLTIP().evaluate(iPickaxe);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(7);

    const res2 = new operatorRegistry.ITEMSTACK_TOOLTIP().evaluate(iApple);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(2);
  });

  it("testInvalidInputSizeTooltipLarge", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TOOLTIP().evaluate(iPickaxe, iPickaxe);
    }).toThrow();
  });

  it("testInvalidInputSizeTooltipSmall", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TOOLTIP().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTooltip", () => {
    expect(() => {
      new operatorRegistry.ITEMSTACK_TOOLTIP().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
});
