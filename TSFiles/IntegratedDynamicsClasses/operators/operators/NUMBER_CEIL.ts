import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_CEIL extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_ceil" as const;
  constructor() {
    super({
      nicknames: ["ceil", "numberCeil"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "⌈ ⌉",
      interactName: "numberCeil",
      function: (number: TypeNumber): Integer => {
        return number.ceil();
      },
    });
  }
}
