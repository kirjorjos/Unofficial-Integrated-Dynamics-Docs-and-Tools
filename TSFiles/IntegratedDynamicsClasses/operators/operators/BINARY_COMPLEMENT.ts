import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_BINARY_COMPLEMENT extends BaseOperator<Integer, Integer> {
  static override internalName =
    "integrateddynamics:binary_complement" as const;
  static override nicknames = ["binaryComplement", "integerComplement"];
  static override symbol = "~";
  static override interactName = "integerComplement";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (int: Integer): Integer => {
        return int.binaryComplement();
      },
    });
  }
}
