/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { INbtPathNavigation } from "./INbtPathNavigation";

/**
 * A base navigation implementation.
 */
export class NbtPathNavigationAdapter implements INbtPathNavigation {
  private keys: Array<iString>;
  private child?: INbtPathNavigation;

  constructor(keys: Array<iString> | iString, child?: INbtPathNavigation) {
    if (!Array.isArray(keys)) keys = [keys];
    this.keys = keys;
    this.child = child;
  }

  protected isLeaf(): boolean {
    return this.child == null;
  }

  public isLeafKey(key: iString): boolean {
    return this.isLeaf() && this.keys.includes(key);
  }

  public getNext(key: iString): INbtPathNavigation | undefined {
    return !this.isLeaf() && this.keys.includes(key) ? this.child : undefined;
  }
}
