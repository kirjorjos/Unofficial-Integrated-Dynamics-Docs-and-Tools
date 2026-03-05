import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Integer } from "JavaNumberClasses/Integer";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_INTEGER extends BaseOperator<iString, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer" as const;
  constructor() {
    super({
      nicknames: ["parseInteger"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "parse_integer",
      interactName: "stringParseAsInteger",
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
