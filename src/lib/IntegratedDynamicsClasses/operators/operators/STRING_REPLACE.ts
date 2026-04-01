import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_REPLACE extends BaseOperator<
  iString,
  Operator<iString, Operator<iString, iString>>
> {
  static override internalName = "integrateddynamics:string_replace" as const;
  static override numericID = 168;
  static override nicknames = ["stringReplace", "replace"];
  static override symbol = "replace";
  static override interactName = "stringReplace";
  static override operatorName = "replace" as const;
  static override kind = "string" as const;
  static override renderPattern = "PREFIX_3_LONG" as const;
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
        normalizeSignature
      ),
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
