import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_ITEMSTACK_HASNBT extends BaseOperator<
  Item,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_hasnbt",
      nicknames: [
        "ItemstackHasnbt",
        "itemstack_has_nbt",
        "itemstackHasNBT",
        "hasNBT",
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
      symbol: "has_nbt",
      interactName: "itemStackHasNBT",
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
      },
    });
  }
}
