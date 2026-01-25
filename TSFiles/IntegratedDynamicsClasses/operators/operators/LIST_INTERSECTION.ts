import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_INTERSECTION extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:list_intersection" as const;
  constructor() {
    super({
      nicknames: ["listIntersection", "intersection"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
      }),
      symbol: "∩",
      interactName: "listIntersection",
      function: (
        list1: iArray<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list2: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          const arr1 = list1.valueOf();
          const arr2 = list2.valueOf();

          const intersection = arr1.filter((item1) => {
            return arr2.some((item2) => item1.equals(item2).valueOf());
          });

          const uniqueIntersection = [] as IntegratedValue[];
          intersection.forEach((item) => {
            let found = false;
            for (const uniqueItem of uniqueIntersection) {
              if (uniqueItem.equals(item).valueOf()) {
                found = true;
                break;
              }
            }
            if (!found) {
              uniqueIntersection.push(item);
            }
          });

          return new iArrayEager(uniqueIntersection);
        };
      },
    });
  }
}
