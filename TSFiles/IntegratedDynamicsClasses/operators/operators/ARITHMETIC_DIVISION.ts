import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ARITHMETIC_DIVISION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_division" as const;
  static override nicknames = ["divide", "arithmeticDivision", "numberDivide"];
  static override symbol = "/";
  static override interactName = "numberDivide";
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
          if (num2.toJSNumber() === 0) {
            throw new Error("Division by zero");
          }
          if (num1.getOrder() < num2.getOrder()) {
            num1 = num1[`to${num2.getType()}`]();
          }
          return num1.divide(num2);
        };
      },
    });
  }
}
