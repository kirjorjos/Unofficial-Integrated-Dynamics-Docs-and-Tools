import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { fluidRegistry } from "lib/IntegratedDynamicsClasses/registries/fluidRegistry";
import { blockRegistry } from "lib/IntegratedDynamicsClasses/registries/blockRegistry";
import { itemRegistry } from "lib/IntegratedDynamicsClasses/registries/itemRegistry";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

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
  let sWater: iString;
  let sHoeNbt: CompoundTag;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    eBucketLava = new fluidRegistry.items["minecraft:lava"]({
      amount: new Integer(1000),
    });
    eBucketWater = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(1000),
    });
    eBucketEmpty = new fluidRegistry.items["minecraft:empty"]({
      amount: Integer.ZERO,
    });
    eWater100 = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(100),
    });

    eWater100Tag = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(100),
      nbt: new CompoundTag({ a: new StringTag(new iString("abc")) }),
    });

    i99 = new Integer(99);
    sWater = new iString("minecraft:water");

    sHoeNbt = new CompoundTag({
      Damage: new IntTag(new Integer(51)),
    });

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
    expect((res1 as Block).getUniqueName().valueOf()).toBe("minecraft:lava");

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_BLOCK().evaluate(
      eBucketWater
    );
    expect((res2 as Block).getUniqueName().valueOf()).toBe("minecraft:water");
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
   * ----------------------------------- NBT -----------------------------------
   */

  it("testFluidNbt", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(
      eBucketLava
    );
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.OBJECT_FLUIDSTACK_DATA().evaluate(
      eWater100Tag
    );
    expect(res2).toBeInstanceOf(CompoundTag);
    expect(
      ((res2 as CompoundTag).get(new iString("a")) as StringTag)
        .valueOf()
        .valueOf()
    ).toBe("abc");
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
   * ----------------------------------- WITHNBT -----------------------------------
   */

  it("testFluidStackWithNbt", () => {
    const res1 = new operatorRegistry.OBJECT_FLUIDSTACK_WITH_NBT().evaluate(
      eBucketWater,
      sHoeNbt
    );
    expect(res1).toBeInstanceOf(Fluid);
    expect(
      ((res1 as Fluid).getNBT() as CompoundTag).equals(sHoeNbt).valueOf()
    ).toBe(true);
  });

  it("testInvalidFluidStackWithNbtLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_NBT().evaluate(
        eBucketWater,
        sHoeNbt,
        eBucketWater
      );
    }).toThrow();
  });

  it("testInvalidFluidStackWithNbtSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_NBT().evaluate(eBucketWater);
    }).toThrow();
  });

  it("testInvalidFluidStackWithNbt", () => {
    expect(() => {
      new operatorRegistry.OBJECT_FLUIDSTACK_WITH_NBT().evaluate(
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
