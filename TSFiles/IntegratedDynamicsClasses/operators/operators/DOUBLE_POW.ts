import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_DOUBLE_POW extends BaseOperator<
  Double,
  Operator<Double, Double>
> {
  static override internalName = "integrateddynamics:double_pow" as const;
  constructor() {
    super({
      nicknames: ["doublePow", "pow"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Double",
          },
        },
      }),
      symbol: "pow",
      interactName: "doublePow",
      function: (base: Double): TypeLambda<Double, Double> => {
        return (exponent: Double): Double => {
          return base.pow(exponent);
        };
      },
    });
  }
}
