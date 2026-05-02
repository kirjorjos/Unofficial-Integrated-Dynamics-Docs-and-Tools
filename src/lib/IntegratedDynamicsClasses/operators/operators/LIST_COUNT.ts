import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_COUNT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, Integer>
> {
  static override internalName = "integrateddynamics:list_count" as const;
  static override numericID = 114;
  static override nicknames = ["count", "listCount", "list_count"];
  static override symbol = "count";
  static override interactName = "listCount";
  static override operatorName = "count" as const;
  static override displayName = "Count" as const;
  static override fullDisplayName = "List Count" as const;
  static override tooltipInfo =
    "The number of times the given element is found in the list." as const;

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
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, Integer> => {
        return (element: IntegratedValue): Integer => {
          return list.filter((item) => item.equals(element).valueOf()).size();
        };
      },
    });
  }
}
