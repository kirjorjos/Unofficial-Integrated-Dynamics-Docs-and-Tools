/**
 * Test complex currying cases
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minmal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { Integer } from "../../JavaNumberClasses/Integer";
import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { Operator } from "../../IntegratedDynamicsClasses/operators/Operator";

describe("TestCurryingComplex", () => {
  let i4: Integer;
  let i8: Integer;

  beforeEach(() => {
    i4 = new Integer(4);
    i8 = new Integer(8);
  });

  /**
   * ----------------------------------- APPLY -----------------------------------
   */

  // Discovered in https://github.com/CyclopsMC/IntegratedDynamics/issues/754
  it("testBind2", () => {
    const oApply2 = new operatorRegistry.OPERATOR_APPLY_2();
    const oFlip = new operatorRegistry.OPERATOR_FLIP();

    const oApply2Flipped = new operatorRegistry.OPERATOR_FLIP().evaluate(
      oApply2
    ) as Operator<IntegratedValue, IntegratedValue>;
    expect(oApply2Flipped).toBeInstanceOf(Operator);
    expect(oApply2Flipped.getParsedSignature().getArity()).toBe(3);
    expect(oApply2Flipped.getParsedSignature().getInput(0)).toEqual({
      type: "Any",
      typeID: expect.any(Number),
    });
    expect(oApply2Flipped.getParsedSignature().getInput(1)).toEqual({
      type: "Operator",
      obscured: expect.any(Object),
    });
    expect(oApply2Flipped.getParsedSignature().getInput(2)).toEqual({
      type: "Any",
      typeID: expect.any(Number),
    });
    expect(oApply2Flipped.getParsedSignature().getOutput(-1)).toEqual({
      type: "Any",
      typeID: expect.any(Number),
    });

    const oBind2 = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oApply2Flipped,
      oFlip
    ) as Operator<IntegratedValue, IntegratedValue>;
    expect(oBind2).toBeInstanceOf(Operator);
    expect(oBind2.getParsedSignature().getArity()).toBe(1);
    expect(oBind2.getParsedSignature().getInput(0)).toEqual({
      type: "Any",
      typeID: expect.any(Number),
    });

    const oBound4_8 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oBind2,
      i4,
      i8
    ) as Operator<IntegratedValue, IntegratedValue>;
    expect(oBound4_8).toBeInstanceOf(Operator);
    expect(oBound4_8.getParsedSignature().getArity()).toBe(1);

    const oAdd = new operatorRegistry.ARITHMETIC_ADDITION();

    const iResult = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oBound4_8,
      oAdd
    );
    expect(iResult).toBeInstanceOf(Integer);
    expect((iResult as Integer).toJSNumber()).toBe(12);
  });

  it("testBind2Overflow", () => {
    expect(() => {
      const oApply2 = new operatorRegistry.OPERATOR_APPLY_2();
      const oFlip = new operatorRegistry.OPERATOR_FLIP();

      const oApply2Flipped = new operatorRegistry.OPERATOR_FLIP().evaluate(
        oApply2
      );

      const oBind2 = new operatorRegistry.OPERATOR_PIPE().evaluate(
        oApply2Flipped,
        oFlip
      );

      const oBound4_8 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
        oBind2,
        i4,
        i8
      );

      const oAdd = new operatorRegistry.ARITHMETIC_ADDITION();

      new operatorRegistry.OPERATOR_APPLY_2().evaluate(oBound4_8, oAdd, oAdd);
    }).toThrow();
  });

  it("testOmegaOperator", () => {
    expect(() => {
      const oId = new operatorRegistry.GENERAL_IDENTITY();
      const oApply = new operatorRegistry.OPERATOR_APPLY();

      const oX = new operatorRegistry.OPERATOR_PIPE2().evaluate(
        oId,
        oId,
        oApply
      );
      new operatorRegistry.OPERATOR_APPLY().evaluate(oX, oX);
    }).toThrow();
  });
});
