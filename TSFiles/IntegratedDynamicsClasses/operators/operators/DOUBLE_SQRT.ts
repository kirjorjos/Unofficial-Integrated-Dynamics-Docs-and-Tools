import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_SQRT extends BaseOperator<Double, Double> {
  static override internalName = "integrateddynamics:double_sqrt" as const;
  constructor() {
    super({
      nicknames: ["doubleSqrt", "sqrt"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Double",
        },
      }),
      symbol: "sqrt",
      interactName: "doubleSqrt",
      function: (double: Double): Double => {
        return double.sqrt();
      },
    });
  }
}
