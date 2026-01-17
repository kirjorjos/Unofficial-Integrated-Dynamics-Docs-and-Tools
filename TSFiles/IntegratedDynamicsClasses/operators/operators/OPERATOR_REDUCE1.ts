import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_REDUCE1 extends BaseOperator<any, any> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_reduce1",
      nicknames: ["operatorReduce1", "reduce1"],
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
        globalMap
      ),
      symbol: "reduce1",
      interactName: "operatorReduce1",
      function: (
        op: Operator<
          IntegratedValue,
          Operator<IntegratedValue, IntegratedValue>
        >
      ): TypeLambda<iArray<IntegratedValue>, IntegratedValue> => {
        return (list: iArray<IntegratedValue>): IntegratedValue => {
          return list
            .valueOf()
            .reduce((acc, current) => op.apply(acc).apply(current));
        };
      },
    });
  }
}
