import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_INTEGER_TO_LONG extends BaseOperator<Integer, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long" as const;
  static override numericID = 87;
  static override nicknames = [
    "intToLong",
    "integerLong",
    "integerIntegerToLong",
  ];
  static override symbol = "()";
  static override interactName = "integerIntegerToLong";
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
