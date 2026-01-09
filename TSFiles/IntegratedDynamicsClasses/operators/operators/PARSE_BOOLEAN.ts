import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { TypeMap } from "HelperClasses/TypeMap";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { RE2 } from "re2-wasm";

export class OPERATOR_PARSE_BOOLEAN extends BaseOperator<iString, iBoolean> {
  constructor(globalMap: TypeMap) {
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
        const matchArr =
          new RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(value.valueOf()) ??
          [];
        return new iBoolean(!!matchArr[0]);
      },
    });
  }
}
