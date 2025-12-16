import { JavaMath } from "HelperClasses/Math";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MULTIPLICATION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_multiplication",
      nicknames: [
        "multiply",
        "arithmeticMultiplication",
        "*",
        "numberMultiply",
      ],
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
      symbol: "*",
      interactName: "numberMultiply",
      function: (
        num1: TypeNumber
      ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.multiply(num1, num2);
        };
      },
    });
  }
}
