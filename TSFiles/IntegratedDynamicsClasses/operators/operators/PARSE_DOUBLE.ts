import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { Double } from "JavaNumberClasses/Double";

export class OPERATOR_PARSE_DOUBLE extends BaseOperator<
  IntegratedValue,
  Double
> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
      nicknames: ["parseDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "parse_double",
      interactName: "stringParseAsDouble",
      function: (data: IntegratedValue): Double => {
        try {
          return new Double(data as Double); // fine to cast as constructor throws error
        } catch (e) {
          return Double.ZERO;
        }
      },
    });
  }
}
