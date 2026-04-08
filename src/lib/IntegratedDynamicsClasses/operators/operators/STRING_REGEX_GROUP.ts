import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_GROUP extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iString>>
> {
  static override internalName =
    "integrateddynamics:string_regex_group" as const;
  static override numericID = 159;
  static override nicknames = [
    "stringRegexGroup",
    "regex_group",
    "stringRegex_group",
  ];
  static override symbol = "regex_group";
  static override interactName = "stringRegexGroup";
  static override operatorName = "regex_group" as const;
  static override displayName = "Regex Group" as const;
  static override fullDisplayName = "String Regex Group" as const;
  static override tooltipInfo =
    "Search for the given regular expression and return in that match the group at the given index, in the given string." as const;

  static override kind = "string" as const;
  static override renderPattern = "PREFIX_3_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
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
        },
        normalizeSignature
      ),
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
