import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_MATCHES_REGEX extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_matches_regex" as const;
  static override numericID = 172;
  static override nicknames = [
    "stringMatchesRegex",
    "matchesRegex",
    "matches_regex",
    "stringMatches_regex",
  ];
  static override symbol = "matches_regex";
  static override interactName = "stringMatchesRegex";
  static override operatorName = "matches_regex" as const;
  static override displayName = "Matches Regex" as const;
  static override fullDisplayName = "String Matches Regex" as const;
  static override tooltipInfo =
    "If the regular expression given matches the given string." as const;

  static override kind = "string" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
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
