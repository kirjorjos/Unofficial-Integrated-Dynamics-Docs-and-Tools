import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { RE2 } from "re2-wasm";

export class OPERATOR_PARSE_BOOLEAN extends BaseOperator<iString, iBoolean> {
  constructor() {
    super({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean",
      nicknames: ["parseBoolean"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "parse_iBoolean",
      interactName: "stringParseAsBoolean",
      function: (value: iString): iBoolean => {
        const re = new RE2("^(F(alse)?|[+-]?(0x|#)?0+|)$", "iu");
        const match = re.match(value.valueOf().trim());
        return new iBoolean(match === null);
      },
    });
  }
}
