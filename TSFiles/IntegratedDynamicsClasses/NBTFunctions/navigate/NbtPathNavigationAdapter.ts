/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathNavigation } from "./INbtPathNavigation";

/**
 * A base navigation implementation.
 */
export class NbtPathNavigationAdapter implements INbtPathNavigation {

    private keys: Array<string>;
    private child?: INbtPathNavigation;

    constructor(keys: Array<string> | string, child?: INbtPathNavigation) {
        if (!Array.isArray(keys)) keys = [keys];
        this.keys = keys;
        this.child = child;
    }

    protected isLeaf(): boolean {
        return this.child == null;
    }

    public isLeafKey(key: string): boolean {
        return this.isLeaf() && this.keys.includes(key);
    }

    public getNext(key: string): INbtPathNavigation | undefined {
        return !this.isLeaf() && this.keys.includes(key) ? this.child : undefined;
    }

}