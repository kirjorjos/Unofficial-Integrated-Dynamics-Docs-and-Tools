import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISSTACKABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_stackable" as const;
  static override numericID = 64;
  static override nicknames = [
    "isStackable",
    "itemstackIsStackable",
    "ItemstackIsstackable",
    "itemstackStackable",
    "stackable",
    "is_stackable",
    "itemstack_is_stackable",
    "itemstack_isstackable",
    "itemstack_stackable",
  ];
  static override symbol = "stackable";
  static override interactName = "itemstackIsStackable";
  static override operatorName = "stackable" as const;
  static override displayName = "Stackable" as const;
  static override fullDisplayName = "Item Stackable" as const;
  static override tooltipInfo =
    "If the item stack can hold at least two items." as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return item.isStackable();
      },
    });
  }
}
