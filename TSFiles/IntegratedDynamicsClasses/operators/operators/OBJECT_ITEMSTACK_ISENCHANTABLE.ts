import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_enchantable" as const;
  static override nicknames = [
    "ItemstackIsenchantable",
    "itemstack_is_enchantable",
    "itemstackIsEnchantable",
    "enchantable",
  ];
  static override symbol = "enchantable";
  static override interactName = "itemstackIsEnchantable";
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
