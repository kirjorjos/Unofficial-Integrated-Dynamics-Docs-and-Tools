import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_ARITHMETIC_MAXIMUM extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_maximum" as const;
  static override numericID = 2;
  static override nicknames = [
    "arithmeticMaximum",
    "max",
    "maximum",
    "numberMax",
    "arithmetic_maximum",
    "number_max",
  ];
  static override symbol = "max";
  static override interactName = "numberMax";
  static override operatorName = "maximum" as const;
  static override displayName = "Maximum" as const;
  static override fullDisplayName = "Arithmetic Maximum" as const;
  static override tooltipInfo = "Takes the largest of two values." as const;

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
          return higherOrder.max(lowerOrder);
        };
      },
      flipTarget: "ARITHMETIC_MAXIMUM",
    });
  }
}
