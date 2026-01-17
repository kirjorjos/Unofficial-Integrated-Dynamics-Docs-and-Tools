/**
 * Test the different general operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "../../JavaNumberClasses/Integer";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestGeneralOperators", () => {
  let bTrue: iBoolean;
  let bFalse: iBoolean;
  let DUMMY_VARIABLE: iString;

  beforeEach(() => {
    bTrue = new iBoolean(true);
    bFalse = new iBoolean(false);
    DUMMY_VARIABLE = new iString("dummy");
  });

  /**
   * ----------------------------------- CHOICE -----------------------------------
   */

  it("testLogicalChoice", () => {
    const i1 = new Integer(1);
    const i2 = new Integer(2);

    const res1 = new operatorRegistry.GENERAL_CHOICE().evaluate(bTrue, i1, i2);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.GENERAL_CHOICE().evaluate(bFalse, i1, i2);
    expect((res2 as Integer).toJSNumber()).toBe(2);
  });

  it("testInvalidInputSizeChoiceLarge", () => {
    expect(() => {
      new operatorRegistry.GENERAL_CHOICE().evaluate(
        bTrue,
        bTrue,
        bTrue,
        bTrue
      );
    }).toThrow();
  });

  it("testInvalidInputSizeChoiceSmall", () => {
    expect(() => {
      new operatorRegistry.GENERAL_CHOICE().evaluate(bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputTypeChoice", () => {
    expect(() => {
      new operatorRegistry.GENERAL_CHOICE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testInvalidLogicalChoiceDifferentTypes", () => {
    const i1 = new Integer(1);
    expect(() => {
      new operatorRegistry.GENERAL_CHOICE().evaluate(
        bFalse,
        i1,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- IDENTITY -----------------------------------
   */

  it("testLogicalIdentity", () => {
    const i1 = new Integer(1);

    const res1 = new operatorRegistry.GENERAL_IDENTITY().evaluate(i1);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.GENERAL_IDENTITY().evaluate(bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIdentityLarge", () => {
    expect(() => {
      new operatorRegistry.GENERAL_IDENTITY().evaluate(bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeIdentitySmall", () => {
    expect(() => {
      new operatorRegistry.GENERAL_IDENTITY().evaluate();
    }).toThrow();
  });

  /**
   * ----------------------------------- CONSTANT -----------------------------------
   */

  it("testLogicalConstant", () => {
    const i1 = new Integer(1);

    const res1 = new operatorRegistry.GENERAL_CONSTANT().evaluate(i1, bFalse);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.GENERAL_CONSTANT().evaluate(bFalse, i1);
    expect(res2).toBeInstanceOf(iBoolean);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeConstantLarge", () => {
    expect(() => {
      new operatorRegistry.GENERAL_CONSTANT().evaluate(bTrue, bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeConstantSmall", () => {
    expect(() => {
      new operatorRegistry.GENERAL_CONSTANT().evaluate(bTrue);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISNULL -----------------------------------
   */

  it("testLogicalIsNull", () => {
    const i1 = new Integer(1);
    const n = new iNull();

    const res1 = new operatorRegistry.NULLABLE_ISNULL().evaluate(i1);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.NULLABLE_ISNULL().evaluate(bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.NULLABLE_ISNULL().evaluate(n);
    expect((res3 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsNullLarge", () => {
    expect(() => {
      new operatorRegistry.NULLABLE_ISNULL().evaluate(bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeIsNullSmall", () => {
    expect(() => {
      new operatorRegistry.NULLABLE_ISNULL().evaluate();
    }).toThrow();
  });

  /**
   * ----------------------------------- ISNOTNULL -----------------------------------
   */

  it("testLogicalIsNotNull", () => {
    const i1 = new Integer(1);
    const n = new iNull();

    const res1 = new operatorRegistry.NULLABLE_ISNOTNULL().evaluate(i1);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.NULLABLE_ISNOTNULL().evaluate(bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.NULLABLE_ISNOTNULL().evaluate(n);
    expect((res3 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsNotNullLarge", () => {
    expect(() => {
      new operatorRegistry.NULLABLE_ISNOTNULL().evaluate(bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeIsNotNullSmall", () => {
    expect(() => {
      new operatorRegistry.NULLABLE_ISNOTNULL().evaluate();
    }).toThrow();
  });
});
