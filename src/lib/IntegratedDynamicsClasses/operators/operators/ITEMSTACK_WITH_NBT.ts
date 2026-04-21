import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_ITEMSTACK_WITH_NBT extends BaseOperator<
  Item,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:itemstack_withnbt" as const;
  static override numericID = 293;
  static override nicknames = [
    "itemstackItemwithtag",
    "itemstackWithNBT",
    "itemStackWithNbt",
    "itemStackWithNBT",
    "itemWithNBT",
    "itemwithtag",
    "item_stack_with_n_b_t",
    "item_stack_with_nbt",
    "item_with_n_b_t",
    "itemstack_itemwithtag",
    "itemstack_with_n_b_t",
  ];
  static override symbol = "with_nbt";
  static override interactName = "itemstackWithNBT";
  static override operatorName = "itemwithtag" as const;
  static override displayName = "Item With Tag" as const;
  static override fullDisplayName = "Item Item With Tag" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Item",
            },
          },
        },
        normalizeSignature
      ),
      function: (item: Item): TypeLambda<CompoundTag, Item> => {
        return (nbt: CompoundTag): Item => {
          return new Item(new Properties({ NBT: nbt }), item);
        };
      },
    });
  }
}
