import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "JavaNumberClasses/Long";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_LONG_TO_DOUBLE extends BaseOperator<Long, Double> {
  constructor(globalMap: TypeMap) {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
      nicknames: ["longToDouble", "longDouble", "longLongToDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "longLongToDouble",
      function: (long: Long): Double => {
        return long.toDouble();
      },
    });
  }
}