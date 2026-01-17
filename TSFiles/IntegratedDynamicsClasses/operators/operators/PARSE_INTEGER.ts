import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_PARSE_INTEGER extends BaseOperator<
  IntegratedValue,
  Integer
> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
      nicknames: ["parseInteger"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "parse_integer",
      interactName: "stringParseAsInteger",
      function: (data: IntegratedValue): Integer => {
        try {
          return new Integer(data as Integer);
        } catch (e) {
          return Integer.ZERO;
        }
      },
    });
  }
}
