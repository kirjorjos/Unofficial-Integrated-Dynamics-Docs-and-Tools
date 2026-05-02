import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_NOTEQUALS extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName =
    "integrateddynamics:relational_notequals" as const;
  static override numericID = 77;
  static override nicknames = [
    "anyNotEquals",
    "notequals",
    "relationalNotequals",
    "any_not_equals",
    "relational_notequals",
  ];
  static override symbol = "!=";
  static override interactName = "anyNotEquals";
  static override operatorName = "notequals" as const;
  static override displayName = "Not Equals" as const;
  static override fullDisplayName = "Relational Not Equals" as const;
  static override tooltipInfo = "Type one and two must be equal." as const;

  static override kind = "relational" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        value1: IntegratedValue
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (value2: IntegratedValue): iBoolean => {
          return value1.equals(value2).negate();
        };
      },
      flipTarget: "RELATIONAL_NOTEQUALS",
    });
  }
}
