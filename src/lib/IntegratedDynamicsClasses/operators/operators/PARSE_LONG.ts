import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Long } from "lib/JavaNumberClasses/Long";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_PARSE_LONG extends BaseOperator<iString, Long> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long" as const;
  static override numericID = 195;
  static override nicknames = [
    "parseLong",
    "parseParseLong",
    "stringParseAsLong",
    "parse_long",
    "parse_parse_long",
    "string_parse_as_long",
  ];
  static override symbol = "parse_long";
  static override interactName = "stringParseAsLong";
  static override operatorName = "parse_long" as const;
  static override displayName = "Parse Long" as const;
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
            type: "Long",
          },
        },
        normalizeSignature
      ),
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
