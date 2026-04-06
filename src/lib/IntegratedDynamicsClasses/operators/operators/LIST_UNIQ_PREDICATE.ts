import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_UNIQ_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<
    Operator<IntegratedValue, Operator<IntegratedValue, iBoolean>>,
    iArray<IntegratedValue>
  >
> {
  static override internalName = "integrateddynamics:list_uniq_p" as const;
  static override numericID = 137;
  static override nicknames = [
    "listUniquePredicate",
    "listUniqPredicate",
    "uniq_p",
    "list_uniq_p",
    "listUniq_p",
  ];
  static override symbol = "uniq_p";
  static override interactName = "listUniquePredicate";
  static override operatorName = "uniq_p" as const;
  static override displayName = "Unique Predicate" as const;
  static override fullDisplayName = "List Unique Predicate" as const;
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
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: {
                    type: "Boolean",
                  },
                },
              },
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, Predicate<IntegratedValue>>,
        iArray<IntegratedValue>
      > => {
        return (
          predicate: Operator<IntegratedValue, Predicate<IntegratedValue>>
        ): iArray<IntegratedValue> => {
          const uniqueItems: IntegratedValue[] = [];
          list.valueOf().forEach((item) => {
            let found = false;
            for (const uniqueItem of uniqueItems) {
              if (predicate.apply(item).apply(uniqueItem).valueOf()) {
                found = true;
                break;
              }
            }
            if (!found) {
              uniqueItems.push(item);
            }
          });
          return new iArrayEager(uniqueItems);
        };
      },
    });
  }
}
