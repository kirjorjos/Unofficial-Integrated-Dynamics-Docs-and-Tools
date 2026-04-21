import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_DOUBLE_SQRT extends BaseOperator<Double, Double> {
  static override internalName = "integrateddynamics:double_sqrt" as const;
  static override numericID = 295;
  static override nicknames = ["doubleSqrt", "sqrt", "double_sqrt"];
  static override symbol = "sqrt";
  static override interactName = "doubleSqrt";
  static override operatorName = "sqrt" as const;
  static override displayName = "Square Root" as const;
  static override fullDisplayName = "Double Square Root" as const;
  static override kind = "double" as const;
  static override renderPattern = "PREFIX_1" as const;
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
