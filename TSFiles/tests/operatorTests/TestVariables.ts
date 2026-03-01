/**
 * Test the different variable types.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { Double } from "JavaNumberClasses/Double";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";

describe("TestVariables", () => {
  describe("BooleanType", () => {
    it("testBooleanType", () => {
      const bTrue = new iBoolean(true);
      expect(bTrue.valueOf()).toBe(true);
      expect(bTrue.valueOf()).not.toBe(false);

      const bFalse = new iBoolean(false);
      expect(bFalse.valueOf()).toBe(false);
      expect(bFalse.valueOf()).not.toBe(true);

      // Serialization logic check
      expect(
        new ByteTag(new Integer(bTrue.valueOf() ? 1 : 0)).valueOf().toJSNumber()
      ).toBe(1);
      expect(
        new ByteTag(new Integer(bFalse.valueOf() ? 1 : 0))
          .valueOf()
          .toJSNumber()
      ).toBe(0);

      expect(
        new iBoolean(
          new ByteTag(new Integer(bTrue.valueOf() ? 1 : 0))
            .valueOf()
            .toJSNumber() === 1
        ).valueOf()
      ).toBe(true);
      expect(
        new iBoolean(
          new ByteTag(new Integer(bFalse.valueOf() ? 1 : 0))
            .valueOf()
            .toJSNumber() === 1
        ).valueOf()
      ).toBe(false);
    });
  });

  describe("IntegerType", () => {
    it("testIntegerType", () => {
      const i0 = new Integer(0);
      expect(i0.toJSNumber()).toBe(0);

      const im10 = new Integer(-10);
      expect(im10.toJSNumber()).toBe(-10);

      const i10 = new Integer(10);
      expect(i10.toJSNumber()).toBe(10);

      expect(new IntTag(i10).valueOf().toJSNumber()).toBe(10);
      expect(new IntTag(im10).valueOf().toJSNumber()).toBe(-10);
      expect(new IntTag(i0).valueOf().toJSNumber()).toBe(0);
    });
  });

  describe("DoubleType", () => {
    it("testDoubleType", () => {
      const d0_1 = new Double(0.1);
      expect(d0_1.toJSNumber()).toBe(0.1);

      const dm10_1 = new Double(-10.1);
      expect(dm10_1.toJSNumber()).toBe(-10.1);

      const d10_1 = new Double(10.1);
      expect(d10_1.toJSNumber()).toBe(10.1);

      expect(new DoubleTag(d10_1).valueOf().toJSNumber()).toBe(10.1);
      expect(new DoubleTag(dm10_1).valueOf().toJSNumber()).toBe(-10.1);
      expect(new DoubleTag(d0_1).valueOf().toJSNumber()).toBe(0.1);
    });
  });

  describe("StringType", () => {
    it("testStringType", () => {
      const s0 = new iString("0");
      expect(s0.valueOf()).toBe("0");

      const sm10 = new iString("-10");
      expect(sm10.valueOf()).toBe("-10");

      const s10 = new iString("10");
      expect(s10.valueOf()).toBe("10");

      expect(new StringTag(s10).valueOf().valueOf()).toBe("10");
      expect(new StringTag(sm10).valueOf().valueOf()).toBe("-10");
      expect(new StringTag(s0).valueOf().valueOf()).toBe("0");
    });
  });

  describe("ListType", () => {
    it("testListTypeMaterialized", () => {
      const l0 = new iArrayEager([]);
      expect(l0.size().toJSNumber()).toBe(0);

      const l2 = new iArrayEager([new iString("a"), new iString("b")]);
      expect(l2.size().toJSNumber()).toBe(2);
      expect(l2.get(new Integer(0)).valueOf()).toBe("a");

      const l2_2 = new iArrayEager([
        new iArrayEager([new iString("a"), new iString("b")]),
        new iArrayEager([new iString("c"), new iString("d")]),
      ]);
      expect(l2_2.size().toJSNumber()).toBe(2);
      expect(
        (l2_2.get(new Integer(0)) as iArrayEager<iString>).size().toJSNumber()
      ).toBe(2);

      const l2h = new iArrayEager([new Integer(42), new iString("hello")]);
      expect(l2h.size().toJSNumber()).toBe(2);
      expect((l2h.get(new Integer(0)) as Integer).toJSNumber()).toBe(42);
      expect((l2h.get(new Integer(1)) as iString).valueOf()).toBe("hello");
    });
  });

  describe("NbtType", () => {
    it("testNbtType", () => {
      const tag1 = new CompoundTag();
      const resTag1 = tag1.set("abc", ByteTag.ONE);
      const tag2 = new CompoundTag();
      const resTag2 = tag2.set("abc", ByteTag.ONE);

      const strTag1 = new StringTag(new iString("abc"));
      const strTag2 = new StringTag(new iString("abc"));

      expect(resTag1.equals(resTag2).valueOf()).toBe(true);
      expect(strTag1.equals(strTag2).valueOf()).toBe(true);

      expect(
        resTag1.get(new iString("abc")).equals(ByteTag.ONE).valueOf()
      ).toBe(true);
    });
  });
});
