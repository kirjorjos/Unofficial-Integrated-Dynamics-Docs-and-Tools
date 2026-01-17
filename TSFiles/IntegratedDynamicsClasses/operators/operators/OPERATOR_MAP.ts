import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_MAP extends BaseOperator<
  Operator<IntegratedValue, IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:operator_map",
      nicknames: ["operatorMap", "map"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 2 },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
            to: {
              type: "List",
              listType: { type: "Any", typeID: 2 },
            },
          },
        },
        globalMap
      ),
      symbol: "map",
      interactName: "operatorMap",
      function: (
        op: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          return list.map(op);
        };
      },
    });
  }
}
