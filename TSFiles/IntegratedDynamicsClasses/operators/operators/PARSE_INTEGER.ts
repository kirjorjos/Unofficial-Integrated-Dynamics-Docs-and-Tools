import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Integer } from "JavaNumberClasses/Integer";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_INTEGER extends BaseOperator<iString, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer" as const;
  static override nicknames = ["parseInteger"];
  static override symbol = "parse_integer";
  static override interactName = "stringParseAsInteger";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Integer",
        },
      }),
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
