import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_GROUPS extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  static override internalName =
    "integrateddynamics:string_regex_groups" as const;
  static override numericID = 166;
  static override nicknames = [
    "regexGroups",
    "stringRegexGroups",
    "regex_groups",
    "string_regex_groups",
    "stringRegex_groups",
  ];
  static override symbol = "regex_groups";
  static override interactName = "stringRegexGroups";
  static override operatorName = "regex_groups" as const;
  static override displayName = "Regex Groups" as const;
  static override fullDisplayName = "String Regex Groups" as const;
  static override tooltipInfo =
    "Search for the given regular expression and return in that match a list of all its groups, in the given string." as const;

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
            to: { type: "List", listType: { type: "String" } },
          },
        },
        normalizeSignature
      ),
      function: (
        regexString: iString
      ): TypeLambda<iString, iArray<iString>> => {
        return (fullString: iString): iArray<iString> => {
          const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "u");
          const match = regex.exec(fullString.valueOf());
          if (match) {
            return new iArrayEager(match.map((m) => new iString(m ?? "u")));
          } else {
            return new iArrayEager([]);
          }
        };
      },
    });
  }
}
