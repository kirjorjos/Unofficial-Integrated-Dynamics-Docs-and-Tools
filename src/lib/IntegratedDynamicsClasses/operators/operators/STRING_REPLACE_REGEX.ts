import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import {
  sanitizeForRe2,
  sanitizeReplacement,
} from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REPLACE_REGEX extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  static override internalName =
    "integrateddynamics:string_replace_regex" as const;
  static override numericID = 169;
  static override nicknames = [
    "replaceRegex",
    "stringReplaceRegex",
    "replace_regex",
    "string_replace_regex",
  ];
  static override symbol = "replace_regex";
  static override interactName = "stringReplaceRegex";
  static override operatorName = "replace_regex" as const;
  static override displayName = "Replace Regex" as const;
  static override fullDisplayName = "String Replace Regex" as const;
  static override tooltipInfo =
    "Find all matches of the search pattern and replace them with the given string, in the given string." as const;

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
              type: "String",
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
        return (replacementString: iString): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            const pattern = regexString.valueOf();
            const re = new RE2(sanitizeForRe2(pattern), "gu");
            let replacement = replacementString.valueOf();

            const testMatch = new RE2(sanitizeForRe2(pattern), "u").exec(
              fullString.valueOf()
            );
            const groupCount = testMatch ? testMatch.length - 1 : 0;

            const badRef = [...replacement.matchAll(/(?<!\\)\$(\d+)/g)]
              .map((m) => Number(m[1]))
              .some((n) => n > groupCount && n !== 0);

            if (badRef) {
              throw new Error("Invalid replacement group reference");
            }

            replacement = sanitizeReplacement(replacement);

            try {
              return new iString(fullString.valueOf().replace(re, replacement));
            } catch (e) {
              console.log(replacement);
              throw e;
            }
          };
        };
      },
    });
  }
}
