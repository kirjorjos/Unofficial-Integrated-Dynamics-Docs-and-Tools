import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_INTEGER extends BaseOperator<iString, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer" as const;
  static override numericID = 194;
  static override nicknames = ["stringParseAsInteger", "parseInteger"];
  static override symbol = "parse_integer";
  static override interactName = "stringParseAsInteger";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (data: iString): Integer => {
        try {
          return new Integer(data.valueOf());
        } catch (e: any) {
          throw new Error(
            `Could not parse integer from "${data.valueOf()}": ${e.message}`
          );
        }
      },
    });
  }
}
