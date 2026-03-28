/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import {
  INbtPathExpressionParseHandler,
  HandleResult,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext";
import { NbtPathExpressionMatches } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

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

  getChildIndex(): Integer {
    return new Integer(this.childIndex);
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
            if (new Integer(this.childIndex).lt(tag.size())) {
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
