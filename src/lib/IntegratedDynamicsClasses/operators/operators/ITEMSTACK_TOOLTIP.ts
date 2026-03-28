import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_TOOLTIP extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:itemstack_tooltip" as const;
  static override numericID = 292;
  static override nicknames = [
    "ItemstackTooltip",
    "itemstack_tooltip",
    "itemstackTooltip",
    "item_tooltip",
    "itemTooltip",
  ];
  static override symbol = "tooltip";
  static override interactName = "itemstackTooltip";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
      function: (item: Item): iArray<iString> => {
        return item.getTooltip();
      },
    });
  }
}
