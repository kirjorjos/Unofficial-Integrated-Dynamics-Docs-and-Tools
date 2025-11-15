/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

/**
 * An exception that can be thrown during the parsing of NBT path expressions.
 */
export class NbtParseException extends Error {

    constructor(msg: string) {
        super(msg);
    }
    
}