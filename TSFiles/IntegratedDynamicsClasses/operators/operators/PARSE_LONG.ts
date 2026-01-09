import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { TypeMap } from "HelperClasses/TypeMap";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_PARSE_LONG extends BaseOperator<IntegratedValue, Long> {
  constructor(globalMap: TypeMap) {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
      nicknames: ["parseLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "parse_long",
      interactName: "stringParseAsLong",
      function: (data: IntegratedValue): Long => {
        try {
          return new Long(data as Long);
        } catch (e) {
          return new Long(0);
        }
      },
    });
  }
}
