/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "./INbtPathExpression";
import { NbtPathExpressionList } from "./NbtPathExpressionList";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "./parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionParseHandlerAllChildren } from "./parse/NbtPathExpressionParseHandlerAllChildren";
import { NbtPathExpressionParseHandlerBooleanRelationalEqual } from "./parse/NbtPathExpressionParseHandlerBooleanRelationalEqual";
import { NbtPathExpressionParseHandlerBooleanRelationalGreaterThan } from "./parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThan";
import { NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual } from "./parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual";
import { NbtPathExpressionParseHandlerBooleanRelationalLessThan } from "./parse/NbtPathExpressionParseHandlerBooleanRelationalLessThan";
import { NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual } from "./parse/NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual";
import { NbtPathExpressionParseHandlerChild } from "./parse/NbtPathExpressionParseHandlerChild";
import { NbtPathExpressionParseHandlerChildBrackets } from "./parse/NbtPathExpressionParseHandlerChildBrackets";
import { NbtPathExpressionParseHandlerCurrent } from "./parse/NbtPathExpressionParseHandlerCurrent";
import { NbtPathExpressionParseHandlerFilterExpression } from "./parse/NbtPathExpressionParseHandlerFilterExpression";
import { NbtPathExpressionParseHandlerLength } from "./parse/NbtPathExpressionParseHandlerLength";
import { NbtPathExpressionParseHandlerListElement } from "./parse/NbtPathExpressionParseHandlerListElement";
import { NbtPathExpressionParseHandlerListSlice } from "./parse/NbtPathExpressionParseHandlerListSlice";
import { NbtPathExpressionParseHandlerParent } from "./parse/NbtPathExpressionParseHandlerParent";
import { NbtPathExpressionParseHandlerRoot } from "./parse/NbtPathExpressionParseHandlerRoot";
import { NbtPathExpressionParseHandlerStringEqual } from "./parse/NbtPathExpressionParseHandlerStringEqual";
import { NbtPathExpressionParseHandlerUnion } from "./parse/NBTPathExpressionParseHandlerUnion";

export class NbtPath {
  private static PARSE_HANDLERS: Array<INbtPathExpressionParseHandler> = [
    new NbtPathExpressionParseHandlerRoot(),
    new NbtPathExpressionParseHandlerLength(),
    new NbtPathExpressionParseHandlerChild(),
    new NbtPathExpressionParseHandlerChildBrackets(),
    new NbtPathExpressionParseHandlerParent(),
    new NbtPathExpressionParseHandlerAllChildren(),
    new NbtPathExpressionParseHandlerCurrent(),
    new NbtPathExpressionParseHandlerListElement(),
    new NbtPathExpressionParseHandlerListSlice(),
    new NbtPathExpressionParseHandlerUnion(),
    new NbtPathExpressionParseHandlerBooleanRelationalLessThan(),
    new NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual(),
    new NbtPathExpressionParseHandlerBooleanRelationalGreaterThan(),
    new NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual(),
    new NbtPathExpressionParseHandlerBooleanRelationalEqual(),
    new NbtPathExpressionParseHandlerStringEqual(),
    new NbtPathExpressionParseHandlerFilterExpression(),
  ];

  /**
   * Parse an NBT path expression string into an in-memory representation.
   * @param nbtPathExpression An NBT path expression string
   * @return An in-memory representation of the given expression.
   * @throws NbtParseException An exception that can be thrown if parsing failed.
   */
  static parse(nbtPathExpression: string): INbtPathExpression | undefined {
    let expressions = [] as Array<INbtPathExpression>;

    let pos = 0;
    while (pos < nbtPathExpression.length) {
      let handled = false;
      for (const parseHandler of NbtPath.PARSE_HANDLERS) {
        let handleResult = parseHandler.handlePrefixOf(
          nbtPathExpression,
          pos
        ) as HandleResult;
        if (handleResult.isValid()) {
          pos += handleResult.getConsumedExpressionLength();
          expressions.push(handleResult.getPrefixExpression()!);
          handled = true;
          break;
        }
      }

      if (!handled) {
        throw new Error(
          `Failed to parse expression at pos '${pos}': ${nbtPathExpression}`
        );
      }

      return new NbtPathExpressionList(...expressions);
    }
    return undefined;
  }
}
