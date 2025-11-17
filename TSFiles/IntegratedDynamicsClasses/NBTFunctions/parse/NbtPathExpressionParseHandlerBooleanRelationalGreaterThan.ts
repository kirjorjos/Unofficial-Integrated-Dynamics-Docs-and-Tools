/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { NbtPathExpressionParseHandlerBooleanRelationalAdapter } from "./NbtPathExpressionParseHandlerBooleanRelationalAdapter";

/**
 * A handler that handles boolean expressions in the form of " &gt; 10".
 */
export class NbtPathExpressionParseHandlerBooleanRelationalGreaterThan extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
  public constructor() {
    super(">");
  }

  public getRelationalValue(left: number, right: number): boolean {
    return left > right;
  }
}
