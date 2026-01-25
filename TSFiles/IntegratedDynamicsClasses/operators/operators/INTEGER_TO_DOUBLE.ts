import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INTEGER_TO_DOUBLE extends BaseOperator<Integer, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double" as const;
  constructor() {
    super({
      nicknames: ["intToDouble", "integerToDouble", "integerIntegerToDouble"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Double",
        },
      }),
      symbol: "()",
      interactName: "integerIntegerToDouble",
      function: (int: Integer): Double => {
        return int.toDouble();
      },
    });
  }
}
