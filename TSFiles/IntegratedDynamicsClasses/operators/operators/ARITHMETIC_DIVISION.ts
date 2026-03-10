import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ARITHMETIC_DIVISION extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, TypeNumber>
> {
  static override internalName =
    "integrateddynamics:arithmetic_division" as const;
  constructor() {
    super({
      nicknames: ["divide", "arithmeticDivision", "numberDivide"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "/",
      interactName: "numberDivide",
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
