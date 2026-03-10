import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_DOUBLE_TO_INTEGER extends BaseOperator<Double, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer" as const;
  static override nicknames = [
    "doubleDoubleToInteger",
    "doubleToInt",
    "doubleInteger",
  ];
  static override symbol = "()";
  static override interactName = "doubleDoubleToInteger";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (double: Double): Integer => {
        return double.toInteger();
      },
    });
  }
}
