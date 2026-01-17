import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MULTIPLICATION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  constructor() {
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          const [lowerOrder, higherOrder] =
            num1.getOrder() < num2.getOrder() ? [num1, num2] : [num2, num1];
          return higherOrder.multiply(lowerOrder);
        };
      },
    });
  }
}
