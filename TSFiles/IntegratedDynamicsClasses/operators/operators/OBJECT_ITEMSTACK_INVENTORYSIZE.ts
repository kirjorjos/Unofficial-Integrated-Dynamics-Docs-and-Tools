import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORYSIZE extends BaseOperator<
  Item,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_inventorysize",
      nicknames: [
        "ItemstackInventorysize",
        "itemstack_inventory_size",
        "itemstackInventorySize",
        "item_inventory_size",
        "itemInventorySize",
        "inventorySize",
      ],
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
        globalMap
      ),
      symbol: "inventory_size",
      interactName: "itemstackInventorySize",
      function: (item: Item): Integer => {
        return item.getInventory().size();
      },
    });
  }
}
