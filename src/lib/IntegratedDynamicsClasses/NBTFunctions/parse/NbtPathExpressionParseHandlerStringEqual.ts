/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Integer } from "lib/JavaNumberClasses/Integer";
import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext";
import { NbtPathStringParser } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathStringParser";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

/**
 * A handler that handles boolean expressions in the form of " == "abc"".
 */
export class NbtPathExpressionParseHandlerStringEqual
  implements INbtPathExpressionParseHandler
{
  /**
   * Skips all consecutive spaces.
   * @param str Source string
   * @param pos Index of the first potential space
   * @return Index of first encountered non space character
   */
  private static skipSpaces(str: string, pos: number): number {
    while (pos < str.length && str.charAt(pos) == " ") {
      pos++;
    }
    return pos;
  }

  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    let currentPos = NbtPathExpressionParseHandlerStringEqual.skipSpaces(
      nbtPathExpression,
      pos
    );
    if (currentPos + 1 >= nbtPathExpression.length) {
      return HandleResult.INVALID;
    }
    if (
      nbtPathExpression.charAt(currentPos) != "=" ||
      nbtPathExpression.charAt(currentPos + 1) != "="
    ) {
      return HandleResult.INVALID;
    }
    currentPos = NbtPathExpressionParseHandlerStringEqual.skipSpaces(
      nbtPathExpression,
      currentPos + 2
    );
    let parseResult = NbtPathStringParser.parse(nbtPathExpression, currentPos);
    if (!parseResult.isSuccess()) {
      return HandleResult.INVALID;
    }
    return new HandleResult(
      new NbtPathExpressionParseHandlerStringEqual.Expression(
        parseResult.getResult()
      ),
      currentPos - pos + parseResult.getConsumed()
    );
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private targetString: iString;

  constructor(targetString: iString) {
    super();
    this.targetString = targetString;
  }

  getTargetString(): iString {
    return this.targetString;
  }

  override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts.map((executionContext) => {
        let nbt = executionContext.getCurrentTag() as Tag<IntegratedValue>;
        if (nbt.getType() == Tag.TAG_STRING) {
          let tag = nbt as StringTag;
          return new NbtPathExpressionExecutionContext(
            ByteTag.valueOf(
              new Integer(+this.getTargetString().equals(tag.valueOf()))
            ),
            executionContext
          );
        }
        return new NbtPathExpressionExecutionContext(
          ByteTag.valueOf(Integer.ZERO),
          executionContext
        );
      })
    );
  }
}

NbtPathExpressionParseHandlerStringEqual.Expression = Expression;
