import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_ROUND extends BaseOperator<TypeNumber, Integer> {
  static override internalName = "integrateddynamics:number_round" as const;
  constructor() {
    super({
      nicknames: ["round", "numberRound"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "|| ||",
      interactName: "numberRound",
      function: (number: TypeNumber): Integer => {
        return number.round();
      },
    });
  }
}
