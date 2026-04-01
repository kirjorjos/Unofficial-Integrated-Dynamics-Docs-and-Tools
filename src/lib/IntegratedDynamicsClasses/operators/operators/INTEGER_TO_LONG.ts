import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_INTEGER_TO_LONG extends BaseOperator<Integer, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long" as const;
  static override numericID = 87;
  static override nicknames = [
    "intToLong",
    "integerLong",
    "integerIntegerToLong",
    "cast_long",
    "numberCast_long",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToLong";
  static override operatorName = "cast_long" as const;
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
            type: "Long",
          },
        },
        normalizeSignature
      ),
      function: (int: Integer): Long => {
        return int.toLong();
      },
    });
  }
}
