import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { fluidRegistry } from "IntegratedDynamicsClasses/registries/fluidRegistry";
import { blockRegistry } from "IntegratedDynamicsClasses/registries/blockRegistry";
import { itemRegistry } from "IntegratedDynamicsClasses/registries/itemRegistry";
import { Fluid } from "../../IntegratedDynamicsClasses/Fluid";
import { Block } from "../../IntegratedDynamicsClasses/Block";
import { Item } from "../../IntegratedDynamicsClasses/Item";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";
import { Integer } from "../../JavaNumberClasses/Integer";
import { CompoundTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { NullTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

/**
 * Test the different fluid stack operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();
fluidRegistry.load();
blockRegistry.load();
itemRegistry.load();

describe("TestFluidStackOperators", () => {
  let eBucketLava: Fluid;
  let eBucketWater: Fluid;
  let eBucketEmpty: Fluid;
  let eWater100: Fluid;
  let eWater100Tag: Fluid;
  let i99: Integer;
  let sDamage: iString;
  let t4: IntTag;
  let sWater: iString;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    eBucketLava = new fluidRegistry.items["minecraft:lava"]();
    eBucketWater = new fluidRegistry.items["minecraft:water"]();
    eBucketEmpty = new fluidRegistry.items["minecraft:empty"]({
      amount: Integer.ZERO,
    });
    eWater100 = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(100),
    });
    eWater100Tag = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(100),
      nbt: new CompoundTag({ "minecraft:damage": new IntTag(new Integer(3)) }),
    });
    i99 = new Integer(99);
    sDamage = new iString("minecraft:damage");
    t4 = new IntTag(new Integer(4));
    sWater = new iString("minecraft:water");

    DUMMY_VARIABLE = new iNull();
  });

  /**
   * ----------------------------------- AMOUNT -----------------------------------
   */

  it("testAmount", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1000);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate(
      eBucketWater
    );
    expect((res2 as Integer).toJSNumber()).toBe(1000);

    const res3 = new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate(
      eWater100
    );
    expect((res3 as Integer).toJSNumber()).toBe(100);
  });

  it("testInvalidInputSizeAmountLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeAmountSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeAmount", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_AMOUNT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- BLOCK -----------------------------------
   */

  it("testBlock", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Block);
    expect((res1 as Block).getBlockName().valueOf()).toBe("minecraft:lava");

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate(
      eBucketWater
    );
    expect((res2 as Block).getBlockName().valueOf()).toBe("minecraft:water");
  });

  it("testInvalidInputSizeBlockLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeBlockSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBlock", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- LIGHT_LEVEL -----------------------------------
   */

  it("testLightLevel", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_LIGHT_LEVEL().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(15);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_LIGHT_LEVEL().evaluate(
      eBucketWater
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeLightLevelLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_LIGHT_LEVEL().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeLightLevelSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_LIGHT_LEVEL().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeLightLevel", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_LIGHT_LEVEL().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- DENSITY -----------------------------------
   */

  it("testDensity", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_DENSITY().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3000);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_DENSITY().evaluate(
      eBucketWater
    );
    expect((res2 as Integer).toJSNumber()).toBe(1000);
  });

  it("testInvalidInputSizeDensityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DENSITY().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeDensitySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DENSITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDensity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DENSITY().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TEMPERATURE -----------------------------------
   */

  it("testTemperature", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_TEMPERATURE().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1300);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_TEMPERATURE().evaluate(
      eBucketWater
    );
    expect((res2 as Integer).toJSNumber()).toBe(300);
  });

  it("testInvalidInputSizeTemperatureLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TEMPERATURE().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeTemperatureSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TEMPERATURE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTemperature", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TEMPERATURE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VISCOSITY -----------------------------------
   */

  it("testViscosity", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_VISCOSITY().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(6000);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_VISCOSITY().evaluate(
      eBucketWater
    );
    expect((res2 as Integer).toJSNumber()).toBe(1000);
  });

  it("testInvalidInputSizeViscosityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_VISCOSITY().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeViscositySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_VISCOSITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeViscosity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_VISCOSITY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- IS_LIGHTER_THAN_AIR -----------------------------------
   */

  it("testIsLighterThanAir", () => {
    const res1 =
      new operatorRegistry.OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR().evaluate(
        eBucketLava
      );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 =
      new operatorRegistry.OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR().evaluate(
        eBucketWater
      );
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsLighterThanAirLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeIsLighterThanAirSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsLighterThanAir", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- RARITY -----------------------------------
   */

  it("testRarity", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_RARITY().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("COMMON");

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_RARITY().evaluate(
      eBucketWater
    );
    expect((res2 as iString).valueOf()).toBe("COMMON");
  });

  it("testInvalidInputSizeRarityLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_RARITY().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeRaritySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_RARITY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeRarity", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_RARITY().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- SOUND_BUCKET_EMPTY -----------------------------------
   */

  it("testSoundBucketEmpty", () => {
    const res1 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY().evaluate(
        eBucketLava
      );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe(
      "minecraft:item.bucket.empty_lava"
    );

    const res2 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY().evaluate(
        eBucketWater
      );
    expect((res2 as iString).valueOf()).toBe("minecraft:item.bucket.empty");
  });

  it("testInvalidInputSizeSoundBucketEmptyLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeSoundBucketEmptySmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSoundBucketEmpty", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SOUND_BUCKET_FILL -----------------------------------
   */

  it("testSoundBucketFill", () => {
    const res1 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL().evaluate(
        eBucketLava
      );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("minecraft:item.bucket.fill_lava");

    const res2 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL().evaluate(
        eBucketWater
      );
    expect((res2 as iString).valueOf()).toBe("minecraft:item.bucket.fill");
  });

  it("testInvalidInputSizeSoundBucketFillLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeSoundBucketFillSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSoundBucketFill", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SOUND_FLUID_VAPORIZE -----------------------------------
   */

  it("testSoundFluidVaporize", () => {
    const res1 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE().evaluate(
        eBucketLava
      );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("");

    const res2 =
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE().evaluate(
        eBucketWater
      );
    expect((res2 as iString).valueOf()).toBe("minecraft:block.fire.extinguish");
  });

  it("testInvalidInputSizeSoundFluidVaporizeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeSoundFluidVaporizeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSoundFluidVaporize", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- BUCKET -----------------------------------
   */

  it("testBucket", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_BUCKET().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe(
      "minecraft:lava_bucket"
    );

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_BUCKET().evaluate(
      eBucketWater
    );
    expect((res2 as Item).getUniqueName().valueOf()).toBe(
      "minecraft:water_bucket"
    );
  });

  it("testInvalidInputSizeBucketLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BUCKET().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeBucketSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BUCKET().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeBucket", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BUCKET().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISRAWFLUIDEQUAL -----------------------------------
   */

  it("testIsRawFluidEqual", () => {
    const res1 =
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        eBucketLava,
        eBucketWater
      );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 =
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        eBucketLava,
        eBucketLava
      );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 =
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        eBucketWater,
        eWater100
      );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsRawFluidEqualLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        eBucketLava,
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeIsRawFluidEqualSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputTypeIsRawFluidEqual", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- MODNAME -----------------------------------
   */

  it("testFluidModName", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_MODNAME().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("Minecraft");
  });

  it("testInvalidInputSizeModNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_MODNAME().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeModNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_MODNAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeModName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_MODNAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- DATA -----------------------------------
   */

  it("testFluidNbt", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(
      eBucketLava
    );
    // Fluid.ts defaults nbt to NullTag now
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(
      eWater100Tag
    );
    expect(res2).toBeInstanceOf(CompoundTag);
    expect(
      ((res2 as CompoundTag).get(sDamage) as IntTag).valueOf().toJSNumber()
    ).toBe(3);
  });

  it("testInvalidInputSizeNbtLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(
        eBucketLava,
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputSizeNbtSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbt", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_AMOUNT -----------------------------------
   */

  it("testWithAmount", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_WITH_AMOUNT().evaluate(
      eBucketLava,
      i99
    );
    expect(res1).toBeInstanceOf(Fluid);
    expect((res1 as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:lava (99)"
    );
    expect((res1 as Fluid).getAmount().toJSNumber()).toBe(99);
    expect(eBucketLava.getAmount().toJSNumber()).toBe(1000);
  });

  it("testInvalidInputSizeWithAmountLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_AMOUNT().evaluate(
        eBucketLava,
        i99,
        i99
      );
    }).toThrow();
  });

  it("testInvalidInputSizeWithAmountSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_AMOUNT().evaluate(
        eBucketLava
      );
    }).toThrow();
  });

  it("testInvalidInputTypeWithAmount", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_AMOUNT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- DATA_KEYS -----------------------------------
   */

  it("testFluidStackDataKeys", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_DATAKEYS().evaluate(
      eWater100
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_DATAKEYS().evaluate(
      eWater100Tag
    );
    expect(res2).toBeInstanceOf(iArrayEager);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(1);
    expect(
      ((res2 as iArrayEager<any>).get(Integer.ZERO) as iString).valueOf()
    ).toBe("minecraft:damage");
  });

  it("testInvalidInputDataKeysDataKeysLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATAKEYS().evaluate(
        eWater100Tag,
        eWater100Tag
      );
    }).toThrow();
  });

  it("testInvalidInputDataKeysDataKeysSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATAKEYS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDataKeys", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATAKEYS().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- DATA_VALUE -----------------------------------
   */

  it("testFluidStackDataValue", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA_VALUE().evaluate(
      eWater100,
      sDamage
    );
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA_VALUE().evaluate(
      eWater100Tag,
      sDamage
    );
    expect(res2).toBeInstanceOf(IntTag);
    expect((res2 as IntTag).valueOf().toJSNumber()).toBe(3);
  });

  it("testInvalidInputDataValueDataValueLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA_VALUE().evaluate(
        eWater100Tag,
        sDamage,
        eWater100Tag
      );
    }).toThrow();
  });

  it("testInvalidInputDataValueDataValueSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA_VALUE().evaluate(
        eWater100Tag
      );
    }).toThrow();
  });

  it("testInvalidInputTypeDataValue", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_DATA_VALUE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_DATA -----------------------------------
   */

  it("testFluidStackWithData", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_WITH_DATA().evaluate(
      eWater100,
      sDamage,
      t4
    );
    expect(res1).toBeInstanceOf(Fluid);
    const outFluid1 = res1 as Fluid;
    expect(outFluid1.getUniqueName().valueOf()).toBe("minecraft:water (100)");
    expect(
      ((outFluid1.getNBT() as CompoundTag).get(sDamage) as IntTag)
        .valueOf()
        .toJSNumber()
    ).toBe(4);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_WITH_DATA().evaluate(
      eWater100Tag,
      sDamage,
      t4
    );
    expect(res2).toBeInstanceOf(Fluid);
    const outFluid2 = res2 as Fluid;
    expect(outFluid2.getUniqueName().valueOf()).toBe("minecraft:water (100)");
    expect(
      ((outFluid2.getNBT() as CompoundTag).get(sDamage) as IntTag)
        .valueOf()
        .toJSNumber()
    ).toBe(4);
  });

  it("testInvalidInputWithDataWithDataLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_DATA().evaluate(
        eWater100Tag,
        sDamage,
        t4,
        eWater100Tag
      );
    }).toThrow();
  });

  it("testInvalidInputWithDataWithDataSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_DATA().evaluate(
        eWater100Tag,
        sDamage
      );
    }).toThrow();
  });

  it("testInvalidInputTypeWithData", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_DATA().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG -----------------------------------
   */

  it("testFluidStackTag", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_TAG().evaluate(
      eBucketWater
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_TAG().evaluate(
      eBucketEmpty
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeTagLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG().evaluate(
        eBucketWater,
        eBucketWater
      );
    }).toThrow();
  });

  it("testInvalidInputSizeTagSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTag", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TAG_STACKS -----------------------------------
   */

  it("testFluidStackTagStacks", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_TAG_STACKS().evaluate(
      sWater
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizeTagStacksLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG_STACKS().evaluate(
        sWater,
        sWater
      );
    }).toThrow();
  });

  it("testInvalidInputSizeTagStacksSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG_STACKS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTagStacks", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_TAG_STACKS().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- FLUIDBYNAME -----------------------------------
   */

  it("testFluidFluidByName", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_BY_NAME().evaluate(
      sWater
    );
    expect(res1).toBeInstanceOf(Fluid);
    expect((res1 as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:water (1000)"
    );
  });

  it("testInvalidInputSizeFluidByNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BY_NAME().evaluate(sWater, sWater);
    }).toThrow();
  });

  it("testInvalidInputSizeFluidByNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BY_NAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeFluidByName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_BY_NAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
});
