import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_STRING_SUBSTRING extends BaseOperator<
  Integer,
  Operator<Integer, Operator<iString, iString>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_substring",
      nicknames: ["substring", "stringSubstring"],
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
        globalMap
      ),
      symbol: "substring",
      interactName: "integerSubstring",
      function: (
        start: Integer
      ): TypeLambda<Integer, TypeLambda<iString, iString>> => {
        return (end: Integer): TypeLambda<iString, iString> => {
          return (fullString: iString): iString => {
            let endNum = parseInt(end.toDecimal()) as number | undefined;
            if (isNaN(endNum!)) endNum = undefined;
            return new iString(
              fullString
                .valueOf()
                .substring(parseInt(start.toDecimal()), endNum)
            );
          };
        };
      },
    });
  }
}
