/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionParseHandlerChild } from "./NbtPathExpressionParseHandlerChild";
import { NbtPathStringParser } from "./NbtPathStringParser";

/**
 * A handler that handles child path expressions in the form of "["childName"]",
 * where the matched string represents the child name that should be navigated in.
 * This works just like {@link NbtPathExpressionParseHandlerChild},
 * but allows special characters to be used.
 */
export class NbtPathExpressionParseHandlerChildBrackets
  implements INbtPathExpressionParseHandler
{
  handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    if (
      pos >= nbtPathExpression.length ||
      nbtPathExpression.charAt(pos) != "["
    ) {
      return HandleResult.INVALID;
    }
    let parseResult = NbtPathStringParser.parse(nbtPathExpression, pos + 1);
    if (!parseResult.isSuccess()) {
      return HandleResult.INVALID;
    }
    let closingBracketIndex = pos + parseResult.getConsumed() + 1;
    if (
      closingBracketIndex >= nbtPathExpression.length ||
      nbtPathExpression.charAt(closingBracketIndex) != "]"
    ) {
      return HandleResult.INVALID;
    }
    return new HandleResult(
      new NbtPathExpressionParseHandlerChild.Expression(
        parseResult.getResult()
      ),
      2 + parseResult.getConsumed()
    );
  }
}
