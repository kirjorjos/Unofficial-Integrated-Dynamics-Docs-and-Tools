/**
 * Test the different parse operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor LostOfThought
 */
import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "../../JavaNumberClasses/Integer";
import { Long } from "../../JavaNumberClasses/Long";
import { Double } from "../../JavaNumberClasses/Double";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { CompoundTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { IntTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { StringTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";

const s = (v: string) => new iString(v);

describe("TestParseOperators", () => {
  /**
   * ----------------------------------- INTEGER -----------------------------------
   */
  describe("PARSE_INTEGER", () => {
    it("testParseInt_IsInt", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("0"));
      expect(res1).toBeInstanceOf(Integer);
    });
    it("testParseIntEmpty", () => {
      expect(() =>
        new operatorRegistry.PARSE_INTEGER().evaluate(s(""))
      ).toThrow();
    });
    it("testParseIntGarbage", () => {
      expect(() =>
        new operatorRegistry.PARSE_INTEGER().evaluate(s("garbage"))
      ).toThrow();
    });
    it("testParseInt0", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("0"));
      expect((res1 as Integer).toJSNumber()).toBe(0);
    });
    it("testParseInt1", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("1"));
      expect((res1 as Integer).toJSNumber()).toBe(1);
    });
    it("testParseIntN1", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("-1"));
      expect((res1 as Integer).toJSNumber()).toBe(-1);
    });
    it("testParseIntP1", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("+1"));
      expect((res1 as Integer).toJSNumber()).toBe(1);
    });
    it("testParseIntHex_x", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("0xFF"));
      expect((res1 as Integer).toJSNumber()).toBe(0xff);
    });
    it("testParseIntHex_X", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("0XFF"));
      expect((res1 as Integer).toJSNumber()).toBe(0xff);
    });
    it("testParseIntHex_H", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("#FF"));
      expect((res1 as Integer).toJSNumber()).toBe(0xff);
    });
    it("testParseIntNHex", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("-0xFF"));
      expect((res1 as Integer).toJSNumber()).toBe(-0xff);
    });
    it("testParseIntOctal", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("01"));
      expect((res1 as Integer).toJSNumber()).toBe(1);
    });
    it("testParseIntNOctal", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(s("-01"));
      expect((res1 as Integer).toJSNumber()).toBe(-1);
    });
    it("testParseIntMax", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(
        s(String(2147483647))
      );
      expect((res1 as Integer).toJSNumber()).toBe(2147483647);
    });
    it("testParseIntMaxP1", () => {
      expect(() =>
        new operatorRegistry.PARSE_INTEGER().evaluate(s(String(2147483648)))
      ).toThrow();
    });
    it("testParseIntMin", () => {
      const res1 = new operatorRegistry.PARSE_INTEGER().evaluate(
        s(String(-2147483648))
      );
      expect((res1 as Integer).toJSNumber()).toBe(-2147483648);
    });
    it("testParseIntMinM1", () => {
      expect(() =>
        new operatorRegistry.PARSE_INTEGER().evaluate(s(String(-2147483649)))
      ).toThrow();
    });
  });

  /**
   * ----------------------------------- LONG -----------------------------------
   */
  describe("PARSE_LONG", () => {
    it("testParseLong_IsLong", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("0"));
      expect(res1).toBeInstanceOf(Long);
    });
    it("testParseLongEmpty", () => {
      expect(() => new operatorRegistry.PARSE_LONG().evaluate(s(""))).toThrow();
    });
    it("testParseLongGarbage", () => {
      expect(() =>
        new operatorRegistry.PARSE_LONG().evaluate(s("garbage"))
      ).toThrow();
    });
    it("testParseLong0", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("0"));
      expect((res1 as Long).toJSNumber()).toBe(0);
    });
    it("testParseLong1", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("1"));
      expect((res1 as Long).toJSNumber()).toBe(1);
    });
    it("testParseLongN1", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("-1"));
      expect((res1 as Long).toJSNumber()).toBe(-1);
    });
    it("testParseLongP1", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("+1"));
      expect((res1 as Long).toJSNumber()).toBe(1);
    });
    it("testParseLongHex_x", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("0xFF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongHex_X", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("0XFF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongHex_H", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("#FF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongNHex", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("-0xFF"));
      expect((res1 as Long).toJSNumber()).toBe(-0xff);
    });
    it("testParseLongNHex_X", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("-0XFF"));
      expect((res1 as Long).toJSNumber()).toBe(-0xff);
    });
    it("testParseLongNHex_H", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("-#FF"));
      expect((res1 as Long).toJSNumber()).toBe(-0xff);
    });
    it("testParseLongPHex", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("+0xFF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongPHex_X", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("+0XFF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongPHex_H", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("+#FF"));
      expect((res1 as Long).toJSNumber()).toBe(0xff);
    });
    it("testParseLongOctal", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("01"));
      expect((res1 as Long).toJSNumber()).toBe(1);
    });
    it("testParseLongNOctal", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("-01"));
      expect((res1 as Long).toJSNumber()).toBe(-1);
    });
    it("testParseLongPOctal", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(s("+01"));
      expect((res1 as Long).toJSNumber()).toBe(1);
    });
    it("testParseLongMax", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(
        s("9223372036854775807")
      );
      expect(res1.toString()).toBe("9223372036854775807");
    });
    it("testParseLongMaxP1", () => {
      expect(() =>
        new operatorRegistry.PARSE_LONG().evaluate(s("9223372036854775808"))
      ).toThrow();
    });
    it("testParseLongMin", () => {
      const res1 = new operatorRegistry.PARSE_LONG().evaluate(
        s("-9223372036854775808")
      );
      expect(res1.toString()).toBe("-9223372036854775808");
    });
    it("testParseLongMinM1", () => {
      expect(() =>
        new operatorRegistry.PARSE_LONG().evaluate(s("-9223372036854775809"))
      ).toThrow();
    });
  });

  /**
   * ----------------------------------- DOUBLE -----------------------------------
   */
  describe("PARSE_DOUBLE", () => {
    it("testParseDouble_IsDouble", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("0.0"));
      expect(res1).toBeInstanceOf(Double);
    });
    it("testParseDoubleEmpty", () => {
      expect(() =>
        new operatorRegistry.PARSE_DOUBLE().evaluate(s(""))
      ).toThrow();
    });
    it("testParseDoubleGarbage", () => {
      expect(() =>
        new operatorRegistry.PARSE_DOUBLE().evaluate(s("garbage"))
      ).toThrow();
    });
    it("testParseDouble0", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("0"));
      expect((res1 as Double).toJSNumber()).toBe(0.0);
    });
    it("testParseDouble1", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("1"));
      expect((res1 as Double).toJSNumber()).toBe(1.0);
    });
    it("testParseDoubleN0", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-0.0"));
      expect((res1 as Double).toJSNumber()).toBe(-0.0);
    });
    it("testParseDoubleN1", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-1.0"));
      expect((res1 as Double).toJSNumber()).toBe(-1.0);
    });
    it("testParseDoubleHex_x", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("0xFF"));
      expect((res1 as Double).toJSNumber()).toBe(255.0);
    });
    it("testParseDoubleHex_X", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("0XFF"));
      expect((res1 as Double).toJSNumber()).toBe(255.0);
    });
    it("testParseDoubleHex_H", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("#FF"));
      expect((res1 as Double).toJSNumber()).toBe(255.0);
    });
    it("testParseDoubleNHex", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-0xFF"));
      expect((res1 as Double).toJSNumber()).toBe(-255.0);
    });
    it("testParseDoubleOctal", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("01"));
      expect((res1 as Double).toJSNumber()).toBe(1.0);
    });
    it("testParseDoubleNOctal", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-01"));
      expect((res1 as Double).toJSNumber()).toBe(-1.0);
    });
    it("testParseDoubleDOctal", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("01.1"));
      expect((res1 as Double).toJSNumber()).toBe(1.1);
    });
    it("testParseDoubleNDOctal", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-01.1"));
      expect((res1 as Double).toJSNumber()).toBe(-1.1);
    });
    it("testParseDoubleMax", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(
        s(String(Number.MAX_VALUE))
      );
      expect((res1 as Double).toJSNumber()).toBe(Number.MAX_VALUE);
    });
    it("testParseDoubleInf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("Inf"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoublePInf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("+Inf"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoubleNInf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-Inf"));
      expect((res1 as Double).toJSNumber()).toBe(-Infinity);
    });
    it("testParseDoubleInfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("Infinity"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoublePInfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("+Infinity"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoubleNInfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-Infinity"));
      expect((res1 as Double).toJSNumber()).toBe(-Infinity);
    });
    it("testParseDoubleinf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("inf"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoublePinf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("+inf"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoubleNinf", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-inf"));
      expect((res1 as Double).toJSNumber()).toBe(-Infinity);
    });
    it("testParseDoubleinfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("infinity"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoublePinfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("+infinity"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoubleNinfinity", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("-infinity"));
      expect((res1 as Double).toJSNumber()).toBe(-Infinity);
    });
    it("testParseDoubleInfSym", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("\u221E"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoublePInfSym", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("+ \u221E"));
      expect((res1 as Double).toJSNumber()).toBe(Infinity);
    });
    it("testParseDoubleNInfSym", () => {
      const res1 = new operatorRegistry.PARSE_DOUBLE().evaluate(s("- \u221E"));
      expect((res1 as Double).toJSNumber()).toBe(-Infinity);
    });
  });

  /**
   * ----------------------------------- BOOLEAN -----------------------------------
   */
  describe("PARSE_BOOLEAN", () => {
    it("testParseBoolean_IsBoolean", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("T"));
      expect(res1).toBeInstanceOf(iBoolean);
    });
    it("testParseBooleanEmpty", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s(""));
      expect((res1 as iBoolean).valueOf()).toBe(false); // Aligned with Java logic
    });
    it("testParseBooleanNotEmpty", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("garbage"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBoolean0", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("0"));
      expect((res1 as iBoolean).valueOf()).toBe(false);
    });
    it("testParseBoolean1", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("1"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanN1", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("-1"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanHex_x", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("0xFF"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanHex_X", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("0XFF"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanHex_H", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("#FF"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanNHex", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("-0xFF"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanOctal", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("01"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanNOctal", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("-01"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanT", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("T"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleant", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("t"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanTrue", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("True"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleantrue", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("true"));
      expect((res1 as iBoolean).valueOf()).toBe(true);
    });
    it("testParseBooleanF", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("F"));
      expect((res1 as iBoolean).valueOf()).toBe(false);
    });
    it("testParseBooleanf", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("f"));
      expect((res1 as iBoolean).valueOf()).toBe(false);
    });
    it("testParseBooleanFalse", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("False"));
      expect((res1 as iBoolean).valueOf()).toBe(false);
    });
    it("testParseBooleanfalse", () => {
      const res1 = new operatorRegistry.PARSE_BOOLEAN().evaluate(s("false"));
      expect((res1 as iBoolean).valueOf()).toBe(false);
    });
  });

  /**
   * ----------------------------------- NBT -----------------------------------
   */
  describe("PARSE_NBT", () => {
    it("testNBTGarbage", () => {
      expect(() =>
        new operatorRegistry.PARSE_NBT().evaluate(s("}garbage{"))
      ).toThrow();
    });
    it("testNBTEmpty", () => {
      expect(() => new operatorRegistry.PARSE_NBT().evaluate(s(""))).toThrow();
    });
    it("testNBTFurnace", () => {
      const NBT_STRING = `{CookTime:0,x:2005,BurnTime:0,y:56,ForgeCaps:{},z:-81,Items:[],id:"minecraft:furnace",CookTimeTotal:0,Lock:""}`;
      const res1 = new operatorRegistry.PARSE_NBT().evaluate(s(NBT_STRING));
      expect(res1).toBeInstanceOf(CompoundTag);
      const idTag = (res1 as CompoundTag).get(s("id"));
      expect(idTag).toBeInstanceOf(StringTag);
      expect((idTag as StringTag).valueOf().valueOf()).toBe(
        "minecraft:furnace"
      );
    });
    it("testNBTFurnaceSpaces", () => {
      const NBT_STRING = `{\rCookTime:\n0,\tx:2005, BurnTime:0,  y:56,ForgeCaps:{},z:-81,Items:[],id:\r\n\t "minecraft:furnace",CookTimeTotal  :0,Lock:""}`;
      const res1 = new operatorRegistry.PARSE_NBT().evaluate(s(NBT_STRING));
      expect(res1).toBeInstanceOf(CompoundTag);
      const nbt = res1 as CompoundTag;
      expect((nbt.get(s("CookTime")) as IntTag).valueOf().toJSNumber()).toBe(0);
      expect((nbt.get(s("x")) as IntTag).valueOf().toJSNumber()).toBe(2005);
      expect((nbt.get(s("BurnTime")) as IntTag).valueOf().toJSNumber()).toBe(0);
      expect((nbt.get(s("y")) as IntTag).valueOf().toJSNumber()).toBe(56);
      const forgeCaps = nbt.get(s("ForgeCaps"));
      expect(forgeCaps).toBeInstanceOf(CompoundTag);
      expect((forgeCaps as CompoundTag).getAllKeys().size().toJSNumber()).toBe(
        0
      );
      expect((nbt.get(s("z")) as IntTag).valueOf().toJSNumber()).toBe(-81);
      expect(nbt.get(s("Items"))).toBeInstanceOf(ListTag);
      expect((nbt.get(s("id")) as StringTag).valueOf().valueOf()).toBe(
        "minecraft:furnace"
      );
      expect(
        (nbt.get(s("CookTimeTotal")) as IntTag).valueOf().toJSNumber()
      ).toBe(0);
      expect((nbt.get(s("Lock")) as StringTag).valueOf().valueOf()).toBe("");
    });
  });
});
