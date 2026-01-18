/**
 * Test implicit casting in arithmetic operators.
 * Expects the conversions Integer -> Long -> Double, i.e. simplest int type to most complex float type.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor met4000
 */

import { Integer } from "../../JavaNumberClasses/Integer";
import { Long } from "../../JavaNumberClasses/Long";
import { Double } from "../../JavaNumberClasses/Double";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestImplicitArithmeticCasting", () => {
  let i0: Integer;
  let l0: Long;
  let d0: Double;

  beforeEach(() => {
    i0 = new Integer(0);
    l0 = new Long(0);
    d0 = new Double(0);
  });

  /**
   * ----------------------------------- SAME TYPE -----------------------------------
   */

  /**
   * Verifies that an arithmetic operation with two inputs of the same type has the same output type.
   * Uses {@link Operators#ARITHMETIC_ADDITION} for testing - it is assumed that all other operations will behave the same.
   * Any operators that behave differently need separate tests.
   */
  it("testImplicitArithmeticCastSameType", () => {
    const res1 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(i0, i0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(l0, l0);
    expect(res2).toBeInstanceOf(Long);
    expect((res2 as Long).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(d0, d0);
    expect(res3).toBeInstanceOf(Double);
    expect((res3 as Double).toJSNumber()).toBe(0);
  });

  /**
   * Fails if all type checks incorrectly always return true.
   */
  it("testImplicitArithmeticCastSameTypeFalseNegative", () => {
    const res1 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(i0, i0);
    expect(res1).not.toBeInstanceOf(Long);

    const res2 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(l0, l0);
    expect(res2).not.toBeInstanceOf(Double);

    const res3 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(d0, d0);
    expect(res3).not.toBeInstanceOf(Integer);
  });

  /**
   * ----------------------------------- TO INTEGER -----------------------------------
   */

  // N/A

  /**
   * ----------------------------------- TO LONG -----------------------------------
   */

  it("testImplicitArithmeticCastIntToLong", () => {
    const res1 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(i0, l0);
    expect(res1).toBeInstanceOf(Long);
    expect((res1 as Long).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(l0, i0);
    expect(res2).toBeInstanceOf(Long);
    expect((res2 as Long).toJSNumber()).toBe(0);
  });

  /**
   * ----------------------------------- TO DOUBLE -----------------------------------
   */

  it("testImplicitArithmeticCastIntToDouble", () => {
    const res1 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(i0, d0);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(d0, i0);
    expect(res2).toBeInstanceOf(Double);
    expect((res2 as Double).toJSNumber()).toBe(0);
  });

  it("testImplicitArithmeticCastLongToDouble", () => {
    const res1 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(l0, d0);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.ARITHMETIC_ADDITION().evaluate(d0, l0);
    expect(res2).toBeInstanceOf(Double);
    expect((res2 as Double).toJSNumber()).toBe(0);
  });
});
