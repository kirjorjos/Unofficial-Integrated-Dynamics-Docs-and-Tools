import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayLazy } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayLazy";

export class OPERATOR_LIST_EQUALS_SET extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iBoolean>
> {
  static override internalName = "integrateddynamics:list_equals_set" as const;
  static override numericID = 302;
  static override nicknames = [
    "equalsSet",
    "listEqualsSet",
    "equals_set",
    "list_equals_set",
    "listEquals_set",
    "=set",
  ];
  static override symbol = "=set=";
  static override interactName = "listEquals_set";
  static override operatorName = "equals_set" as const;
  static override displayName = "List Equals (Set)" as const;
  static override fullDisplayName = "List List Equals (Set)" as const;
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
            throw new Error("Equals Set not supported for infinite lists.");
          const set1 = new Set(list1.valueOf());
          const set2 = new Set(list2.valueOf());
          if (
            set1.size !== set2.size ||
            set1.size !== new Set([...set1, ...set2]).size
          )
            return new iBoolean(false);
          return new iBoolean(true);
        };
      },
      flipTarget: "LIST_EQUALS_SET",
    });
  }
}
