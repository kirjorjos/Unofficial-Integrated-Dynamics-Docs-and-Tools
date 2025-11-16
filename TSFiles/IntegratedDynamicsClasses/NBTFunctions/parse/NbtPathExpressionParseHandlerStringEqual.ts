/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Integer } from "JavaNumberClasses/Integer";
import { INbtPathExpression } from "../INbtPathExpression";
import { ByteTag } from "../MinecraftClasses/ByteTag";
import { Tag } from "../MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import { HandleResult, INbtPathExpressionParseHandler } from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";
import { NbtPathStringParser } from "./NbtPathStringParser";
import { StringTag } from "../MinecraftClasses/StringTag";

/**
 * A handler that handles boolean expressions in the form of " == "abc"".
 */
export class NbtPathExpressionParseHandlerStringEqual implements INbtPathExpressionParseHandler {
    /**
     * Skips all consecutive spaces.
     * @param str Source string
     * @param pos Index of the first potential space
     * @return Index of first encountered non space character
     */
    private static skipSpaces(str: string, pos: number): number {
        while (pos < str.length && str.charAt(pos) == ' ') {
            pos++;
        }
        return pos;
    }

    public handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
        let currentPos = NbtPathExpressionParseHandlerStringEqual.skipSpaces(nbtPathExpression, pos);
        if ((currentPos + 1) >= nbtPathExpression.length) {
            return HandleResult.INVALID;
        }
        if (nbtPathExpression.charAt(currentPos) != '=' || nbtPathExpression.charAt(currentPos + 1) != '=') {
            return HandleResult.INVALID;
        }
        currentPos = NbtPathExpressionParseHandlerStringEqual.skipSpaces(nbtPathExpression, currentPos + 2);
        let parseResult = NbtPathStringParser.parse(nbtPathExpression, currentPos);
        if (!parseResult.isSuccess()) {
            return HandleResult.INVALID;
        }
        return new HandleResult(
            new NbtPathExpressionParseHandlerStringEqual.Expression(parseResult.getResult()),
            currentPos - pos + parseResult.getConsumed()
        );
    }

    static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {

    private targetString: string;

    constructor(targetString: string) {
        super();
        this.targetString = targetString;
    }

    getTargetString(): string {
        return this.targetString;
    }

    override matchContexts(executionContexts: Array<NbtPathExpressionExecutionContext>): NbtPathExpressionMatches {
        return new NbtPathExpressionMatches(executionContexts
                .map((executionContext) => {
                    let nbt = executionContext.getCurrentTag() as Tag<IntegratedValue>;
                    if (nbt.getType() == Tag.TAG_STRING) {
                        let tag = nbt as StringTag;
                        return new NbtPathExpressionExecutionContext(
                                (ByteTag.valueOf(
                                    new Integer(+(this.getTargetString() == tag.valueOf())))
                                ),
                                executionContext
                            )
                    }
                    return new NbtPathExpressionExecutionContext(ByteTag.valueOf(new Integer(0)), executionContext);
                })
        );
    }

}

NbtPathExpressionParseHandlerStringEqual.Expression = Expression;