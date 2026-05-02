import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_CEIL extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_ceil" as const;
  static override numericID = 204;
  static override nicknames = [
    "ceil",
    "numberCeil",
    "number_ceil",
    "ceiling",
    "⌈⌉",
  ];
  static override symbol = "⌈ ⌉";
  static override interactName = "numberCeil";
  static override operatorName = "ceil" as const;
  static override displayName = "Ceil" as const;
  static override fullDisplayName = "Number Ceil" as const;
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
        return number.ceil();
      },
    });
  }
}
