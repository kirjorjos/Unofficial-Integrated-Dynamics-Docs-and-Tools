import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { RE2, RE2ExecArray } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_SCAN extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iArray<iString>>>
> {
  static override internalName =
    "integrateddynamics:string_regex_scan" as const;
  static override nicknames = ["stringRegexScan"];
  static override symbol = "regex_scan";
  static override interactName = "stringRegexScan";
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
