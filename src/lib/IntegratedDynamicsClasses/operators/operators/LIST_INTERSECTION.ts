import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_INTERSECTION extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:list_intersection" as const;
  static override numericID = 278;
  static override nicknames = [
    "intersection",
    "listIntersection",
    "list_intersection",
    "∩",
  ];
  static override symbol = "∩";
  static override interactName = "listIntersection";
  static override operatorName = "intersection" as const;
  static override displayName = "Intersection" as const;
  static override fullDisplayName = "List Intersection" as const;
  static override kind = "list" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
