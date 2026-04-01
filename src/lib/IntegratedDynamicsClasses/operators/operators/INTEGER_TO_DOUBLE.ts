import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INTEGER_TO_DOUBLE extends BaseOperator<Integer, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double" as const;
  static override numericID = 85;
  static override nicknames = [
    "intToDouble",
    "integerToDouble",
    "integerIntegerToDouble",
    "cast_double",
    "numberCast_double",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToDouble";
  static override operatorName = "cast_double" as const;
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
