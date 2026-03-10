import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_STRING_REPLACE extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  static override internalName = "integrateddynamics:string_replace" as const;
  static override nicknames = ["stringReplace"];
  static override symbol = "replace";
  static override interactName = "stringReplace";
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
      function: (
        searchString: iString
      ): TypeLambda<iString, TypeLambda<iString, iString>> => {
        return (replacementString: iString): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            return new iString(
              fullString
                .valueOf()
                .replaceAll(searchString.valueOf(), replacementString.valueOf())
            );
          };
        };
      },
    });
  }
}
