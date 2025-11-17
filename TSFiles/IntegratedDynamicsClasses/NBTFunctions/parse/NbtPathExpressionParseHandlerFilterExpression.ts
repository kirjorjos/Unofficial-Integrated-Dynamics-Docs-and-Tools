/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { CompoundTag } from "../MinecraftClasses/CompoundTag";
import { ListTag } from "../MinecraftClasses/ListTag";
import { Tag } from "../MinecraftClasses/Tag";
import { NbtParseException } from "../NbtParseException";
import { NbtPath } from "../NbtPath";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that handles filter expressions in the form of "[?(expression)]", such as "[?(@.childName)]" or "[?(@.childName &lt; 10)]".
 */
export class NbtPathExpressionParseHandlerFilterExpression
  implements INbtPathExpressionParseHandler
{
  REGEX_EXPRESSION = new RegExp("^\\[\\?\\(([^\\)^\\(]+)\\)\\]");

  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    const match = this.REGEX_EXPRESSION.exec(nbtPathExpression.slice(pos));
    if (!match) {
      return HandleResult.INVALID;
    }

    let expressionString = match[1] as string;
    try {
      let expression = NbtPath.parse(expressionString);
      return new HandleResult(
        new NbtPathExpressionParseHandlerFilterExpression.Expression(
          expression!
        ),
        5 + expressionString.length
      );
    } catch (e) {
      if (!(e instanceof NbtParseException)) throw e;
      return HandleResult.INVALID;
    }
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private expression: INbtPathExpression;

  public constructor(expression: INbtPathExpression) {
    super();
    this.expression = expression;
  }

  public getExpression(): INbtPathExpression {
    return this.expression;
  }

  public override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt as ListTag;
            let newTagList = new ListTag([]);
            tag
              .getArray()
              .filter((subTag) => this.getExpression().test(subTag))
              .forEach((subTag) => newTagList.add(subTag));
            return new NbtPathExpressionExecutionContext(
              newTagList,
              executionContext
            );
          } else if (nbt.getType() == Tag.TAG_COMPOUND) {
            let tag = nbt as CompoundTag;
            let newTagList = new ListTag([]);
            Array.from(tag.getAllKeys())
              .map((key) => tag.get(key))
              .filter((subTag) => this.getExpression().test(subTag))
              .forEach((subTag) => newTagList.add(subTag));
            return new NbtPathExpressionExecutionContext(
              newTagList,
              executionContext
            );
          }
          return null;
        })
        .filter((e) => e != null)
    );
  }
}

NbtPathExpressionParseHandlerFilterExpression.Expression = Expression;
