import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_ROUND extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_round" as const;
  static override nicknames = ["round", "numberRound"];
  static override symbol = "|| ||";
  static override interactName = "numberRound";
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
        return number.round();
      },
    });
  }
}
