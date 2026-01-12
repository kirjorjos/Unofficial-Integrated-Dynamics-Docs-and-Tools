import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ARITHMETIC_INCREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:arithmetic_increment",
      nicknames: ["increment", "arithmeticIncrement", "++", "numberIncrement"],
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
      symbol: "++",
      interactName: "numberIncrement",
      function: (num1: TypeNumber): TypeNumber => {
        return num1.add(Integer.ONE);
      },
    });
  }
}
