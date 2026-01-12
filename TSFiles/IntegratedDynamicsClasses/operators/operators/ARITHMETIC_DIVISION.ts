import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ARITHMETIC_DIVISION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_division",
      nicknames: ["divide", "arithmeticDivision", "/", "numberDivide"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "/",
      interactName: "numberDivide",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return num1.divide(num2);
        };
      },
    });
  }
}
