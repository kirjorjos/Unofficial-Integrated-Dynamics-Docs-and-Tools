import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";
import { RE2 } from "re2-wasm";

export class OPERATOR_STRING_SPLIT_ON_REGEX extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_split_on_regex",
      nicknames: ["stringSplitOnRegex"],
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
      symbol: "split_on_regex",
      interactName: "stringSplitOnRegex",
      function: (
        regexString: iString
      ): TypeLambda<iString, iArray<iString>> => {
        return (fullString: iString): iArray<iString> => {
          const regex = new RE2(regexString.valueOf(), "u");
          return new iArrayEager(
            (regex.split(fullString.valueOf()) as string[]).map(
              (s) => new iString(s)
            )
          );
        };
      },
    });
  }
}
