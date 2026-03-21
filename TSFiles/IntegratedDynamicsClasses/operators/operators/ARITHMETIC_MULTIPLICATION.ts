import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_MULTIPLICATION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_multiplication" as const;
  static override nicknames = [
    "multiply",
    "arithmeticMultiplication",
    "numberMultiply",
  ];
  static override symbol = "*";
  static override interactName = "numberMultiply";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
