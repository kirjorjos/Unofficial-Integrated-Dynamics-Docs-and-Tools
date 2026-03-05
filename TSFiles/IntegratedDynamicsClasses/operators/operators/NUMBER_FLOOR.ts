import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_FLOOR extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_floor" as const;
  constructor() {
    super({
      nicknames: ["floor", "numberFloor"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "⌊ ⌋",
      interactName: "numberFloor",
      function: (number: TypeNumber): Integer => {
        return number.floor();
      },
    });
  }
}
