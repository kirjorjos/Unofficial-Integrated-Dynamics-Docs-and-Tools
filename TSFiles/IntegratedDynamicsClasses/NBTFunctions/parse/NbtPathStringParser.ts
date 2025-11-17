/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

/**
 * A parser for strings within NBT path expressions in the form of "ab\"c".
 */
export class NbtPathStringParser {
  static StringParseResult = class StringParseResult {
    private static FAIL = new StringParseResult(
      false,
      0,
      ""
    ) as StringParseResult;
    private successVal: boolean;
    private consumed: number;
    private result: string;

    public constructor(success: boolean, consumed: number, result: string) {
      this.successVal = success;
      this.consumed = consumed;
      this.result = result;
    }

    isSuccess(): boolean {
      return this.successVal;
    }

    getConsumed(): number {
      return this.consumed;
    }

    getResult(): string {
      return this.result;
    }

    static success(consumed: number, result: string): StringParseResult {
      return new StringParseResult(true, consumed, result);
    }

    static fail(): StringParseResult {
      return this.FAIL;
    }
  };

  /**
   * Parse a string that starts and ends with doubles quotes and; Can handle escape sequences
   * within that string.
   * @param source The source string
   * @param pos Where to start parse; The index of the opening double quote
   * @return Parse result
   */
  public static parse(
    source: string,
    pos: number
  ): InstanceType<typeof this.StringParseResult> {
    if (pos >= source.length || source.charAt(pos) != '"') {
      return this.StringParseResult.fail();
    }
    let resultBuilder = "";
    let currentPos = pos + 1; // Skip the first double quote
    // This loop is terminated by finding another unescaped double quote.
    while (true) {
      if (currentPos >= source.length) {
        return this.StringParseResult.fail();
      }
      let character = source.charAt(currentPos);
      currentPos++;
      switch (character) {
        case "\\": {
          // Escape
          if (currentPos >= source.length) {
            return this.StringParseResult.fail();
          }
          let escapeName = source.charAt(currentPos);
          currentPos++;
          switch (escapeName) {
            case "\\": // For \\
            case '"': // For \"
              resultBuilder + escapeName;
              continue;
            default:
              return this.StringParseResult.fail();
          }
        }
        case '"':
          // End string
          return this.StringParseResult.success(
            currentPos - pos,
            resultBuilder
          );
        default:
          resultBuilder + character;
      }
    }
  }
}
