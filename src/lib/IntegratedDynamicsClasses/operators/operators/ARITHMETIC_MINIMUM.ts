import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_ARITHMETIC_MINIMUM extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_minimum" as const;
  static override numericID = 3;
  static override nicknames = [
    "arithmeticMinimum",
    "min",
    "minimum",
    "numberMin",
    "arithmetic_minimum",
    "number_min",
  ];
  static override symbol = "min";
  static override interactName = "numberMin";
  static override operatorName = "minimum" as const;
  static override displayName = "Minimum" as const;
  static override fullDisplayName = "Arithmetic Minimum" as const;
  static override tooltipInfo = "Takes the smallest of two values." as const;

  static override kind = "arithmetic" as const;
  static override renderPattern = "PREFIX_2" as const;
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
          return higherOrder.min(lowerOrder);
        };
      },
    });
  }
}
