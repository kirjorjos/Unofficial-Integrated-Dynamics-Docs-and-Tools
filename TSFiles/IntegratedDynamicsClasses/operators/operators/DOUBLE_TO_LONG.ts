import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_DOUBLE_TO_LONG extends BaseOperator<Double, Long> {
  constructor(globalMap: TypeMap) {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
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
