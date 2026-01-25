import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_STRING_REPLACE extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  static override internalName = "integrateddynamics:string_replace" as const;
  constructor() {
    super({
      nicknames: ["stringReplace"],
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
      }),
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
