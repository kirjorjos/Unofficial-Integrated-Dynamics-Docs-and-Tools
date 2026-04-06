import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OPERATOR_CONJUNCTION extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<
    Operator<IntegratedValue, iBoolean>,
    Operator<IntegratedValue, iBoolean>
  >
> {
  static override internalName =
    "integrateddynamics:operator_conjunction" as const;
  static override numericID = 97;
  static override nicknames = ["operatorConjunction", "conjunction"];
  static override symbol = ".&&.";
  static override interactName = "operatorConjunction";
  static override operatorName = "conjunction" as const;
  static override displayName = "Conjunction" as const;
  static override fullDisplayName = "Operator Conjunction" as const;
  static override kind = "operator" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Boolean" },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
            to: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        predicate1: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<
        Operator<IntegratedValue, iBoolean>,
        TypeLambda<IntegratedValue, iBoolean>
      > => {
        return (
          predicate2: Operator<IntegratedValue, iBoolean>
        ): TypeLambda<IntegratedValue, iBoolean> => {
          return (input: IntegratedValue): iBoolean => {
            return new iBoolean(
              predicate1.apply(input).valueOf() &&
                predicate2.apply(input).valueOf()
            );
          };
        };
      },
    });
  }
}
