import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_SPLIT_ON_REGEX extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  static override internalName =
    "integrateddynamics:string_split_on_regex" as const;
  static override numericID = 161;
  static override nicknames = [
    "splitOnRegex",
    "stringSplitOnRegex",
    "split_on_regex",
    "string_split_on_regex",
  ];
  static override symbol = "split_on_regex";
  static override interactName = "stringSplitOnRegex";
  static override operatorName = "split_on_regex" as const;
  static override displayName = "Split On Regex" as const;
  static override fullDisplayName = "String Split On Regex" as const;
  static override tooltipInfo =
    "Get a list containing pieces, split on the given regular expression, of the given string." as const;

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
          let parts = regex.split(fullString.valueOf()) as string[];

          while (parts.length && parts[parts.length - 1] === "") {
            parts.pop();
          }

          return new iArrayEager(parts.map((s) => new iString(s)));
        };
      },
    });
  }
}
