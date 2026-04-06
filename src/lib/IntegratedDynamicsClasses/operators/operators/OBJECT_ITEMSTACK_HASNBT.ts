import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_ITEMSTACK_HASNBT extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName = "integrateddynamics:itemstack_hasnbt" as const;
  static override numericID = 197;
  static override nicknames = [
    "itemStackHasNBT",
    "ItemstackHasnbt",
    "itemstack_has_nbt",
    "itemstackHasNBT",
    "hasNBT",
    "hasnbt",
    "itemstackHasnbt",
  ];
  static override symbol = "has_nbt";
  static override interactName = "itemStackHasNBT";
  static override operatorName = "hasnbt" as const;
  static override displayName = "Has NBT" as const;
  static override fullDisplayName = "Item Has NBT" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
        return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
      },
    });
  }
}
