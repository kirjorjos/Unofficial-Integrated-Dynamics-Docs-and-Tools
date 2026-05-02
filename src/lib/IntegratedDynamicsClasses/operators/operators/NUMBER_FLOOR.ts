import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_FLOOR extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_floor" as const;
  static override numericID = 205;
  static override nicknames = ["floor", "numberFloor", "number_floor", "⌊⌋"];
  static override symbol = "⌊ ⌋";
  static override interactName = "numberFloor";
  static override operatorName = "floor" as const;
  static override displayName = "Floor" as const;
  static override fullDisplayName = "Number Floor" as const;
  static override kind = "number" as const;
  static override renderPattern = "PREFIX_1" as const;
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
