import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { RE2 } from "re2-wasm";

export class OPERATOR_PARSE_BOOLEAN extends BaseOperator<iString, iBoolean> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean" as const;
  static override numericID = 193;
  static override nicknames = ["stringParseAsBoolean", "parseBoolean"];
  static override symbol = "parse_iBoolean";
  static override interactName = "stringParseAsBoolean";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (value: iString): iBoolean => {
        const re = new RE2("^(F(alse)?|[+-]?(0x|#)?0+|)$", "iu");
        const match = re.match(value.valueOf().trim());
        return new iBoolean(match === null);
      },
    });
  }
}
