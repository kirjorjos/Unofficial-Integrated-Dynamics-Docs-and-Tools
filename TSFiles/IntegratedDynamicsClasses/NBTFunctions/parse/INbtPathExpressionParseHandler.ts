/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";

/**
 * Handles a string representation of an NBT path expression.
 */
export interface INbtPathExpressionParseHandler {

    /**
     * Try to create an expression from the given position in the given expression.
     * @param nbtPathExpression A string representation of an NBT path expression.
     * @param pos The position in the string to start from.
     * @return The handler result.
     */
    handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult;

}


/**
 * A result data object for {@link INbtPathExpressionParseHandler}.
 */
export class HandleResult {

        static INVALID = new HandleResult(undefined, 0);

        private prefixExpression?: INbtPathExpression;
        private consumedExpressionLength: number;

        public constructor(prefixExpression: INbtPathExpression | undefined, consumedExpressionLength: number) {
            this.prefixExpression = prefixExpression;
            this.consumedExpressionLength = consumedExpressionLength;
        }

        /**
         * @return If the handler could produce a valid expression.
         */
        public isValid(): boolean {
            return this.getPrefixExpression() != null;
        }

        /**
         * @return The expression (for a part) of the given string expression.
         */
        public getPrefixExpression(): INbtPathExpression | undefined {
            return this.prefixExpression;
        }

        /**
         * @return The length of the string expression that was consumed.
         */
        public getConsumedExpressionLength(): number {
            return this.consumedExpressionLength;
        }
    }