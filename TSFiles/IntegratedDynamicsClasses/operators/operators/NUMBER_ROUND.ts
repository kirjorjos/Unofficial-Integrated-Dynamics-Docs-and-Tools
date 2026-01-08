import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NUMBER_ROUND extends BaseOperator<TypeNumber, Integer> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:number_round",
      nicknames: ["round", "numberRound"],
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
        globalMap
      ),
      symbol: "|| ||",
      interactName: "numberRound",
      function: (number: TypeNumber): Integer => {
        return number.round();
      },
    });
  }
}
