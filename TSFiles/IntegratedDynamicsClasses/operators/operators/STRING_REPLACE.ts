import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_STRING_REPLACE extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_replace",
      nicknames: ["stringReplace"],
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
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "replace",
      interactName: "stringReplace",
      function: (
        searchString: iString
      ): TypeLambda<iString, TypeLambda<iString, iString>> => {
        return (replacementString: iString): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            return new iString(
              fullString
                .valueOf()
                .replace(searchString.valueOf(), replacementString.valueOf())
            );
          };
        };
      },
    });
  }
}
