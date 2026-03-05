import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_ITEMSTACK_WITH_NBT extends BaseOperator<
  Item,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:itemstack_withnbt" as const;
  constructor() {
    super({
      nicknames: ["itemWithNBT", "item_stack_with_nbt", "itemStackWithNBT"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "with_nbt",
      interactName: "itemstackWithNBT",
      function: (item: Item): TypeLambda<CompoundTag, Item> => {
        return (nbt: CompoundTag): Item => {
          return new Item(new Properties({ NBT: nbt }), item);
        };
      },
    });
  }
}
