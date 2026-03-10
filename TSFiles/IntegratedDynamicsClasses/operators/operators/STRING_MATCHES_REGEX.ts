import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_MATCHES_REGEX extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_matches_regex" as const;
  static override nicknames = ["stringMatchesRegex", "matchesRegex"];
  static override symbol = "matches_regex";
  static override interactName = "stringMatchesRegex";
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
          const regex = regexString.valueOf();
          const re2 = new RE2(sanitizeForRe2(`^(?:${regex})$`), "u");
          return new iBoolean(re2.test(fullString.valueOf()));
        };
      },
    });
  }
}
