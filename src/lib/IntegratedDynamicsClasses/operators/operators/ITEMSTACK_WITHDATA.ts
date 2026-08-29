import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_ITEMSTACK_WITHDATA extends BaseOperator<
  Item,
  Operator<iString, Operator<Tag<IntegratedValue>, Item>>
> {
  static override internalName =
    "integrateddynamics:itemstack_withdata" as const;
  static override numericID = 289;
  static override nicknames = [
    "itemstackItemstackWithdata",
    "itemstackWithdata",
    "itemstackWithData",
    "ItemstackWithData",
    "itemWithData",
    "item_with_data",
    "itemstack_with_data",
    "itemstack_withdata",
    "itemstackItemstack_withdata",
  ];
  static override symbol = "with_data";
  static override interactName = "itemstackWithData";
  static override operatorName = "itemstack_withdata" as const;
  static override displayName = "Item With Data" as const;
  static override fullDisplayName = "Item Item With Data" as const;
  static override stringDisplayNames = [
    "item item with data",
    "item item with Data",
    "item item With data",
    "item item With Data",
    "item Item with data",
    "item Item with Data",
    "item Item With data",
    "item Item With Data",
    "Item item with data",
    "Item item with Data",
    "Item item With data",
    "Item item With Data",
    "Item Item with data",
    "Item Item with Data",
    "Item Item With data",
    "Item Item With Data",
    "item itemstack with data",
    "item itemstack with Data",
    "item itemstack With data",
    "item itemstack With Data",
    "item Itemstack with data",
    "item Itemstack with Data",
    "item Itemstack With data",
    "item Itemstack With Data",
    "item itemStack with data",
    "item itemStack with Data",
    "item itemStack With data",
    "item itemStack With Data",
    "item ItemStack with data",
    "item ItemStack with Data",
    "item ItemStack With data",
    "item ItemStack With Data",
    "Item itemstack with data",
    "Item itemstack with Data",
    "Item itemstack With data",
    "Item itemstack With Data",
    "Item Itemstack with data",
    "Item Itemstack with Data",
    "Item Itemstack With data",
    "Item Itemstack With Data",
    "Item itemStack with data",
    "Item itemStack with Data",
    "Item itemStack With data",
    "Item itemStack With Data",
    "Item ItemStack with data",
    "Item ItemStack with Data",
    "Item ItemStack With data",
    "Item ItemStack With Data",
    "itemstack item with data",
    "itemstack item with Data",
    "itemstack item With data",
    "itemstack item With Data",
    "itemstack Item with data",
    "itemstack Item with Data",
    "itemstack Item With data",
    "itemstack Item With Data",
    "Itemstack item with data",
    "Itemstack item with Data",
    "Itemstack item With data",
    "Itemstack item With Data",
    "Itemstack Item with data",
    "Itemstack Item with Data",
    "Itemstack Item With data",
    "Itemstack Item With Data",
    "itemStack item with data",
    "itemStack item with Data",
    "itemStack item With data",
    "itemStack item With Data",
    "itemStack Item with data",
    "itemStack Item with Data",
    "itemStack Item With data",
    "itemStack Item With Data",
    "ItemStack item with data",
    "ItemStack item with Data",
    "ItemStack item With data",
    "ItemStack item With Data",
    "ItemStack Item with data",
    "ItemStack Item with Data",
    "ItemStack Item With data",
    "ItemStack Item With Data",
    "itemstack itemstack with data",
    "itemstack itemstack with Data",
    "itemstack itemstack With data",
    "itemstack itemstack With Data",
    "itemstack Itemstack with data",
    "itemstack Itemstack with Data",
    "itemstack Itemstack With data",
    "itemstack Itemstack With Data",
    "itemstack itemStack with data",
    "itemstack itemStack with Data",
    "itemstack itemStack With data",
    "itemstack itemStack With Data",
    "itemstack ItemStack with data",
    "itemstack ItemStack with Data",
    "itemstack ItemStack With data",
    "itemstack ItemStack With Data",
    "Itemstack itemstack with data",
    "Itemstack itemstack with Data",
    "Itemstack itemstack With data",
    "Itemstack itemstack With Data",
    "Itemstack Itemstack with data",
    "Itemstack Itemstack with Data",
    "Itemstack Itemstack With data",
    "Itemstack Itemstack With Data",
    "Itemstack itemStack with data",
    "Itemstack itemStack with Data",
    "Itemstack itemStack With data",
    "Itemstack itemStack With Data",
    "Itemstack ItemStack with data",
    "Itemstack ItemStack with Data",
    "Itemstack ItemStack With data",
    "Itemstack ItemStack With Data",
    "itemStack itemstack with data",
    "itemStack itemstack with Data",
    "itemStack itemstack With data",
    "itemStack itemstack With Data",
    "itemStack Itemstack with data",
    "itemStack Itemstack with Data",
    "itemStack Itemstack With data",
    "itemStack Itemstack With Data",
    "itemStack itemStack with data",
    "itemStack itemStack with Data",
    "itemStack itemStack With data",
    "itemStack itemStack With Data",
    "itemStack ItemStack with data",
    "itemStack ItemStack with Data",
    "itemStack ItemStack With data",
    "itemStack ItemStack With Data",
    "ItemStack itemstack with data",
    "ItemStack itemstack with Data",
    "ItemStack itemstack With data",
    "ItemStack itemstack With Data",
    "ItemStack Itemstack with data",
    "ItemStack Itemstack with Data",
    "ItemStack Itemstack With data",
    "ItemStack Itemstack With Data",
    "ItemStack itemStack with data",
    "ItemStack itemStack with Data",
    "ItemStack itemStack With data",
    "ItemStack itemStack With Data",
    "ItemStack ItemStack with data",
    "ItemStack ItemStack with Data",
    "ItemStack ItemStack With data",
    "ItemStack ItemStack With Data",
    "item with data",
    "item with Data",
    "item With data",
    "item With Data",
    "Item with data",
    "Item with Data",
    "Item With data",
    "Item With Data",
    "itemstack with data",
    "itemstack with Data",
    "itemstack With data",
    "itemstack With Data",
    "Itemstack with data",
    "Itemstack with Data",
    "Itemstack With data",
    "Itemstack With Data",
    "itemStack with data",
    "itemStack with Data",
    "itemStack With data",
    "itemStack With Data",
    "ItemStack with data",
    "ItemStack with Data",
    "ItemStack With data",
    "ItemStack With Data",
  ];
  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
        normalizeSignature
      ),
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
