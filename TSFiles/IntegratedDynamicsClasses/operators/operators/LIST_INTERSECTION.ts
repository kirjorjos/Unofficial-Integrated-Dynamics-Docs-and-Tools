import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { globalMap } from "HelperClasses/TypeMap";

export class OPERATOR_LIST_INTERSECTION extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_intersection",
      nicknames: ["listIntersection", "intersection"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "∩",
      interactName: "listIntersection",
      function: (
        list1: iArray<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list2: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          const set1 = new Set(list1.valueOf());
          return list2.filter((item) => set1.has(item));
        };
      },
    });
  }
}
