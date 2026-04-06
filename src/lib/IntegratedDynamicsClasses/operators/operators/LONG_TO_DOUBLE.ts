import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_LONG_TO_DOUBLE extends BaseOperator<Long, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double" as const;
  static override numericID = 88;
  static override nicknames = [
    "longToDouble",
    "longDouble",
    "longLongToDouble",
    "cast_double",
    "numberCast_double",
  ];
  static override symbol = "()";
  static override interactName = "longLongToDouble";
  static override operatorName = "cast_double" as const;
  static override displayName = "Cast Number to Double" as const;
  static override fullDisplayName = "Number Cast Number to Double" as const;
  static override kind = "number" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "Double",
          },
        },
        normalizeSignature
      ),
      function: (long: Long): Double => {
        return long.toDouble();
      },
    });
  }
}
