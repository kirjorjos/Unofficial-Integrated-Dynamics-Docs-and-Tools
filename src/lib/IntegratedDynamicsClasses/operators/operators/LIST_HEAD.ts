import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_LIST_HEAD extends BaseOperator<
  iArray<IntegratedValue>,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:list_head" as const;
  static override numericID = 116;
  static override nicknames = ["head", "listHead", "list_head"];
  static override symbol = "head";
  static override interactName = "listHead";
  static override operatorName = "head" as const;
  static override displayName = "Head" as const;
  static override fullDisplayName = "List Head" as const;
  static override tooltipInfo =
    "Get the first element of the given list." as const;

  static override kind = "list" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "Any", typeID: 1 },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): IntegratedValue => {
        if (list.size().equals(Integer.ZERO).valueOf()) {
          throw new Error("head called on an empty list");
        }
        return list.get(Integer.ZERO);
      },
    });
  }
}
