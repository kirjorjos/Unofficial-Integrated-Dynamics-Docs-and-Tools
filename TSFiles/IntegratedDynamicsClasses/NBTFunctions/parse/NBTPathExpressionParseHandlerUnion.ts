/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { INbtPathNavigation } from "../navigate/INbtPathNavigation";
import { CompoundTag } from "../MinecraftClasses/CompoundTag";
import { ListTag } from "../MinecraftClasses/ListTag";
import { Tag } from "../MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";
import { NbtPathNavigationAdapter } from "../navigate/NbtPathNavigationAdapter";

/**
 * A handler that handles union expressions in the form of "[10,12]" or "[10,]" or "[,12]",
 * where the matches indicate the children or list elements that should be matched.
 */
export class NbtPathExpressionParseHandlerUnion
  implements INbtPathExpressionParseHandler
{
  REGEX_BRACKETS = new RegExp("^\\[([^\\]]+(,[^\\]]+)+)\\]");

  handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    const match = this.REGEX_BRACKETS.exec(nbtPathExpression.slice(pos));
    if (!match) {
      return HandleResult.INVALID;
    }

    let contents = (match[1] as string).split(",");

    let childNames = [] as string[];
    let childIndexes = [] as number[];
    let expressionLength = 1;
    for (const match of contents) {
      expressionLength += 1 + match.length;
      try {
        childIndexes.push(parseInt(match));
        if (!(childNames.length == 0)) {
          return HandleResult.INVALID;
        }
      } catch (e) {
        childNames.push(match);
        if (!(childIndexes.length == 0)) {
          return HandleResult.INVALID;
        }
      }
    }
    return new HandleResult(
      new Expression(childNames, childIndexes),
      expressionLength
    );
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private childNames: Array<string>;
  private childIndexes: Array<number>;

  constructor(childNames: Array<string>, childIndexes: Array<number>) {
    super();
    this.childNames = childNames;
    this.childIndexes = childIndexes;
  }

  getChildNames(): Array<string> {
    return this.childNames;
  }

  getChildIndexes(): Array<number> {
    return this.childIndexes;
  }

  override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .flatMap((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (
            !(this.getChildIndexes().length == 0) &&
            nbt.getType() == Tag.TAG_LIST
          ) {
            let tag = nbt as ListTag;
            return this.getChildIndexes()
              .map((i) => tag.get(i))
              .filter((subTag) => subTag.getId() != 0)
              .map(
                (subTag) =>
                  new NbtPathExpressionExecutionContext(
                    subTag,
                    executionContext
                  )
              );
          } else if (
            !(this.getChildNames().length == 0) &&
            nbt.getType() == Tag.TAG_COMPOUND
          ) {
            let tag = nbt as CompoundTag;
            return this.getChildNames()
              .map((e) => tag.get(e))
              .filter((e) => e != null)
              .map(
                (subTag) =>
                  new NbtPathExpressionExecutionContext(
                    subTag,
                    executionContext
                  )
              );
          }
          return null;
        })
        .filter((e) => e != null)
    );
  }

  override asNavigation(child: INbtPathNavigation): INbtPathNavigation {
    if (!(this.getChildNames().length == 0)) {
      return new NbtPathNavigationAdapter(this.getChildNames(), child);
    } else {
      throw new Error(
        "NbtPathExpressionParseHandlerUnion.Expression#asNavigation is not implemented for lists"
      );
    }
  }
}

NbtPathExpressionParseHandlerUnion.Expression = Expression;
