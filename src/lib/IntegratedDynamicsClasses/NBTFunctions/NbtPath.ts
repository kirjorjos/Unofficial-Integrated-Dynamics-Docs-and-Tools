/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { NbtPathExpressionList } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionList";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionParseHandlerAllChildren } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerAllChildren";
import { NbtPathExpressionParseHandlerBooleanRelationalEqual } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalEqual";
import { NbtPathExpressionParseHandlerBooleanRelationalGreaterThan } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThan";
import { NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual";
import { NbtPathExpressionParseHandlerBooleanRelationalLessThan } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalLessThan";
import { NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual";
import { NbtPathExpressionParseHandlerChild } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerChild";
import { NbtPathExpressionParseHandlerChildBrackets } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerChildBrackets";
import { NbtPathExpressionParseHandlerCurrent } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerCurrent";
import { NbtPathExpressionParseHandlerFilterExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerFilterExpression";
import { NbtPathExpressionParseHandlerLength } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerLength";
import { NbtPathExpressionParseHandlerListElement } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerListElement";
import { NbtPathExpressionParseHandlerListSlice } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerListSlice";
import { NbtPathExpressionParseHandlerParent } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerParent";
import { NbtPathExpressionParseHandlerRoot } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerRoot";
import { NbtPathExpressionParseHandlerStringEqual } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerStringEqual";
import { NbtPathExpressionParseHandlerUnion } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExpressionParseHandlerUnion";

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
    }
    return new NbtPathExpressionList(...expressions);
  }
}
