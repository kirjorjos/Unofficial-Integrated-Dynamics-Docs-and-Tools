import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_GENERAL_CHOICE extends BaseOperator<
  iBoolean,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName = "integrateddynamics:general_choice" as const;
  static override numericID = 44;
  static override nicknames = [
    "booleanChoice",
    "choice",
    "generalChoice",
    "if",
    "ifElse",
    "boolean_choice",
    "general_choice",
    "if_else",
  ];
  static override symbol = "?";
  static override interactName = "booleanChoice";
  static override operatorName = "choice" as const;
  static override displayName = "Choice" as const;
  static override fullDisplayName = "General Choice" as const;
  static override tooltipInfo =
    "If the first value is true, the second value is taken, otherwise the third value.\\nType two and three must be equal." as const;

  static override kind = "general" as const;
  static override renderPattern = "GENERAL_CHOICE" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Any",
                typeID: 1,
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        bool: iBoolean
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          trueValue: IntegratedValue
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (falseValue: IntegratedValue): IntegratedValue => {
            return bool.valueOf() ? trueValue : falseValue;
          };
        };
      },
    });
  }
}
