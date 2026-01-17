/**
 * Test the different binary operators.
 * Transpililed from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { Integer } from "../../JavaNumberClasses/Integer";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";

describe("TestBinaryOperators", () => {
  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i3: Integer;
  let i5: Integer;
  let im10: Integer;
  let i10: Integer;

  beforeEach(() => {
    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i3 = new Integer(3);
    i5 = new Integer(5);
    im10 = new Integer(-10);
    i10 = new Integer(10);
  });

  /**
   * ----------------------------------- AND -----------------------------------
   */

  it("testBinaryAnd", () => {
    const res1 = new operatorRegistry.BINARY_AND().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(10);

    const res2 = new operatorRegistry.BINARY_AND().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.BINARY_AND().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(0);

    const res4 = new operatorRegistry.BINARY_AND().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(2);

    const res5 = new operatorRegistry.BINARY_AND().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(2);

    const res6 = new operatorRegistry.BINARY_AND().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(0);

    const res7 = new operatorRegistry.BINARY_AND().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizeAndLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_AND().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeAndSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_AND().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeAnd", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_AND().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });

  it("testBinaryOr", () => {
    const res1 = new operatorRegistry.BINARY_OR().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(10);

    const res2 = new operatorRegistry.BINARY_OR().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(10);

    const res3 = new operatorRegistry.BINARY_OR().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(10);

    const res4 = new operatorRegistry.BINARY_OR().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(-2);

    const res5 = new operatorRegistry.BINARY_OR().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(-2);

    const res6 = new operatorRegistry.BINARY_OR().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(3);

    const res7 = new operatorRegistry.BINARY_OR().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(7);
  });

  it("testInvalidInputSizeOrLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_OR().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeOrSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_OR().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeOr", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_OR().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });

  it("testBinaryXor", () => {
    const res1 = new operatorRegistry.BINARY_XOR().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.BINARY_XOR().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(10);

    const res3 = new operatorRegistry.BINARY_XOR().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(10);

    const res4 = new operatorRegistry.BINARY_XOR().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(-4);

    const res5 = new operatorRegistry.BINARY_XOR().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(-4);

    const res6 = new operatorRegistry.BINARY_XOR().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(3);

    const res7 = new operatorRegistry.BINARY_XOR().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(6);
  });

  it("testInvalidInputSizeXorLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_XOR().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeXorSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_XOR().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeXor", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_XOR().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });

  it("testBinaryComplement", () => {
    const res1 = new operatorRegistry.BINARY_COMPLEMENT().evaluate(i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(-11);

    const res2 = new operatorRegistry.BINARY_COMPLEMENT().evaluate(im10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(9);
  });

  it("testInvalidInputSizeComplementLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_COMPLEMENT().evaluate(i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeComplementSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_COMPLEMENT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeComplement", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_COMPLEMENT().evaluate(nonNumeric);
    }).toThrow();
  });

  it("testBinaryLShift", () => {
    const res1 = new operatorRegistry.BINARY_LSHIFT().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(10240);

    const res2 = new operatorRegistry.BINARY_LSHIFT().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.BINARY_LSHIFT().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(10);

    const res4 = new operatorRegistry.BINARY_LSHIFT().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(-10240);

    const res5 = new operatorRegistry.BINARY_LSHIFT().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(41943040);

    const res6 = new operatorRegistry.BINARY_LSHIFT().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(4);

    const res7 = new operatorRegistry.BINARY_LSHIFT().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(40);
  });

  it("testInvalidInputSizeLShiftLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_LSHIFT().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeLShiftSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_LSHIFT().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeLShift", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_LSHIFT().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });

  it("testBinaryRShift", () => {
    const res1 = new operatorRegistry.BINARY_RSHIFT().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.BINARY_RSHIFT().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.BINARY_RSHIFT().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(10);

    const res4 = new operatorRegistry.BINARY_RSHIFT().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(-1);

    const res5 = new operatorRegistry.BINARY_RSHIFT().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(0);

    const res6 = new operatorRegistry.BINARY_RSHIFT().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(0);

    const res7 = new operatorRegistry.BINARY_RSHIFT().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeRShiftLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_RSHIFT().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeRShiftSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_RSHIFT().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeRShift", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_RSHIFT().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });

  it("testBinaryRZShift", () => {
    const res1 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i10, i10);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as TypeNumber).toJSNumber()).toBe(0);

    const res2 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i0, i10);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as TypeNumber).toJSNumber()).toBe(0);

    const res3 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i10, i0);
    expect(res3).toBeInstanceOf(Integer);
    expect((res3 as TypeNumber).toJSNumber()).toBe(10);

    const res4 = new operatorRegistry.BINARY_RZSHIFT().evaluate(im10, i10);
    expect(res4).toBeInstanceOf(Integer);
    expect((res4 as TypeNumber).toJSNumber()).toBe(4194303);

    const res5 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i10, im10);
    expect(res5).toBeInstanceOf(Integer);
    expect((res5 as TypeNumber).toJSNumber()).toBe(0);

    const res6 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i1, i2);
    expect(res6).toBeInstanceOf(Integer);
    expect((res6 as TypeNumber).toJSNumber()).toBe(0);

    const res7 = new operatorRegistry.BINARY_RZSHIFT().evaluate(i5, i3);
    expect(res7).toBeInstanceOf(Integer);
    expect((res7 as TypeNumber).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeRZShiftLarge", () => {
    expect(() => {
      new operatorRegistry.BINARY_RZSHIFT().evaluate(i0, i0, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeRZShiftSmall", () => {
    expect(() => {
      new operatorRegistry.BINARY_RZSHIFT().evaluate(i0);
    }).toThrow();
  });

  it("testInvalidInputTypeRZShift", () => {
    expect(() => {
      const nonNumeric: IntegratedValue = {
        getSignatureNode: () => ({ type: "String" }),
        equals: (_that: IntegratedValue) => new iBoolean(false),
      };
      new operatorRegistry.BINARY_RZSHIFT().evaluate(nonNumeric, nonNumeric);
    }).toThrow();
  });
});
