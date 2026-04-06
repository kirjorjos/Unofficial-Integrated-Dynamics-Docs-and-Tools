import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_DOUBLE_POW extends BaseOperator<
  Double,
  Operator<Double, Double>
> {
  static override internalName = "integrateddynamics:double_pow" as const;
  static override numericID = 294;
  static override nicknames = ["doublePow", "pow"];
  static override symbol = "pow";
  static override interactName = "doublePow";
  static override operatorName = "pow" as const;
  static override displayName = "Power" as const;
  static override fullDisplayName = "Double Power" as const;
  static override kind = "double" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
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
        },
        normalizeSignature
      ),
      function: (base: Double): TypeLambda<Double, Double> => {
        return (exponent: Double): Double => {
          return base.pow(exponent);
        };
      },
    });
  }
}
