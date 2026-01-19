import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { Long } from "JavaNumberClasses/Long";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_LONG extends BaseOperator<iString, Long> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
      nicknames: ["parseLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "parse_long",
      interactName: "stringParseAsLong",
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
