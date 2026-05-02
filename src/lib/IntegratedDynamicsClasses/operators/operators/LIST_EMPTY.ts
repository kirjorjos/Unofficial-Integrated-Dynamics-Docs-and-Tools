import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_LIST_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  static override internalName = "integrateddynamics:list_empty" as const;
  static override numericID = 105;
  static override nicknames = [
    "empty",
    "listEmpty",
    "listIsEmpty",
    "list_empty",
    "list_is_empty",
  ];
  static override symbol = "∅";
  static override interactName = "listIsEmpty";
  static override operatorName = "empty" as const;
  static override displayName = "Empty" as const;
  static override fullDisplayName = "List Empty" as const;
  static override tooltipInfo = "If the list is empty" as const;

  static override kind = "list" as const;
  static override renderPattern = "PREFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return list.size().equals(Integer.ZERO);
      },
    });
  }
}
