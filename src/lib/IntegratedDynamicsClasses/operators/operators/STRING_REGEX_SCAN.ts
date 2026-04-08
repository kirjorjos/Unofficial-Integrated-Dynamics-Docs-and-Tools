import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { RE2, RE2ExecArray } from "re2-wasm";
import { sanitizeForRe2 } from "lib/HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_SCAN extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iArray<iString>>>
> {
  static override internalName =
    "integrateddynamics:string_regex_scan" as const;
  static override numericID = 167;
  static override nicknames = [
    "stringRegexScan",
    "regex_scan",
    "stringRegex_scan",
  ];
  static override symbol = "regex_scan";
  static override interactName = "stringRegexScan";
  static override operatorName = "regex_scan" as const;
  static override displayName = "Regex Scan" as const;
  static override fullDisplayName = "String Regex Scan" as const;
  static override tooltipInfo =
    "Search for all matches of the given regular expression and return the group at the given index, in the given string." as const;

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
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
        },
        normalizeSignature
      ),
      function: (regexString: iString) => {
        return (groupIndex: Integer): TypeLambda<iString, iArray<iString>> => {
          return (fullString: iString): iArray<iString> => {
            const regex = new RE2(sanitizeForRe2(regexString.valueOf()), "gu");
            let results = [];
            let match: RE2ExecArray | null = null;
            regex.lastIndex = 0;

            while (true) {
              match = regex.exec(fullString.valueOf());
              if (match === null) break;

              const groupValue = match[groupIndex.toJSNumber()];
              if (groupValue != null) {
                results.push(new iString(groupValue));
              }

              if (match[0]?.length === 0) {
                regex.lastIndex++;
              }
            }

            return new iArrayEager(results);
          };
        };
      },
    });
  }
}
