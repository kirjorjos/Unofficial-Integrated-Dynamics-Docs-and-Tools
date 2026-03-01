/**
 * Test the different list operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Long } from "JavaNumberClasses/Long";
import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import {
  ValueTypeListProxyLazyBuilt,
  IValueTypeListProxy,
} from "IntegratedDynamicsClasses/ValueTypeListProxy";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

describe("TestListOperators", () => {
  let labc: iArrayEager<iString>;
  let lintegers: iArrayEager<Integer>;
  let lintegers_012: iArrayEager<Integer>;
  let lempty: iArrayEager<IntegratedValue>;
  let lintegers_dup: iArrayEager<Integer>;
  let lintegers_rev_dup: iArrayEager<Integer>;
  let llongs_hash_collision: iArrayEager<Long>;
  let lintegers_inf: IValueTypeListProxy<IntegratedValue>;

  let im1: Integer;
  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i3: Integer;
  let i4: Integer;
  let i5: Integer;

  let sx: iString;

  let oRelationalEquals: Operator<
    IntegratedValue,
    Operator<IntegratedValue, iBoolean>
  >;
  let oArithmeticIncrement: Operator<TypeNumber, TypeNumber>;

  beforeEach(() => {
    im1 = new Integer(-1);
    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i3 = new Integer(3);
    i4 = new Integer(4);
    i5 = new Integer(5);

    sx = new iString("x");

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
      new Long(BigInt("0xAAAAAAAA12345678")),
      new Long(BigInt("0x3333333312345678")),
      new Long(BigInt("0x12345678AAAAAAAA")),
      new Long(BigInt("0x1234567833333333")),
    ]);
    lintegers_inf = new ValueTypeListProxyLazyBuilt<IntegratedValue>(
      new Integer(0),
      oArithmeticIncrement as any
    );
  });

  describe("LENGTH", () => {
    it("testListLength", () => {
      const res = new operatorRegistry.LIST_LENGTH().evaluate(labc) as Integer;
      expect(res).toBeInstanceOf(Integer);
      expect(res.toJSNumber()).toBe(3);
    });

    it("testInvalidInputSizeLengthLarge", () => {
      expect(() =>
        new operatorRegistry.LIST_LENGTH().evaluate(labc, labc)
      ).toThrow();
    });

    it("testInvalidInputSizeLengthSmall", () => {
      expect(() => new operatorRegistry.LIST_LENGTH().evaluate()).toThrow();
    });
  });

  describe("EMPTY", () => {
    it("testListEmpty", () => {
      const res1 = new operatorRegistry.LIST_EMPTY().evaluate(labc) as iBoolean;
      expect(res1).toBeInstanceOf(iBoolean);
      expect(res1.valueOf()).toBe(false);

      const res2 = new operatorRegistry.LIST_EMPTY().evaluate(
        lempty
      ) as iBoolean;
      expect(res2.valueOf()).toBe(true);
    });
  });

  describe("NOT_EMPTY", () => {
    it("testListNotEmpty", () => {
      const res1 = new operatorRegistry.LIST_NOT_EMPTY().evaluate(
        labc
      ) as iBoolean;
      expect(res1).toBeInstanceOf(iBoolean);
      expect(res1.valueOf()).toBe(true);

      const res2 = new operatorRegistry.LIST_NOT_EMPTY().evaluate(
        lempty
      ) as iBoolean;
      expect(res2.valueOf()).toBe(false);
    });
  });

  describe("GET", () => {
    it("testListElement", () => {
      const res1 = new operatorRegistry.LIST_ELEMENT().evaluate(
        labc,
        i0
      ) as iString;
      expect(res1).toBeInstanceOf(iString);
      expect(res1.valueOf()).toBe("a");

      const res2 = new operatorRegistry.LIST_ELEMENT().evaluate(
        labc,
        i1
      ) as iString;
      expect(res2.valueOf()).toBe("b");

      const res3 = new operatorRegistry.LIST_ELEMENT().evaluate(
        labc,
        i2
      ) as iString;
      expect(res3.valueOf()).toBe("c");
    });

    it("testListElementIndexOutOfBounds", () => {
      expect(() =>
        new operatorRegistry.LIST_ELEMENT().evaluate(labc, i3)
      ).toThrow();
    });
  });

  describe("GET_OR_DEFAULT", () => {
    it("testListElementOrDefault", () => {
      const res1 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
        labc,
        i0,
        sx
      ) as iString;
      expect(res1).toBeInstanceOf(iString);
      expect(res1.valueOf()).toBe("a");

      const res2 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
        labc,
        i1,
        sx
      ) as iString;
      expect(res2.valueOf()).toBe("b");
    });

    it("testListElementOrDefaultIndexOutOfBounds", () => {
      const res1 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
        labc,
        i3,
        sx
      ) as iString;
      expect(res1.valueOf()).toBe("x");

      const res2 = new operatorRegistry.LIST_ELEMENT_DEFAULT().evaluate(
        labc,
        im1,
        sx
      ) as iString;
      expect(res2.valueOf()).toBe("x");
    });
  });

  describe("CONTAINS", () => {
    it("testListContains", () => {
      const res1 = new operatorRegistry.LIST_CONTAINS().evaluate(
        lintegers,
        i0
      ) as iBoolean;
      expect(res1).toBeInstanceOf(iBoolean);
      expect(res1.valueOf()).toBe(true);

      const res5 = new operatorRegistry.LIST_CONTAINS().evaluate(
        lintegers,
        i4
      ) as iBoolean;
      expect(res5.valueOf()).toBe(false);
    });
  });

  describe("CONTAINS_PREDICATE", () => {
    it("testListContainsPredicate", () => {
      const equals0 = new operatorRegistry.OPERATOR_APPLY().evaluate(
        oRelationalEquals,
        i0
      ) as Operator<IntegratedValue, iBoolean>;
      const equals4 = new operatorRegistry.OPERATOR_APPLY().evaluate(
        oRelationalEquals,
        i4
      ) as Operator<IntegratedValue, iBoolean>;

      const res1 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
        lintegers,
        equals0
      ) as iBoolean;
      expect(res1).toBeInstanceOf(iBoolean);
      expect(res1.valueOf()).toBe(true);

      const res5 = new operatorRegistry.LIST_CONTAINS_PREDICATE().evaluate(
        lintegers,
        equals4
      ) as iBoolean;
      expect(res5.valueOf()).toBe(false);
    });
  });

  describe("COUNT", () => {
    it("testListCount", () => {
      const res1 = new operatorRegistry.LIST_COUNT().evaluate(
        lintegers_dup,
        i0
      ) as Integer;
      expect(res1).toBeInstanceOf(Integer);
      expect(res1.toJSNumber()).toBe(1);

      const res3 = new operatorRegistry.LIST_COUNT().evaluate(
        lintegers_dup,
        i2
      ) as Integer;
      expect(res3.toJSNumber()).toBe(3);
    });

    it("testListCountInfinite", () => {
      expect(() =>
        new operatorRegistry.LIST_COUNT().evaluate(lintegers_inf, i0)
      ).toThrow();
    });
  });

  describe("COUNT_PREDICATE", () => {
    it("testListCountPredicate", () => {
      const equals0 = new operatorRegistry.OPERATOR_APPLY().evaluate(
        oRelationalEquals,
        i0
      ) as Operator<IntegratedValue, iBoolean>;
      const res1 = new operatorRegistry.LIST_COUNT_PREDICATE().evaluate(
        lintegers_dup,
        equals0
      ) as Integer;
      expect(res1).toBeInstanceOf(Integer);
      expect(res1.toJSNumber()).toBe(1);
    });
  });

  describe("APPEND", () => {
    it("testListAppend", () => {
      const list = new operatorRegistry.LIST_APPEND().evaluate(
        lintegers_012,
        i3
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(0);
      expect(list.get(i3).toJSNumber()).toBe(3);
      expect(list.size().toJSNumber()).toBe(4);
    });
  });

  describe("CONCAT", () => {
    it("testListConcat", () => {
      const list = new operatorRegistry.LIST_CONCAT().evaluate(
        lintegers_012,
        lintegers
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(0);
      expect(list.get(i3).toJSNumber()).toBe(0);
      expect(list.get(new Integer(6)).toJSNumber()).toBe(3);
      expect(list.size().toJSNumber()).toBe(7);
    });
  });

  describe("LAZYBUILT", () => {
    it("testListLazyBuilt", () => {
      const list = new operatorRegistry.LIST_LAZYBUILT().evaluate(
        i3,
        oArithmeticIncrement
      ) as IValueTypeListProxy<TypeNumber>;
      expect(list).toBeDefined();
      expect((list.get(i0) as Integer).toJSNumber()).toBe(3);
      expect((list.get(i1) as Integer).toJSNumber()).toBe(4);
      expect((list.get(i5) as Integer).toJSNumber()).toBe(8);
      expect((list.get(new Integer(100)) as Integer).toJSNumber()).toBe(103);
      expect(list.size().toJSNumber()).toBe(2147483647);
    });
  });

  describe("HEAD", () => {
    it("testListHead", () => {
      const res1 = new operatorRegistry.LIST_HEAD().evaluate(labc) as iString;
      expect(res1).toBeInstanceOf(iString);
      expect(res1.valueOf()).toBe("a");
    });
  });

  describe("TAIL", () => {
    it("testListTail", () => {
      const list = new operatorRegistry.LIST_TAIL().evaluate(
        lintegers
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(1);
      expect(list.get(i2).toJSNumber()).toBe(3);
      expect(list.size().toJSNumber()).toBe(3);
    });
  });

  describe("UNIQ_PREDICATE", () => {
    it("testListUniqPredicate", () => {
      const list = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
        lintegers_dup,
        oRelationalEquals
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(0);
      expect(list.get(i3).toJSNumber()).toBe(3);
      expect(list.size().toJSNumber()).toBe(4);
    });

    it("testListUniqPredicateOrder", () => {
      const list = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
        lintegers_rev_dup,
        oRelationalEquals
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(3);
      expect(list.get(i3).toJSNumber()).toBe(0);
      expect(list.size().toJSNumber()).toBe(4);
    });

    it("testListUniqPredicateHashCollision", () => {
      const list = new operatorRegistry.LIST_UNIQ_PREDICATE().evaluate(
        llongs_hash_collision,
        oRelationalEquals
      ) as iArray<Long>;
      expect(list.size().toJSNumber()).toBe(4);
    });
  });

  describe("UNIQ", () => {
    it("testListUniq", () => {
      const list = new operatorRegistry.LIST_UNIQ().evaluate(
        lintegers_dup
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(0);
      expect(list.get(i3).toJSNumber()).toBe(3);
      expect(list.size().toJSNumber()).toBe(4);
    });

    it("testListUniqOrder", () => {
      const list = new operatorRegistry.LIST_UNIQ().evaluate(
        lintegers_rev_dup
      ) as iArray<Integer>;
      expect(list.get(i0).toJSNumber()).toBe(3);
      expect(list.get(i3).toJSNumber()).toBe(0);
      expect(list.size().toJSNumber()).toBe(4);
    });

    it("testListUniqHashCollision", () => {
      const list = new operatorRegistry.LIST_UNIQ().evaluate(
        llongs_hash_collision
      ) as iArray<Long>;
      expect(list.size().toJSNumber()).toBe(4);
    });
  });

  describe("SLICE", () => {
    it("testListSlice", () => {
      const list1 = new operatorRegistry.LIST_SLICE().evaluate(
        lintegers,
        i0,
        i4
      ) as iArray<Integer>;
      expect(list1.get(i0).toJSNumber()).toBe(0);
      expect(list1.size().toJSNumber()).toBe(4);

      const list2 = new operatorRegistry.LIST_SLICE().evaluate(
        lintegers,
        i1,
        i4
      ) as iArray<Integer>;
      expect(list2.get(i0).toJSNumber()).toBe(1);
      expect(list2.size().toJSNumber()).toBe(3);
    });

    it("testInvalidInputSizeSliceNegative1", () => {
      expect(() =>
        new operatorRegistry.LIST_SLICE().evaluate(lintegers, i0, im1)
      ).toThrow();
    });
  });

  describe("INTERSECTION", () => {
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
      const resultValues = new operatorRegistry.LIST_INTERSECTION().evaluate(
        list1,
        list2
      ) as iArray<iString>;
      expect(resultValues.size().toJSNumber()).toBe(2);
      expect(resultValues.get(i0).valueOf()).toBe("b");
      expect(resultValues.get(i1).valueOf()).toBe("c");
    });
  });

  describe("EQUALS_SET", () => {
    it("testListEqualsSet", () => {
      const res1 = new operatorRegistry.LIST_EQUALS_SET().evaluate(
        new iArrayEager([i0, i2, i3, i3, i1]),
        new iArrayEager([i0, i1, i2, i3])
      ) as iBoolean;
      expect(res1).toBeInstanceOf(iBoolean);
      expect(res1.valueOf()).toBe(true);
    });
  });

  describe("EQUALS_MULTISET", () => {
    it("testListEqualsMultiSet", () => {
      const res1 = new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        new iArrayEager([i0, i2, i3, i3, i1]),
        new iArrayEager([i0, i1, i2, i3])
      ) as iBoolean;
      expect(res1.valueOf()).toBe(false);

      const res2 = new operatorRegistry.LIST_EQUALS_MULTISET().evaluate(
        new iArrayEager([i0, i2, i3, i3, i1]),
        new iArrayEager([i0, i1, i2, i3, i3])
      ) as iBoolean;
      expect(res2.valueOf()).toBe(true);
    });
  });
});
