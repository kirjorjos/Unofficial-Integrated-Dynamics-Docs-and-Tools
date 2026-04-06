import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_enchantable" as const;
  static override numericID = 52;
  static override nicknames = [
    "ItemstackIsenchantable",
    "itemstack_is_enchantable",
    "itemstackIsEnchantable",
    "enchantable",
    "itemstackEnchantable",
  ];
  static override symbol = "enchantable";
  static override interactName = "itemstackIsEnchantable";
  static override operatorName = "enchantable" as const;
  static override displayName = "Enchantable" as const;
  static override fullDisplayName = "Item Enchantable" as const;
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
        return item.isEnchantable();
      },
    });
  }
}
