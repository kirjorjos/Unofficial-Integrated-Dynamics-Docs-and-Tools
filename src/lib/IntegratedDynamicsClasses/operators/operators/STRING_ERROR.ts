import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_STRING_ERROR extends BaseOperator<
  iString,
  IntegratedValue
> {
  static override internalName =
    "integrateddynamics:string_string_error" as const;
  static override numericID = 290;
  static override nicknames = [
    "error",
    "stringError",
    "stringStringError",
    "string_error",
    "string_string_error",
    "stringString_error",
  ];
  static override symbol = "error";
  static override interactName = "stringStringError";
  static override operatorName = "string_error" as const;
  static override displayName = "Error" as const;
  static override fullDisplayName = "String Error" as const;
  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "Any", typeID: 1 },
        },
        normalizeSignature
      ),
      function: (message: iString): never => {
        throw new Error(`Error: ${message.valueOf()}`);
      },
    });
  }
}
