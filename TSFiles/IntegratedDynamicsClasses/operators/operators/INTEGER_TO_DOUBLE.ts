import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INTEGER_TO_DOUBLE extends BaseOperator<Integer, Double> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
      nicknames: ["intToDouble", "integerToDouble", "integerIntegerToDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "integerIntegerToDouble",
      function: (int: Integer): Double => {
        return int.toDouble();
      },
    });
  }
}
