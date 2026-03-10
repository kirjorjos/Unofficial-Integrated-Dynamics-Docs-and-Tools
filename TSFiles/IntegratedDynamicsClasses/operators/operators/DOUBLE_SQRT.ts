import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_SQRT extends BaseOperator<Double, Double> {
  static override internalName = "integrateddynamics:double_sqrt" as const;
  static override nicknames = ["doubleSqrt", "sqrt"];
  static override symbol = "sqrt";
  static override interactName = "doubleSqrt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Double",
        },
      }),
      function: (double: Double): Double => {
        return double.sqrt();
      },
    });
  }
}
