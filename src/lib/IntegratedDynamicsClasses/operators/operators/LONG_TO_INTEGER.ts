import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_LONG_TO_INTEGER extends BaseOperator<Long, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer" as const;
  static override numericID = 89;
  static override nicknames = [
    "longLongToInteger",
    "longToInt",
    "longInteger",
    "longToInteger",
    "cast_integer",
    "numberCast_integer",
  ];
  static override symbol = "()";
  static override interactName = "longLongToInteger";
  static override operatorName = "cast_integer" as const;
  static override kind = "number" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (long: Long): Integer => {
        return long.toInteger();
      },
    });
  }
}
