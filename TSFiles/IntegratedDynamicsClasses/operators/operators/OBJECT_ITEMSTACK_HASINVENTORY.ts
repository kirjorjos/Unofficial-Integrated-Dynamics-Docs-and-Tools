import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_HASINVENTORY extends BaseOperator<
  Item,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_hasinventory",
      nicknames: [
        "ItemstackHasinventory",
        "itemstack_has_inventory",
        "itemstackHasInventory",
        "hasInventory",
      ],
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
        globalMap
      ),
      symbol: "has_inventory",
      interactName: "itemstackHasInventory",
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getInventory().size().gt(Integer.ZERO));
      },
    });
  }
}
