import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_REDUCE extends BaseOperator<any, any> {
  static override internalName = "integrateddynamics:operator_reduce" as const;
  static override numericID = 104;
  static override nicknames = ["operatorReduce", "reduce", "operator_reduce"];
  static override symbol = "reduce";
  static override interactName = "operatorReduce";
  static override operatorName = "reduce" as const;
  static override displayName = "Reduce" as const;
  static override fullDisplayName = "Operator Reduce" as const;
  static override tooltipInfo =
    "Apply the given operator on all elements of a list to reduce the list to one value." as const;

  static override kind = "operator" as const;
  static override renderPattern = "PREFIX_3_LONG" as const;
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
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 1 },
              },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, IntegratedValue>
        >
      ): TypeLambda<
        iArray<IntegratedValue>,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          list: iArray<IntegratedValue>
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (startingValue: IntegratedValue): IntegratedValue => {
            return list
              .valueOf()
              .reduce(
                (acc, current) => op.apply(acc).apply(current),
                startingValue
              );
          };
        };
      },
    });
  }
}
