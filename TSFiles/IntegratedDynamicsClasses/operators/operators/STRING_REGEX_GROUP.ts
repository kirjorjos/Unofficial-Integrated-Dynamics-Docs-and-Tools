import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_GROUP extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iString>>
> {
  static override internalName =
    "integrateddynamics:string_regex_group" as const;
  constructor() {
    super({
      nicknames: ["stringRegexGroup"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "String",
            },
          },
        },
      }),
      symbol: "regex_group",
      interactName: "stringRegexGroup",
      function: (regexString: iString) => {
        return (groupIndex: Integer) => {
          return (fullString: iString) => {
            if (groupIndex.toJSNumber() < 0)
              throw new Error(
                `Group index cannot be negative, got ${groupIndex.toJSNumber()}`
              );

            const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "u");
            const match = regex.exec(fullString.valueOf());

            if (!match) {
              throw new Error(
                `No match found for group index ${groupIndex.valueOf()} in regex "${regexString.valueOf()}" on string "${fullString.valueOf()}"`
              );
            }

            if (groupIndex.toJSNumber() > match.length - 1)
              throw new Error(
                `Index ${groupIndex} not found in regex ${regexString.valueOf()}`
              );

            const m = match[groupIndex.toJSNumber()];
            return new iString(m ?? "");
          };
        };
      },
    });
  }
}
