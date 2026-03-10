import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ARITHMETIC_INCREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  static override internalName =
    "integrateddynamics:arithmetic_increment" as const;
  constructor() {
    super({
      nicknames: ["increment", "arithmeticIncrement", "numberIncrement"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Number",
        },
      }),
      symbol: "++",
      interactName: "numberIncrement",
      function: (num1: TypeNumber): TypeNumber => {
        return num1.add(Integer.ONE);
      },
    });
  }
}
