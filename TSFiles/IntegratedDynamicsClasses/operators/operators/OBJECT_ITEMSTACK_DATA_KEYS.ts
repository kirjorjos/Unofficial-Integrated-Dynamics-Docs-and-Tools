import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ITEMSTACK_DATA_KEYS extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:itemstack_datakeys" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackDatakeys",
        "itemstack_data_keys",
        "itemstackDataKeys",
        "itemNBTKeys",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      symbol: "data_keys",
      interactName: "itemStackDataKeys",
      function: (item: Item): iArray<iString> => {
        const nbt = item.getNBT();
        if (nbt instanceof CompoundTag) {
          return nbt.getAllKeys();
        }
        return new iArrayEager<iString>([]);
      },
    });
  }
}
