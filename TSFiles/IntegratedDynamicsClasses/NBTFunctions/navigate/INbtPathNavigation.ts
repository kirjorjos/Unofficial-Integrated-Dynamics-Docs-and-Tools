/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

/**
 * Datastructure that represents a concrete key-based navigation path that can be derived from a JSON path.
 */
export interface INbtPathNavigation {
  /**
   * Check if the given key is a leaf in this navigation,
   * i.e., it is present and has no children.
   * @param key A key.
   * @return If it is a leaf key.
   */
  isLeafKey(key: string): boolean;

  /**
   * Get the child navigation of the given key, or null if it is not present.
   * @param key A key.
   * @return The child navigation or null.
   */
  getNext(key: string): INbtPathNavigation | undefined;
}
