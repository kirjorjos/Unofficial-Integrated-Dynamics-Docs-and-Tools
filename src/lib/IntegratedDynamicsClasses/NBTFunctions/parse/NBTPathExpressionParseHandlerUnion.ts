/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { INbtPathNavigation } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/INbtPathNavigation";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext";
import { NbtPathNavigationAdapter } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationAdapter";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

const parseJavaInt = (text: string): number | null => {
  if (!/^[-+]?[0-9]+$/.test(text)) return null;
  const value = Number(text);
  if (!Number.isInteger(value)) return null;
  if (value < -2147483648 || value > 2147483647) return null;
  return value;
};

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

    let childNames = [] as iString[];
    let childIndexes = [] as number[];
    let expressionLength = 1;
    for (const match of contents) {
      expressionLength += 1 + match.length;
      const parsedIndex = parseJavaInt(match);
      if (parsedIndex !== null) {
        childIndexes.push(parsedIndex);
        if (!(childNames.length == 0)) {
          return HandleResult.INVALID;
        }
      } else {
        childNames.push(new iString(match));
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
  private childNames: Array<iString>;
  private childIndexes: Array<number>;

  constructor(childNames: Array<iString>, childIndexes: Array<number>) {
    super();
    this.childNames = childNames;
    this.childIndexes = childIndexes;
  }

  getChildNames(): Array<iString> {
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
              .map((i) => tag.get(new Integer(i)))
              .filter(
                (subTag: Tag<IntegratedValue>) => !(subTag instanceof NullTag)
              )
              .map(
                (subTag: Tag<IntegratedValue>) =>
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
              .filter((e) => !(e instanceof NullTag))
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
