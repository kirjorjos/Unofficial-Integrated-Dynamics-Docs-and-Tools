import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { JavaMath } from "HelperClasses/Math";

export class OPERATOR_ARITHMETIC_DECREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_decrement",
      nicknames: ["arithmeticDecrement", "decrement", "--", "numberDecrement"],
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
        globalMap
      ),
      symbol: "--",
      interactName: "numberDecrement",
      function: (num1: TypeNumber): TypeNumber => {
        return JavaMath.subtract(num1, new Integer(1));
      },
    });
  }
}
