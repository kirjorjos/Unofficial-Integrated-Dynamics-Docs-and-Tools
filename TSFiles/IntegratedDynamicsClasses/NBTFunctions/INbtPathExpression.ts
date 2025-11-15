/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Tag } from "./MinecraftClasses/Tag";
import { NbtPathExpressionExecutionContext } from "./parse/NBTPathExecutionContext";
import { NbtParseException } from "./NbtParseException";
import { NbtPathExpressionMatches } from "./NbtPathExpressionMatches";
import { ByteTag } from "./MinecraftClasses/ByteTag";
import { INbtPathNavigation } from "./navigate/INbtPathNavigation";

/**
 * A parsed NBT path expression.
 */
export class INbtPathExpression {

    /**
     * Find all matches for the given stream of NBT tags or a single tag.
     * @param nbts A stream of NBT tags or tag.
     * @return The matches.
     */
    match(nbts: Array<Tag<IntegratedValue>> | Tag<IntegratedValue>): NbtPathExpressionMatches {
        if (Array.isArray(nbts)) return this.matchContexts(nbts.map((nbt) => new NbtPathExpressionExecutionContext(nbt)));
        else return this.match([nbts]);
    }

    /**
     * Test if any of the given NBT tags or tag in the given stream match with the expression.
     * @param nbts A stream of NBT tags or singular tag.
     * @return True if there is at least one match.
     */
    test(nbts: Array<Tag<IntegratedValue>> | Tag<IntegratedValue>): boolean {
        if (!Array.isArray(nbts)) return this.test([nbts]);
        return this.match([nbts[0] as Tag<IntegratedValue>])
                .getMatches()
                .filter((tag: Tag<IntegratedValue>) => tag.getType() != Tag.TAG_BYTE || parseInt((tag as ByteTag).valueOf().toDecimal()) == 1 as TypeBit) // Filter truthy values
                .length != 0;
    }

    /**
     * Find all matches for the given stream of NBT tags.
     * @param executionContexts A stream of NBT execution contexts.
     * @return The matches.
     */
    matchContexts(_executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
        throw new Error("matchContexts from INbtPathExpression.ts should not have been called!");
    };

    /**
     * Create a navigation for this expression with the given navigation as child.
     * If a null child is passed, the created navigation is a leaf.
     * @param child An option child.
     * @return A navigation path.
     * @throws NbtParseException If this expression can not be expressed as a navigation.
     */
    asNavigation(_child?: INbtPathNavigation): INbtPathNavigation | undefined {
        if (arguments.length === 0) return this.asNavigation();
        throw new NbtParseException("This NBT Path expression has no navigation keys.");
    }
}