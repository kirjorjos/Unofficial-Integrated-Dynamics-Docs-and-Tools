import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { Integer } from "JavaNumberClasses/Integer";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_INTEGER extends BaseOperator<iString, Integer> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
      nicknames: ["parseInteger"],
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
        globalMap
      ),
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
