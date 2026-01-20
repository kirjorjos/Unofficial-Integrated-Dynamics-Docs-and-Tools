import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_FILTER extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
    static override internalName = "integrateddynamics:operator_filter"
  constructor() {
    super({
      nicknames: ["operatorFilter", "filter"],
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
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
            to: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
          },
        },
        globalMap
      ),
      symbol: "filter",
      interactName: "operatorFilter",
      function: (
        predicate: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          return list.filter((item) => predicate.apply(item).valueOf());
        };
      },
    });
  }
}
