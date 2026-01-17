import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";

export class OPERATOR_STRING_REGEX_SCAN extends BaseOperator<
  iString,
  Operator<Integer, Operator<iString, iArray<iString>>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_regex_scan",
      nicknames: ["stringRegexScan"],
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
        globalMap
      ),
      symbol: "regex_scan",
      interactName: "stringRegexScan",
      function: (regexString: iString) => {
        return (groupIndex: Integer): TypeLambda<iString, iArray<iString>> => {
          return (fullString: iString): iArray<iString> => {
            const regex = new RE2(regexString.valueOf(), "gu");
            let results = [];
            let match;
            regex.lastIndex = 0;

            while ((match = regex.exec(fullString.valueOf())) !== null) {
              const groupValue = match[groupIndex.toJSNumber()];
              if (groupValue !== undefined && groupValue !== null) {
                results.push(new iString(groupValue));
              }
            }

            return new iArrayEager(results);
          };
        };
      },
    });
  }
}
