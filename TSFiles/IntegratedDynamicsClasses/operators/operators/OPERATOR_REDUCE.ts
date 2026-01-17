import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_REDUCE extends BaseOperator<any, any> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_reduce",
      nicknames: ["operatorReduce", "reduce"],
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
        globalMap
      ),
      symbol: "reduce",
      interactName: "operatorReduce",
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
