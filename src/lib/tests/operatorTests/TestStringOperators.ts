import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iArrayLazy } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "lib/JavaNumberClasses/Double";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";

/**
 * Test the different string operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestStringOperators", () => {
  let sempty: iString;
  let sabc: iString;
  let sl: iString;
  let scomma: iString;
  let shello: iString;
  let sworld: iString;
  let shelloWorld: iString;
  let sregex: iString;
  let sbrokenRegex: iString;
  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i10: Integer;
  let i11: Integer;
  let d10_5: Double;
  let labc: iArrayEager<iString>;
  let lint: iArrayEager<Integer>;
  let lstringinvalidtypes: iArrayEager<any>;
  let lstring_inf: iArrayLazy<iString>;
  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    sempty = new iString("");
    sabc = new iString("abc");
    sl = new iString("l");
    scomma = new iString(",");
    shello = new iString("hello");
    sworld = new iString("world");
    shelloWorld = new iString("hello world");
    sregex = new iString("\\A(.+?)(world)\\z");
    sbrokenRegex = new iString("*.");
    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i10 = new Integer(10);
    i11 = new Integer(11);
    d10_5 = new Double(10.5);
    labc = new iArrayEager([
      new iString("a"),
      new iString("b"),
      new iString("c"),
    ]);
    lint = new iArrayEager([new Integer(123)]);
    lstringinvalidtypes = new iArrayEager([new Integer(123)]);
    DUMMY_VARIABLE = new iNull();

    lstring_inf = new iArrayLazy(
      new iString("a"),
      new operatorRegistry.GENERAL_IDENTITY() as unknown as Operator<any, any>,
      new operatorRegistry.GENERAL_IDENTITY() as unknown as Operator<any, any>
    );
  });

  /**
   * ----------------------------------- LENGTH -----------------------------------
   */

  it("testStringLength", () => {
    const res1 = new operatorRegistry.STRING_LENGTH().evaluate(sabc);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeLengthLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_LENGTH().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeLengthSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_LENGTH().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeLength", () => {
    expect(() => {
      new operatorRegistry.STRING_LENGTH().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- CONCAT -----------------------------------
   */

  it("testStringConcat", () => {
    const res1 = new operatorRegistry.STRING_CONCAT().evaluate(sabc, sabc);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("abcabc");
  });

  it("testInvalidInputSizConcatLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_CONCAT().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeConcatSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_CONCAT().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeConcat", () => {
    expect(() => {
      new operatorRegistry.STRING_CONCAT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CONTAINS -----------------------------------
   */

  it("testStringContains", () => {
    const res1 = new operatorRegistry.STRING_CONTAINS().evaluate(
      shello,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_CONTAINS().evaluate(
      sworld,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_CONTAINS().evaluate(
      sabc,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
    expect((res2 as iBoolean).valueOf()).toBe(true);
    expect((res3 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeContainsLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeContainsSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeContains", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INDEX_OF -----------------------------------
   */

  it("testStringIndexOf", () => {
    const res1 = new operatorRegistry.STRING_INDEX_OF().evaluate(
      shello,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_INDEX_OF().evaluate(
      sworld,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_INDEX_OF().evaluate(
      sabc,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);
    expect((res2 as Integer).toJSNumber()).toBe(6);
    expect((res3 as Integer).toJSNumber()).toBe(-1);
  });

  it("testInvalidInputSizeIndexOfLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeIndexOfSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeIndexOf", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INDEX_OF_REGEX -----------------------------------
   */

  it("testStringIndexOfRegex", () => {
    const word = new iString("worl?d");
    const res1 = new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(
      sregex,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(
      sworld,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(
      word,
      shelloWorld
    );
    const res4 = new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(
      sabc,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);
    expect((res2 as Integer).toJSNumber()).toBe(6);
    expect((res3 as Integer).toJSNumber()).toBe(6);
    expect((res4 as Integer).toJSNumber()).toBe(-1);
  });

  it("testInvalidPatternIndexOfRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(sbrokenRegex, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeIndexOfRegexLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeIndexOfRegexSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeIndexOfRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_INDEX_OF_REGEX().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- STARTS_WITH -----------------------------------
   */

  it("testStringStartsWith", () => {
    const res1 = new operatorRegistry.STRING_STARTS_WITH().evaluate(
      shello,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_STARTS_WITH().evaluate(
      sworld,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeStartsWithLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_STARTS_WITH().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeStartsWithSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_STARTS_WITH().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeStartsWith", () => {
    expect(() => {
      new operatorRegistry.STRING_STARTS_WITH().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ENDS_WITH -----------------------------------
   */

  it("testStringEndsWith", () => {
    const res1 = new operatorRegistry.STRING_ENDS_WITH().evaluate(
      sworld,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_ENDS_WITH().evaluate(
      shello,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeEndsWithLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_ENDS_WITH().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeEndsWithSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_ENDS_WITH().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeEndsWith", () => {
    expect(() => {
      new operatorRegistry.STRING_ENDS_WITH().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CONTAINS_REGEX -----------------------------------
   */

  it("testStringContainsRegex", () => {
    const shelloPlus = new iString("hello.+");
    const sstarWorld = new iString(".*world");
    const sello = new iString("e..o");
    const res1 = new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
      shelloPlus,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
    const res2 = new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
      sstarWorld,
      shelloWorld
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
    const res3 = new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
      sregex,
      shelloWorld
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
    const res4 = new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
      sabc,
      shelloWorld
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);
    const res5 = new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
      sello,
      shelloWorld
    );
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidPatternContainsRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(sbrokenRegex, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeContainsRegexLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeContainsRegexSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeContainsRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_CONTAINS_REGEX().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- MATCHES_REGEX -----------------------------------
   */

  it("testStringMatchesRegex", () => {
    const shelloPlus = new iString("hello.+");
    const sstarWorld = new iString(".*world");
    const sello = new iString("e..o");
    const res1 = new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
      shelloPlus,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
    const res2 = new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
      sstarWorld,
      shelloWorld
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
    const res3 = new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
      sregex,
      shelloWorld
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);
    const res4 = new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
      sabc,
      shelloWorld
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);
    const res5 = new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
      sello,
      shelloWorld
    );
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidPatternMatchesRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_MATCHES_REGEX().evaluate(sbrokenRegex, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeMatchesRegexLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_MATCHES_REGEX().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeMatchesRegexSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_MATCHES_REGEX().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeMatchesRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_MATCHES_REGEX().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SPLIT_ON -----------------------------------
   */

  it("testStringSplitOn", () => {
    const sspace = new iString(" ");
    const res1 = new operatorRegistry.STRING_SPLIT_ON().evaluate(
      sspace,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<iString>;
    expect(list.get(new Integer(0)).valueOf()).toBe("hello");
    expect(list.get(new Integer(1)).valueOf()).toBe("world");
    expect(list.size().toJSNumber()).toBe(2);
  });

  it("testInvalidInputSizeSplitOnLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeSplitOnSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeSplitOn", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SPLIT_ON_REGEX -----------------------------------
   */

  it("testStringSplitOnRegex", () => {
    const swhitespace = new iString("\\s");
    const res1 = new operatorRegistry.STRING_SPLIT_ON_REGEX().evaluate(
      swhitespace,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<iString>;
    expect(list.get(new Integer(0)).valueOf()).toBe("hello");
    expect(list.get(new Integer(1)).valueOf()).toBe("world");
    expect(list.size().toJSNumber()).toBe(2);
  });

  it("testInvalidPatternSplitOnRegex", () => {
    const sbroken = new iString("*.");
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON_REGEX().evaluate(sbroken, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeSplitOnRegexLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON_REGEX().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeSplitOnRegexSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON_REGEX().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeSplitOnRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_SPLIT_ON_REGEX().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- SUBSTRING -----------------------------------
   */

  it("testStringSubstring", () => {
    const res1 = new operatorRegistry.STRING_SUBSTRING().evaluate(i1, i2, sabc);
    const res2 = new operatorRegistry.STRING_SUBSTRING().evaluate(
      i1,
      i10,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_SUBSTRING().evaluate(i1, i1, sabc);
    const res4 = new operatorRegistry.STRING_SUBSTRING().evaluate(
      i1,
      i11,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("b");
    expect((res2 as iString).valueOf()).toBe("ello worl");
    expect((res3 as iString).valueOf()).toBe("");
    expect((res4 as iString).valueOf()).toBe("ello world");
  });

  it("testOutOfBoundsSubstring", () => {
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(sabc, i10, i10);
    }).toThrow();
  });

  it("testNegativeSubstring", () => {
    const iNeg1 = new Integer(-1);
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(sabc, iNeg1, i10);
    }).toThrow();
  });

  it("testInvertedSubstring", () => {
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(sabc, i10, i1);
    }).toThrow();
  });

  it("testInvalidInputSizeSubstringLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(sabc, sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeSubstringSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeSubstring", () => {
    expect(() => {
      new operatorRegistry.STRING_SUBSTRING().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REGEX_GROUP -----------------------------------
   */

  it("testStringRegexGroup", () => {
    const res1 = new operatorRegistry.STRING_REGEX_GROUP().evaluate(
      sregex,
      i0,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_REGEX_GROUP().evaluate(
      sregex,
      i1,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_REGEX_GROUP().evaluate(
      sregex,
      i2,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("hello world");
    expect((res2 as iString).valueOf()).toBe("hello ");
    expect((res3 as iString).valueOf()).toBe("world");
  });

  it("testOutOfBoundsRegexGroup", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(
        sregex,
        i10,
        shelloWorld
      );
    }).toThrow();
  });

  it("testNegativeRegexGroup", () => {
    const iNeg1 = new Integer(-1);
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(
        sregex,
        iNeg1,
        shelloWorld
      );
    }).toThrow();
  });

  it("testInvalidPatternRegexGroup", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(
        sbrokenRegex,
        i1,
        sabc
      );
    }).toThrow();
  });

  it("testInvalidInputSizeRegexGroupLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(
        sabc,
        sabc,
        sabc,
        sabc
      );
    }).toThrow();
  });

  it("testInvalidInputSizeRegexGroupSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeRegexGroup", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUP().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REGEX_GROUPS -----------------------------------
   */

  it("testStringRegexGroups", () => {
    const res1 = new operatorRegistry.STRING_REGEX_GROUPS().evaluate(
      sabc,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_REGEX_GROUPS().evaluate(
      sregex,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list1 = res1 as iArrayEager<iString>;
    expect(list1.size().toJSNumber()).toBe(0);
    const list2 = res2 as iArrayEager<iString>;
    expect(list2.get(new Integer(0)).valueOf()).toBe("hello world");
    expect(list2.get(new Integer(1)).valueOf()).toBe("hello ");
    expect(list2.get(new Integer(2)).valueOf()).toBe("world");
    expect(list2.size().toJSNumber()).toBe(3);
  });

  it("testInvalidPatternRegexGroups", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUPS().evaluate(sbrokenRegex, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeRegexGroupsLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUPS().evaluate(sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeRegexGroupsSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUPS().evaluate(sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeRegexGroups", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_GROUPS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REGEX_SCAN -----------------------------------
   */

  it("testStringRegexScan", () => {
    const firstLetters = new iString("(\\S)\\S*");
    const res1 = new operatorRegistry.STRING_REGEX_SCAN().evaluate(
      sabc,
      i0,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_REGEX_SCAN().evaluate(
      firstLetters,
      i1,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list1 = res1 as iArrayEager<iString>;
    expect(list1.size().toJSNumber()).toBe(0);
    const list2 = res2 as iArrayEager<iString>;
    expect(list2.get(new Integer(0)).valueOf()).toBe("h");
    expect(list2.get(new Integer(1)).valueOf()).toBe("w");
    expect(list2.size().toJSNumber()).toBe(2);
  });

  it("testStringRegexScanComplex", () => {
    const regex = new iString("(?:.*?([^\\(\\s]*\\([^\\(]*?\\)).*?)");
    const haystack = new iString(
      "test1(test2(test3, test4), test5(test6, test7))"
    );
    const res1 = new operatorRegistry.STRING_REGEX_SCAN().evaluate(
      regex,
      i1,
      haystack
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list1 = res1 as iArrayEager<iString>;
    expect(list1.size().toJSNumber()).toBe(2);
    expect(list1.get(new Integer(0)).valueOf()).toBe("test2(test3, test4)");
    expect(list1.get(new Integer(1)).valueOf()).toBe("test5(test6, test7)");
  });

  it("testInvalidPatternRegexScan", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_SCAN().evaluate(sbrokenRegex, i0, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeRegexScanLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_SCAN().evaluate(sabc, sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeRegexScanSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_SCAN().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeRegexScan", () => {
    expect(() => {
      new operatorRegistry.STRING_REGEX_SCAN().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REPLACE -----------------------------------
   */

  it("testStringReplace", () => {
    const res1 = new operatorRegistry.STRING_REPLACE().evaluate(
      sl,
      sempty,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_REPLACE().evaluate(
      shelloWorld,
      sempty,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("heo word");
    expect((res2 as iString).valueOf()).toBe("");
  });

  it("testInvalidInputSizeReplaceLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE().evaluate(sabc, sabc, sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeReplaceSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeReplace", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REPLACE_REGEX -----------------------------------
   */

  it("testStringReplaceRegex", () => {
    const szerozero = new iString("$0$0");
    const sone = new iString("$1");
    const res1 = new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
      sl,
      szerozero,
      shelloWorld
    );
    const res2 = new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
      sregex,
      sone,
      shelloWorld
    );
    const res3 = new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
      sregex,
      sempty,
      shelloWorld
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("hellllo worlld");
    expect((res2 as iString).valueOf()).toBe("hello ");
    expect((res3 as iString).valueOf()).toBe("");
  });

  it("testInvalidPatternReplaceRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
        sbrokenRegex,
        i0,
        sabc
      );
    }).toThrow();
  });

  it("testInvalidInputSizeReplaceRegexLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
        sabc,
        sabc,
        sabc,
        sabc
      );
    }).toThrow();
  });

  it("testInvalidInputSizeReplaceRegexSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE_REGEX().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputTypeReplaceRegex", () => {
    expect(() => {
      new operatorRegistry.STRING_REPLACE_REGEX().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- JOIN -----------------------------------
   */

  it("testStringJoin", () => {
    const res1 = new operatorRegistry.STRING_JOIN().evaluate(scomma, labc);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("a,b,c");
  });

  it("testInvalidInputListType", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(scomma, lint);
    }).toThrow();
  });

  it("testInvalidInputListTypeInner", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(lstringinvalidtypes, scomma);
    }).toThrow();
  });

  it("testInvalidInputListInfinite", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(lstring_inf, scomma);
    }).toThrow();
  });

  it("testInvalidInputSizeJoinLarge", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(scomma, labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeJoinSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(scomma);
    }).toThrow();
  });

  it("testInvalidInputTypeJoin", () => {
    expect(() => {
      new operatorRegistry.STRING_JOIN().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- NAMED_NAME -----------------------------------
   */

  it("testStringNamedName", () => {
    const res1 = new operatorRegistry.NAMED_NAME().evaluate(i10);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("10");

    const res2 = new operatorRegistry.NAMED_NAME().evaluate(d10_5);
    expect((res2 as iString).valueOf()).toBe("10.5");
  });

  it("testInvalidInputSizNamedNameLarge", () => {
    expect(() => {
      new operatorRegistry.NAMED_NAME().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeNamedNameSmall", () => {
    expect(() => {
      new operatorRegistry.NAMED_NAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNamedName", () => {
    expect(() => {
      new operatorRegistry.NAMED_NAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
  /**
   * ----------------------------------- STRING_ERROR -----------------------------------
   */

  it("testStringErrorWithSymbols", () => {
    expect(() => {
      new operatorRegistry.STRING_ERROR().evaluate(sregex);
    }).toThrow();
  });

  it("testStringErrorWithSpaces", () => {
    expect(() => {
      new operatorRegistry.STRING_ERROR().evaluate(shelloWorld);
    }).toThrow();
  });

  it("testInvalidInputSizeErrorLong", () => {
    expect(() => {
      new operatorRegistry.STRING_ERROR().evaluate(sabc, sabc);
    }).toThrow();
  });

  it("testInvalidInputSizeErrorSmall", () => {
    expect(() => {
      new operatorRegistry.STRING_ERROR().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeError", () => {
    expect(() => {
      new operatorRegistry.STRING_ERROR().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });
});
