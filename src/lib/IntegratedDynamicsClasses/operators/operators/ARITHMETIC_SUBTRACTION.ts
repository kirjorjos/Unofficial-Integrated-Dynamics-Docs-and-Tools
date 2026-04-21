import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_ARITHMETIC_SUBTRACTION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_subtraction" as const;
  static override numericID = 5;
  static override nicknames = [
    "arithmeticSubtraction",
    "numberSubtract",
    "subtract",
    "subtraction",
    "arithmetic_subtraction",
    "number_subtract",
  ];
  static override symbol = "-";
  static override interactName = "numberSubtract";
  static override operatorName = "subtraction" as const;
  static override displayName = "Subtraction" as const;
  static override fullDisplayName = "Arithmetic Subtraction" as const;
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
          if (num1.getOrder() < num2.getOrder()) {
            num1 = num1[`to${num2.getType()}`]();
          }
          return num1.subtract(num2);
        };
      },
    });
  }
}
