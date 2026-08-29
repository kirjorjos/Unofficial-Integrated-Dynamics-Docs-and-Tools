import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Long } from "lib/JavaNumberClasses/Long";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_LONG_TO_INTEGER extends BaseOperator<Long, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer" as const;
  static override numericID = 89;
  static override nicknames = [
    "longInteger",
    "longLongToInteger",
    "longToInt",
    "longToInteger",
    "long_integer",
    "long_long_to_integer",
    "long_to_int",
    "long_to_integer",
  ];
  static override symbol = "()";
  static override interactName = "longLongToInteger";
  static override operatorName = "cast_integer" as const;
  static override displayName = "Cast Number to Integer" as const;
  static override fullDisplayName = "Number Cast Number to Integer" as const;
  static override stringDisplayNames = [
    "number cast long to integer",
    "number cast long to Integer",
    "number cast long To integer",
    "number cast long To Integer",
    "number cast Long to integer",
    "number cast Long to Integer",
    "number cast Long To integer",
    "number cast Long To Integer",
    "number Cast long to integer",
    "number Cast long to Integer",
    "number Cast long To integer",
    "number Cast long To Integer",
    "number Cast Long to integer",
    "number Cast Long to Integer",
    "number Cast Long To integer",
    "number Cast Long To Integer",
    "Number cast long to integer",
    "Number cast long to Integer",
    "Number cast long To integer",
    "Number cast long To Integer",
    "Number cast Long to integer",
    "Number cast Long to Integer",
    "Number cast Long To integer",
    "Number cast Long To Integer",
    "Number Cast long to integer",
    "Number Cast long to Integer",
    "Number Cast long To integer",
    "Number Cast long To Integer",
    "Number Cast Long to integer",
    "Number Cast Long to Integer",
    "Number Cast Long To integer",
    "Number Cast Long To Integer",
  ];
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
