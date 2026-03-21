import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_ARITHMETIC_DECREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  static override internalName =
    "integrateddynamics:arithmetic_decrement" as const;
  static override nicknames = [
    "decrement",
    "arithmeticDecrement",
    "numberDecrement",
  ];
  static override symbol = "--";
  static override interactName = "numberDecrement";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Number",
          },
        },
        normalizeSignature
      ),
      function: (num1: TypeNumber): TypeNumber => {
        return num1.subtract(Integer.ONE);
      },
    });
  }
}
