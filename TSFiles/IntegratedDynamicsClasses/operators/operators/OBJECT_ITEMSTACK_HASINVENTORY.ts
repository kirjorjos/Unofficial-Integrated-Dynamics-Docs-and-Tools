import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_HASINVENTORY extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_hasinventory" as const;
  static override nicknames = [
    "ItemstackHasinventory",
    "itemstack_has_inventory",
    "itemstackHasInventory",
    "hasInventory",
  ];
  static override symbol = "has_inventory";
  static override interactName = "itemstackHasInventory";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getInventory().size().gt(Integer.ZERO));
      },
    });
  }
}
