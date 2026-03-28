import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_DOUBLE_SQRT extends BaseOperator<Double, Double> {
  static override internalName = "integrateddynamics:double_sqrt" as const;
  static override numericID = 295;
  static override nicknames = ["doubleSqrt", "sqrt"];
  static override symbol = "sqrt";
  static override interactName = "doubleSqrt";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Double",
          },
        },
        normalizeSignature
      ),
      function: (double: Double): Double => {
        return double.sqrt();
      },
    });
  }
}
