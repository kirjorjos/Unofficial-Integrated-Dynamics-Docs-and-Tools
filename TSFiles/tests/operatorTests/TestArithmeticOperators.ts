import { Integer } from "../../JavaNumberClasses/Integer";
import { Double } from "../../JavaNumberClasses/Double";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe('TestArithmeticOperators', () => {
    let i0: Integer;
    let i1: Integer;
    let im10: Integer;
    let i10: Integer;
    let i15: Integer;

    let d0: Double;
    let d1: Double;
    let dm10: Double;
    let d10: Double;
    let d15: Double;

    beforeEach(() => {
        i0   = new Integer(0);
        i1   = new Integer(1);
        im10 = new Integer(-10);
        i10  = new Integer(10);
        i15  = new Integer(15);

        d0   = new Double(0);
        d1   = new Double(1);
        dm10 = new Double(-10);
        d10  = new Double(10);
        d15  = new Double(15);
    });

    /**
     * ----------------------------------- ADD -----------------------------------
     */

    it('testArithmeticAddInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(20);

        const res2 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, i0);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(im10, i10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, im10);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticAddDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(20);

        const res2 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(d0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(d10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(dm10, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(d10, dm10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticAddIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(20);

        const res2 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(im10, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_ADDITION.evaluate(i10, dm10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testInvalidInputSizeAddLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_ADDITION.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeAddSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_ADDITION.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeAdd', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_ADDITION.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- MINUS -----------------------------------
     */

    it('testArithmeticMinusInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(-10);

        const res3 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, i0);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(im10, i10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-20);

        const res5 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, im10);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(20);
    });

    it('testArithmeticMinusDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(d0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(-10);

        const res3 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(d10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(dm10, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-20);

        const res5 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(d10, dm10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(20);
    });

    it('testArithmeticMinusIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(-10);

        const res3 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(im10, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-20);

        const res5 = operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i10, dm10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(20);
    });

    it('testInvalidInputSizeMinusLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeMinusSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeMinus', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_SUBTRACTION.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- MULTIPLY -----------------------------------
     */

    it('testArithmeticMultiplyInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(100);

        const res2 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, i0);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, i1);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i0, i10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i1, i10);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10);

        const res6 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(im10, i10);
        expect(res6).toBeInstanceOf(Integer);
        expect((res6 as TypeNumber).toJSNumber()).toBe(-100);
    });

    it('testArithmeticMultiplyDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(100);

        const res2 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(d10, d0);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(d10, d1);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(d0, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(d1, d10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10);

        const res6 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(dm10, d10);
        expect(res6).toBeInstanceOf(Double);
        expect((res6 as TypeNumber).toJSNumber()).toBe(-100);
    });

    it('testArithmeticMultiplyIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(100);

        const res2 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, d0);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i10, d1);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i0, d10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i1, d10);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10);

        const res6 = operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(im10, d10);
        expect(res6).toBeInstanceOf(Double);
        expect((res6 as TypeNumber).toJSNumber()).toBe(-100);
    });

    it('testInvalidInputSizeMultiplyLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeMultiplySmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeMultiply', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_MULTIPLICATION.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- DIVIDE -----------------------------------
     */

    it('testArithmeticDivideInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(1);

        const res2 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(im10, i10);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(-1);

        const res4 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, im10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-1);

        const res5 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, i15);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);

        const res6 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i15, i10);
        expect(res6).toBeInstanceOf(Integer);
        expect((res6 as TypeNumber).toJSNumber()).toBe(1);
    });

    it('testArithmeticDivideDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(1);

        const res2 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(d0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(dm10, d10);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(-1);

        const res4 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(d10, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-1);

        const res5 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(d10, d15);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10 / 15);

        const res6 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(d15, d10);
        expect(res6).toBeInstanceOf(Double);
        expect((res6 as TypeNumber).toJSNumber()).toBe(1.5);
    });

    it('testArithmeticDivideIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(1);

        const res2 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(im10, d10);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(-1);

        const res4 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-1);

        const res5 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, d15);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10 / 15);

        const res6 = operatorRegistry.ARITHMETIC_DIVISION.evaluate(i15, d10);
        expect(res6).toBeInstanceOf(Double);
        expect((res6 as TypeNumber).toJSNumber()).toBe(1.5);
    });

    it('testArithmeticDivideByZero', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_DIVISION.evaluate(i10, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeDivideLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_DIVISION.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeDivideSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_DIVISION.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeDivide', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_DIVISION.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- MAX -----------------------------------
     */

    it('testArithmeticMaxInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i10, i0);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0, im10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(im10, i0);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticMaxDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(d0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(d10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(d0, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(dm10, d0);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticMaxIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(10);

        const res3 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(10);

        const res4 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(im10, d0);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testInvalidInputSizeMaxLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeMaxSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeMax', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_MAXIMUM.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- MIN -----------------------------------
     */

    it('testArithmeticMinInteger', () => {
        const res1 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i10, i0);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);

        const res4 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0, im10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-10);

        const res5 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(im10, i0);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(-10);
    });

    it('testArithmeticMinDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(d10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(d0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(d10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);

        const res4 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(d0, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-10);

        const res5 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(dm10, d0);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(-10);
    });

    it('testArithmeticMinIntegerDouble', () => {
        const res1 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i10, d10);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(10);

        const res2 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0, d10);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i10, d0);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);

        const res4 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0, dm10);
        expect(res4).toBeInstanceOf(Double);
        expect((res4 as TypeNumber).toJSNumber()).toBe(-10);

        const res5 = operatorRegistry.ARITHMETIC_MINIMUM.evaluate(im10, d0);
        expect(res5).toBeInstanceOf(Double);
        expect((res5 as TypeNumber).toJSNumber()).toBe(-10);
    });

    it('testInvalidInputSizeMinLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeMinSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MINIMUM.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeMin', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_MINIMUM.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- MODULO -----------------------------------
     */

    it('testArithmeticModulo', () => {
        const res1 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i0, i10);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(im10, i10);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);

        const res4 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, im10);
        expect(res4).toBeInstanceOf(Integer);
        expect((res4 as TypeNumber).toJSNumber()).toBe(0);

        const res5 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, i15);
        expect(res5).toBeInstanceOf(Integer);
        expect((res5 as TypeNumber).toJSNumber()).toBe(10);

        const res6 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i15, i10);
        expect(res6).toBeInstanceOf(Integer);
        expect((res6 as TypeNumber).toJSNumber()).toBe(5);
    });

    it('testArithmeticModuloByIntegerOne', () => {
        const res1 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, i1);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i0, i1);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i1, i1);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticModuloByDoubleOne', () => {
        const res1 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, d1);
        expect(res1).toBeInstanceOf(Double);
        expect((res1 as TypeNumber).toJSNumber()).toBe(0);

        const res2 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i0, d1);
        expect(res2).toBeInstanceOf(Double);
        expect((res2 as TypeNumber).toJSNumber()).toBe(0);

        const res3 = operatorRegistry.ARITHMETIC_MODULUS.evaluate(i1, d1);
        expect(res3).toBeInstanceOf(Double);
        expect((res3 as TypeNumber).toJSNumber()).toBe(0);
    });

    it('testArithmeticModuloByIntegerZero', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, i0);
        }).toThrow();
    });

    it('testArithmeticModuloByDoubleZero', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MODULUS.evaluate(i10, d0);
        }).toThrow();
    });

    it('testInvalidInputSizeModuloLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MODULUS.evaluate(i0, i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeModuloSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_MODULUS.evaluate(i0);
        }).toThrow();
    });

    it('testInvalidInputTypeModulo', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_MODULUS.evaluate(nonNumeric, nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- INCREMENT -----------------------------------
     */

    it('testArithmeticIncrement', () => {
        const res1 = operatorRegistry.ARITHMETIC_INCREMENT.evaluate(i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(11);

        const res2 = operatorRegistry.ARITHMETIC_INCREMENT.evaluate(i0);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(1);

        const res3 = operatorRegistry.ARITHMETIC_INCREMENT.evaluate(im10);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(-9);
    });

    it('testInvalidInputSizeIncrementLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_INCREMENT.evaluate(i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeIncrementSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_INCREMENT.evaluate();
        }).toThrow();
    });

    it('testInvalidInputTypeIncrement', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_INCREMENT.evaluate(nonNumeric);
        }).toThrow();
    });

    /**
     * ----------------------------------- DECREMENT -----------------------------------
     */

    it('testArithmeticDecrement', () => {
        const res1 = operatorRegistry.ARITHMETIC_DECREMENT.evaluate(i10);
        expect(res1).toBeInstanceOf(Integer);
        expect((res1 as TypeNumber).toJSNumber()).toBe(9);

        const res2 = operatorRegistry.ARITHMETIC_DECREMENT.evaluate(i0);
        expect(res2).toBeInstanceOf(Integer);
        expect((res2 as TypeNumber).toJSNumber()).toBe(-1);

        const res3 = operatorRegistry.ARITHMETIC_DECREMENT.evaluate(im10);
        expect(res3).toBeInstanceOf(Integer);
        expect((res3 as TypeNumber).toJSNumber()).toBe(-11);
    });

    it('testInvalidInputSizeDecrementLarge', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_DECREMENT.evaluate(i0, i0);
        }).toThrow();
    });

    it('testInvalidInputSizeDecrementSmall', () => {
        expect(() => {
            operatorRegistry.ARITHMETIC_DECREMENT.evaluate();
        }).toThrow();
    });

    it('testInvalidInputTypeDecrement', () => {
        expect(() => {
            const nonNumeric: IntegratedValue = {
                getSignatureNode: () => ({ type: "String" }),
                equals: () => ({} as any),
            };
            operatorRegistry.ARITHMETIC_DECREMENT.evaluate(nonNumeric);
        }).toThrow();
    });
});