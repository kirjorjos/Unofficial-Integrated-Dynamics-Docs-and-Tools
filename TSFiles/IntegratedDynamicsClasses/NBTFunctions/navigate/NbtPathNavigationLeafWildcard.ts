/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { INbtPathNavigation } from "./INbtPathNavigation";

/**
 * A navigation leaf that matches with all keys.
 */
export class NbtPathNavigationLeafWildcard implements INbtPathNavigation {
  static INSTANCE = new NbtPathNavigationLeafWildcard();

  private constructor() {}

  isLeafKey(_key: iString): boolean {
    return true;
  }

  getNext(_key: iString): INbtPathNavigation | undefined {
    return undefined;
  }
}
