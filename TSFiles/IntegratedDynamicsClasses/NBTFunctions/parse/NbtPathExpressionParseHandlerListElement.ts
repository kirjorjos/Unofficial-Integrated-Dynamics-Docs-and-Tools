/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { Tag } from "../MinecraftClasses/Tag";
import {
  INbtPathExpressionParseHandler,
  HandleResult,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";
import { ListTag } from "../MinecraftClasses/ListTag";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";

/**
 * A handler that handles list element expressions in the form of "[10]",
 * where the matched string represents the list element index that should be navigated in.
 */
export class NbtPathExpressionParseHandlerListElement
  implements INbtPathExpressionParseHandler
{
  REGEX_ELEMENTINDEX = new RegExp("^\\[([0-9]+)\\]");

  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    const region = nbtPathExpression.slice(pos);

    const match = region.match(this.REGEX_ELEMENTINDEX);
    if (!match) {
      return HandleResult.INVALID;
    }

    const childIndexString = match[1] as string;
    const childIndex = parseInt(childIndexString);
    return new HandleResult(
      new Expression(childIndex),
      2 + childIndexString.length
    );
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private childIndex: number;

  constructor(childIndex: number) {
    super();
    this.childIndex = childIndex;
  }

  getChildIndex(): number {
    return this.childIndex;
  }

  override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt as ListTag;
            if (this.childIndex < tag.size()) {
              let childTag = tag.get(this.getChildIndex());
              return new NbtPathExpressionExecutionContext(
                childTag,
                executionContext
              );
            }
          }
          return null;
        })
        .filter((e) => e != null)
    );
  }
}

NbtPathExpressionParseHandlerListElement.Expression = Expression;
