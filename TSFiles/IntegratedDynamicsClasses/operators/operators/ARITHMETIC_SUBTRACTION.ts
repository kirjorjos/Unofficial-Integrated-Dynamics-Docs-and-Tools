import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_ARITHMETIC_SUBTRACTION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_subtraction" as const;
  static override numericID = 5;
  static override nicknames = [
    "subtract",
    "arithmeticSubtraction",
    "numberSubtract",
  ];
  static override symbol = "-";
  static override interactName = "numberSubtract";
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
