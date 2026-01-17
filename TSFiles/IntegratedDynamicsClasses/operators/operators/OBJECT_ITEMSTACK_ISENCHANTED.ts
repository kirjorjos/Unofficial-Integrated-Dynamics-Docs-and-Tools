import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTED extends BaseOperator<
  Item,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_enchanted",
      nicknames: [
        "ItemstackIsenchanted",
        "itemstack_is_enchanted",
        "itemstackIsEnchanted",
        "isEnchanted",
        "enchanted",
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
      symbol: "enchanted",
      interactName: "itemstackIsEnchanted",
      function: (item: Item): iBoolean => {
        return item.isEnchanted();
      },
    });
  }
}
