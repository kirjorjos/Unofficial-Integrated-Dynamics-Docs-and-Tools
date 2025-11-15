/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathNavigation } from "./INbtPathNavigation";

/**
 * A navigation leaf that matches with all keys.
 */
export class NbtPathNavigationLeafWildcard implements INbtPathNavigation {

    static INSTANCE = new NbtPathNavigationLeafWildcard();

    private constructor() { }

    isLeafKey(_key: string): boolean {
        return true;
    }

    getNext(_key: string): INbtPathNavigation | undefined {
        return undefined;
    }
}