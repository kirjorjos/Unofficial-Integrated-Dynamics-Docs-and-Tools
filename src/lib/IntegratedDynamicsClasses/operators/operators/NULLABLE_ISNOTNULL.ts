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
    "generalIsNotNull",
    "isNotNull",
    "nullableIsNotNull",
    "notNull",
    "any_is_not_null",
    "general_is_not_null",
    "is_not_null",
    "nullable_is_not_null",
    "not_null",
  ];
  static override symbol = "∅";
  static override interactName = "anyIsNotNull";
  static override operatorName = "isnotnull" as const;
  static override displayName = "Is Not Null" as const;
  static override fullDisplayName = "General Is Not Null" as const;
  static override stringDisplayNames = [
    "is not null",
    "is not Null",
    "is Not null",
    "is Not Null",
    "Is not null",
    "Is not Null",
    "Is Not null",
    "Is Not Null",
    "general is not null",
    "general is not Null",
    "general is Not null",
    "general is Not Null",
    "general Is not null",
    "general Is not Null",
    "general Is Not null",
    "general Is Not Null",
    "General is not null",
    "General is not Null",
    "General is Not null",
    "General is Not Null",
    "General Is not null",
    "General Is not Null",
    "General Is Not null",
    "General Is Not Null",
  ];
  static override tooltipInfo = "If the given value is not null" as const;

  static override kind = "general" as const;
  static override renderPattern = "PREFIX_1" as const;
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
