import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";
import { Double } from "lib/JavaNumberClasses/Double";

export class OPERATOR_LONG_TO_DOUBLE extends BaseOperator<Long, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double" as const;
  static override numericID = 88;
  static override nicknames = [
    "longDouble",
    "longLongToDouble",
    "longToDouble",
    "long_double",
    "long_long_to_double",
    "long_to_double",
  ];
  static override symbol = "()";
  static override interactName = "longLongToDouble";
  static override operatorName = "cast_double" as const;
  static override displayName = "Cast Number to Double" as const;
  static override fullDisplayName = "Number Cast Number to Double" as const;
  static override stringDisplayNames = [
    "number cast long to double",
    "number cast long to Double",
    "number cast long To double",
    "number cast long To Double",
    "number cast Long to double",
    "number cast Long to Double",
    "number cast Long To double",
    "number cast Long To Double",
    "number Cast long to double",
    "number Cast long to Double",
    "number Cast long To double",
    "number Cast long To Double",
    "number Cast Long to double",
    "number Cast Long to Double",
    "number Cast Long To double",
    "number Cast Long To Double",
    "Number cast long to double",
    "Number cast long to Double",
    "Number cast long To double",
    "Number cast long To Double",
    "Number cast Long to double",
    "Number cast Long to Double",
    "Number cast Long To double",
    "Number cast Long To Double",
    "Number Cast long to double",
    "Number Cast long to Double",
    "Number Cast long To double",
    "Number Cast long To Double",
    "Number Cast Long to double",
    "Number Cast Long to Double",
    "Number Cast Long To double",
    "Number Cast Long To Double",
  ];
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
