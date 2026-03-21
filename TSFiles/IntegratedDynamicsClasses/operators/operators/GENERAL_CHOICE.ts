import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_GENERAL_CHOICE extends BaseOperator<
  iBoolean,
  Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName = "integrateddynamics:general_choice" as const;
  static override nicknames = [
    "generalChoice",
    "choice",
    "booleanChoice",
    "if",
    "ifElse",
    "if_else",
  ];
  static override symbol = "?";
  static override interactName = "booleanChoice";
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
