import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";

export class OPERATOR_STRING_REGEX_GROUPS extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_regex_groups",
      nicknames: ["stringRegexGroups", "stringRegexGroups"],
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
        globalMap
      ),
      symbol: "regex_groups",
      interactName: "stringRegexGroups",
      function: (
        regexString: iString
      ): TypeLambda<iString, iArray<iString>> => {
        return (fullString: iString): iArray<iString> => {
          const regex = new RE2(regexString.valueOf(), "u");
          const match = regex.exec(fullString.valueOf());
          if (match) {
            return new iArrayEager(match.map((m) => new iString(m ?? '')));
          } else {
            throw new Error(
              `No match found for group in regex "${regexString.valueOf()}" on string "${fullString.valueOf()}"`
            );
          }
        };
      },
    });
  }
}
