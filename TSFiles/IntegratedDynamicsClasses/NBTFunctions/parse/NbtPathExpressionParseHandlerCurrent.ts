/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import {
  INbtPathExpressionParseHandler,
  HandleResult,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that picks the current position in the NBT tree via "@".
 */
export class NbtPathExpressionParseHandlerCurrent
  implements INbtPathExpressionParseHandler
{
  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    if (nbtPathExpression.charAt(pos) != "@") {
      return HandleResult.INVALID;
    }

    return new HandleResult(
      NbtPathExpressionParseHandlerCurrent.Expression.INSTANCE,
      1
    );
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  static INSTANCE = new Expression();

  override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(executionContexts);
  }
}

NbtPathExpressionParseHandlerCurrent.Expression = Expression;
