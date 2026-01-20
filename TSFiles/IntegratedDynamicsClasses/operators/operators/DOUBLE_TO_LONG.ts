import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_TO_LONG extends BaseOperator<Double, Long> {
    static override internalName = "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long"
  constructor() {
    super({
      nicknames: ["doubleToLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "doubleDoubleToLong",
      function: (double: Double): Long => {
        return double.toLong();
      },
    });
  }
}
