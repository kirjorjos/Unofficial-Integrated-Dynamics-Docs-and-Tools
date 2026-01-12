import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_STRING_CONCAT extends BaseOperator<
  iString,
  Operator<iString, iString>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_concat",
      nicknames: ["stringConcat"],
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
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "+",
      interactName: "stringConcat",
      function: (str1: iString): TypeLambda<iString, iString> => {
        return (str2: iString): iString => {
          return new iString(str1.valueOf().concat(str2.valueOf()));
        };
      },
    });
  }
}
