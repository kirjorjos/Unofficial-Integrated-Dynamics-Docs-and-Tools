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
  constructor() {
    super({
      nicknames: ["matchesRegex"],
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
      symbol: "matches_regex",
      interactName: "stringMatchesRegex",
      function: (regexString: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          const regex = regexString.valueOf();
          const re2 = new RE2(sanitizeForRe2(`^(?:${regex})$`),  "u");
          return new iBoolean(re2.test(fullString.valueOf()));
        };
      },
    });
  }
}
