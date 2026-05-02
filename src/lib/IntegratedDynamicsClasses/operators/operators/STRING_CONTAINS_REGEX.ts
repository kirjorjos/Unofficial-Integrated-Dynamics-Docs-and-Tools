import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_CONTAINS_REGEX extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_contains_regex" as const;
  static override numericID = 157;
  static override nicknames = [
    "containsRegex",
    "stringContainsRegex",
    "contains_regex",
    "string_contains_regex",
    "stringContains_regex",
  ];
  static override symbol = "contains_regex";
  static override interactName = "stringContainsRegex";
  static override operatorName = "contains_regex" as const;
  static override displayName = "Contains Regex" as const;
  static override fullDisplayName = "String Contains Regex" as const;
  static override tooltipInfo =
    "If the regular expression given matches any substring of the given string." as const;

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
          const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "u");
          return new iBoolean(regex.test(fullString.valueOf()));
        };
      },
    });
  }
}
