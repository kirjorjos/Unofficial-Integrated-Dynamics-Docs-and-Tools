import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_TO_LONG extends BaseOperator<Double, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long" as const;
  static override nicknames = ["doubleDoubleToLong", "doubleToLong"];
  static override symbol = "()";
  static override interactName = "doubleDoubleToLong";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Long",
          },
        },
        normalizeSignature
      ),
      function: (double: Double): Long => {
        return double.toLong();
      },
    });
  }
}
