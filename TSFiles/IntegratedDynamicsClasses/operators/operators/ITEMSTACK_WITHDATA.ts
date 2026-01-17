import { globalMap } from "HelperClasses/TypeMap";
import { Item } from "IntegratedDynamicsClasses/Item";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";

export class OPERATOR_ITEMSTACK_WITHDATA extends BaseOperator<
  Item,
  Operator<iString, Operator<CompoundTag, Item>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_withdata",
      nicknames: [
        "ItemstackWithData",
        "itemstack_with_data",
        "itemstackWithData",
        "item_with_data",
        "itemWithData",
        "itemWithNBT",
      ],
      parsedSignature: new ParsedSignature(
        {
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
        },
        globalMap
      ),
      symbol: "with_data",
      interactName: "itemstackWithData",
      function: (
        item: Item
      ): TypeLambda<string, TypeLambda<CompoundTag, Item>> => {
        return (key: string): TypeLambda<CompoundTag, Item> => {
          return (value: CompoundTag): Item => {
            let nbt = item.getNBT() || {};
            nbt = nbt.set(key, value);
            return new Item(new Properties({ nbt }), item);
          };
        };
      },
    });
  }
}
