import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Long } from "JavaNumberClasses/Long";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_LONG extends BaseOperator<iString, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long" as const;
  static override nicknames = ["stringParseAsLong", "parseLong"];
  static override symbol = "parse_long";
  static override interactName = "stringParseAsLong";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Long",
        },
      }),
      function: (data: iString): Long => {
        try {
          return new Long(data.valueOf());
        } catch (e: any) {
          throw new Error(
            `Could not parse long from "${data.valueOf()}": ${e.message}`
          );
        }
      },
    });
  }
}
