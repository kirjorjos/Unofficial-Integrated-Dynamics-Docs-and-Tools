import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_NULLABLE_ISNOTNULL extends BaseOperator<
  IntegratedValue,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:general_isnotnull" as const;
  static override numericID = 46;
  static override nicknames = [
    "anyIsNotNull",
    "isNotNull",
    "nullableIsnotnull",
  ];
  static override symbol = "∅";
  static override interactName = "anyIsNotNull";
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
        return new iBoolean(!(value instanceof iNull));
      },
    });
  }
}
