/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */
import { INbtPathExpression } from "./INbtPathExpression";
import { INbtPathNavigation } from "./navigate/INbtPathNavigation";
import { NbtPathExpressionMatches } from "./NbtPathExpressionMatches";
import { NbtPathExpressionExecutionContext } from "./parse/NBTPathExecutionContext";

/**
 * An NBT path expression that consists of a list of chained sub-expressions.
 */
export class NbtPathExpressionList extends INbtPathExpression {

    private subExpressions: INbtPathExpression[];

    constructor(...subExpressions: INbtPathExpression[]) {
        super();
        this.subExpressions = subExpressions;
    }

    override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
        let matches = new NbtPathExpressionMatches(executionContexts);
        for (const subExpression of this.subExpressions) {
            matches = subExpression.matchContexts(matches.getContexts());
        }
        return matches;
    }

    public getSubExpressions(): INbtPathExpression[] {
        return this.subExpressions;
    }

    override asNavigation(_child?: INbtPathNavigation): INbtPathNavigation | undefined {
        let current;
        for (let i = this.subExpressions.length - 1; i >= 0; i--) {
            if (current) {
                // Inner node
                current = this.subExpressions[i]!.asNavigation(current);
            } else {
                // Leaf
                current = this.subExpressions[i]!.asNavigation();
            }
        }
        return current;
    }

}