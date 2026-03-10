import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";

/**
 * Miscellaneous validation tests for operators.
 * @author kirjorjos
 */
describe("MiscellaneousTests", () => {
  let operators: BaseOperator<IntegratedValue, IntegratedValue>[];

  beforeAll(() => {
    operators = [];
    for (const opClass of Object.values(operatorRegistry)) {
      if (
        typeof opClass === "function" &&
        opClass.prototype instanceof BaseOperator
      ) {
        operators.push(new opClass());
      }
    }
  });

  describe("UniquenessTests", () => {
    it("testInternalNameUniqueness", () => {
      const names = new Set<string>();
      for (const op of operators) {
        const name = op.getUniqueName().valueOf();
        if (names.has(name)) {
          throw new Error(`Duplicate internal name found: "${name}"`);
        }
        names.add(name);
      }
    });

    it("testLocalNicknameUniqueness", () => {
      for (const op of operators) {
        const uniqueName = op.getUniqueName().valueOf();
        const seenNicknames = new Set<string>();
        for (const nickname of op.nicknames) {
          if (seenNicknames.has(nickname)) {
            throw new Error(
              `Duplicate nickname "${nickname}" found within operator "${uniqueName}"`
            );
          }
          seenNicknames.add(nickname);
        }
      }
    });
  });

  describe("ValidationTests", () => {
    it("testNicknameRegex", () => {
      const regex = BaseOperator.nicknameRegex;
      for (const op of operators) {
        const uniqueName = op.getUniqueName().valueOf();
        for (const nickname of op.nicknames) {
          if (!regex.test(nickname)) {
            throw new Error(
              `Nickname "${nickname}" in operator "${uniqueName}" does not match regex ${BaseOperator.nicknameRegex}`
            );
          }
        }
      }
    });
  });
});
