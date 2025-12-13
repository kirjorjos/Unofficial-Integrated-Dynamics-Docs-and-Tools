/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { INbtPathNavigation } from "./INbtPathNavigation";

/**
 * A navigation inner link that matches with all leafs.
 */
export class NbtPathNavigationLinkWildcard implements INbtPathNavigation {
  private child: INbtPathNavigation;

  constructor(child: INbtPathNavigation) {
    this.child = child;
  }

  isLeafKey(_key: iString): boolean {
    return false;
  }

  getNext(_key: iString): INbtPathNavigation {
    return this.child;
  }
}
