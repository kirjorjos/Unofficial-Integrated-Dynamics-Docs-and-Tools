import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iNull } from "IntegratedDynamicsClasses/typeWrappers/iNull";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_NULLABLE_ISNULL extends BaseOperator<
  IntegratedValue,
  iBoolean
> {
  static override internalName = "integrateddynamics:general_isnull" as const;
  static override numericID = 47;
  static override nicknames = [
    "anyIsNull",
    "isNull",
    "nullableIsnull",
    "GENERAL_IS_NULL",
  ];
  static override symbol = "o";
  static override interactName = "anyIsNull";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (value: IntegratedValue): iBoolean => {
        return new iBoolean(value instanceof iNull);
      },
    });
  }
}
