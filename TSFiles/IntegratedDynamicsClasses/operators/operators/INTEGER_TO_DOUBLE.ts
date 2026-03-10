import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INTEGER_TO_DOUBLE extends BaseOperator<Integer, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double" as const;
  static override nicknames = [
    "intToDouble",
    "integerToDouble",
    "integerIntegerToDouble",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToDouble";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Double",
        },
      }),
      function: (int: Integer): Double => {
        return int.toDouble();
      },
    });
  }
}
