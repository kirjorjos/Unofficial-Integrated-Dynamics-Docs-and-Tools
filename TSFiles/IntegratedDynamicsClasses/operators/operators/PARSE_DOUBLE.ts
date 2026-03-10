import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Double } from "JavaNumberClasses/Double";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_DOUBLE extends BaseOperator<iString, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double" as const;
  static override nicknames = ["parseDouble"];
  static override symbol = "parse_double";
  static override interactName = "stringParseAsDouble";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Double",
        },
      }),
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
