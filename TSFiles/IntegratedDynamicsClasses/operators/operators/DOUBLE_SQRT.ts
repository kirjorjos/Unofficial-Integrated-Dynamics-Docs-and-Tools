import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_SQRT extends BaseOperator<Double, Double> {
  constructor() {
    super({
      internalName: "integrateddynamics:double_sqrt",
      nicknames: ["doubleSqrt", "sqrt"],
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
        globalMap
      ),
      symbol: "sqrt",
      interactName: "doubleSqrt",
      function: (double: Double): Double => {
        return double.sqrt();
      },
    });
  }
}
