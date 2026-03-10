import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_CONTAINS_REGEX extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_contains_regex" as const;
  static override nicknames = ["containsRegex"];
  static override symbol = "contains_regex";
  static override interactName = "stringContainsRegex";
  constructor() {
    super({
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
            type: "Boolean",
          },
        },
      }),
      function: (regexString: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "u");
          return new iBoolean(regex.test(fullString.valueOf()));
        };
      },
    });
  }
}
