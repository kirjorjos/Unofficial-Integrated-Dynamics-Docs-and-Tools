/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Integer } from "JavaNumberClasses/Integer";
import { INbtPathExpression } from "../INbtPathExpression";
import { CompoundTag } from "../MinecraftClasses/CompoundTag";
import { IntTag } from "../MinecraftClasses/IntTag";
import { ListTag } from "../MinecraftClasses/ListTag";
import { Tag } from "../MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import {
  INbtPathExpressionParseHandler,
  HandleResult,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that handles child path expressions for ".length",
 * to retrieve the length of lists and tag compounds.
 */
export class NbtPathExpressionParseHandlerLength
  implements INbtPathExpressionParseHandler
{
  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    if (
      nbtPathExpression.substring(
        pos,
        Math.min(pos + 7, nbtPathExpression.length)
      ) != ".length"
    ) {
      return HandleResult.INVALID;
    }

    return new HandleResult(Expression.INSTANCE, 7);
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  public static INSTANCE = new NbtPathExpressionParseHandlerLength.Expression();

  public override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt as ListTag;
            return new NbtPathExpressionExecutionContext(
              IntTag.valueOf(new Integer(tag.size())),
              executionContext
            );
          } else if (nbt.getType() == Tag.TAG_COMPOUND) {
            let tag = nbt as CompoundTag;
            return new NbtPathExpressionExecutionContext(
              IntTag.valueOf(new Integer(tag.getAllKeys().size())),
              executionContext
            );
          }
          return null;
        })
        .filter((e) => e != null)
    );
  }
}

NbtPathExpressionParseHandlerLength.Expression = Expression;
