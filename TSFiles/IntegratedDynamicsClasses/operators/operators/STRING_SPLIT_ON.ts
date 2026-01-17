import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "../Operator";

export class OPERATOR_STRING_SPLIT_ON extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:string_split_on",
      nicknames: ["stringSplitOn"],
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
      symbol: "split_on",
      interactName: "stringSplitOn",
      function: (delimiter: iString): TypeLambda<iString, iArray<iString>> => {
        return (fullString: iString): iArray<iString> => {
          return new iArrayEager(
            fullString
              .valueOf()
              .split(delimiter.valueOf())
              .map((s) => new iString(s))
          );
        };
      },
    });
  }
}
