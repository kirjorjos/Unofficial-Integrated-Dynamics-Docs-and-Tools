import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ITEMSTACK_DATA_KEYS extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:itemstack_datakeys" as const;
  static override numericID = 287;
  static override nicknames = [
    "itemNBTKeys",
    "itemstackDatakeys",
    "itemstackDataKeys",
    "itemStackDataKeys",
    "ItemstackDatakeys",
    "itemstackItemstackDatakeys",
    "item_n_b_t_keys",
    "item_stack_data_keys",
    "itemstack_data_keys",
    "itemstack_datakeys",
    "itemstackItemstack_datakeys",
  ];
  static override symbol = "data_keys";
  static override interactName = "itemStackDataKeys";
  static override operatorName = "itemstack_datakeys" as const;
  static override displayName = "Item Data Keys" as const;
  static override fullDisplayName = "Item Item Data Keys" as const;
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
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
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
