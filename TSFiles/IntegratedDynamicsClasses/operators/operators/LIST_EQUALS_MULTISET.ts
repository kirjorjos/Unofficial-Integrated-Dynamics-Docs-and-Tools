import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArrayLazy } from "IntegratedDynamicsClasses/typeWrappers/iArrayLazy";

export class OPERATOR_LIST_EQUALS_MULTISET extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iBoolean>
> {
  static override internalName =
    "integrateddynamics:list_equals_multiset" as const;
  static override numericID = 301;
  static override nicknames = [
    "listEquals_multiset",
    "listEqualsMultiset",
    "equalsMultiset",
  ];
  static override symbol = "=multiset=";
  static override interactName = "listEquals_multiset";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list1: iArray<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iBoolean> => {
        return (list2: iArray<IntegratedValue>): iBoolean => {
          if (list1 instanceof iArrayLazy || list2 instanceof iArrayLazy)
            throw new Error(
              "Equals Multiset not supported for infinite lists."
            );
          const newList1 = [...list1.valueOf()].sort();
          const newList2 = [...list2.valueOf()].sort();
          if (newList1.length !== newList2.length) {
            return new iBoolean(false);
          }
          for (let i = 0; i < newList1.length; i++) {
            if (!newList1[i] || !newList2[i]) {
              return new iBoolean(false);
            } else {
              if (!newList1[i]!.equals(newList2[i]!)) {
                return new iBoolean(false);
              }
            }
          }
          return new iBoolean(true);
        };
      },
    });
  }
}
