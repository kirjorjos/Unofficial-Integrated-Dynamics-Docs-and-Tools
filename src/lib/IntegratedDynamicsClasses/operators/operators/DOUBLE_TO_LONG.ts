import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_DOUBLE_TO_LONG extends BaseOperator<Double, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long" as const;
  static override numericID = 86;
  static override nicknames = [
    "doubleDoubleToLong",
    "doubleToLong",
    "double_double_to_long",
    "double_to_long",
  ];
  static override symbol = "()";
  static override interactName = "doubleDoubleToLong";
  static override operatorName = "cast_long" as const;
  static override displayName = "Cast Number to Long" as const;
  static override fullDisplayName = "Number Cast Number to Long" as const;
  static override kind = "number" as const;
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
