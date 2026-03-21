import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_FLOOR extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_floor" as const;
  static override nicknames = ["floor", "numberFloor"];
  static override symbol = "⌊ ⌋";
  static override interactName = "numberFloor";
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
        return number.floor();
      },
    });
  }
}
