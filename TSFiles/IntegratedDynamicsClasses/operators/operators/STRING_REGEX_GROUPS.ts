import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";
import { sanitizeForRe2 } from "HelperClasses/UtilityFunctions";

export class OPERATOR_STRING_REGEX_GROUPS extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  static override internalName =
    "integrateddynamics:string_regex_groups" as const;
  static override nicknames = ["stringRegexGroups"];
  static override symbol = "regex_groups";
  static override interactName = "stringRegexGroups";
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
