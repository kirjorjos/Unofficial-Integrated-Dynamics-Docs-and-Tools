import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { getNicknameRegex } from "lib/transformers/helpers";

/**
 * Miscellaneous validation tests for operators.
 * @author kirjorjos
 */
describe("MiscellaneousTests", () => {
  const operatorClasses: (typeof BaseOperator)[] = [];

  beforeAll(() => {
    for (const opClass of Object.values(operatorRegistry)) {
      if (
        typeof opClass === "function" &&
        opClass.prototype instanceof BaseOperator
      ) {
        operatorClasses.push(opClass);
      }
    }
  });

  describe("UniquenessTests", () => {
    it("testRegistryClassUniqueness", () => {
      const classes = new Set<typeof BaseOperator>();
      for (const [key, opClass] of Object.entries(operatorRegistry)) {
        if (opClass.prototype instanceof BaseOperator) {
          if (classes.has(opClass)) {
            throw new Error(
              `Duplicate class registration found in operatorRegistry for key "${key}"`
            );
          }
          classes.add(opClass);
        }
      }
    });

    it("testInternalNameUniqueness", () => {
      const names = new Set<string>();
      for (const opClass of operatorClasses) {
        const name = opClass.internalName;
        if (names.has(name)) {
          throw new Error(`Duplicate internal name found: "${name}"`);
        }
        names.add(name);
      }
    });

    it("testLocalNicknameUniqueness", () => {
      for (const opClass of operatorClasses) {
        const uniqueName = opClass.internalName;
        const seenNicknames = new Set<string>();
        for (const nickname of opClass.nicknames) {
          if (seenNicknames.has(nickname)) {
            throw new Error(
              `Duplicate nickname "${nickname}" found within operator "${uniqueName}"`
            );
          }
          seenNicknames.add(nickname);
        }
      }
    });

    it("testConcatNicknameRegression", () => {
      const concatOwners: string[] = [];

      for (const [key, opClass] of Object.entries(operatorRegistry)) {
        if (
          key === "find" ||
          key === "operatorByNickname" ||
          typeof opClass !== "function" ||
          !(opClass.prototype instanceof BaseOperator)
        ) {
          continue;
        }

        if (opClass.nicknames.includes("concat")) {
          concatOwners.push(key);
        }
      }

      expect(concatOwners).toEqual([]);
    });

    for (const [key1, opClass1] of Object.entries(operatorRegistry) as [
      string,
      typeof BaseOperator,
    ][]) {
      for (const [key2, opClass2] of Object.entries(operatorRegistry) as [
        string,
        typeof BaseOperator,
      ][]) {
        if (key2 <= key1) continue; // Avoid duplicate pairs and self-comparison
        it(`nicknameUniqueness-${key1}-${key2}`, () => {
          const mutualNickname = opClass1.nicknames.filter((nickname: string) =>
            opClass2.nicknames.includes(nickname)
          );
          expect(mutualNickname).toHaveLength(0);
        });
      }
    }
  });

  describe("ValidationTests", () => {
    it("testNicknameRegex", () => {
      for (const opClass of operatorClasses) {
        const uniqueName = opClass.internalName;
        for (const nickname of opClass.nicknames) {
          if (!getNicknameRegex().test(nickname)) {
            throw new Error(
              `Nickname "${nickname}" in operator "${uniqueName}" does not match regex ${BaseOperator.nicknameRegexAllowedChars}`
            );
          }
        }
      }
    });
  });
});
