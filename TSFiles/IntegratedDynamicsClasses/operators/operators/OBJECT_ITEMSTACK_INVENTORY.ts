import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORY extends BaseOperator<
  Item,
  iArray<Item>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_inventory",
      nicknames: [
        "ItemstackInventory",
        "itemstack_inventory",
        "itemstackInventory",
        "item_inventory",
        "itemInventory",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "inventory",
      interactName: "itemstackInventory",
      function: (item: Item): iArray<Item> => {
        return item.getInventory() as iArray<Item>;
      },
    });
  }
}
