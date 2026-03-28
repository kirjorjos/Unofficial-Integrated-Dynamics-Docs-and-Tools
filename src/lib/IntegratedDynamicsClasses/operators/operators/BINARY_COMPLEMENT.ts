import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_BINARY_COMPLEMENT extends BaseOperator<Integer, Integer> {
  static override internalName =
    "integrateddynamics:binary_complement" as const;
  static override numericID = 7;
  static override nicknames = ["binaryComplement", "integerComplement"];
  static override symbol = "~";
  static override interactName = "integerComplement";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (int: Integer): Integer => {
        return int.binaryComplement();
      },
    });
  }
}
