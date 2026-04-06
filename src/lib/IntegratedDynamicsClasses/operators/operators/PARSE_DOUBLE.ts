import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Double } from "lib/JavaNumberClasses/Double";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_DOUBLE extends BaseOperator<iString, Double> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double" as const;
  static override numericID = 192;
  static override nicknames = [
    "stringParseAsDouble",
    "parseDouble",
    "parse_double",
    "parseParse_double",
  ];
  static override symbol = "parse_double";
  static override interactName = "stringParseAsDouble";
  static override operatorName = "parse_double" as const;
  static override displayName = "Parse Double" as const;
  static override fullDisplayName = "Parse" as const;
  static override kind = "parse" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
