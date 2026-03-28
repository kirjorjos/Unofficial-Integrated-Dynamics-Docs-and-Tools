/**
 * Test the different variable types.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Double } from "lib/JavaNumberClasses/Double";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Long } from "lib/JavaNumberClasses/Long";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { itemRegistry } from "lib/IntegratedDynamicsClasses/registries/itemRegistry";
import { fluidRegistry } from "lib/IntegratedDynamicsClasses/registries/fluidRegistry";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import {
  ValueTypeListProxyFactories,
  ValueTypeListProxyMaterialized,
} from "lib/IntegratedDynamicsClasses/ValueTypeListProxy";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestVariables", () => {
  beforeAll(() => {
    itemRegistry.load();
    fluidRegistry.load();
    ValueTypeListProxyFactories.load();
  });

  const testRoundTrip = (value: IntegratedValue) => {
    const typeName = ValueHelpers.getTypeName(value);
    const serialized = ValueHelpers.serializeRaw(value);
    const deserialized = ValueHelpers.deserializeRaw(typeName, serialized);
    expect(deserialized.equals(value).valueOf()).toBe(true);
  };

  describe("BooleanType", () => {
    it("testBooleanType", () => {
      const bTrue = new iBoolean(true);
      const bFalse = new iBoolean(false);

      testRoundTrip(bTrue);
      testRoundTrip(bFalse);
    });
  });

  describe("IntegerType", () => {
    it("testIntegerType", () => {
      const i0 = new Integer(0);
      const im10 = new Integer(-10);
      const i10 = new Integer(10);

      testRoundTrip(i0);
      testRoundTrip(im10);
      testRoundTrip(i10);
    });
  });

  describe("DoubleType", () => {
    it("testDoubleType", () => {
      const d0_1 = new Double(0.1);
      const dm10_1 = new Double(-10.1);
      const d10_1 = new Double(10.1);

      testRoundTrip(d0_1);
      testRoundTrip(dm10_1);
      testRoundTrip(d10_1);
    });
  });

  describe("StringType", () => {
    it("testStringType", () => {
      const s0 = new iString("0");
      const sm10 = new iString("-10");
      const s10 = new iString("10");

      testRoundTrip(s0);
      testRoundTrip(sm10);
      testRoundTrip(s10);
    });
  });

  describe("ListType", () => {
    it("testListTypeMaterialized", () => {
      const l0 = new iArrayEager([]);
      const l2 = new iArrayEager([new iString("a"), new iString("b")]);
      const l2_2 = new iArrayEager([
        new iArrayEager([new iString("a"), new iString("b")]),
        new iArrayEager([new iString("c"), new iString("d")]),
      ]);

      testRoundTrip(l0);
      testRoundTrip(l2);
      testRoundTrip(l2_2);
    });

    it("testListTypeProxy", () => {
      const list = new ValueTypeListProxyMaterialized([new iBoolean(true)]);
      const serialized = ValueTypeListProxyFactories.serialize(list);
      const deserialized = ValueTypeListProxyFactories.deserialize(serialized);
      expect(deserialized.getProxyName()).toBe(list.getProxyName());
      expect(
        deserialized.get(new Integer(0)).equals(new iBoolean(true)).valueOf()
      ).toBe(true);
    });
  });

  describe("NbtType", () => {
    it("testNbtType", () => {
      const tag1 = new CompoundTag({ abc: ByteTag.ONE });
      testRoundTrip(tag1);

      const strTag = new StringTag(new iString("abc"));
      testRoundTrip(strTag);
    });

    it("testNbtTypeInvalidString", () => {
      expect(() => {
        CompoundTag.fromJSON('"');
      }).toThrow();
    });
  });

  describe("IngredientsType", () => {
    it("testIngredientsType", () => {
      const iEmpty = new Item(new Properties({}));
      const iBoat = new itemRegistry.items["minecraft:oak_boat"]();
      const iStone = new itemRegistry.items["minecraft:stone"]();

      const ingredients1 = new Ingredients(
        new iArrayEager([iEmpty, iBoat, iStone, iEmpty]),
        new iArrayEager([]),
        new iArrayEager([])
      );

      testRoundTrip(ingredients1);

      const ingredients2 = new Ingredients(
        new iArrayEager([iBoat]),
        new iArrayEager([]),
        new iArrayEager([new Long(777), new Long(888)])
      );
      testRoundTrip(ingredients2);
    });
  });

  describe("RecipeType", () => {
    it("testRecipeType", () => {
      const iEmpty = new Item(new Properties({}));
      const iBoat = new itemRegistry.items["minecraft:oak_boat"]();
      const iStone = new itemRegistry.items["minecraft:stone"]();

      const input = new Ingredients(
        new iArrayEager([iBoat, iStone]),
        new iArrayEager([]),
        new iArrayEager([])
      );
      const output = new Ingredients(
        new iArrayEager([iEmpty]),
        new iArrayEager([]),
        new iArrayEager([new Long(100)])
      );

      const recipe = new Recipe(input, output);
      testRoundTrip(recipe);
    });
  });

  describe("OperatorType", () => {
    it("testOperatorType", () => {
      const opAdd = new operatorRegistry.ARITHMETIC_ADDITION();
      testRoundTrip(opAdd);

      const opId = new operatorRegistry.GENERAL_IDENTITY();
      testRoundTrip(opId);
    });

    it("testFunctionalOperatorRoundTrip", () => {
      const opAdd = new operatorRegistry.ARITHMETIC_ADDITION();
      const opMul = new operatorRegistry.ARITHMETIC_MULTIPLICATION();

      const opCurried = opAdd.apply(new Integer(10));
      testRoundTrip(opCurried);

      const add10 = opAdd.apply(new Integer(10));
      const mul2 = opMul.apply(new Integer(2));
      const opPiped = add10.pipe(mul2);
      testRoundTrip(opPiped);

      const opSub = new operatorRegistry.ARITHMETIC_SUBTRACTION();
      const opFlipped = opSub.flip();
      testRoundTrip(opFlipped);
    });
  });
});
