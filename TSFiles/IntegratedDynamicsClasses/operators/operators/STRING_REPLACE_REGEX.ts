import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2, sanitizeReplacement } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REPLACE_REGEX extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  static override internalName =
    "integrateddynamics:string_replace_regex" as const;
  constructor() {
    super({
      nicknames: ["stringReplaceRegex"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "replace_regex",
      interactName: "stringReplaceRegex",
      function: (regexString: iString) => {
        return (replacementString: iString): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            const pattern = regexString.valueOf();
            const re = new RE2(sanitizeForRe2(pattern),  "gu");
            let replacement = replacementString.valueOf();

            const testMatch = new RE2(sanitizeForRe2(pattern),  "u").exec(fullString.valueOf());
            const groupCount = testMatch ? testMatch.length - 1 : 0;

            const badRef = [...replacement.matchAll(/(?<!\\)\$(\d+)/g)]
              .map(m => Number(m[1]))
              .some(n => n > groupCount && n !== 0);

            if (badRef) {
              throw new Error("Invalid replacement group reference");
            }

            replacement = sanitizeReplacement(replacement);

            try {
              return new iString(fullString.valueOf().replace(re, replacement));
            } catch(e) {
              console.log(replacement);
              throw e;
            }

          };
        };
      },
    });
  }
}
