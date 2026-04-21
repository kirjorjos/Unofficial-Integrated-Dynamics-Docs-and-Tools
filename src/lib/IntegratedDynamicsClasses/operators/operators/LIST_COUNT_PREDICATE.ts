import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_COUNT_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Operator<IntegratedValue, iBoolean>, Integer>
> {
  static override internalName = "integrateddynamics:list_count_p" as const;
  static override numericID = 115;
  static override nicknames = [
    "countP",
    "listCountP",
    "listCountPredicate",
    "count_p",
    "list_count_p",
    "list_count_predicate",
    "listCount_p",
  ];
  static override symbol = "count_p";
  static override interactName = "listCountPredicate";
  static override operatorName = "count_p" as const;
  static override displayName = "Count Predicate" as const;
  static override fullDisplayName = "List Count Predicate" as const;
  static override tooltipInfo =
    "The number of times the given predicate returns true for the elements in the list." as const;

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
                  type: "Boolean",
                },
              },
            },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Predicate<IntegratedValue>, Integer> => {
        return (predicate: Predicate<IntegratedValue>): Integer => {
          return list.filter((item) => predicate.apply(item).valueOf()).size();
        };
      },
    });
  }
}
