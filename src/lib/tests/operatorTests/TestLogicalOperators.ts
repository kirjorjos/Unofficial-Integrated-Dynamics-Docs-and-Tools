/**
 * Test the different logical operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

class MockIBoolean extends iBoolean {
  public fetched: boolean = false;

  constructor(value: boolean) {
    super(value);
  }

  override valueOf(): boolean {
    this.fetched = true;
    return super.valueOf();
  }
}

describe("TestLogicalOperators", () => {
  let bTrue: iBoolean;
  let bFalse: iBoolean;
  let DUMMY_VARIABLE: iString;

  beforeEach(() => {
    bTrue = new iBoolean(true);
    bFalse = new iBoolean(false);
    DUMMY_VARIABLE = new iString("dummy");
  });

  /**
   * ----------------------------------- AND -----------------------------------
   */

  it("testLogicalAnd", () => {
    const res1 = new operatorRegistry.LOGICAL_AND().evaluate(bTrue, bTrue);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.LOGICAL_AND().evaluate(bTrue, bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.LOGICAL_AND().evaluate(bFalse, bTrue);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    const res4 = new operatorRegistry.LOGICAL_AND().evaluate(bFalse, bFalse);
    expect((res4 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeAndLarge", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_AND().evaluate(bTrue, bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeAndSmall", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_AND().evaluate(bTrue);
    }).toThrow();
  });

  it("testInvalidInputTypeAnd", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_AND().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testShortCircuitingAnd", () => {
    const mockBFalse = new MockIBoolean(false);
    const mockBTrue = new MockIBoolean(true);
    new operatorRegistry.LOGICAL_AND().evaluate(mockBFalse, mockBTrue);
    expect(mockBFalse.fetched).toBe(true);
    expect(mockBTrue.fetched).toBe(false);
  });

  /**
   * ----------------------------------- OR -----------------------------------
   */

  it("testLogicalOr", () => {
    const res1 = new operatorRegistry.LOGICAL_OR().evaluate(bTrue, bTrue);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.LOGICAL_OR().evaluate(bTrue, bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.LOGICAL_OR().evaluate(bFalse, bTrue);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.LOGICAL_OR().evaluate(bFalse, bFalse);
    expect((res4 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeOrLarge", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_OR().evaluate(bTrue, bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeOrSmall", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_OR().evaluate(bTrue);
    }).toThrow();
  });

  it("testInvalidInputTypeOr", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_OR().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testShortCircuitingOr", () => {
    const mockBTrue = new MockIBoolean(true);
    const mockBFalse = new MockIBoolean(false);
    new operatorRegistry.LOGICAL_OR().evaluate(mockBTrue, mockBFalse);
    expect(mockBTrue.fetched).toBe(true);
    expect(mockBFalse.fetched).toBe(false);
  });

  /**
   * ----------------------------------- NOT -----------------------------------
   */

  it("testLogicalNot", () => {
    const res1 = new operatorRegistry.LOGICAL_NOT().evaluate(bTrue);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.LOGICAL_NOT().evaluate(bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeNotLarge", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOT().evaluate(bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeNotSmall", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNot", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- NAND -----------------------------------
   */

  it("testLogicalNand", () => {
    const res1 = new operatorRegistry.LOGICAL_NAND().evaluate(bTrue, bTrue);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.LOGICAL_NAND().evaluate(bTrue, bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.LOGICAL_NAND().evaluate(bFalse, bTrue);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.LOGICAL_NAND().evaluate(bFalse, bFalse);
    expect((res4 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeNandLarge", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NAND().evaluate(bTrue, bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeNandSmall", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NAND().evaluate(bTrue);
    }).toThrow();
  });

  it("testInvalidInputTypeNand", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NAND().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testShortCircuitingNand", () => {
    const mockBFalse = new MockIBoolean(false);
    const mockBTrue = new MockIBoolean(true);
    new operatorRegistry.LOGICAL_NAND().evaluate(mockBFalse, mockBTrue);
    expect(mockBFalse.fetched).toBe(true);
    expect(mockBTrue.fetched).toBe(false);
  });

  /**
   * ----------------------------------- NOR -----------------------------------
   */

  it("testLogicalNor", () => {
    const res1 = new operatorRegistry.LOGICAL_NOR().evaluate(bTrue, bTrue);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.LOGICAL_NOR().evaluate(bTrue, bFalse);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.LOGICAL_NOR().evaluate(bFalse, bTrue);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    const res4 = new operatorRegistry.LOGICAL_NOR().evaluate(bFalse, bFalse);
    expect((res4 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeNorLarge", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOR().evaluate(bTrue, bTrue, bTrue);
    }).toThrow();
  });

  it("testInvalidInputSizeNorSmall", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOR().evaluate(bTrue);
    }).toThrow();
  });

  it("testInvalidInputTypeNor", () => {
    expect(() => {
      new operatorRegistry.LOGICAL_NOR().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  it("testShortCircuitingNor", () => {
    const mockBTrue = new MockIBoolean(true);
    const mockBFalse = new MockIBoolean(false);
    new operatorRegistry.LOGICAL_NOR().evaluate(mockBTrue, mockBFalse);
    expect(mockBTrue.fetched).toBe(true);
    expect(mockBFalse.fetched).toBe(false);
  });
});
