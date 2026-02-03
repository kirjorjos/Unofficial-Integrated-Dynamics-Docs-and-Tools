import { operatorRegistry } from "../../IntegratedDynamicsClasses/operators/operatorRegistry";
import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "../../JavaNumberClasses/Integer";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iArray } from "../../IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../../IntegratedDynamicsClasses/operators/Operator";
import { BaseOperator } from "../../IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "../../HelperClasses/ParsedSignature";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestOperatorOperators", () => {
  let bFalse: iBoolean;
  let bTrue: iBoolean;

  let s1: iString;

  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i3: Integer;
  let i4Any: Integer;

  let oGeneralIdentity: Operator<any, any>;
  let oLogicalNot: Operator<any, any>;
  let oLogicalAnd: Operator<any, any>;
  let oParseInt: Operator<any, any>;
  let oRelationalEquals: Operator<any, any>;
  let oRelationalGreaterThan: Operator<any, any>;
  let oRelationalLessThan: Operator<any, any>;
  let oArithmeticIncrement: Operator<any, any>;
  let oArithmeticIncrement2: Operator<any, any>;
  let oArithmeticModulus: Operator<any, any>;
  let oArithmeticAddition: Operator<any, any>;
  // let oArithmeticAddition2: Operator<any, any>;
  let oArithmeticMultiplication: Operator<any, any>;
  let oChoice: Operator<any, any>;
  let oPipe: Operator<any, any>;
  let oListLength: Operator<any, any>;
  let oListContains: Operator<any, any>;
  let oOperatorMap: Operator<any, any>;
  let oSubStr: Operator<any, any>;
  let oGetConstStr: Operator<any, any>;

  let lempty: iArray<any>;
  let lintegers: iArray<any>;
  let lbooleans: iArray<any>;

  let sAnd: iString;
  let sOther: iString;

  beforeEach(() => {
    bFalse = new iBoolean(false);
    bTrue = new iBoolean(true);

    s1 = new iString("1");

    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i3 = new Integer(3);
    i4Any = new Integer(4);

    oGeneralIdentity = new operatorRegistry.GENERAL_IDENTITY();
    oLogicalNot = new operatorRegistry.LOGICAL_NOT();
    oLogicalAnd = new operatorRegistry.LOGICAL_AND();
    oParseInt = new operatorRegistry.PARSE_INTEGER();
    oRelationalEquals = new operatorRegistry.RELATIONAL_EQUALS();
    oRelationalGreaterThan = new operatorRegistry.RELATIONAL_GT();
    oRelationalLessThan = new operatorRegistry.RELATIONAL_LT();
    oArithmeticIncrement = new operatorRegistry.ARITHMETIC_INCREMENT();
    oArithmeticIncrement2 = new operatorRegistry.ARITHMETIC_INCREMENT();
    oArithmeticModulus = new operatorRegistry.ARITHMETIC_MODULUS();
    oArithmeticAddition = new operatorRegistry.ARITHMETIC_ADDITION();
    // oArithmeticAddition2      = new operatorRegistry.ARITHMETIC_ADDITION();
    oArithmeticMultiplication =
      new operatorRegistry.ARITHMETIC_MULTIPLICATION();
    oChoice = new operatorRegistry.GENERAL_CHOICE();
    oPipe = new operatorRegistry.OPERATOR_PIPE();
    oListLength = new operatorRegistry.LIST_LENGTH();
    oListContains = new operatorRegistry.LIST_CONTAINS();
    oOperatorMap = new operatorRegistry.OPERATOR_MAP();
    oSubStr = new operatorRegistry.STRING_SUBSTRING();
    oGetConstStr = new BaseOperator({
      nicknames: ["NONE"],
      symbol: "NONE",
      interactName: "NONE",
      parsedSignature: new ParsedSignature({ type: "String" }),
      function: () => new iString("HI"),
    });
    lempty = new iArrayEager([]);
    lintegers = new iArrayEager([i0, i1, i2, i3]);
    lbooleans = new iArrayEager([bFalse, bTrue, bFalse, bTrue]);

    sAnd = new iString("integrateddynamics:logical_and");
    sOther = new iString("integrateddynamics:other");
  });

  /**
   * ----------------------------------- APPLY -----------------------------------
   */

  it("testApply", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oGeneralIdentity,
      bFalse
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(false);

    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oGeneralIdentity,
      bTrue
    );
    expect((res2 as iBoolean).bool).toBe(true);

    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalNot,
      bTrue
    );
    expect((res3 as iBoolean).bool).toBe(false);

    const res4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalNot,
      bFalse
    );
    expect((res4 as iBoolean).bool).toBe(true);
  });

  it("testApplyCurring", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bTrue
    );
    expect(res1).toBeInstanceOf(Operator);

    const oLogicalAndCurriedTrue = res1 as Operator<any, any>;
    const res2_1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAndCurriedTrue,
      bTrue
    );
    expect(res2_1).toBeInstanceOf(iBoolean);
    expect((res2_1 as iBoolean).bool).toBe(true);
    const res2_2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAndCurriedTrue,
      bFalse
    );
    expect((res2_2 as iBoolean).bool).toBe(false);

    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bFalse
    );
    expect(res3).toBeInstanceOf(Operator);

    const oLogicalAndCurriedFalse = res3 as Operator<any, any>;
    const res4_1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAndCurriedFalse,
      bTrue
    );
    expect(res4_1).toBeInstanceOf(iBoolean);
    expect((res4_1 as iBoolean).bool).toBe(false);
    const res4_2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAndCurriedFalse,
      bFalse
    );
    expect((res4_2 as iBoolean).bool).toBe(false);
  });

  it("testInvalidInputSizeApplyLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(
        oGeneralIdentity,
        bFalse,
        bFalse
      );
    }).toThrow();
  });

  it("testInvalidInputSizeApplyCurryingLarge", () => {
    const curriedOperatorValue = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bTrue
    );
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(
        curriedOperatorValue,
        bFalse,
        bFalse
      );
    }).toThrow();
  });

  it("testInvalidInputSizeApplySmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(oGeneralIdentity);
    }).toThrow();
  });

  it("testInvalidInputSizeApplyCurringSmall", () => {
    const curriedOperatorValue = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bTrue
    );
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(curriedOperatorValue);
    }).toThrow();
  });

  it("testInvalidOperatorTypeApply", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(bFalse, bFalse);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeApply", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(
        oLogicalNot,
        oGeneralIdentity
      );
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeAnyApply", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(i4Any, i4Any);
    }).toThrow();
  });

  it("testConditionalOutputTypesApplyCurring", () => {
    const curriedOperatorValue = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bTrue
    );
    const curriedSignature = (
      curriedOperatorValue as Operator<any, any>
    ).getParsedSignature();
    expect(curriedSignature.getArity()).toBe(1);
    expect(curriedSignature.getInput(0).getRootType()).toBe("Boolean");
    expect(curriedSignature.getOutput().getRootType()).toBe("Boolean");
  });

  /**
   * ----------------------------------- APPLY_2 -----------------------------------
   */

  it("testApply2", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oLogicalAnd,
      bTrue,
      bFalse
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(false);

    const res2 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oLogicalAnd,
      bTrue,
      bTrue
    );
    expect((res2 as iBoolean).bool).toBe(true);

    const res3 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oRelationalGreaterThan,
      i0,
      i1
    );
    expect((res3 as iBoolean).bool).toBe(false);

    const res4 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oRelationalGreaterThan,
      i2,
      i1
    );
    expect((res4 as iBoolean).bool).toBe(true);
  });

  it("testApply2OnOpWith3Inputs", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oChoice,
      bTrue,
      i1
    );
    expect(res1).toBeInstanceOf(Operator);
    expect((res1 as Operator<any, any>).getParsedSignature().getArity()).toBe(
      1
    );
    expect(
      (res1 as Operator<any, any>)
        .getParsedSignature()
        .getInput(0)
        .getRootType()
    ).toBe("Any");
    expect(
      (res1 as Operator<any, any>)
        .getParsedSignature()
        .getOutput(-1)
        .getRootType()
    ).toBe("Any");

    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(res1, i2);
    expect(res2).toBeInstanceOf(Integer);
    expect((res2 as Integer).toJSNumber()).toBe(1);
  });

  it("testArityOfApply2", () => {
    const operator = new operatorRegistry.OPERATOR_APPLY_2();
    expect(operator.getParsedSignature().getArity()).toBe(3);
  });

  it("testInvalidInputSizeApply2Large", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_2().evaluate(
        oLogicalAnd,
        bFalse,
        bFalse,
        bFalse
      );
    }).toThrow();
  });

  it("testInvalidInputSizeApply2Small", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_2().evaluate(oLogicalAnd, bTrue);
    }).toThrow();
  });

  it("testInvalidOperatorTypeApply2", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_2().evaluate(bFalse, bFalse, bFalse);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeApply2", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_2().evaluate(
        oLogicalNot,
        oGeneralIdentity,
        bTrue
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- APPLY_3 -----------------------------------
   */

  it("testApply3", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY_3().evaluate(
      oSubStr,
      i0,
      i1,
      sAnd
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("i");
  });

  it("testApply3ThreeAnd", () => {
    const oPipeFlip = new operatorRegistry.OPERATOR_FLIP().evaluate(oPipe);
    const oPipeFlip2 = new operatorRegistry.OPERATOR_FLIP().evaluate(
      new operatorRegistry.OPERATOR_PIPE()
    );
    const oThreeAnd_1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oPipeFlip,
      oLogicalAnd
    );
    const oThreeAnd = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      oPipeFlip2,
      oThreeAnd_1,
      new operatorRegistry.LOGICAL_AND()
    );

    const res1 = new operatorRegistry.OPERATOR_APPLY_3().evaluate(
      oThreeAnd,
      bTrue,
      bTrue,
      bTrue
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(true);
  });

  /**
   * ----------------------------------- APPLY_N -----------------------------------
   */

  it("testApplyN", () => {
    const applyArgs = new iArrayEager([i0, i1, sAnd]);
    const res1 = new operatorRegistry.OPERATOR_APPLY_N().evaluate(
      oSubStr,
      applyArgs
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("i");
  });

  it("testInvalidInputSizeApplyNLarge", () => {
    const applyArgs = new iArrayEager([i0, i1, sAnd]);
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_N().evaluate(
        oSubStr,
        applyArgs,
        applyArgs
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- APPLY_0 -----------------------------------
   */

  it("testApply0", () => {
    const res1 = new operatorRegistry.OPERATOR_APPLY_0().evaluate(oGetConstStr);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("HI");
  });

  it("testInvalidInputSizeApply0Large", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY_0().evaluate(oGetConstStr, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- MAP -----------------------------------
   */

  it("testMap", () => {
    const res1 = new operatorRegistry.OPERATOR_MAP().evaluate(
      oArithmeticIncrement,
      lintegers
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list1 = res1 as iArray<Integer>;
    expect((list1.get(new Integer(0)) as Integer).toJSNumber()).toBe(1);
    expect((list1.get(new Integer(1)) as Integer).toJSNumber()).toBe(2);
    expect((list1.get(new Integer(2)) as Integer).toJSNumber()).toBe(3);
    expect((list1.get(new Integer(3)) as Integer).toJSNumber()).toBe(4);

    const res2 = new operatorRegistry.OPERATOR_MAP().evaluate(
      oLogicalNot,
      lbooleans
    );
    const list2 = res2 as iArray<iBoolean>;
    expect((list2.get(new Integer(0)) as iBoolean).bool).toBe(true);
    expect((list2.get(new Integer(1)) as iBoolean).bool).toBe(false);
    expect((list2.get(new Integer(2)) as iBoolean).bool).toBe(true);
    expect((list2.get(new Integer(3)) as iBoolean).bool).toBe(false);

    const curriedOperatorValue = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oLogicalAnd,
      bTrue
    );
    const res3 = new operatorRegistry.OPERATOR_MAP().evaluate(
      curriedOperatorValue,
      lbooleans
    );
    const list3 = res3 as iArray<iBoolean>;
    expect((list3.get(new Integer(0)) as iBoolean).bool).toBe(false);
    expect((list3.get(new Integer(1)) as iBoolean).bool).toBe(true);
    expect((list3.get(new Integer(2)) as iBoolean).bool).toBe(false);
    expect((list3.get(new Integer(3)) as iBoolean).bool).toBe(true);

    const res4 = new operatorRegistry.OPERATOR_MAP().evaluate(
      oLogicalAnd,
      lbooleans
    );
    const list4 = res4 as iArray<Operator<any, any>>;
    expect(list4.get(new Integer(0))).toBeInstanceOf(Operator);
    expect(list4.get(new Integer(1))).toBeInstanceOf(Operator);
    expect(list4.get(new Integer(2))).toBeInstanceOf(Operator);
    expect(list4.get(new Integer(3))).toBeInstanceOf(Operator);

    const op0 = list4.get(new Integer(0)) as Operator<any, any>;
    const op1 = list4.get(new Integer(1)) as Operator<any, any>;
    const op2 = list4.get(new Integer(2)) as Operator<any, any>;
    const op3 = list4.get(new Integer(3)) as Operator<any, any>;

    expect((op0.evaluate(bTrue) as iBoolean).bool).toBe(false);
    expect((op1.evaluate(bTrue) as iBoolean).bool).toBe(true);
    expect((op2.evaluate(bTrue) as iBoolean).bool).toBe(false);
    expect((op3.evaluate(bTrue) as iBoolean).bool).toBe(true);
  });

  it("testInvalidInputSizeMapLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_MAP().evaluate(
        oArithmeticIncrement,
        lintegers,
        lintegers
      );
    }).toThrow();
  });

  it("testInvalidInputSizeMapSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_MAP().evaluate(oArithmeticIncrement);
    }).toThrow();
  });

  it("testInvalidOperatorTypeMap", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_MAP().evaluate(bFalse, bFalse);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeMap", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_MAP().evaluate(
        oArithmeticIncrement,
        oArithmeticIncrement
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- PREDICATE CONJUNCTION -----------------------------------
   */

  it("testPredicateConjunction", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    const twoGreaterThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalGreaterThan,
      i2
    );
    const zeroLessThanandTwoGreaterThan =
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(
        zeroLessThan,
        twoGreaterThan
      );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanandTwoGreaterThan,
      i0
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(false);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanandTwoGreaterThan,
      i1
    );
    expect((res2 as iBoolean).bool).toBe(true);
    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanandTwoGreaterThan,
      i2
    );
    expect((res3 as iBoolean).bool).toBe(false);
  });

  it("testInvalidInputSizePredicateConjunctionLarge", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(
        zeroLessThan,
        zeroLessThan,
        zeroLessThan
      );
    }).toThrow();
  });

  it("testInvalidInputSizePredicateConjunctionSmall", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(zeroLessThan);
    }).toThrow();
  });

  it("testInvalidOperatorTypePredicateConjunction", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(
        bFalse,
        zeroLessThan
      );
    }).toThrow();
  });

  it("testInvalidOperatorInputTypePredicateConjunction", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );
    expect(() => {
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(equalsTwo, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- PREDICATE DISJUNCTION -----------------------------------
   */

  it("testPredicateDisjunction", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    const twoGreaterThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalGreaterThan,
      i2
    );
    const zeroLessThanorTwoGreaterThan =
      new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(
        zeroLessThan,
        twoGreaterThan
      );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanorTwoGreaterThan,
      i0
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(true);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanorTwoGreaterThan,
      i1
    );
    expect((res2 as iBoolean).bool).toBe(true);
    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      zeroLessThanorTwoGreaterThan,
      i2
    );
    expect((res3 as iBoolean).bool).toBe(true);
  });

  it("testInvalidInputSizePredicateDisjunctionLarge", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(
        zeroLessThan,
        zeroLessThan,
        zeroLessThan
      );
    }).toThrow();
  });

  it("testInvalidInputSizePredicateDisjunctionSmall", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(zeroLessThan);
    }).toThrow();
  });

  it("testInvalidOperatorTypePredicateDisjunction", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(
        bFalse,
        zeroLessThan
      );
    }).toThrow();
  });

  it("testInvalidOperatorInputTypePredicateDisjunction", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );
    expect(() => {
      new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(equalsTwo, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- PREDICATE NEGATION -----------------------------------
   */

  it("testPredicateNegation", () => {
    const twoGreaterThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalGreaterThan,
      i2
    );
    const notTwoGreaterThan = new operatorRegistry.OPERATOR_NEGATION().evaluate(
      twoGreaterThan
    );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      notTwoGreaterThan,
      i0
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(false);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      notTwoGreaterThan,
      i1
    );
    expect((res2 as iBoolean).bool).toBe(false);
    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      notTwoGreaterThan,
      i2
    );
    expect((res3 as iBoolean).bool).toBe(true);
    const res4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      notTwoGreaterThan,
      i3
    );
    expect((res4 as iBoolean).bool).toBe(true);
  });

  it("testInvalidInputSizePredicateNegationLarge", () => {
    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    expect(() => {
      new operatorRegistry.OPERATOR_NEGATION().evaluate(
        zeroLessThan,
        zeroLessThan
      );
    }).toThrow();
  });

  it("testInvalidInputSizePredicateNegationSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_NEGATION().evaluate();
    }).toThrow();
  });

  it("testInvalidOperatorTypePredicateNegation", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_NEGATION().evaluate(bFalse);
    }).toThrow();
  });

  /**
   * ----------------------------------- PREDICATE PIPE -----------------------------------
   */

  it("testPredicatePipe", () => {
    const increment2 = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oArithmeticIncrement,
      oArithmeticIncrement2
    );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(increment2, i0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(2);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(increment2, i1);
    expect((res2 as Integer).toJSNumber()).toBe(3);
  });

  it("testPredicatePipe3Incr", () => {
    const innerPipe = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oArithmeticIncrement,
      oArithmeticIncrement2
    );
    const op = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oArithmeticIncrement,
      innerPipe
    ) as Operator<any, any>;

    const signature = op.getParsedSignature();
    expect(signature.getArity()).toBe(1);
    expect(signature.getInput(0).getRootType()).toBe("Number");
    expect(signature.getOutput(-1).getRootType()).toBe("Number");

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(op, i2);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(5);
  });

  it("testPredicatePipeAddAddError", () => {
    const op = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oArithmeticAddition,
      new operatorRegistry.ARITHMETIC_ADDITION()
    );
    expect(() => {
      new operatorRegistry.OPERATOR_APPLY().evaluate(op, i2, i2);
    }).toThrow();
  });

  it("testPredicatePipeMapContains", () => {
    const mapContains = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oListContains,
      oOperatorMap
    );

    const signature = (mapContains as Operator<any, any>).getParsedSignature();
    expect(signature.getArity()).toBe(2);
    expect(signature.getInput(0).getRootType()).toBe("List");
    expect(signature.getInput(1).getRootType()).toBe("List");
    expect(signature.getOutput(-1).getRootType()).toBe("List");

    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      mapContains,
      lintegers,
      lintegers
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const expected = new iArrayEager([
      new iBoolean(true),
      new iBoolean(true),
      new iBoolean(true),
      new iBoolean(true),
    ]);
    expect(res1.equals(expected).bool).toBe(true);
  });

  it("testPredicatePipeLargeInputCount", () => {
    const incrementAndAdd = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oParseInt,
      oArithmeticAddition
    );
    expect(
      (incrementAndAdd as Operator<any, any>).getParsedSignature().getArity()
    ).toBe(2);
    const sig = (incrementAndAdd as Operator<any, any>).getParsedSignature();
    expect(sig.getInput(0).getRootType()).toBe("String");
    expect(sig.getInput(1).getRootType()).toBe("Number");
    expect(sig.getOutput(-1).getRootType()).toBe("Number");

    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      incrementAndAdd,
      s1,
      i2
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testPredicatePipeMixed", () => {
    const listLengthIncr = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oListLength,
      oArithmeticAddition
    ) as Operator<any, any>;

    const signature = listLengthIncr.getParsedSignature();
    expect(signature.getArity()).toBe(2);
    expect(signature.getInput(0).getRootType()).toBe("List");
    expect(signature.getInput(1).getRootType()).toBe("Number");
    expect(signature.getOutput(-1).getRootType()).toBe("Number");

    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      listLengthIncr,
      lintegers,
      i2
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(6);
  });

  it("testPredicatePipeLenAddMap", () => {
    const innerPipe = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oArithmeticAddition,
      oOperatorMap
    );
    const op = new operatorRegistry.OPERATOR_PIPE().evaluate(
      oListLength,
      innerPipe
    ) as Operator<any, any>;

    const signature = op.getParsedSignature();
    expect(signature.getArity()).toBe(2);
    expect(signature.getInput(0).getRootType()).toBe("List");
    expect(signature.getInput(1).getRootType()).toBe("List");
    expect(signature.getOutput(-1).getRootType()).toBe("List");

    const res1 = new operatorRegistry.OPERATOR_APPLY_2().evaluate(
      op,
      lintegers,
      lintegers
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const expected = new iArrayEager([
      new Integer(4),
      new Integer(5),
      new Integer(6),
      new Integer(7),
    ]);
    expect(res1.equals(expected).bool).toBe(true);
  });

  it("testInvalidInputSizePredicatePipeLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_PIPE().evaluate(
        oArithmeticIncrement,
        oArithmeticIncrement,
        oArithmeticIncrement
      );
    }).toThrow();
  });

  it("testInvalidInputSizePredicatePipeSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_PIPE().evaluate(oArithmeticIncrement);
    }).toThrow();
  });

  it("testInvalidOperatorTypePredicatePipe", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_PIPE().evaluate(
        bFalse,
        oArithmeticIncrement
      );
    }).toThrow();
  });

  it("testInvalidOperatorInputTypePredicatePipe", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_PIPE().evaluate(oArithmeticIncrement, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- PREDICATE PIPE 2 -----------------------------------
   */

  it("testPredicatePipe2", () => {
    const addOneAndSelfMultiply =
      new operatorRegistry.OPERATOR_PIPE2().evaluate(
        oGeneralIdentity,
        oArithmeticIncrement,
        oArithmeticMultiplication
      ) as Operator<any, any>;

    const signature = addOneAndSelfMultiply.getParsedSignature();
    expect(signature.getArity()).toBe(1);
    expect(signature.getInput(0).getRootType()).toBe("Number");
    expect(signature.getOutput(-1).getRootType()).toBe("Number");

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      addOneAndSelfMultiply,
      i0
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(0);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      addOneAndSelfMultiply,
      i1
    );
    expect((res2 as Integer).toJSNumber()).toBe(2);
    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      addOneAndSelfMultiply,
      i2
    );
    expect((res3 as Integer).toJSNumber()).toBe(6);
    const res4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      addOneAndSelfMultiply,
      i3
    );
    expect((res4 as Integer).toJSNumber()).toBe(12);
  });

  /**
   * ----------------------------------- PREDICATE FLIP -----------------------------------
   */

  it("testPredicateFlip", () => {
    const lessThanFlipped = new operatorRegistry.OPERATOR_FLIP().evaluate(
      oRelationalLessThan
    );
    const lessThan2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      lessThanFlipped,
      i2
    );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(lessThan2, i0);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).bool).toBe(true);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(lessThan2, i1);
    expect((res2 as iBoolean).bool).toBe(true);
    const res3 = new operatorRegistry.OPERATOR_APPLY().evaluate(lessThan2, i2);
    expect((res3 as iBoolean).bool).toBe(false);
    const res4 = new operatorRegistry.OPERATOR_APPLY().evaluate(lessThan2, i3);
    expect((res4 as iBoolean).bool).toBe(false);
  });

  it("testPredicateFlipOperatorWithThreeInputs", () => {
    const choiceFlipped = new operatorRegistry.OPERATOR_FLIP().evaluate(
      oChoice
    );
    const choiceFlipped0 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      choiceFlipped,
      i0
    );
    const choiceFlipped0False = new operatorRegistry.OPERATOR_APPLY().evaluate(
      choiceFlipped0,
      bFalse
    );
    const choiceFlipped0True = new operatorRegistry.OPERATOR_APPLY().evaluate(
      choiceFlipped0,
      bTrue
    );

    const res1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      choiceFlipped0False,
      i1
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);
    const res2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      choiceFlipped0True,
      i1
    );
    expect((res2 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizePredicateFlipLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_FLIP().evaluate(
        oRelationalLessThan,
        oRelationalLessThan
      );
    }).toThrow();
  });

  it("testInvalidInputSizePredicateFlipSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_FLIP().evaluate();
    }).toThrow();
  });

  it("testInvalidOperatorTypePredicateFlip", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_FLIP().evaluate(bFalse);
    }).toThrow();
  });

  /**
   * ----------------------------------- FILTER -----------------------------------
   */

  it("testFilter", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );

    const res1 = new operatorRegistry.OPERATOR_FILTER().evaluate(
      equalsTwo,
      lintegers
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list1 = res1 as iArray<Integer>;
    expect(list1.size().toJSNumber()).toBe(1);
    expect((list1.get(new Integer(0)) as Integer).toJSNumber()).toBe(2);

    const zeroLessThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalLessThan,
      i0
    );
    const twoGreaterThan = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalGreaterThan,
      i2
    );
    const zeroLessThanandTwoGreaterThan =
      new operatorRegistry.OPERATOR_CONJUNCTION().evaluate(
        zeroLessThan,
        twoGreaterThan
      );
    const res2 = new operatorRegistry.OPERATOR_FILTER().evaluate(
      zeroLessThanandTwoGreaterThan,
      lintegers
    );
    const list2 = res2 as iArray<Integer>;
    expect(list2.size().toJSNumber()).toBe(1);
    expect((list2.get(new Integer(0)) as Integer).toJSNumber()).toBe(1);
  });

  it("testFilterEvenNumbers", () => {
    const modulusFlipped = new operatorRegistry.OPERATOR_FLIP().evaluate(
      oArithmeticModulus
    );
    const modulus2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      modulusFlipped,
      i2
    );
    const isZero = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i0
    );
    const isEvenUnsafe = new operatorRegistry.OPERATOR_PIPE().evaluate(
      modulus2,
      isZero
    );
    const isEven = new operatorRegistry.OPERATOR_DISJUNCTION().evaluate(
      isZero,
      isEvenUnsafe
    );
    const res3 = new operatorRegistry.OPERATOR_FILTER().evaluate(
      isEven,
      lintegers
    );
    expect(res3).toBeInstanceOf(iArrayEager);
    const list3 = res3 as iArray<Integer>;
    expect(list3.size().toJSNumber()).toBe(2);
    expect((list3.get(new Integer(0)) as Integer).toJSNumber()).toBe(0);
    expect((list3.get(new Integer(1)) as Integer).toJSNumber()).toBe(2);
  });

  it("testInvalidInputSizeFilterLarge", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );

    expect(() => {
      new operatorRegistry.OPERATOR_FILTER().evaluate(
        equalsTwo,
        lintegers,
        lintegers
      );
    }).toThrow();
  });

  it("testInvalidInputSizeFilterSmall", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );

    expect(() => {
      new operatorRegistry.OPERATOR_FILTER().evaluate(equalsTwo);
    }).toThrow();
  });

  it("testInvalidOperatorTypeFilter", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_FILTER().evaluate(bFalse, lintegers);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeFilter", () => {
    const equalsTwo = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );

    expect(() => {
      new operatorRegistry.OPERATOR_FILTER().evaluate(
        equalsTwo,
        oArithmeticIncrement
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REDUCE -----------------------------------
   */

  it("testReduce", () => {
    const res1 = new operatorRegistry.OPERATOR_REDUCE().evaluate(
      oArithmeticAddition,
      lintegers,
      i0
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(6);
  });

  it("testInvalidInputSizeReduceLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE().evaluate(
        oArithmeticAddition,
        lintegers,
        i0,
        i0
      );
    }).toThrow();
  });

  it("testInvalidInputSizeReduceSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE().evaluate(
        oArithmeticAddition,
        lintegers
      );
    }).toThrow();
  });

  it("testInvalidOperatorTypeReduce", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE().evaluate(bFalse, lintegers, i0);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeReduce", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE().evaluate(
        oArithmeticAddition,
        i0,
        i0
      );
    }).toThrow();
  });

  it("testInvalidOperatorAccumulatorTypeReduce", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE().evaluate(
        oArithmeticAddition,
        lintegers,
        lintegers
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- REDUCE1 -----------------------------------
   */

  it("testReduce1", () => {
    const res1 = new operatorRegistry.OPERATOR_REDUCE1().evaluate(
      oArithmeticAddition,
      lintegers
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(6);
  });

  it("testReduce1Complex", () => {
    const flippedChoice = new operatorRegistry.OPERATOR_FLIP().evaluate(
      oChoice
    );
    const pipedFlip = new operatorRegistry.OPERATOR_PIPE().evaluate(
      flippedChoice,
      new operatorRegistry.OPERATOR_FLIP()
    );
    const appliedPipe2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      new operatorRegistry.OPERATOR_PIPE2(),
      oGeneralIdentity
    );

    const reducer = new operatorRegistry.OPERATOR_PIPE2().evaluate(
      new operatorRegistry.RELATIONAL_GT(),
      pipedFlip,
      appliedPipe2
    );

    const res1 = new operatorRegistry.OPERATOR_REDUCE1().evaluate(
      reducer,
      lintegers
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeReduce1Large", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE1().evaluate(
        oArithmeticAddition,
        lintegers,
        i0
      );
    }).toThrow();
  });

  it("testInvalidInputSizeReduce1Small", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE1().evaluate(oArithmeticAddition);
    }).toThrow();
  });

  it("testInvalidOperatorTypeReduce1", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE1().evaluate(bFalse, lintegers);
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeReduce1", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE1().evaluate(oArithmeticAddition, i0);
    }).toThrow();
  });

  it("testInvalidEmptyListReduce1", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_REDUCE1().evaluate(
        oArithmeticAddition,
        lempty
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- BY_NAME -----------------------------------
   */

  it("testByName", () => {
    const res1 = new operatorRegistry.OPERATOR_BY_NAME().evaluate(sAnd);
    expect(res1).toBeInstanceOf(Operator);
    expect((res1 as BaseOperator<any, any>).getUniqueName()).toBe(
      "integrateddynamics:logical_and"
    );
  });

  it("testByNameNonExisting", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_BY_NAME().evaluate(sOther);
    }).toThrow();
  });

  it("testInvalidInputSizeByNameLarge", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_BY_NAME().evaluate(sAnd, sAnd);
    }).toThrow();
  });

  it("testInvalidInputSizeByNameSmall", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_BY_NAME().evaluate();
    }).toThrow();
  });

  it("testInvalidOperatorInputTypeByName", () => {
    expect(() => {
      new operatorRegistry.OPERATOR_BY_NAME().evaluate(oArithmeticIncrement);
    }).toThrow();
  });

  /**
   * ----------------------------------- COMMUNITY_TESTS -----------------------------------
   */

  it("testReduce1ComplexMiner", () => {
    const flipChoice = new operatorRegistry.OPERATOR_FLIP().evaluate(
      new operatorRegistry.GENERAL_CHOICE()
    );

    const flipPipe2 = new operatorRegistry.OPERATOR_FLIP().evaluate(
      new operatorRegistry.OPERATOR_PIPE2()
    );
    const cQ2I = new operatorRegistry.OPERATOR_APPLY().evaluate(
      flipPipe2,
      new operatorRegistry.GENERAL_IDENTITY()
    );

    const reducer = new operatorRegistry.OPERATOR_PIPE2().evaluate(
      new operatorRegistry.RELATIONAL_GT(),
      flipChoice,
      cQ2I
    );

    const res1 = new operatorRegistry.OPERATOR_REDUCE1().evaluate(
      reducer,
      lintegers
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });
});
