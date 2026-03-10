import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_SPLIT_ON_REGEX extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  static override internalName =
    "integrateddynamics:string_split_on_regex" as const;
  static override nicknames = ["stringSplitOnRegex"];
  static override symbol = "split_on_regex";
  static override interactName = "stringSplitOnRegex";
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
          to: { type: "List", listType: { type: "String" } },
        },
      }),
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
