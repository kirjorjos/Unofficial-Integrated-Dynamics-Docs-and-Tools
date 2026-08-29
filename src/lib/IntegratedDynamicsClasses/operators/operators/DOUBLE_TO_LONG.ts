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
  static override stringDisplayNames = [
    "number cast double to long",
    "number cast double to Long",
    "number cast double To long",
    "number cast double To Long",
    "number cast Double to long",
    "number cast Double to Long",
    "number cast Double To long",
    "number cast Double To Long",
    "number Cast double to long",
    "number Cast double to Long",
    "number Cast double To long",
    "number Cast double To Long",
    "number Cast Double to long",
    "number Cast Double to Long",
    "number Cast Double To long",
    "number Cast Double To Long",
    "Number cast double to long",
    "Number cast double to Long",
    "Number cast double To long",
    "Number cast double To Long",
    "Number cast Double to long",
    "Number cast Double to Long",
    "Number cast Double To long",
    "Number cast Double To Long",
    "Number Cast double to long",
    "Number Cast double to Long",
    "Number Cast double To long",
    "Number Cast double To Long",
    "Number Cast Double to long",
    "Number Cast Double to Long",
    "Number Cast Double To long",
    "Number Cast Double To Long",
  ];
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
