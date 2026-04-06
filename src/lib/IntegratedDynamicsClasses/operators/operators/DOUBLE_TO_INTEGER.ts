import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_DOUBLE_TO_INTEGER extends BaseOperator<Double, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer" as const;
  static override numericID = 84;
  static override nicknames = [
    "doubleDoubleToInteger",
    "doubleToInt",
    "doubleInteger",
    "cast_integer",
    "numberCast_integer",
  ];
  static override symbol = "()";
  static override interactName = "doubleDoubleToInteger";
  static override operatorName = "cast_integer" as const;
  static override displayName = "Cast Number to Integer" as const;
  static override fullDisplayName = "Number Cast Number to Integer" as const;
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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (double: Double): Integer => {
        return double.toInteger();
      },
    });
  }
}
