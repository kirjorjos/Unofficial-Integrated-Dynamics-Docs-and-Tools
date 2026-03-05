/**
 * Test the different integer operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { Integer } from "JavaNumberClasses/Integer";
import { iNull } from "IntegratedDynamicsClasses/typeWrappers/iNull";

describe("TestIntegerOperators", () => {
  let i0: Integer;
  let im10: Integer;
  let i10: Integer;
  let i15: Integer;
  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    i0 = new Integer(0);
    im10 = new Integer(-10);
    i10 = new Integer(10);
    i15 = new Integer(15);
    DUMMY_VARIABLE = new iNull();
  });

  describe("MODULO", () => {
    it("testArithmeticModulo", () => {
      const res1 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        i10,
        i10
      ) as Integer;
      expect(res1).toBeInstanceOf(Integer);
      expect(res1.toJSNumber()).toBe(0);

      const res2 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        i0,
        i10
      ) as Integer;
      expect(res2.toJSNumber()).toBe(0);

      const res3 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        im10,
        i10
      ) as Integer;
      expect(res3.toJSNumber()).toBe(0);

      const res4 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        i10,
        im10
      ) as Integer;
      expect(res4.toJSNumber()).toBe(0);

      const res5 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        i10,
        i15
      ) as Integer;
      expect(res5.toJSNumber()).toBe(10);

      const res6 = new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
        i15,
        i10
      ) as Integer;
      expect(res6.toJSNumber()).toBe(5);
    });

    it("testArithmeticModuloByZero", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_MODULUS().evaluate(i10, i0)
      ).toThrow();
    });

    it("testInvalidInputSizeModuloLarge", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_MODULUS().evaluate(i0, i0, i0)
      ).toThrow();
    });

    it("testInvalidInputSizeModuloSmall", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_MODULUS().evaluate(i0)
      ).toThrow();
    });

    it("testInvalidInputTypeModulo", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_MODULUS().evaluate(
          DUMMY_VARIABLE,
          DUMMY_VARIABLE
        )
      ).toThrow();
    });
  });

  describe("INCREMENT", () => {
    it("testArithmeticIncrement", () => {
      const res1 = new operatorRegistry.ARITHMETIC_INCREMENT().evaluate(
        i10
      ) as Integer;
      expect(res1).toBeInstanceOf(Integer);
      expect(res1.toJSNumber()).toBe(11);

      const res2 = new operatorRegistry.ARITHMETIC_INCREMENT().evaluate(
        i0
      ) as Integer;
      expect(res2.toJSNumber()).toBe(1);

      const res3 = new operatorRegistry.ARITHMETIC_INCREMENT().evaluate(
        im10
      ) as Integer;
      expect(res3.toJSNumber()).toBe(-9);
    });

    it("testInvalidInputSizeIncrementLarge", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_INCREMENT().evaluate(i0, i0)
      ).toThrow();
    });

    it("testInvalidInputSizeIncrementSmall", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_INCREMENT().evaluate()
      ).toThrow();
    });

    it("testInvalidInputTypeIncrement", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_INCREMENT().evaluate(DUMMY_VARIABLE)
      ).toThrow();
    });
  });

  describe("DECREMENT", () => {
    it("testArithmeticDecrement", () => {
      const res1 = new operatorRegistry.ARITHMETIC_DECREMENT().evaluate(
        i10
      ) as Integer;
      expect(res1).toBeInstanceOf(Integer);
      expect(res1.toJSNumber()).toBe(9);

      const res2 = new operatorRegistry.ARITHMETIC_DECREMENT().evaluate(
        i0
      ) as Integer;
      expect(res2.toJSNumber()).toBe(-1);

      const res3 = new operatorRegistry.ARITHMETIC_DECREMENT().evaluate(
        im10
      ) as Integer;
      expect(res3.toJSNumber()).toBe(-11);
    });

    it("testInvalidInputSizeDecrementLarge", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_DECREMENT().evaluate(i0, i0)
      ).toThrow();
    });

    it("testInvalidInputSizeDecrementSmall", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_DECREMENT().evaluate()
      ).toThrow();
    });

    it("testInvalidInputTypeDecrement", () => {
      expect(() =>
        new operatorRegistry.ARITHMETIC_DECREMENT().evaluate(DUMMY_VARIABLE)
      ).toThrow();
    });
  });
});
