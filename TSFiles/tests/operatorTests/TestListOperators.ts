/**
 * Test the different list operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { iBoolean } from "../../IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "../../JavaNumberClasses/Integer";
import { Long } from "../../JavaNumberClasses/Long";
import { iString } from "../../IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iArrayLazy } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "../../IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "IntegratedDynamicsClasses/operators/Operator";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestListOperators", () => {
  let labc: iArrayEager<iString>;
  let lintegers: iArrayEager<Integer>;
  let lintegers_012: iArrayEager<Integer>;
  let lempty: iArrayEager<any>;
  let lintegers_dup: iArrayEager<Integer>;
  let lintegers_rev_dup: iArrayEager<Integer>;
  let llongs_hash_collision: iArrayEager<Long>;
  let lintegers_inf: iArrayLazy<Integer>;

  let im1: Integer;
  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i3: Integer;
  let i4: Integer;
  let i5: Integer;

  let sx: iString;

  let oRelationalEquals: BaseOperator<any, any>;
  let oArithmeticIncrement: BaseOperator<any, any>;
  let DUMMY_VARIABLE: iString;

  beforeEach(() => {
    im1 = new Integer(-1);
    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i3 = new Integer(3);
    i4 = new Integer(4);
    i5 = new Integer(5);

    sx = new iString("x");
    DUMMY_VARIABLE = new iString("dummy");

    oRelationalEquals = new operatorRegistry.RELATIONAL_EQUALS();
    oArithmeticIncrement = new operatorRegistry.ARITHMETIC_INCREMENT();

    labc = new iArrayEager([
      new iString("a"),
      new iString("b"),
      new iString("c"),
    ]);
    lintegers = new iArrayEager([i0, i1, i2, i3]);
    lintegers_012 = new iArrayEager([i0, i1, i2]);
    lempty = new iArrayEager([]);
    lintegers_dup = new iArrayEager([i0, i1, i2, i3, i1, i2, i3, i2, i3, i3]);
    lintegers_rev_dup = new iArrayEager([
      i3,
      i2,
      i1,
      i0,
      i2,
      i1,
      i0,
      i1,
      i0,
      i0,
    ]);
    llongs_hash_collision = new iArrayEager([
      new Long("0xAAAAAAAA12345678"),
      new Long("0x3333333312345678"),
      new Long("0x12345678AAAAAAAA"),
      new Long("0x1234567833333333"),
    ]);
    lintegers_inf = new iArrayLazy(
      i0,
      oArithmeticIncrement as unknown as Operator<Integer, Integer>,
      new operatorRegistry.GENERAL_IDENTITY() as unknown as Operator<
        Integer,
        Integer
      >
    );
  });

  /**
   * ----------------------------------- LENGTH -----------------------------------
   */

  it("testListLength", () => {
    const res1 = new operatorRegistry.LIST_LENGTH().evaluate(labc);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeLengthLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_LENGTH().evaluate(labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeLengthSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_LENGTH().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeLength", () => {
    expect(() => {
      new operatorRegistry.LIST_LENGTH().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- EMPTY -----------------------------------
   */

  it("testListEmpty", () => {
    const res1 = new operatorRegistry.LIST_EMPTY().evaluate(labc);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.LIST_EMPTY().evaluate(lempty);
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeEmptyLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_EMPTY().evaluate(labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeEmptySmall", () => {
    expect(() => {
      new operatorRegistry.LIST_EMPTY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeEmpty", () => {
    expect(() => {
      new operatorRegistry.LIST_EMPTY().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- NOT_EMPTY -----------------------------------
   */

  it("testListNotEmpty", () => {
    const res1 = new operatorRegistry.LIST_NOT_EMPTY().evaluate(labc);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.LIST_NOT_EMPTY().evaluate(lempty);
    expect((res2 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeNotEmptyLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_NOT_EMPTY().evaluate(labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeNotEmptySmall", () => {
    expect(() => {
      new operatorRegistry.LIST_NOT_EMPTY().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNotEmpty", () => {
    expect(() => {
      new operatorRegistry.LIST_NOT_EMPTY().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- GET -----------------------------------
   */

  it("testListElement", () => {
    const res1 = new operatorRegistry.LIST_ELEMENT().evaluate(
      labc,
      new Integer(0)
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("a");

    const res2 = new operatorRegistry.LIST_ELEMENT().evaluate(
      labc,
      new Integer(1)
    );
    expect(res2).toBeInstanceOf(iString);
    expect((res2 as iString).valueOf()).toBe("b");

    const res3 = new operatorRegistry.LIST_ELEMENT().evaluate(
      labc,
      new Integer(2)
    );
    expect(res3).toBeInstanceOf(iString);
    expect((res3 as iString).valueOf()).toBe("c");
  });

  it("testListElementIndexOutOfBounds", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT().evaluate(labc, new Integer(3));
    }).toThrow();
  });

  it("testInvalidInputSizeElementLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT().evaluate(labc, labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeElementSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT().evaluate(labc);
    }).toThrow();
  });

  it("testInvalidInputTypeElement", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- GET_OR_DEFAULT -----------------------------------
   */

  it("testListElementOrDefault", () => {
    const res1 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
      labc,
      new Integer(0),
      sx
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("a");

    const res2 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
      labc,
      new Integer(1),
      sx
    );
    expect(res2).toBeInstanceOf(iString);
    expect((res2 as iString).valueOf()).toBe("b");

    const res3 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
      labc,
      new Integer(2),
      sx
    );
    expect(res3).toBeInstanceOf(iString);
    expect((res3 as iString).valueOf()).toBe("c");
  });

  it("testListElementOrDefaultIndexOutOfBounds", () => {
    const res1 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
      labc,
      new Integer(3),
      sx
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("x");

    const res2 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
      labc,
      new Integer(-1),
      sx
    );
    expect((res2 as iString).valueOf()).toBe("x");
  });

  it("testInvalidInputSizeElementOrDefaultLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(labc, i0, sx, sx);
    }).toThrow();
  });

  it("testInvalidInputSizeElementOrDefaultSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(labc, i0);
    }).toThrow();
  });

  it("testInvalidInputTypeElementOrDefault", () => {
    expect(() => {
      new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CONTAINS -----------------------------------
   */

  it("testListContains", () => {
    const res1 = new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i0);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i1);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i2);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i3);
    expect((res4 as iBoolean).valueOf()).toBe(true);

    const res5 = new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i4);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeContainsLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS().evaluate(lintegers, i2, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeContainsSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeContains", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CONTAINS_PREDICATE -----------------------------------
   */

  it("testListContainsPredicate", () => {
    const equals0 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i0
    );
    const equals1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i1
    );
    const equals2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );
    const equals3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i3
    );
    const equals4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i4
    );

    const res1 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
      lintegers,
      equals0
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
      lintegers,
      equals1
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
      lintegers,
      equals2
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
      lintegers,
      equals3
    );
    expect((res4 as iBoolean).valueOf()).toBe(true);

    const res5 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
      lintegers,
      equals4
    );
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeContainsPredicateLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
        lintegers,
        oRelationalEquals,
        i2
      );
    }).toThrow();
  });

  it("testInvalidInputSizeContainsPredicateSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeContainsPredicate", () => {
    expect(() => {
      new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- COUNT -----------------------------------
   */

  it("testListCount", () => {
    const res1 = new operatorRegistry.LIST_COUNT().evaluate(lintegers_dup, i0);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.LIST_COUNT().evaluate(lintegers_dup, i1);
    expect((res2 as Integer).toJSNumber()).toBe(2);

    const res3 = new operatorRegistry.LIST_COUNT().evaluate(lintegers_dup, i2);
    expect((res3 as Integer).toJSNumber()).toBe(3);

    const res4 = new operatorRegistry.LIST_COUNT().evaluate(lintegers_dup, i3);
    expect((res4 as Integer).toJSNumber()).toBe(4);

    const res5 = new operatorRegistry.LIST_COUNT().evaluate(lintegers_dup, i4);
    expect((res5 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeCountLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT().evaluate(lintegers, i2, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeCountSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeCount", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testListCountInfinite", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT().evaluate(lintegers_inf, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- COUNT_PREDICATE -----------------------------------
   */

  it("testListCountPredicate", () => {
    const equals0 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i0
    );
    const equals1 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i1
    );
    const equals2 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i2
    );
    const equals3 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i3
    );
    const equals4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
      oRelationalEquals,
      i4
    );

    const res1 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
      lintegers_dup,
      equals0
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(1);

    const res2 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
      lintegers_dup,
      equals1
    );
    expect((res2 as Integer).toJSNumber()).toBe(2);

    const res3 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
      lintegers_dup,
      equals2
    );
    expect((res3 as Integer).toJSNumber()).toBe(3);

    const res4 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
      lintegers_dup,
      equals3
    );
    expect((res4 as Integer).toJSNumber()).toBe(4);

    const res5 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
      lintegers_dup,
      equals4
    );
    expect((res5 as Integer).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeCountPredicateLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(lintegers, i2, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeCountPredicateSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeCountPredicate", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testListCountPredicateInfinite", () => {
    expect(() => {
      new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(lintegers_inf, i0);
    }).toThrow();
  });

  /**
   * ----------------------------------- APPEND -----------------------------------
   */

  it("testListAppend", () => {
    const res1 = new operatorRegistry.LIST_APPEND().evaluate(lintegers_012, i3);
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testInvalidInputSizeAppendInvalidType", () => {
    expect(() => {
      new operatorRegistry.LIST_APPEND().evaluate(
        lintegers_012,
        oRelationalEquals
      );
    }).toThrow();
  });

  it("testInvalidInputSizeAppendLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_APPEND().evaluate(lintegers, i2, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeAppendSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_APPEND().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeAppend", () => {
    expect(() => {
      new operatorRegistry.LIST_APPEND().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- CONCAT -----------------------------------
   */

  it("testListConcat", () => {
    const res1 = new operatorRegistry.LIST_CONCAT().evaluate(
      lintegers_012,
      lintegers
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(4)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(5)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(6)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(7);
  });

  it("testInvalidInputSizeConcatInvalidType", () => {
    expect(() => {
      new operatorRegistry.LIST_CONCAT().evaluate(
        lintegers_012,
        oRelationalEquals
      );
    }).toThrow();
    expect(() => {
      new operatorRegistry.LIST_CONCAT().evaluate(
        oRelationalEquals,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeConcatLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_CONCAT().evaluate(
        lintegers,
        lintegers_012,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeConcatSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_CONCAT().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeConcat", () => {
    expect(() => {
      new operatorRegistry.LIST_CONCAT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- LAZYBUILT -----------------------------------
   */

  it("testListLazyBuilt", () => {
    const res1 = new operatorRegistry.LIST_LAZYBUILT().evaluate(
      i3,
      oArithmeticIncrement
    );
    expect(res1).toBeInstanceOf(iArrayLazy);
    const list = res1 as iArrayLazy<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(3);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(4);
    expect(list.get(new Integer(5)).toJSNumber()).toBe(8);
    expect(list.get(new Integer(10)).toJSNumber()).toBe(13);
    expect(list.get(new Integer(100)).toJSNumber()).toBe(103);
    expect(list.size().toJSNumber()).toBe(new Integer(2147483647).toJSNumber());
  });

  it("testInvalidInputSizeLazyBuiltInvalidType", () => {
    expect(() => {
      new operatorRegistry.LIST_LAZYBUILT().evaluate(i3, oRelationalEquals);
    }).toThrow();
  });

  it("testInvalidInputSizeLazyBuiltLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_LAZYBUILT().evaluate(lintegers, i2, i0);
    }).toThrow();
  });

  it("testInvalidInputSizeLazyBuiltSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_LAZYBUILT().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeLazyBuilt", () => {
    expect(() => {
      new operatorRegistry.LIST_LAZYBUILT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- HEAD -----------------------------------
   */

  it("testListHead", () => {
    const res1 = new operatorRegistry.LIST_HEAD().evaluate(labc);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("a");
  });

  it("testInvalidInputSizeHeadLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_HEAD().evaluate(labc, labc);
    }).toThrow();
  });

  it("testInvalidInputSizeHeadSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_HEAD().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHead", () => {
    expect(() => {
      new operatorRegistry.LIST_HEAD().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TAIL -----------------------------------
   */

  it("testListTail", () => {
    const res1 = new operatorRegistry.LIST_TAIL().evaluate(lintegers);
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeTailLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_TAIL().evaluate(lintegers, i2);
    }).toThrow();
  });

  it("testInvalidInputSizeTailSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_TAIL().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeTail", () => {
    expect(() => {
      new operatorRegistry.LIST_TAIL().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- UNIQ_PREDICATE -----------------------------------
   */

  it("testListUniqPredicate", () => {
    const res1 = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
      lintegers_dup,
      oRelationalEquals
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testListUniqPredicateOrder", () => {
    const res1 = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
      lintegers_rev_dup,
      oRelationalEquals
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(3);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(0);
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testListUniqPredicateHashCollision", () => {
    const res1 = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
      llongs_hash_collision,
      oRelationalEquals
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Long>;
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testInvalidInputSizeUniqPredicateLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
        lintegers,
        oRelationalEquals,
        i2
      );
    }).toThrow();
  });

  it("testInvalidInputSizeUniqPredicateSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeUniqPredicate", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- UNIQ -----------------------------------
   */

  it("testListUniq", () => {
    const res1 = new operatorRegistry.LIST_UNIQ().evaluate(lintegers_dup);
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testListUniqOrder", () => {
    const res1 = new operatorRegistry.LIST_UNIQ().evaluate(lintegers_rev_dup);
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(3);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(0);
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testListUniqHashCollision", () => {
    const res1 = new operatorRegistry.LIST_UNIQ().evaluate(
      llongs_hash_collision
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Long>;
    expect(list.size().toJSNumber()).toBe(4);
  });

  it("testInvalidInputSizeUniqLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ().evaluate(lintegers, i2);
    }).toThrow();
  });

  it("testInvalidInputSizeUniqSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeUniq", () => {
    expect(() => {
      new operatorRegistry.LIST_UNIQ().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- SLICE -----------------------------------
   */

  it("testListSlice", () => {
    const res1 = new operatorRegistry.LIST_SLICE().evaluate(lintegers, i0, i4);
    expect(res1).toBeInstanceOf(iArrayEager);
    const list = res1 as iArrayEager<Integer>;

    expect(list.get(new Integer(0)).toJSNumber()).toBe(0);
    expect(list.get(new Integer(1)).toJSNumber()).toBe(1);
    expect(list.get(new Integer(2)).toJSNumber()).toBe(2);
    expect(list.get(new Integer(3)).toJSNumber()).toBe(3);
    expect(list.size().toJSNumber()).toBe(4);

    const res2 = new operatorRegistry.LIST_SLICE().evaluate(lintegers, i1, i4);
    const list2 = res2 as iArrayEager<Integer>;

    expect(list2.get(new Integer(0)).toJSNumber()).toBe(1);
    expect(list2.get(new Integer(1)).toJSNumber()).toBe(2);
    expect(list2.get(new Integer(2)).toJSNumber()).toBe(3);
    expect(list2.size().toJSNumber()).toBe(3);

    const res3 = new operatorRegistry.LIST_SLICE().evaluate(lintegers, i3, i5);
    const list3 = res3 as iArrayEager<Integer>;

    expect(list3.get(new Integer(0)).toJSNumber()).toBe(3);
    expect(list3.size().toJSNumber()).toBe(1);
  });

  it("testInvalidInputSizeSliceNegative1", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(lintegers, i0, im1);
    }).toThrow();
  });

  it("testInvalidInputSizeSliceNegative2", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(lintegers, im1, i1);
    }).toThrow();
  });

  it("testInvalidInputSizeSliceToNotLargerThanFrom", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(lintegers, i1, i1);
    }).toThrow();
  });

  it("testInvalidInputSizeSliceLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(lintegers, i2, i2, i2);
    }).toThrow();
  });

  it("testInvalidInputSizeSliceSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(lintegers, i2);
    }).toThrow();
  });

  it("testInvalidInputTypeSlice", () => {
    expect(() => {
      new operatorRegistry.LIST_SLICE().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- INTERSECTION -----------------------------------
   */

  it("testIntersection", () => {
    const list1 = new iArrayEager([
      new iString("a"),
      new iString("b"),
      new iString("c"),
    ]);
    const list2 = new iArrayEager([
      new iString("d"),
      new iString("c"),
      new iString("b"),
    ]);
    const result = new operatorRegistry.LIST_INTERSECTION().evaluate(
      list1,
      list2
    ) as iArrayEager<iString>;
    expect(result.size().toJSNumber()).toBe(2);
    expect(result.get(new Integer(0)).valueOf()).toBe("b");
    expect(result.get(new Integer(1)).valueOf()).toBe("c");
  });

  /**
   * ----------------------------------- EQUALS_SET -----------------------------------
   */

  it("testListEqualsSet", () => {
    const res1 = new operatorRegistry.LIST_EQUALS_SET().evaluate(
      new iArrayEager([i0, i2, i3, i3, i1]),
      new iArrayEager([i0, i1, i2, i3])
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeEqualsSetInvalidType", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_SET().evaluate(
        lintegers_012,
        oRelationalEquals
      );
    }).toThrow();
    expect(() => {
      new operatorRegistry.LIST_EQUALS_SET().evaluate(
        oRelationalEquals,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeEqualsSetLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_SET().evaluate(
        lintegers,
        lintegers_012,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeEqualsSetSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_SET().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeEqualsSet", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_SET().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- EQUALS_MULTISET -----------------------------------
   */

  it("testListEqualsMultiSet", () => {
    const res1 = new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
      new iArrayEager([i0, i2, i3, i3, i1]),
      new iArrayEager([i0, i1, i2, i3])
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
      new iArrayEager([i0, i2, i3, i3, i1]),
      new iArrayEager([i0, i1, i2, i3, i3])
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeEqualsMultiSetInvalidType", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        lintegers_012,
        oRelationalEquals
      );
    }).toThrow();
    expect(() => {
      new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        oRelationalEquals,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeEqualsMultiSetLarge", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        lintegers,
        lintegers_012,
        lintegers_012
      );
    }).toThrow();
  });

  it("testInvalidInputSizeEqualsMultiSetSmall", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(lintegers);
    }).toThrow();
  });

  it("testInvalidInputTypeEqualsMultiSet", () => {
    expect(() => {
      new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });
});
