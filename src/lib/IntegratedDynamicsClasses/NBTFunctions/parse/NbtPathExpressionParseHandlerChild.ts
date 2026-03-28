/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { INbtPathNavigation } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/INbtPathNavigation";
import { NbtPathNavigationAdapter } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationAdapter";
import { NbtPathExpressionMatches } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext";

/**
 * A handler that handles child path expressions in the form of ".childName",
 * where the matched string represents the child name that should be navigated in.
 */
export class NbtPathExpressionParseHandlerChild
  implements INbtPathExpressionParseHandler
{
  REGEX_CHILDNAME = new RegExp("^[a-zA-Z_0-9]+");

  public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    if (
      nbtPathExpression.charAt(pos) != "." ||
      nbtPathExpression.length <= pos + 1
    ) {
      return HandleResult.INVALID;
    }

    const region = nbtPathExpression.slice(pos + 1);

    const match = region.match(this.REGEX_CHILDNAME);
    if (!match) {
      return HandleResult.INVALID;
    }

    let childName = new iString(match[0]);
    return new HandleResult(new Expression(childName), 1 + childName.length());
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private childName: iString;

  public constructor(childName: iString) {
    super();
    this.childName = childName;
  }

  getChildName(): iString {
    return this.childName;
  }

  public override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_COMPOUND) {
            let tag = nbt as CompoundTag;
            let childTag = tag.get(this.childName);
            if (!(childTag instanceof NullTag)) {
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

  public override asNavigation(child?: INbtPathNavigation): INbtPathNavigation {
    return new NbtPathNavigationAdapter(this.getChildName(), child);
  }
}

NbtPathExpressionParseHandlerChild.Expression = Expression;
