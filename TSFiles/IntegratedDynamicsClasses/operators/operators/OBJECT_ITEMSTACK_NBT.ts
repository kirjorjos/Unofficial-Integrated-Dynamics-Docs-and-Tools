import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_ITEMSTACK_NBT extends BaseOperator<
  Item,
  Tag<IntegratedValue>
> {
  static override internalName = "integrateddynamics:itemstack_nbt" as const;
  constructor() {
    super({
      nicknames: ["ItemstackNbt", "itemstack_nbt", "itemstackNBT", "itemNBT"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "nbt",
      interactName: "itemStackNBT",
      function: (item: Item): Tag<IntegratedValue> => {
        return item.getNBT();
      },
    });
  }
}
