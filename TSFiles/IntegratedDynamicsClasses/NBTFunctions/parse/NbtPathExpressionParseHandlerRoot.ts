/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { INbtPathNavigation } from "../navigate/INbtPathNavigation";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import { INbtPathExpressionParseHandler, HandleResult } from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that picks the root of the NBT tree via "$".
 */
export class NbtPathExpressionParseHandlerRoot implements INbtPathExpressionParseHandler {

    handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
        if (nbtPathExpression.charAt(pos) != '$') {
            return HandleResult.INVALID;
        }

        return new HandleResult(NbtPathExpressionParseHandlerRoot.Expression.INSTANCE, 1);
    }

    public static Expression = class Expression extends INbtPathExpression {

        public static INSTANCE = new Expression();

        override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
            return new NbtPathExpressionMatches(executionContexts.map((e) => e.getRootContext()));
        }

        override asNavigation(child?: INbtPathNavigation): INbtPathNavigation | undefined {
            return child;
        }
    }
}