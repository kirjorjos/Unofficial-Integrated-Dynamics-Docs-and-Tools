import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORY extends BaseOperator<
  Item,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:itemstack_inventory" as const;
  static override numericID = 134;
  static override nicknames = [
    "itemInventory",
    "itemstackInventory",
    "ItemstackInventory",
    "item_inventory",
    "itemstack_inventory",
  ];
  static override symbol = "inventory";
  static override interactName = "itemstackInventory";
  static override operatorName = "inventory" as const;
  static override displayName = "Item Inventory" as const;
  static override fullDisplayName = "Item Item Inventory" as const;
  static override tooltipInfo =
    "Retrieve the inventory of the given item handler contents" as const;

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
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (item: Item): iArray<Item> => {
        return item.getInventory() as iArray<Item>;
      },
    });
  }
}
