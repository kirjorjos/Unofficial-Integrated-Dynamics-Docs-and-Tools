import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_TO_LONG extends BaseOperator<Double, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long" as const;
  constructor() {
    super({
      nicknames: ["doubleToLong"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Long",
        },
      }),
      symbol: "()",
      interactName: "doubleDoubleToLong",
      function: (double: Double): Long => {
        return double.toLong();
      },
    });
  }
}
