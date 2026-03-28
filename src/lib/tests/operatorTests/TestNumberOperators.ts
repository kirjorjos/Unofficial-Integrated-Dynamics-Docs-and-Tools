/**
 * Test the different number operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { Integer } from "lib/JavaNumberClasses/Integer";
import { Double } from "lib/JavaNumberClasses/Double";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestNumberOperators", () => {
  let d0: Double;
  let dm10: Double;
  let d0P5: Double;
  let d0P1: Double;
  let d0P9: Double;
  let i10: Integer;
  let i1k: Integer;
  let i1m: Integer;
  let dummy: iString;

  beforeEach(() => {
    d0 = new Double(0);
    dm10 = new Double(-10);
    d0P5 = new Double(0.5);
    d0P1 = new Double(0.1);
    d0P9 = new Double(0.9);

    i10 = new Integer(10);
    i1k = new Integer(1000);
    i1m = new Integer(1000000);
    dummy = new iString("dummy");
  });

  /**
   * ----------------------------------- ROUND -----------------------------------
   */

  it("testDoubleRound", () => {
    const res1 = new operatorRegistry.NUMBER_ROUND().evaluate(d0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NUMBER_ROUND().evaluate(dm10);
    expect((res2 as Integer).toJSNumber()).toBe(-10);

    const res4 = new operatorRegistry.NUMBER_ROUND().evaluate(d0P5);
    expect((res4 as Integer).toJSNumber()).toBe(1);

    const res5 = new operatorRegistry.NUMBER_ROUND().evaluate(d0P1);
    expect((res5 as Integer).toJSNumber()).toBe(0);

    const res6 = new operatorRegistry.NUMBER_ROUND().evaluate(d0P9);
    expect((res6 as Integer).toJSNumber()).toBe(1);

    const res7 = new operatorRegistry.NUMBER_ROUND().evaluate(i10);
    expect((res7 as Integer).toJSNumber()).toBe(10);
  });

  it("testInvalidInputSizeDoubleRoundLarge", () => {
    expect(() => {
      new operatorRegistry.NUMBER_ROUND().evaluate(d0, d0);
    }).toThrow();
  });

  it("testInvalidInputSizeDoubleRoundSmall", () => {
    expect(() => {
      new operatorRegistry.NUMBER_ROUND().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDoubleRound", () => {
    expect(() => {
      new operatorRegistry.NUMBER_ROUND().evaluate(dummy);
    }).toThrow();
  });

  /**
   * ----------------------------------- CEIL -----------------------------------
   */

  it("testDoubleCeil", () => {
    const res1 = new operatorRegistry.NUMBER_CEIL().evaluate(d0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NUMBER_CEIL().evaluate(dm10);
    expect((res2 as Integer).toJSNumber()).toBe(-10);

    const res4 = new operatorRegistry.NUMBER_CEIL().evaluate(d0P5);
    expect((res4 as Integer).toJSNumber()).toBe(1);

    const res5 = new operatorRegistry.NUMBER_CEIL().evaluate(d0P1);
    expect((res5 as Integer).toJSNumber()).toBe(1);

    const res6 = new operatorRegistry.NUMBER_CEIL().evaluate(d0P9);
    expect((res6 as Integer).toJSNumber()).toBe(1);

    const res7 = new operatorRegistry.NUMBER_CEIL().evaluate(i10);
    expect((res7 as Integer).toJSNumber()).toBe(10);
  });

  it("testInvalidInputSizeDoubleCeilLarge", () => {
    expect(() => {
      new operatorRegistry.NUMBER_CEIL().evaluate(d0, d0);
    }).toThrow();
  });

  it("testInvalidInputSizeDoubleCeilSmall", () => {
    expect(() => {
      new operatorRegistry.NUMBER_CEIL().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDoubleCeil", () => {
    expect(() => {
      new operatorRegistry.NUMBER_CEIL().evaluate(dummy);
    }).toThrow();
  });

  /**
   * ----------------------------------- FLOOR -----------------------------------
   */

  it("testDoubleFloor", () => {
    const res1 = new operatorRegistry.NUMBER_FLOOR().evaluate(d0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.NUMBER_FLOOR().evaluate(dm10);
    expect((res2 as Integer).toJSNumber()).toBe(-10);

    const res4 = new operatorRegistry.NUMBER_FLOOR().evaluate(d0P5);
    expect((res4 as Integer).toJSNumber()).toBe(0);

    const res5 = new operatorRegistry.NUMBER_FLOOR().evaluate(d0P1);
    expect((res5 as Integer).toJSNumber()).toBe(0);

    const res6 = new operatorRegistry.NUMBER_FLOOR().evaluate(d0P9);
    expect((res6 as Integer).toJSNumber()).toBe(0);

    const res7 = new operatorRegistry.NUMBER_FLOOR().evaluate(i10);
    expect((res7 as Integer).toJSNumber()).toBe(10);
  });

  it("testInvalidInputSizeDoubleFloorLarge", () => {
    expect(() => {
      new operatorRegistry.NUMBER_FLOOR().evaluate(d0, d0);
    }).toThrow();
  });

  it("testInvalidInputSizeDoubleFloorSmall", () => {
    expect(() => {
      new operatorRegistry.NUMBER_FLOOR().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDoubleFloor", () => {
    expect(() => {
      new operatorRegistry.NUMBER_FLOOR().evaluate(dummy);
    }).toThrow();
  });

  /**
   * ----------------------------------- FUZZY -----------------------------------
   */
  it("testNumberCompact", () => {
    const res1 = new operatorRegistry.NUMBER_COMPACT().evaluate(d0);
    expect((res1 as iString).valueOf()).toBe("0");

    const res2 = new operatorRegistry.NUMBER_COMPACT().evaluate(i10);
    expect((res2 as iString).valueOf()).toBe("10");

    const res3 = new operatorRegistry.NUMBER_COMPACT().evaluate(i1k);
    expect((res3 as iString).valueOf()).toBe("1K");

    const res4 = new operatorRegistry.NUMBER_COMPACT().evaluate(i1m);
    expect((res4 as iString).valueOf()).toBe("1M");
  });
});
