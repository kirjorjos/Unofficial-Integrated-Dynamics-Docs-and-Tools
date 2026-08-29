import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INTEGER_TO_DOUBLE extends BaseOperator<Integer, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double" as const;
  static override numericID = 85;
  static override nicknames = [
    "integerIntegerToDouble",
    "integerToDouble",
    "intToDouble",
    "int_to_double",
    "integer_integer_to_double",
    "integer_to_double",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToDouble";
  static override operatorName = "cast_double" as const;
  static override displayName = "Cast Number to Double" as const;
  static override fullDisplayName = "Number Cast Number to Double" as const;
  static override stringDisplayNames = [
    "number cast integer to double",
    "number cast integer to Double",
    "number cast integer To double",
    "number cast integer To Double",
    "number cast Integer to double",
    "number cast Integer to Double",
    "number cast Integer To double",
    "number cast Integer To Double",
    "number Cast integer to double",
    "number Cast integer to Double",
    "number Cast integer To double",
    "number Cast integer To Double",
    "number Cast Integer to double",
    "number Cast Integer to Double",
    "number Cast Integer To double",
    "number Cast Integer To Double",
    "Number cast integer to double",
    "Number cast integer to Double",
    "Number cast integer To double",
    "Number cast integer To Double",
    "Number cast Integer to double",
    "Number cast Integer to Double",
    "Number cast Integer To double",
    "Number cast Integer To Double",
    "Number Cast integer to double",
    "Number Cast integer to Double",
    "Number Cast integer To double",
    "Number Cast integer To Double",
    "Number Cast Integer to double",
    "Number Cast Integer to Double",
    "Number Cast Integer To double",
    "Number Cast Integer To Double",
  ];
  static override kind = "number" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Double",
          },
        },
        normalizeSignature
      ),
      function: (int: Integer): Double => {
        return int.toDouble();
      },
    });
  }
}
