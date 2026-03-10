import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_REDUCE extends BaseOperator<any, any> {
  static override internalName = "integrateddynamics:operator_reduce" as const;
  static override nicknames = ["operatorReduce", "reduce"];
  static override symbol = "reduce";
  static override interactName = "operatorReduce";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
