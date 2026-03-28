import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORYSIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_inventorysize" as const;
  static override numericID = 135;
  static override nicknames = [
    "ItemstackInventorysize",
    "itemstack_inventory_size",
    "itemstackInventorySize",
    "item_inventory_size",
    "itemInventorySize",
    "inventorySize",
  ];
  static override symbol = "inventory_size";
  static override interactName = "itemstackInventorySize";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Integer => {
        return item.getInventorySize();
      },
    });
  }
}
