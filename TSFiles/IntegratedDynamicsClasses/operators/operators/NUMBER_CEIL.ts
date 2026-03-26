import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_CEIL extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_ceil" as const;
  static override numericID = 204;
  static override nicknames = ["ceil", "numberCeil"];
  static override symbol = "⌈ ⌉";
  static override interactName = "numberCeil";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (number: TypeNumber): Integer => {
        return number.ceil();
      },
    });
  }
}
