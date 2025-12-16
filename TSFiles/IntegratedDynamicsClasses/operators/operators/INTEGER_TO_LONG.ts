import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_INTEGER_TO_LONG extends BaseOperator<Integer, Long> {
  constructor(globalMap: TypeMap) {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
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
      function: (int: Integer): Promise<Long> => {
        return int.toLong();
      },
    });
  }
}
