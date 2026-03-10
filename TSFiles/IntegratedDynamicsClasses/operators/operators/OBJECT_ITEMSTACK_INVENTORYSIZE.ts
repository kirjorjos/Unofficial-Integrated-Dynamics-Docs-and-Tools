import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORYSIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_inventorysize" as const;
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
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (item: Item): Integer => {
        return item.getInventorySize();
      },
    });
  }
}
