/**
 * Test the different integer operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "JavaNumberClasses/Double";
import { Integer } from "JavaNumberClasses/Integer";

describe("TestRelationalOperators", () => {
  let i0: Integer;
  let im10: Integer;
  let i10: Integer;

  let d0: Double;
  let dm10: Double;
  let d10: Double;

  const DUMMY_VARIABLE_STRING = new iString("Dummy") as IntegratedValue;

  beforeEach(() => {
    i0 = new Integer(0);
    im10 = new Integer(-10);
    i10 = new Integer(10);

    d0 = new Double(0.1);
    dm10 = new Double(-10.1);
    d10 = new Double(10.1);
  });

  /**
   * ----------------------------------- EQUALS -----------------------------------
   */

  test("testRelationalEquals", () => {
    let res1 = new operatorRegistry.RELATIONAL_EQUALS().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    let res2 = new operatorRegistry.RELATIONAL_EQUALS().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    let res3 = new operatorRegistry.RELATIONAL_EQUALS().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    let res4 = new operatorRegistry.RELATIONAL_EQUALS().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(false);

    let res5 = new operatorRegistry.RELATIONAL_EQUALS().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  test("testInvalidInputSizeEqualsLarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_EQUALS().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeEqualsSmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_EQUALS().evaluate(i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- GT -----------------------------------
   */

  test("testRelationalGT", () => {
    let res1 = new operatorRegistry.RELATIONAL_GT().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    let res2 = new operatorRegistry.RELATIONAL_GT().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    let res3 = new operatorRegistry.RELATIONAL_GT().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    let res4 = new operatorRegistry.RELATIONAL_GT().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(false);

    let res5 = new operatorRegistry.RELATIONAL_GT().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  test("testInvalidInputSizeGTLarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GT().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeGTSmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GT().evaluate(i0);
    }).toThrow();
  });

  test("testInvalidInputTypeGT", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GT().evaluate(
        DUMMY_VARIABLE_STRING,
        DUMMY_VARIABLE_STRING
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- LT -----------------------------------
   */

  test("testRelationalLT", () => {
    let res1 = new operatorRegistry.RELATIONAL_LT().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    let res2 = new operatorRegistry.RELATIONAL_LT().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    let res3 = new operatorRegistry.RELATIONAL_LT().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    let res4 = new operatorRegistry.RELATIONAL_LT().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(true);

    let res5 = new operatorRegistry.RELATIONAL_LT().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  test("testInvalidInputSizeLTLarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LT().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeLTSmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LT().evaluate(i0);
    }).toThrow();
  });

  test("testInvalidInputTypeLT", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LT().evaluate(
        DUMMY_VARIABLE_STRING,
        DUMMY_VARIABLE_STRING
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- NOT EQUALS -----------------------------------
   */

  test("testRelationalNotEquals", () => {
    let res1 = new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    let res2 = new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    let res3 = new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    let res4 = new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(true);

    let res5 = new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  test("testInvalidInputSizeNotEqualsLarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeNotEqualsSmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_NOTEQUALS().evaluate(i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- GE -----------------------------------
   */

  test("testRelationalGE", () => {
    let res1 = new operatorRegistry.RELATIONAL_GE().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    let res2 = new operatorRegistry.RELATIONAL_GE().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    let res3 = new operatorRegistry.RELATIONAL_GE().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    let res4 = new operatorRegistry.RELATIONAL_GE().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(false);

    let res5 = new operatorRegistry.RELATIONAL_GE().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  test("testRelationalGEDouble", () => {
    let res1 = new operatorRegistry.RELATIONAL_GE().evaluate(d10, d10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    let res2 = new operatorRegistry.RELATIONAL_GE().evaluate(d0, d10);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    let res3 = new operatorRegistry.RELATIONAL_GE().evaluate(d10, d0);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    let res4 = new operatorRegistry.RELATIONAL_GE().evaluate(dm10, d10);
    expect((res4 as iBoolean).valueOf()).toBe(false);

    let res5 = new operatorRegistry.RELATIONAL_GE().evaluate(d10, dm10);
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  test("testInvalidInputSizeGELarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GE().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeGESmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GE().evaluate(i0);
    }).toThrow();
  });

  test("testInvalidInputTypeGE", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_GE().evaluate(
        DUMMY_VARIABLE_STRING,
        DUMMY_VARIABLE_STRING
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- LE -----------------------------------
   */

  test("testRelationalLE", () => {
    let res1 = new operatorRegistry.RELATIONAL_LE().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    let res2 = new operatorRegistry.RELATIONAL_LE().evaluate(i0, i10);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    let res3 = new operatorRegistry.RELATIONAL_LE().evaluate(i10, i0);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    let res4 = new operatorRegistry.RELATIONAL_LE().evaluate(im10, i10);
    expect((res4 as iBoolean).valueOf()).toBe(true);

    let res5 = new operatorRegistry.RELATIONAL_LE().evaluate(i10, im10);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  test("testInvalidInputSizeLELarge", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LE().evaluate(i0, i0, i0);
    }).toThrow();
  });

  test("testInvalidInputSizeLESmall", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LE().evaluate(i0);
    }).toThrow();
  });

  test("testInvalidInputTypeLE", () => {
    expect(() => {
      new operatorRegistry.RELATIONAL_LE().evaluate(
        DUMMY_VARIABLE_STRING,
        DUMMY_VARIABLE_STRING
      );
    }).toThrow();
  });
});
