import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTABLE extends BaseOperator<
  Item,
  iBoolean
> {
    static override internalName = "integrateddynamics:itemstack_enchantable"
  constructor() {
    super({
      nicknames: [
        "ItemstackIsenchantable",
        "itemstack_is_enchantable",
        "itemstackIsEnchantable",
        "enchantable",
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
      symbol: "enchantable",
      interactName: "itemstackIsEnchantable",
      function: (item: Item): iBoolean => {
        return item.isEnchantable();
      },
    });
  }
}
