import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_DOUBLE_TO_INTEGER extends BaseOperator<Double, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer" as const;
  constructor() {
    super({
      nicknames: ["doubleToInt", "doubleInteger"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "()",
      interactName: "doubleDoubleToInteger",
      function: (double: Double): Integer => {
        return double.toInteger();
      },
    });
  }
}
