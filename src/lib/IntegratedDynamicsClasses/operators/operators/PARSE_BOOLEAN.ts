import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { RE2 } from "re2-wasm";

export class OPERATOR_PARSE_BOOLEAN extends BaseOperator<iString, iBoolean> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean" as const;
  static override numericID = 193;
  static override nicknames = [
    "parseBoolean",
    "parseParseBoolean",
    "stringParseAsBoolean",
    "parse_boolean",
    "parseParse_boolean",
    "string_parse_as_boolean",
  ];
  static override symbol = "parse_iBoolean";
  static override interactName = "stringParseAsBoolean";
  static override operatorName = "parse_boolean" as const;
  static override displayName = "Parse Boolean" as const;
  static override fullDisplayName = "Parse" as const;
  static override kind = "parse" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
