import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_INTEGER_TO_LONG extends BaseOperator<Integer, Long> {
    static override internalName = "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long"
  constructor() {
    super({
      nicknames: ["intToLong", "integerLong", "integerIntegerToLong"],
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
        globalMap
      ),
      symbol: "()",
      interactName: "integerIntegerToLong",
      function: (int: Integer): Long => {
        return int.toLong();
      },
    });
  }
}
