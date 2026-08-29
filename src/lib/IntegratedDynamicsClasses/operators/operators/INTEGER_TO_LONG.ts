import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_INTEGER_TO_LONG extends BaseOperator<Integer, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long" as const;
  static override numericID = 87;
  static override nicknames = [
    "integerIntegerToLong",
    "integerLong",
    "intToLong",
    "integerToLong",
    "int_to_long",
    "integer_integer_to_long",
    "integer_long",
    "integer_to_long",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToLong";
  static override operatorName = "cast_long" as const;
  static override displayName = "Cast Number to Long" as const;
  static override fullDisplayName = "Number Cast Number to Long" as const;
  static override stringDisplayNames = [
    "number cast integer to long",
    "number cast integer to Long",
    "number cast integer To long",
    "number cast integer To Long",
    "number cast Integer to long",
    "number cast Integer to Long",
    "number cast Integer To long",
    "number cast Integer To Long",
    "number Cast integer to long",
    "number Cast integer to Long",
    "number Cast integer To long",
    "number Cast integer To Long",
    "number Cast Integer to long",
    "number Cast Integer to Long",
    "number Cast Integer To long",
    "number Cast Integer To Long",
    "Number cast integer to long",
    "Number cast integer to Long",
    "Number cast integer To long",
    "Number cast integer To Long",
    "Number cast Integer to long",
    "Number cast Integer to Long",
    "Number cast Integer To long",
    "Number cast Integer To Long",
    "Number Cast integer to long",
    "Number Cast integer to Long",
    "Number Cast integer To long",
    "Number Cast integer To Long",
    "Number Cast Integer to long",
    "Number Cast Integer to Long",
    "Number Cast Integer To long",
    "Number Cast Integer To Long",
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
