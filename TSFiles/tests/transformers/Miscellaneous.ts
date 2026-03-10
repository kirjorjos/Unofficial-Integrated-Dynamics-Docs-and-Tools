import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";

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

    it("testInteractNameInNicknames", () => {
      for (const opClass of operatorClasses) {
        const uniqueName = opClass.internalName;
        const interactName = opClass.interactName;
        if (!opClass.nicknames.includes(interactName)) {
          throw new Error(
            `interactName "${interactName}" not found in nicknames for operator "${uniqueName}"`
          );
        }
      }
    });
  });

  describe("ValidationTests", () => {
    it("testNicknameRegex", () => {
      for (const opClass of operatorClasses) {
        const uniqueName = opClass.internalName;
        for (const nickname of opClass.nicknames) {
          if (!BaseOperator.nicknameRegex.test(nickname)) {
            throw new Error(
              `Nickname "${nickname}" in operator "${uniqueName}" does not match regex ${BaseOperator.nicknameRegex}`
            );
          }
        }
      }
    });
  });
});
