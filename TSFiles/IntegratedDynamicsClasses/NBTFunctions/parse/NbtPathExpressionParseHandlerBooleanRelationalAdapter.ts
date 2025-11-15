/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Integer } from "JavaNumberClasses/Integer";
import { INbtPathExpression } from "../INbtPathExpression";
import { ByteTag } from "../MinecraftClasses/ByteTag";
import { NumericTag } from "../MinecraftClasses/NumericTag";
import { HandleResult, INbtPathExpressionParseHandler } from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";

/**
 * An abstract handler that handles boolean relational expressions.
 */
export abstract class NbtPathExpressionParseHandlerBooleanRelationalAdapter implements INbtPathExpressionParseHandler {

    private regex: RegExp;

    protected constructor(relation: string) {
        this.regex = new RegExp(`^ *${relation} *([0-9]+(\\.[0-9]+)?)`);
    }

    public abstract getRelationalValue(left: number, right: number): boolean;

    handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
        let match = this.regex.exec(nbtPathExpression.slice(pos));
        if (!match) {
            return HandleResult.INVALID;
        }

        let targetDoubleString = match[1];
        let targetDouble = Number(targetDoubleString);
        return new HandleResult(new NbtPathExpressionParseHandlerBooleanRelationalAdapter.Expression(targetDouble, this), match[0].length);
    }

		static Expression: typeof Expression

}

class Expression extends INbtPathExpression {

		private targetDouble: number;
		private handler: NbtPathExpressionParseHandlerBooleanRelationalAdapter;

		constructor(targetDouble: number, handler: NbtPathExpressionParseHandlerBooleanRelationalAdapter) {
			super();
			this.targetDouble = targetDouble;
			this.handler = handler;
		}

		getTargetDouble(): number {
				return this.targetDouble;
		}

		public override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
				return new NbtPathExpressionMatches(executionContexts
								.map(executionContext => {
										let nbt = executionContext.getCurrentTag();
										if (nbt instanceof NumericTag) {
												let tag = nbt as NumericTag;
												return new NbtPathExpressionExecutionContext(
																ByteTag.valueOf(new Integer(this.handler.getRelationalValue(tag.getAsDouble(), this.getTargetDouble())
																				? 1 : 0)), executionContext);
										}
										return new NbtPathExpressionExecutionContext(ByteTag.valueOf(new Integer(0)), executionContext);
								})
				);
		}
}

NbtPathExpressionParseHandlerBooleanRelationalAdapter.Expression = Expression;