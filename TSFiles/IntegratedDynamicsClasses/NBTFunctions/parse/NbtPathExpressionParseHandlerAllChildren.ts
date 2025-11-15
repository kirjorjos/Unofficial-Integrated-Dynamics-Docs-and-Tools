/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { ListTag } from "../MinecraftClasses/ListTag";
import { CompoundTag } from "../MinecraftClasses/CompoundTag";
import { HandleResult, INbtPathExpressionParseHandler } from "./INbtPathExpressionParseHandler";
import { INbtPathExpression } from "../INbtPathExpression";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import { INbtPathNavigation } from "../navigate/INbtPathNavigation";
import { NbtPathNavigationLinkWildcard } from "../navigate/NbtPathNavigationLinkWildcard";
import { NbtPathNavigationLeafWildcard } from "../navigate/NbtPathNavigationLeafWildcard";

/**
 * A handler that handles follows all child links of a tag via "*".
 */
export class NbtPathExpressionParseHandlerAllChildren implements INbtPathExpressionParseHandler {

    handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
        if (nbtPathExpression.charAt(pos) != '*') {
            return HandleResult.INVALID;
        }

        return new HandleResult(NbtPathExpressionParseHandlerAllChildren.Expression.INSTANCE, 1);
    }

    static Expression = class Expression extends INbtPathExpression {

        static INSTANCE = new NbtPathExpressionParseHandlerAllChildren.Expression();

        public override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
            return new NbtPathExpressionMatches(executionContexts
                    .flatMap((executionContext) => {
                        let nbt = executionContext.getCurrentTag() as Tag<IntegratedValue>;
                        if (nbt.getType() === Tag.TAG_LIST) {
                            let tag = nbt as ListTag;
                            return tag.getArray().map((subTag: Tag<IntegratedValue>) => new NbtPathExpressionExecutionContext(subTag, executionContext));
                        } else if (nbt.getType() === Tag.TAG_COMPOUND) {
                            let tag = nbt as CompoundTag;
                            return tag.getAllKeys().map((key) => 
															new NbtPathExpressionExecutionContext(tag.get(key), executionContext));
                        }
                        return null;
                    })
                    .filter(e => !(e === null))
            );
        }

        public override asNavigation(child?: INbtPathNavigation): INbtPathNavigation {
            return child == child ? new NbtPathNavigationLinkWildcard(child!) : NbtPathNavigationLeafWildcard.INSTANCE;
        }
    }
}