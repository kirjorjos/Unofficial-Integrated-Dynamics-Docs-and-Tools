import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_REDUCE1 extends BaseOperator<any, any> {
  static override internalName = "integrateddynamics:operator_reduce1" as const;
  static override numericID = 182;
  static override nicknames = ["operatorReduce1", "reduce1"];
  static override symbol = "reduce1";
  static override interactName = "operatorReduce1";
  static override operatorName = "reduce1" as const;
  static override displayName = "Reduce 1" as const;
  static override fullDisplayName = "Operator Reduce 1" as const;
  static override kind = "operator" as const;
  static override renderPattern = "PREFIX_2_LONG" as const;
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
            to: { type: "Any", typeID: 1 },
          },
        },
        normalizeSignature
      ),
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, IntegratedValue>
        >
      ): TypeLambda<iArray<IntegratedValue>, IntegratedValue> => {
        return (list: iArray<IntegratedValue>): IntegratedValue => {
          return list
            .valueOf()
            .reduce((acc, current) =>
              op.apply(acc, false).apply(current, false)
            );
        };
      },
    });
  }
}
