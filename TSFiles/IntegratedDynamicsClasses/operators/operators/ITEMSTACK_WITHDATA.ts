import { Item } from "IntegratedDynamicsClasses/Item";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_ITEMSTACK_WITHDATA extends BaseOperator<
  Item,
  Operator<iString, Operator<Tag<IntegratedValue>, Item>>
> {
  static override internalName =
    "integrateddynamics:itemstack_withdata" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackWithData",
        "itemstack_with_data",
        "itemstackWithData",
        "item_with_data",
        "itemWithData",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Function",
          from: {
            type: "String",
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
      }),
      symbol: "with_data",
      interactName: "itemstackWithData",
      function: (
        item: Item
      ): TypeLambda<iString, TypeLambda<Tag<IntegratedValue>, Item>> => {
        return (key: iString): TypeLambda<Tag<IntegratedValue>, Item> => {
          return (value: Tag<IntegratedValue>): Item => {
            let nbt = item.getNBT();
            if (!(nbt instanceof CompoundTag)) {
              nbt = new CompoundTag({});
            }
            const newNbt = (nbt as CompoundTag).set(key.valueOf(), value);
            return new Item(new Properties({ NBT: newNbt }), item);
          };
        };
      },
    });
  }
}
