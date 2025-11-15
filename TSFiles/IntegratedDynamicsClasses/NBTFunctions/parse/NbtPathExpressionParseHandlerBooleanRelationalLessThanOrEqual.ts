/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { NbtPathExpressionParseHandlerBooleanRelationalAdapter } from "./NbtPathExpressionParseHandlerBooleanRelationalAdapter";

/**
 * A handler that handles boolean expressions in the form of " &le; 10".
 */
export class NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {

    constructor() {
        super("<=");
    }

    override getRelationalValue(left: number, right: number): boolean {
        return left <= right;
    }
}