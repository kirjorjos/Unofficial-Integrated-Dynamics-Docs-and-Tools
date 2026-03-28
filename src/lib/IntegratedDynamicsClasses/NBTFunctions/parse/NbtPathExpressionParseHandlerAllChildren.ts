/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler";
import { INbtPathExpression } from "lib/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression";
import { NbtPathExpressionExecutionContext } from "lib/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext";
import { NbtPathExpressionMatches } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches";
import { INbtPathNavigation } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/INbtPathNavigation";
import { NbtPathNavigationLinkWildcard } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationLinkWildcard";
import { NbtPathNavigationLeafWildcard } from "lib/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationLeafWildcard";

/**
 * A handler that handles follows all child links of a tag via "*".
 */
export class NbtPathExpressionParseHandlerAllChildren
  implements INbtPathExpressionParseHandler
{
  handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    let offset = 0;
    if (nbtPathExpression.charAt(pos) === ".") {
      offset = 1;
    }

    if (nbtPathExpression.charAt(pos + offset) != "*") {
      return HandleResult.INVALID;
    }

    return new HandleResult(
      NbtPathExpressionParseHandlerAllChildren.Expression.INSTANCE,
      offset + 1
    );
  }

  static Expression = class Expression extends INbtPathExpression {
    static get INSTANCE() {
      return new NbtPathExpressionParseHandlerAllChildren.Expression();
    }

    public override matchContexts(
      executionContexts: Array<NbtPathExpressionExecutionContext>
    ): NbtPathExpressionMatches {
      return new NbtPathExpressionMatches(
        executionContexts
          .flatMap((executionContext) => {
            let nbt = executionContext.getCurrentTag() as Tag<IntegratedValue>;
            if (nbt.getType() === Tag.TAG_LIST) {
              let tag = nbt as ListTag;
              return tag
                .getArray()
                .valueOf()
                .map(
                  (subTag: Tag<IntegratedValue>) =>
                    new NbtPathExpressionExecutionContext(
                      subTag,
                      executionContext
                    )
                );
            } else if (nbt.getType() === Tag.TAG_COMPOUND) {
              let tag = nbt as CompoundTag;
              return tag
                .getAllKeys()
                .valueOf()
                .map(
                  (key) =>
                    new NbtPathExpressionExecutionContext(
                      tag.get(key),
                      executionContext
                    )
                );
            }
            return null;
          })
          .filter((e) => !(e === null))
      );
    }

    public override asNavigation(
      child?: INbtPathNavigation
    ): INbtPathNavigation {
      return child == child
        ? new NbtPathNavigationLinkWildcard(child!)
        : NbtPathNavigationLeafWildcard.INSTANCE;
    }
  };
}
