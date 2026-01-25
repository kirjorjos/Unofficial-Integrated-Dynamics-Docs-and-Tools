import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_ARITHMETIC_DECREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  static override internalName =
    "integrateddynamics:arithmetic_decrement" as const;
  constructor() {
    super({
      nicknames: ["arithmeticDecrement", "decrement", "--", "numberDecrement"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Number",
        },
      }),
      symbol: "--",
      interactName: "numberDecrement",
      function: (num1: TypeNumber): TypeNumber => {
        return num1.subtract(Integer.ONE);
      },
    });
  }
}
