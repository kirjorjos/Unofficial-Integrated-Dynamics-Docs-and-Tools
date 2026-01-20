import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { Double } from "JavaNumberClasses/Double";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_DOUBLE extends BaseOperator<iString, Double> {
    static override internalName = "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double"
  constructor() {
    super({
      nicknames: ["parseDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "parse_double",
      interactName: "stringParseAsDouble",
      function: (data: iString): Double => {
        try {
          return new Double(data.valueOf());
        } catch (e: any) {
          throw new Error(
            `Could not parse double from "${data.valueOf()}": ${e.message}`
          );
        }
      },
    });
  }
}
