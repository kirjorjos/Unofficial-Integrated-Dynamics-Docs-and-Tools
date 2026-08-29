import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_DOUBLE_TO_INTEGER extends BaseOperator<Double, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer" as const;
  static override numericID = 84;
  static override nicknames = [
    "doubleDoubleToInteger",
    "doubleInteger",
    "doubleToInt",
    "doubleToInteger",
    "double_double_to_integer",
    "double_integer",
    "double_to_int",
    "double_to_integer",
  ];
  static override symbol = "()";
  static override interactName = "doubleDoubleToInteger";
  static override operatorName = "cast_integer" as const;
  static override displayName = "Cast Number to Integer" as const;
  static override fullDisplayName = "Number Cast Number to Integer" as const;
  static override stringDisplayNames = [
    "number cast double to integer",
    "number cast double to Integer",
    "number cast double To integer",
    "number cast double To Integer",
    "number cast Double to integer",
    "number cast Double to Integer",
    "number cast Double To integer",
    "number cast Double To Integer",
    "number Cast double to integer",
    "number Cast double to Integer",
    "number Cast double To integer",
    "number Cast double To Integer",
    "number Cast Double to integer",
    "number Cast Double to Integer",
    "number Cast Double To integer",
    "number Cast Double To Integer",
    "Number cast double to integer",
    "Number cast double to Integer",
    "Number cast double To integer",
    "Number cast double To Integer",
    "Number cast Double to integer",
    "Number cast Double to Integer",
    "Number cast Double To integer",
    "Number cast Double To Integer",
    "Number Cast double to integer",
    "Number Cast double to Integer",
    "Number Cast double To integer",
    "Number Cast double To Integer",
    "Number Cast Double to integer",
    "Number Cast Double to Integer",
    "Number Cast Double To integer",
    "Number Cast Double To Integer",
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
