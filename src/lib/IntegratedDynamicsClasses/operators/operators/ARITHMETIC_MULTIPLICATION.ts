import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_ARITHMETIC_MULTIPLICATION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_multiplication" as const;
  static override numericID = 4;
  static override nicknames = [
    "multiply",
    "arithmeticMultiplication",
    "numberMultiply",
    "multiplication",
  ];
  static override symbol = "*";
  static override interactName = "numberMultiply";
  static override operatorName = "multiplication" as const;
  static override displayName = "Multiplication" as const;
  static override fullDisplayName = "Arithmetic Multiplication" as const;
  static override kind = "arithmetic" as const;
  static override renderPattern = "INFIX" as const;
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
