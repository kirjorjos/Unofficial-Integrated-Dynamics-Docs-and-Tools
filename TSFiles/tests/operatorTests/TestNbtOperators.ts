import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { CompoundTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ByteTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { ShortTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { IntTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { LongTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { FloatTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";
import { DoubleTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { StringTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { ByteArrayTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { IntArrayTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { LongArrayTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { ListTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "../../JavaNumberClasses/Integer";
import { Double } from "../../JavaNumberClasses/Double";
import { Long } from "../../JavaNumberClasses/Long";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";
import { NullTag } from "../../IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

describe("TestNbtOperators", () => {
  let sa: iString,
    sc: iString,
    sbyte: iString,
    sshort: iString,
    sinteger: iString,
    slong: iString,
    sfloat: iString,
    sdouble: iString,
    sstring: iString,
    sbytearray: iString,
    sintarray: iString,
    slongarray: iString,
    sboolean: iString,
    scompound: iString,
    slist: iString;

  let i1: Integer;
  let l1: Long;
  let d1_5: Double;
  let btrue: iBoolean;
  let ltags: iArrayEager<CompoundTag>;
  let lints: iArrayEager<Integer>;
  let llongs: iArrayEager<Long>;

  let nempty: CompoundTag;
  let nsasa: CompoundTag;
  let nsbsb: CompoundTag;
  let nsasasbsc: CompoundTag;
  let nall: CompoundTag;
  let nsome: CompoundTag;

  let nboolean: ByteTag;
  let nbyte: ByteTag;
  let nshort: ShortTag;
  let nint: IntTag;
  let nlong: LongTag;
  let ndouble: DoubleTag;
  let nfloat: FloatTag;
  let nstring: StringTag;
  let ntaglist: ListTag;
  let nbytelist: ByteArrayTag;
  let nintlist: IntArrayTag;
  let nlonglist: LongArrayTag;
  let subList: ListTag;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    DUMMY_VARIABLE = new iNull();
    sa = new iString("a");
    sc = new iString("c");
    sbyte = new iString("byte");
    sshort = new iString("short");
    sinteger = new iString("integer");
    slong = new iString("long");
    sfloat = new iString("float");
    sdouble = new iString("double");
    sstring = new iString("string");
    sbytearray = new iString("bytearray");
    sintarray = new iString("intarray");
    slongarray = new iString("longarray");
    sboolean = new iString("boolean");
    scompound = new iString("compound");
    slist = new iString("list");

    i1 = new Integer(1);
    l1 = new Long(1);
    d1_5 = new Double(1.5);
    btrue = new iBoolean(true);

    nempty = new CompoundTag({});

    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));
    nsasa = tsasa;

    let tsbsb = new CompoundTag({});
    tsbsb = tsbsb.set("b", new StringTag(new iString("b")));
    nsbsb = tsbsb;

    let tsasasbsc = new CompoundTag({});
    tsasasbsc = tsasasbsc.set("a", new StringTag(new iString("a")));
    tsasasbsc = tsasasbsc.set("b", new StringTag(new iString("c")));
    nsasasbsc = tsasasbsc;

    let tall = new CompoundTag({});
    tall = tall.set("byte", new ByteTag(new Integer(1)));
    tall = tall.set("short", new ShortTag(new Integer(2)));
    tall = tall.set("integer", new IntTag(new Integer(3)));
    tall = tall.set("long", new LongTag(new Long(4)));
    tall = tall.set("float", new FloatTag(new Double(5.5)));
    tall = tall.set("double", new DoubleTag(new Double(6.5)));
    tall = tall.set("string", new StringTag(new iString("seven")));
    tall = tall.set(
      "bytearray",
      new ByteArrayTag(
        new iArrayEager([new Integer(8), new Integer(9), new Integer(10)])
      )
    );
    tall = tall.set(
      "intarray",
      new IntArrayTag(
        new iArrayEager([new Integer(11), new Integer(12), new Integer(13)])
      )
    );
    tall = tall.set(
      "longarray",
      new LongArrayTag(
        new iArrayEager([new Long(14), new Long(15), new Long(16)])
      )
    );
    tall = tall.set("boolean", ByteTag.ONE);
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    tall = tall.set("compound", subCompound);
    subList = new ListTag(new iArrayEager([]));
    subList = new ListTag(subList.valueOf().append(subCompound));
    subList = new ListTag(subList.valueOf().append(subCompound));
    tall = tall.set("list", subList);
    nall = tall;

    let tsome = new CompoundTag({});
    tsome = tsome.set("byte", new ByteTag(new Integer(1)));
    tsome = tsome.set("integer", new IntTag(new Integer(3)));
    tsome = tsome.set("float", new FloatTag(new Double(5.5)));
    tsome = tsome.set("string", new StringTag(new iString("seven")));
    tsome = tsome.set("boolean", ByteTag.ONE);
    let subTagSome = new CompoundTag({});
    subTagSome = subTagSome.set("hello", new StringTag(new iString("world")));
    tsome = tsome.set("compound", subTagSome);
    let subListSome = new ListTag(new iArrayEager([]));
    subListSome = new ListTag(subListSome.valueOf().append(subTagSome));
    tsome = tsome.set("list", subListSome);
    nsome = tsome;

    ltags = new iArrayEager([new CompoundTag({}), tsasa, new CompoundTag({})]);
    lints = new iArrayEager([new Integer(5), new Integer(4), new Integer(3)]);
    llongs = new iArrayEager([new Long(5), new Long(4), new Long(3)]);

    nboolean = ByteTag.ONE;
    nbyte = ByteTag.ONE;
    nshort = new ShortTag(new Integer(2));
    nint = new IntTag(new Integer(3));
    nlong = new LongTag(new Long(4));
    ndouble = new DoubleTag(new Double(5.5));
    nfloat = new FloatTag(new Double(6.5));
    nstring = new StringTag(new iString("7"));
    ntaglist = subList;
    nbytelist = new ByteArrayTag(
      new iArrayEager([new Integer(0), new Integer(1), new Integer(2)])
    );
    nintlist = new IntArrayTag(
      new iArrayEager([new Integer(0), new Integer(1), new Integer(2)])
    );
    nlonglist = new LongArrayTag(
      new iArrayEager([new Long(0), new Long(1), new Long(2)])
    );
  });

  /**
   * ----------------------------------- SIZE -----------------------------------
   */

  it("testNbtSize", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_SIZE().evaluate(nempty);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_SIZE().evaluate(nsasa);
    expect((res2 as Integer).toJSNumber()).toBe(1);

    const res3 = new operatorRegistry.NBT_COMPOUND_SIZE().evaluate(nsasasbsc);
    expect((res3 as Integer).toJSNumber()).toBe(2);
  });

  it("testInvalidInputNbtSizeSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SIZE().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtSizeSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SIZE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtSize", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SIZE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- KEYS -----------------------------------
   */

  it("testNbtKeys", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_KEYS().evaluate(nempty);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect(
      (res1 as iArrayEager<iString>).size().equals(new Integer(0)).valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_KEYS().evaluate(nsasasbsc);
    expect(
      (res2 as iArrayEager<iString>).size().equals(new Integer(2)).valueOf()
    ).toBe(true);
    expect((res2 as iArrayEager<iString>).get(new Integer(0)).valueOf()).toBe(
      "a"
    );
    expect((res2 as iArrayEager<iString>).get(new Integer(1)).valueOf()).toBe(
      "b"
    );
  });

  it("testInvalidInputNbtKeysSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_KEYS().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtKeysSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_KEYS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtKeys", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_KEYS().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HASKEY -----------------------------------
   */

  it("testNbtHasKey", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_HASKEY().evaluate(
      nempty,
      sa
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.NBT_COMPOUND_HASKEY().evaluate(
      nsasasbsc,
      sa
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputNbtHasKeySizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_HASKEY().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtHasKeySizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_HASKEY().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtHasKey", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_HASKEY().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_TYPE -----------------------------------
   */

  it("testNbtValueType", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
      nempty,
      sa
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("null");

    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sbyte
        ) as iString
      ).valueOf()
    ).toBe("BYTE");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sshort
        ) as iString
      ).valueOf()
    ).toBe("SHORT");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sinteger
        ) as iString
      ).valueOf()
    ).toBe("INT");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          slong
        ) as iString
      ).valueOf()
    ).toBe("LONG");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sfloat
        ) as iString
      ).valueOf()
    ).toBe("FLOAT");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sdouble
        ) as iString
      ).valueOf()
    ).toBe("DOUBLE");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sstring
        ) as iString
      ).valueOf()
    ).toBe("STRING");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sbytearray
        ) as iString
      ).valueOf()
    ).toBe("BYTE[]");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sintarray
        ) as iString
      ).valueOf()
    ).toBe("INT[]");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          sboolean
        ) as iString
      ).valueOf()
    ).toBe("BYTE");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          scompound
        ) as iString
      ).valueOf()
    ).toBe("COMPOUND");
    expect(
      (
        new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
          nall,
          slist
        ) as iString
      ).valueOf()
    ).toBe("LIST");
  });

  it("testInvalidInputNbtValueTypeSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtValueTypeSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueType", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TYPE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_TAG -----------------------------------
   */

  it("testNbtValueTag", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(
      nempty,
      sboolean
    );
    expect(res1).toBeInstanceOf(NullTag);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(
      nall,
      sboolean
    );
    expect((res2 as ByteTag).valueOf().toJSNumber()).toEqual(1);

    const res3 = new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(
      nall,
      sinteger
    );
    expect((res3 as IntTag).valueOf().toJSNumber()).toEqual(3);
  });

  it("testInvalidInputNbtValueTagSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtValueTagSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueTag", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_TAG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_BOOLEAN -----------------------------------
   */

  it("testNbtValueBoolean", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(
      nempty,
      sboolean
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(
      nall,
      sboolean
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(
      nall,
      sbyte
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputNbtValueBooleanSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueBooleanSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueBoolean", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_BOOLEAN().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_INTEGER -----------------------------------
   */

  it("testNbtValueInteger", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
      nempty,
      sinteger
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
      nall,
      sinteger
    );
    expect((res2 as Integer).toJSNumber()).toBe(3);

    const res3 = new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
      nall,
      sbyte
    );
    expect((res3 as Integer).toJSNumber()).toBe(1);

    const res4 = new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
      nall,
      sshort
    );
    expect((res4 as Integer).toJSNumber()).toBe(2);
  });

  it("testInvalidInputNbtValueIntegerSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueIntegerSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueInteger", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_INTEGER().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_LONG -----------------------------------
   */

  it("testNbtValueLong", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_LONG().evaluate(
      nempty,
      slong
    );
    expect(res1).toBeInstanceOf(Long);
    expect((res1 as Long).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_LONG().evaluate(
      nall,
      slong
    );
    expect((res2 as Long).toJSNumber()).toBe(4);
  });

  it("testInvalidInputNbtValueLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LONG().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtValueLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LONG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueLong", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LONG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_DOUBLE -----------------------------------
   */

  it("testNbtValueDouble", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(
      nempty,
      sdouble
    );
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(
      nall,
      sdouble
    );
    expect((res2 as Double).toJSNumber()).toBe(6.5);

    const res3 = new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(
      nall,
      sfloat
    );
    expect((res3 as Double).toJSNumber()).toBe(5.5);
  });

  it("testInvalidInputNbtValueDoubleSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtValueDoubleSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueDouble", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_DOUBLE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_STRING -----------------------------------
   */

  it("testNbtValueString", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_STRING().evaluate(
      nempty,
      sstring
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("");

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_STRING().evaluate(
      nall,
      sstring
    );
    expect((res2 as iString).valueOf()).toBe("seven");
  });

  it("testInvalidInputNbtValueStringSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_STRING().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtValueStringSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_STRING().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueString", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_STRING().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_COMPOUND -----------------------------------
   */

  it("testNbtValueCompound", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_COMPOUND().evaluate(
      nempty,
      scompound
    );
    expect(res1).toBeInstanceOf(CompoundTag);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_COMPOUND().evaluate(
      nall,
      scompound
    );
    let subTag = new CompoundTag({});
    subTag = subTag.set("hello", new StringTag(new iString("world")));
    expect(res2).toBeInstanceOf(CompoundTag);
    expect((res2 as CompoundTag).equals(subTag).valueOf()).toBe(true);
  });

  it("testInvalidInputNbtValueCompoundSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_COMPOUND().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueCompoundSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_COMPOUND().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueCompound", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_COMPOUND().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_LIST_TAG -----------------------------------
   */

  it("testNbtValueListTag", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_TAG().evaluate(
      nempty,
      slist
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_TAG().evaluate(
      nall,
      slist
    );
    const subTag = new CompoundTag({});
    subTag.set("hello", new StringTag(new iString("world")));
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(2);
    expect((res2 as iArrayEager<any>).get(new Integer(0))).toBeInstanceOf(
      CompoundTag
    );
    expect((res2 as iArrayEager<any>).get(new Integer(1))).toBeInstanceOf(
      CompoundTag
    );
  });

  it("testInvalidInputNbtValueListTagSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_TAG().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueListTagSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_TAG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueListTag", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_TAG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_LIST_INT -----------------------------------
   */

  it("testNbtValueListInt", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_INT().evaluate(
      nempty,
      slist
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_INT().evaluate(
      nall,
      sintarray
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res2 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(
      11
    );
    expect((res2 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(
      12
    );
    expect((res2 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(
      13
    );
  });

  it("testInvalidInputNbtValueListIntSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_INT().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueListIntSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_INT().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueListInt", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_INT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_LIST_LONG -----------------------------------
   */

  it("testNbtValueListLong", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_LONG().evaluate(
      nempty,
      slist
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_LONG().evaluate(
      nall,
      slongarray
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res2 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(
      14
    );
    expect((res2 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(
      15
    );
    expect((res2 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(
      16
    );
  });

  it("testInvalidInputNbtValueListLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_LONG().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueListLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_LONG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueListLong", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_LONG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- VALUE_LIST_BYTE -----------------------------------
   */

  it("testNbtValueListByte", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_BYTE().evaluate(
      nempty,
      slist
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NBT_COMPOUND_VALUE_LIST_BYTE().evaluate(
      nall,
      sbytearray
    );
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res2 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(8);
    expect((res2 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(9);
    expect((res2 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(
      10
    );
  });

  it("testInvalidInputNbtValueListByteSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_BYTE().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtValueListByteSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_BYTE().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtValueListByte", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_VALUE_LIST_BYTE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITHOUT -----------------------------------
   */

  it("testNbtWithout", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITHOUT().evaluate(
      nsasa,
      sa
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    expect((res1 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITHOUT().evaluate(
      nsasasbsc,
      sa
    );
    let tsbc = new CompoundTag({});
    tsbc = tsbc.set("b", new StringTag(new iString("c")));
    expect(
      (res2 as CompoundTag).valueOf().equals(tsbc.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtWithoutSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITHOUT().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithoutSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITHOUT().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithout", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITHOUT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_BOOLEAN -----------------------------------
   */

  it("testNbtWithBoolean", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_BOOLEAN().evaluate(
      nsasa,
      sc,
      btrue
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", ByteTag.ONE);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_BOOLEAN().evaluate(
      nsasasbsc,
      sa,
      btrue
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", ByteTag.ONE);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithBooleanSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_BOOLEAN().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithBooleanSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_BOOLEAN().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithBoolean", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_BOOLEAN().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_SHORT -----------------------------------
   */

  it("testNbtWithShort", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_SHORT().evaluate(
      nsasa,
      sc,
      i1
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new ShortTag(new Integer(1)));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_SHORT().evaluate(
      nsasasbsc,
      sa,
      i1
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new ShortTag(new Integer(1)));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithShortSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_SHORT().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithShortSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_SHORT().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithShort", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_SHORT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_INTEGER -----------------------------------
   */

  it("testNbtWithInteger", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_INTEGER().evaluate(
      nsasa,
      sc,
      i1
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new IntTag(new Integer(1)));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_INTEGER().evaluate(
      nsasasbsc,
      sa,
      i1
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new IntTag(new Integer(1)));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithIntegerSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_INTEGER().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithIntegerSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_INTEGER().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithInteger", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_INTEGER().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_LONG -----------------------------------
   */

  it("testNbtWithLong", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_LONG().evaluate(
      nsasa,
      sc,
      l1
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new LongTag(new Long(1)));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_LONG().evaluate(
      nsasasbsc,
      sa,
      l1
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new LongTag(new Long(1)));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LONG().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LONG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithLong", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LONG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_DOUBLE -----------------------------------
   */

  it("testNbtWithDouble", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_DOUBLE().evaluate(
      nsasa,
      sc,
      d1_5
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new DoubleTag(new Double(1.5)));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_DOUBLE().evaluate(
      nsasasbsc,
      sa,
      d1_5
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new DoubleTag(new Double(1.5)));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithDoubleSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_DOUBLE().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithDoubleSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_DOUBLE().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithDouble", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_DOUBLE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_FLOAT -----------------------------------
   */

  it("testNbtWithFloat", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_FLOAT().evaluate(
      nsasa,
      sc,
      d1_5
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new FloatTag(new Double(1.5)));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_FLOAT().evaluate(
      nsasasbsc,
      sa,
      d1_5
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new FloatTag(new Double(1.5)));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithFloatSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_FLOAT().evaluate(nempty, sa, sa);
    }).toThrow();
  });

  it("testInvalidInputNbtWithFloatSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_FLOAT().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithFloat", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_FLOAT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_STRING -----------------------------------
   */

  it("testNbtWithString", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_STRING().evaluate(
      nsasa,
      sc,
      sc
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", new StringTag(new iString("c")));
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_STRING().evaluate(
      nsasasbsc,
      sa,
      sc
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", new StringTag(new iString("c")));
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithStringSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_STRING().evaluate(nempty, sa, i1);
    }).toThrow();
  });

  it("testInvalidInputNbtWithStringSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_STRING().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithString", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_STRING().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_TAG -----------------------------------
   */

  it("testNbtWithTag", () => {
    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));

    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_COMPOUND().evaluate(
      nsasa,
      sc,
      nsasa
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", tsasa);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_COMPOUND().evaluate(
      nsasasbsc,
      sa,
      nsasa
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", tsasa);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithTagSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_COMPOUND().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtWithTagSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_COMPOUND().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithTag", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_COMPOUND().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_LIST_TAG -----------------------------------
   */

  it("testNbtWithListTag", () => {
    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));
    let tlist = new ListTag(new iArrayEager([]));
    tlist = new ListTag(tlist.valueOf().append(new CompoundTag({})));
    tlist = new ListTag(tlist.valueOf().append(tsasa));
    tlist = new ListTag(tlist.valueOf().append(new CompoundTag({})));

    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_TAG().evaluate(
      nsasa,
      sc,
      ltags
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", tlist);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_TAG().evaluate(
      nsasasbsc,
      sa,
      ltags
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", tlist);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithListTagSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_TAG().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtWithListTagSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_TAG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithListTag", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_TAG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_LIST_BYTE -----------------------------------
   */

  it("testNbtWithListByte", () => {
    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));
    let tlist = new ByteArrayTag(
      new iArrayEager([new Integer(5), new Integer(4), new Integer(3)])
    );

    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_BYTE().evaluate(
      nsasa,
      sc,
      lints
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", tlist);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_BYTE().evaluate(
      nsasasbsc,
      sa,
      lints
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", tlist);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithListByteSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_BYTE().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtWithListByteSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_BYTE().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithListByte", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_BYTE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_LIST_INT -----------------------------------
   */

  it("testNbtWithListInt", () => {
    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));
    let tlist = new IntArrayTag(
      new iArrayEager([new Integer(5), new Integer(4), new Integer(3)])
    );

    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_INT().evaluate(
      nsasa,
      sc,
      lints
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", tlist);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_INT().evaluate(
      nsasasbsc,
      sa,
      lints
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", tlist);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithListIntSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_INT().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtWithListIntSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_INT().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithListInt", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_INT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_LIST_LONG -----------------------------------
   */

  it("testNbtWithListLong", () => {
    let tsasa = new CompoundTag({});
    tsasa = tsasa.set("a", new StringTag(new iString("a")));
    let tlist = new LongArrayTag(
      new iArrayEager([new Long(5), new Long(4), new Long(3)])
    );

    const res1 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_LONG().evaluate(
      nsasa,
      sc,
      llongs
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    let t1 = new CompoundTag({});
    t1 = t1.set("a", new StringTag(new iString("a")));
    t1 = t1.set("c", tlist);
    expect(res1.equals(t1).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_WITH_LIST_LONG().evaluate(
      nsasasbsc,
      sa,
      llongs
    );
    let t2 = new CompoundTag({});
    t2 = t2.set("a", tlist);
    t2 = t2.set("b", new StringTag(new iString("c")));
    expect((res2 as CompoundTag).valueOf().equals(t2.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtWithListLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_LONG().evaluate(
        nempty,
        sa,
        sa
      );
    }).toThrow();
  });

  it("testInvalidInputNbtWithListLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_LONG().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtWithListLong", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_WITH_LIST_LONG().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SUBSET -----------------------------------
   */

  it("testNbtSubset", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(
      nempty,
      nall
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(
      nall,
      nempty
    );
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(
      nsome,
      nall
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputNbtSubsetSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(
        nempty,
        nempty,
        nempty
      );
    }).toThrow();
  });

  it("testInvalidInputNbtSubsetSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtSubset", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_SUBSET().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- UNION -----------------------------------
   */

  it("testNbtUnion", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
      nempty,
      nall
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    expect(
      (res1 as CompoundTag).valueOf().equals(nall.valueOf()).valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
      nall,
      nempty
    );
    expect(
      (res2 as CompoundTag).valueOf().equals(nall.valueOf()).valueOf()
    ).toBe(true);

    const res3 = new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
      nsome,
      nall
    );
    expect(
      (res3 as CompoundTag).valueOf().equals(nall.valueOf()).valueOf()
    ).toBe(true);

    const res4 = new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
      nsasa,
      nsbsb
    );
    let tsasasbsb = new CompoundTag({});
    tsasasbsb = tsasasbsb.set("a", new StringTag(new iString("a")));
    tsasasbsb = tsasasbsb.set("b", new StringTag(new iString("b")));
    expect(
      (res4 as CompoundTag).valueOf().equals(tsasasbsb.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtUnionSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
        nempty,
        nempty,
        nempty
      );
    }).toThrow();
  });

  it("testInvalidInputNbtUnionSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_UNION().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtUnion", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_UNION().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INTERSECTION -----------------------------------
   */

  it("testNbtIntersection", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
      nempty,
      nall
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    expect((res1 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
      nall,
      nempty
    );
    expect((res2 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res3 = new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
      nsome,
      nall
    );
    expect(
      (res3 as CompoundTag).valueOf().equals(nsome.valueOf()).valueOf()
    ).toBe(true);

    const res4 = new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
      nsasa,
      nsbsb
    );
    expect((res4 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res5 = new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
      nsasa,
      nsasasbsc
    );
    expect(
      (res5 as CompoundTag).valueOf().equals(nsasa.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtIntersectionSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
        nempty,
        nempty,
        nempty
      );
    }).toThrow();
  });

  it("testInvalidInputNbtIntersectionSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtIntersection", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_INTERSECTION().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- MINUS -----------------------------------
   */

  it("testNbtMinus", () => {
    const res1 = new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
      nempty,
      nall
    );
    expect(res1).toBeInstanceOf(CompoundTag);
    expect((res1 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
      nall,
      nempty
    );
    expect(
      (res2 as CompoundTag).valueOf().equals(nall.valueOf()).valueOf()
    ).toBe(true);

    const res3 = new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
      nsome,
      nall
    );
    expect((res3 as CompoundTag).valueOf().equals(
      new CompoundTag({}).valueOf()
    ).valueOf()).toBe(true);

    const res4 = new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
      nsasa,
      nsbsb
    );
    expect(
      (res4 as CompoundTag).valueOf().equals(nsasa.valueOf()).valueOf()
    ).toBe(true);

    const res5 = new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
      nsasasbsc,
      nsasa
    );
    let tsbsc = new CompoundTag({});
    tsbsc = tsbsc.set("b", new StringTag(new iString("c")));
    expect(
      (res5 as CompoundTag).valueOf().equals(tsbsc.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtMinusSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
        nempty,
        nempty,
        nempty
      );
    }).toThrow();
  });

  it("testInvalidInputNbtMinusSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(nempty);
    }).toThrow();
  });

  it("testInvalidInputTypeNbtMinus", () => {
    expect(() => {
      new operatorRegistry.NBT_COMPOUND_MINUS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_BOOLEAN -----------------------------------
   */

  it("testNbtAsBoolean", () => {
    const res1 = new operatorRegistry.NBT_AS_BOOLEAN().evaluate(nboolean);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NBT_AS_BOOLEAN().evaluate(nempty);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputNbtAsBooleanSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BOOLEAN().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsBooleanSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BOOLEAN().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsBoolean", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BOOLEAN().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_BYTE -----------------------------------
   */

  it("testNbtAsByte", () => {
    const res1 = new operatorRegistry.NBT_AS_BYTE().evaluate(nbyte);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.NBT_AS_BYTE().evaluate(nempty);
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsByteSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsByteSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsByte", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_SHORT -----------------------------------
   */

  it("testNbtAsShort", () => {
    const res1 = new operatorRegistry.NBT_AS_SHORT().evaluate(nshort);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(2);

    const res2 = new operatorRegistry.NBT_AS_SHORT().evaluate(nempty);
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsShortSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_SHORT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsShortSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_SHORT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsShort", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_SHORT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_INT -----------------------------------
   */

  it("testNbtAsInt", () => {
    const res1 = new operatorRegistry.NBT_AS_INT().evaluate(nint);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);

    const res2 = new operatorRegistry.NBT_AS_INT().evaluate(nempty);
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsIntSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsIntSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsInt", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_LONG -----------------------------------
   */

  it("testNbtAsLong", () => {
    const res1 = new operatorRegistry.NBT_AS_LONG().evaluate(nlong);
    expect(res1).toBeInstanceOf(Long);
    expect((res1 as Long).toJSNumber()).toBe(4);

    const res2 = new operatorRegistry.NBT_AS_LONG().evaluate(nempty);
    expect((res2 as Long).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsLong", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_DOUBLE -----------------------------------
   */

  it("testNbtAsDouble", () => {
    const res1 = new operatorRegistry.NBT_AS_DOUBLE().evaluate(ndouble);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(5.5);

    const res2 = new operatorRegistry.NBT_AS_DOUBLE().evaluate(nempty);
    expect((res2 as Double).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsDoubleSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_DOUBLE().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsDoubleSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_DOUBLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsDouble", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_DOUBLE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_FLOAT -----------------------------------
   */

  it("testNbtAsFloat", () => {
    const res1 = new operatorRegistry.NBT_AS_FLOAT().evaluate(nfloat);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(6.5);

    const res2 = new operatorRegistry.NBT_AS_FLOAT().evaluate(nempty);
    expect((res2 as Double).toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsFloatSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_FLOAT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsFloatSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_FLOAT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsFloat", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_FLOAT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_STRING -----------------------------------
   */

  it("testNbtAsString", () => {
    const res1 = new operatorRegistry.NBT_AS_STRING().evaluate(nstring);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("7");

    const res2 = new operatorRegistry.NBT_AS_STRING().evaluate(nempty);
    expect((res2 as iString).valueOf()).toBe("");
  });

  it("testInvalidInputNbtAsStringSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_STRING().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsStringSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_STRING().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsString", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_STRING().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_TAG_LIST -----------------------------------
   */

  it("testNbtAsTagList", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));

    const res1 = new operatorRegistry.NBT_AS_TAG_LIST().evaluate(ntaglist);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect(res1.getSignatureNode().getOutput().getRootType()).toBe("NBT");
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(2);
    expect(
      (res1 as iArrayEager<any>)
        .get(new Integer(0))
        .valueOf()
        .equals(subCompound.valueOf())
        .valueOf()
    ).toBe(true);
    expect(
      (res1 as iArrayEager<any>)
        .get(new Integer(1))
        .valueOf()
        .equals(subCompound.valueOf())
        .valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.NBT_AS_TAG_LIST().evaluate(nempty);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsTagListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_TAG_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsTagListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_TAG_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsTagList", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_TAG_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_BYTE_LIST -----------------------------------
   */

  it("testNbtAsByteList", () => {
    const res1 = new operatorRegistry.NBT_AS_BYTE_LIST().evaluate(nbytelist);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect(res1.getSignatureNode().getOutput().getRootType()).toBe("Integer");
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res1 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(0);
    expect((res1 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(1);
    expect((res1 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(2);

    const res2 = new operatorRegistry.NBT_AS_BYTE_LIST().evaluate(nempty);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsByteListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsByteListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsByteList", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_BYTE_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_INT_LIST -----------------------------------
   */

  it("testNbtAsIntList", () => {
    const res1 = new operatorRegistry.NBT_AS_INT_LIST().evaluate(nintlist);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect(res1.getSignatureNode().getOutput().getRootType()).toBe("Integer");
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res1 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(0);
    expect((res1 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(1);
    expect((res1 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(2);

    const res2 = new operatorRegistry.NBT_AS_INT_LIST().evaluate(nempty);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsIntListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsIntListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsIntList", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_INT_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AS_LONG_LIST -----------------------------------
   */

  it("testNbtAsLongList", () => {
    const res1 = new operatorRegistry.NBT_AS_LONG_LIST().evaluate(nlonglist);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect(res1.getSignatureNode().getOutput().getRootType()).toBe("Long");
    expect((res1 as iArrayEager<any>).size().toJSNumber()).toBe(3);
    expect((res1 as iArrayEager<any>).get(new Integer(0)).toJSNumber()).toBe(0);
    expect((res1 as iArrayEager<any>).get(new Integer(1)).toJSNumber()).toBe(1);
    expect((res1 as iArrayEager<any>).get(new Integer(2)).toJSNumber()).toBe(2);

    const res2 = new operatorRegistry.NBT_AS_LONG_LIST().evaluate(nempty);
    expect((res2 as iArrayEager<any>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputNbtAsLongListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtAsLongListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtAsLongList", () => {
    expect(() => {
      new operatorRegistry.NBT_AS_LONG_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_BOOLEAN -----------------------------------
   */

  it("testNbtFromBoolean", () => {
    const res1 = new operatorRegistry.NBT_FROM_BOOLEAN().evaluate(
      new iBoolean(true)
    );
    expect(res1).toBeInstanceOf(ByteTag);
    expect(
      (res1 as ByteTag).valueOf().equals(nboolean.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromBooleanSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BOOLEAN().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromBooleanSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BOOLEAN().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromBoolean", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BOOLEAN().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_BYTE -----------------------------------
   */

  it("testNbtFromByte", () => {
    const res1 = new operatorRegistry.NBT_FROM_BYTE().evaluate(new Integer(1));
    expect(res1).toBeInstanceOf(ByteTag);
    expect((res1 as ByteTag).valueOf().equals(nbyte.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtFromByteSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromByteSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromByte", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_SHORT -----------------------------------
   */

  it("testNbtFromShort", () => {
    const res1 = new operatorRegistry.NBT_FROM_SHORT().evaluate(new Integer(2));
    expect(res1).toBeInstanceOf(ShortTag);
    expect(
      (res1 as ShortTag).valueOf().equals(nshort.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromShortSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_SHORT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromShortSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_SHORT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromShort", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_SHORT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_INT -----------------------------------
   */

  it("testNbtFromInt", () => {
    const res1 = new operatorRegistry.NBT_FROM_INT().evaluate(new Integer(3));
    expect(res1).toBeInstanceOf(IntTag);
    expect((res1 as IntTag).valueOf().equals(nint.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtFromIntSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromIntSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromInt", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_LONG -----------------------------------
   */

  it("testNbtFromLong", () => {
    const res1 = new operatorRegistry.NBT_FROM_LONG().evaluate(new Long(4));
    expect(res1).toBeInstanceOf(LongTag);
    expect((res1 as LongTag).valueOf().equals(nlong.valueOf()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputNbtFromLongSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromLongSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromLong", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_DOUBLE -----------------------------------
   */

  it("testNbtFromDouble", () => {
    const res1 = new operatorRegistry.NBT_FROM_DOUBLE().evaluate(
      new Double(5.5)
    );
    expect(res1).toBeInstanceOf(DoubleTag);
    expect(
      (res1 as DoubleTag).valueOf().equals(ndouble.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromDoubleSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_DOUBLE().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromDoubleSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_DOUBLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromDouble", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_DOUBLE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_FLOAT -----------------------------------
   */

  it("testNbtFromFloat", () => {
    const res1 = new operatorRegistry.NBT_FROM_FLOAT().evaluate(
      new Double(6.5)
    );
    expect(res1).toBeInstanceOf(FloatTag);
    expect(
      (res1 as FloatTag).valueOf().equals(nfloat.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromFloatSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_FLOAT().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromFloatSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_FLOAT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromFloat", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_FLOAT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_STRING -----------------------------------
   */

  it("testNbtFromString", () => {
    const res1 = new operatorRegistry.NBT_FROM_STRING().evaluate(
      new iString("7")
    );
    expect(res1).toBeInstanceOf(StringTag);
    expect(
      (res1 as StringTag).valueOf().equals(nstring.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromStringSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_STRING().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromStringSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_STRING().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromString", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_STRING().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_TAG_LIST -----------------------------------
   */

  it("testNbtFromTagList", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    const res1 = new operatorRegistry.NBT_FROM_TAG_LIST().evaluate(
      new iArrayEager([subCompound, subCompound])
    );
    expect(res1).toBeInstanceOf(ListTag);
    expect(
      (res1 as ListTag)
        .valueOf()
        .get(new Integer(0))
        .valueOf()
        .equals(ntaglist.valueOf().get(new Integer(0)).valueOf())
        .valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromTagListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_TAG_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromTagListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_TAG_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromTagList", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_TAG_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_BYTE_LIST -----------------------------------
   */

  it("testNbtFromByteList", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    const res1 = new operatorRegistry.NBT_FROM_BYTE_LIST().evaluate(
      new iArrayEager([new Integer(0), new Integer(1), new Integer(2)])
    );
    expect(res1).toBeInstanceOf(ByteArrayTag);
    expect(
      (res1 as ByteArrayTag).valueOf().equals(nbytelist.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromByteListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromByteListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromByteList", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_BYTE_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_INT_LIST -----------------------------------
   */

  it("testNbtFromIntList", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    const res1 = new operatorRegistry.NBT_FROM_INT_LIST().evaluate(
      new iArrayEager([new Integer(0), new Integer(1), new Integer(2)])
    );
    expect(res1).toBeInstanceOf(IntArrayTag);
    expect(
      (res1 as IntArrayTag).valueOf().equals(nintlist.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testNbtFromIntListAny", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    const res1 = new operatorRegistry.NBT_FROM_INT_LIST().evaluate(
      new iArrayEager([new Integer(0), new Integer(1), new Integer(2)])
    );
    expect(res1).toBeInstanceOf(IntArrayTag);
    expect(
      (res1 as IntArrayTag).valueOf().equals(nintlist.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromIntListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromIntListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromIntList", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_INT_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FROM_LONG_LIST -----------------------------------
   */

  it("testNbtFromLongList", () => {
    let subCompound = new CompoundTag({});
    subCompound = subCompound.set("hello", new StringTag(new iString("world")));
    const res1 = new operatorRegistry.NBT_FROM_LONG_LIST().evaluate(
      new iArrayEager([new Long(0), new Long(1), new Long(2)])
    );
    expect(res1).toBeInstanceOf(LongArrayTag);
    expect(
      (res1 as LongArrayTag).valueOf().equals(nlonglist.valueOf()).valueOf()
    ).toBe(true);
  });

  it("testInvalidInputNbtFromLongListSizeLarge", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG_LIST().evaluate(nempty, nempty);
    }).toThrow();
  });

  it("testInvalidInputNbtFromLongListSizeSmall", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG_LIST().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbtFromLongList", () => {
    expect(() => {
      new operatorRegistry.NBT_FROM_LONG_LIST().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
});
