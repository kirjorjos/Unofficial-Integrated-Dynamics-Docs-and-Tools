import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_ROUND extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_round" as const;
  static override numericID = 206;
  static override nicknames = ["round", "numberRound"];
  static override symbol = "|| ||";
  static override interactName = "numberRound";
  static override operatorName = "round" as const;
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
        return number.round();
      },
    });
  }
}
