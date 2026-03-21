import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ARITHMETIC_INCREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  static override internalName =
    "integrateddynamics:arithmetic_increment" as const;
  static override nicknames = [
    "increment",
    "arithmeticIncrement",
    "numberIncrement",
  ];
  static override symbol = "++";
  static override interactName = "numberIncrement";
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
        return num1.add(Integer.ONE);
      },
    });
  }
}
