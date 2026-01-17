import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_CEIL extends BaseOperator<TypeNumber, Integer> {
  constructor() {
    super({
      internalName: "integrateddynamics:number_ceil",
      nicknames: ["ceil", "numberCeil"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "⌈ ⌉",
      interactName: "numberCeil",
      function: (number: TypeNumber): Integer => {
        return number.ceil();
      },
    });
  }
}
