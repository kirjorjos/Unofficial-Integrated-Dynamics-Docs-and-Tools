import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_OBJECT_ITEMSTACK_HASINVENTORY extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_hasinventory" as const;
  static override numericID = 133;
  static override nicknames = [
    "ItemstackHasinventory",
    "itemstack_has_inventory",
    "itemstackHasInventory",
    "hasInventory",
    "hasinventory",
    "itemstackHasinventory",
  ];
  static override symbol = "has_inventory";
  static override interactName = "itemstackHasInventory";
  static override operatorName = "hasinventory" as const;
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
        return new iBoolean(item.getInventory().size().gt(Integer.ZERO));
      },
    });
  }
}
