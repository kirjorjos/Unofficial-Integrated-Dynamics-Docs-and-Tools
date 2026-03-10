import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_CEIL extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_ceil" as const;
  static override nicknames = ["ceil", "numberCeil"];
  static override symbol = "⌈ ⌉";
  static override interactName = "numberCeil";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (number: TypeNumber): Integer => {
        return number.ceil();
      },
    });
  }
}
