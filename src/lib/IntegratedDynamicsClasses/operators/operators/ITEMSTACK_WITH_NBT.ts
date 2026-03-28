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
    "itemstackWithNBT",
    "itemWithNBT",
    "item_stack_with_nbt",
    "itemStackWithNBT",
  ];
  static override symbol = "with_nbt";
  static override interactName = "itemstackWithNBT";
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
