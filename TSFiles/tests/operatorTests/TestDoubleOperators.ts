/**
 * Test the different double operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { Double } from "../../JavaNumberClasses/Double";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestDoubleOperators", () => {
  let d16: Double;
  let d2: Double;
  let d3: Double;

  beforeEach(() => {
    d16 = new Double(16);
    d2 = new Double(2);
    d3 = new Double(3);
  });

  /**
   * ----------------------------------- SQRT -----------------------------------
   */

  it("testArithmeticSqrt", () => {
    const res1 = new operatorRegistry.DOUBLE_SQRT().evaluate(d16);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(4);
  });

  it("testInvalidInputSizeSqrtLarge", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_SQRT().evaluate(d16, d16);
    }).toThrow();
  });

  it("testInvalidInputSizeSqrtSmall", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_SQRT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeSqrt", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_SQRT().evaluate(new iString("a"));
    }).toThrow();
  });

  /**
   * ----------------------------------- POW -----------------------------------
   */

  it("testArithmeticPow", () => {
    const res1 = new operatorRegistry.DOUBLE_POW().evaluate(d2, d3);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(8);
  });

  it("testInvalidInputSizePowLarge", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_POW().evaluate(d16, d16, d16);
    }).toThrow();
  });

  it("testInvalidInputSizePowSmall", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_POW().evaluate(d16);
    }).toThrow();
  });

  it("testInvalidInputTypePow", () => {
    expect(() => {
      new operatorRegistry.DOUBLE_POW().evaluate(
        new iString("a"),
        new iString("a")
      );
    }).toThrow();
  });
});
