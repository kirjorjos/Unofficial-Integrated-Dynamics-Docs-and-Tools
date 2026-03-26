import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_STRING_SUBSTRING extends BaseOperator<
  Integer,
  Operator<Integer, Operator<iString, iString>>
> {
  static override internalName = "integrateddynamics:string_substring" as const;
  static override numericID = 163;
  static override nicknames = [
    "integerSubstring",
    "substring",
    "stringSubstring",
  ];
  static override symbol = "substring";
  static override interactName = "integerSubstring";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
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
              to: {
                type: "String",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        start: Integer
      ): TypeLambda<Integer, TypeLambda<iString, iString>> => {
        return (end: Integer): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            let endNum = end.toJSNumber() as number | undefined;
            if (isNaN(endNum!)) endNum = undefined;
            return new iString(
              fullString.valueOf().substring(start.toJSNumber(), endNum)
            );
          };
        };
      },
    });
  }
}
