import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_NBT extends BaseOperator<
  Item,
  CompoundTag
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_nbt",
      nicknames: ["ItemstackNbt", "itemstack_nbt", "itemstackNBT", "itemNBT"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "nbt",
      interactName: "itemStackNBT",
      function: (item: Item): CompoundTag => {
        return item.getNBT();
      },
    });
  }
}
