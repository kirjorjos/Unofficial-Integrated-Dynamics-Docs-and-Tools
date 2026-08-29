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
  static override stringDisplayNames = [
    "split on regex",
    "split on Regex",
    "split On regex",
    "split On Regex",
    "Split on regex",
    "Split on Regex",
    "Split On regex",
    "Split On Regex",
    "string split on regex",
    "string split on Regex",
    "string split On regex",
    "string split On Regex",
    "string Split on regex",
    "string Split on Regex",
    "string Split On regex",
    "string Split On Regex",
    "String split on regex",
    "String split on Regex",
    "String split On regex",
    "String split On Regex",
    "String Split on regex",
    "String Split on Regex",
    "String Split On regex",
    "String Split On Regex",
  ];
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
