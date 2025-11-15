/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import { HandleResult, INbtPathExpressionParseHandler } from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that picks the parent of the NBT tree in the current execution context via "..".
 */
export class NbtPathExpressionParseHandlerParent implements INbtPathExpressionParseHandler {

    public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
        if (nbtPathExpression.length <= pos + 1
                || nbtPathExpression.charAt(pos) != '.' || nbtPathExpression.charAt(pos + 1) != '.') {
            return HandleResult.INVALID;
        }

        return new HandleResult(NbtPathExpressionParseHandlerParent.Expression.INSTANCE, 2);
    }

    static Expression: typeof Expression
}

class Expression extends INbtPathExpression {

    public static INSTANCE = new Expression();

    public override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
        return new NbtPathExpressionMatches(executionContexts
                .map((e) => e.getParentContext())
                .filter((e) => e != null)
        );
    }
}

NbtPathExpressionParseHandlerParent.Expression = Expression;