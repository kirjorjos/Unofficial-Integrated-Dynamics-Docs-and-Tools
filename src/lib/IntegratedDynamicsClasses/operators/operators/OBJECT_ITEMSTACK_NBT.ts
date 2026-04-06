import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_ITEMSTACK_NBT extends BaseOperator<
  Item,
  Tag<IntegratedValue>
> {
  static override internalName = "integrateddynamics:itemstack_nbt" as const;
  static override numericID = 145;
  static override nicknames = [
    "itemStackNBT",
    "ItemstackNbt",
    "itemstack_nbt",
    "itemstackNBT",
    "itemNBT",
    "nbt",
    "itemstackNbt",
  ];
  static override symbol = "nbt";
  static override interactName = "itemStackNBT";
  static override operatorName = "nbt" as const;
  static override displayName = "Item NBT" as const;
  static override fullDisplayName = "Item Item NBT" as const;
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
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Tag<IntegratedValue> => {
        return item.getNBT();
      },
    });
  }
}
