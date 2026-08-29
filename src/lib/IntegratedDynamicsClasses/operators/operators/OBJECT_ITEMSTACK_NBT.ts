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
    "itemNBT",
    "itemstackNbt",
    "itemstackNBT",
    "itemStackNBT",
    "ItemstackNbt",
    "item_n_b_t",
    "item_stack_n_b_t",
    "itemstack_n_b_t",
    "itemstack_nbt",
  ];
  static override symbol = "nbt";
  static override interactName = "itemStackNBT";
  static override operatorName = "nbt" as const;
  static override displayName = "Item NBT" as const;
  static override fullDisplayName = "Item Item NBT" as const;
  static override stringDisplayNames = [
    "item item nbt",
    "item item Nbt",
    "item Item nbt",
    "item Item Nbt",
    "Item item nbt",
    "Item item Nbt",
    "Item Item nbt",
    "Item Item Nbt",
    "item item NBT",
    "item Item NBT",
    "Item item NBT",
    "Item Item NBT",
    "item itemstack nbt",
    "item itemstack Nbt",
    "item Itemstack nbt",
    "item Itemstack Nbt",
    "item itemStack nbt",
    "item itemStack Nbt",
    "item ItemStack nbt",
    "item ItemStack Nbt",
    "Item itemstack nbt",
    "Item itemstack Nbt",
    "Item Itemstack nbt",
    "Item Itemstack Nbt",
    "Item itemStack nbt",
    "Item itemStack Nbt",
    "Item ItemStack nbt",
    "Item ItemStack Nbt",
    "item itemstack NBT",
    "item Itemstack NBT",
    "item itemStack NBT",
    "item ItemStack NBT",
    "Item itemstack NBT",
    "Item Itemstack NBT",
    "Item itemStack NBT",
    "Item ItemStack NBT",
    "itemstack item nbt",
    "itemstack item Nbt",
    "itemstack Item nbt",
    "itemstack Item Nbt",
    "Itemstack item nbt",
    "Itemstack item Nbt",
    "Itemstack Item nbt",
    "Itemstack Item Nbt",
    "itemStack item nbt",
    "itemStack item Nbt",
    "itemStack Item nbt",
    "itemStack Item Nbt",
    "ItemStack item nbt",
    "ItemStack item Nbt",
    "ItemStack Item nbt",
    "ItemStack Item Nbt",
    "itemstack item NBT",
    "itemstack Item NBT",
    "Itemstack item NBT",
    "Itemstack Item NBT",
    "itemStack item NBT",
    "itemStack Item NBT",
    "ItemStack item NBT",
    "ItemStack Item NBT",
    "itemstack itemstack nbt",
    "itemstack itemstack Nbt",
    "itemstack Itemstack nbt",
    "itemstack Itemstack Nbt",
    "itemstack itemStack nbt",
    "itemstack itemStack Nbt",
    "itemstack ItemStack nbt",
    "itemstack ItemStack Nbt",
    "Itemstack itemstack nbt",
    "Itemstack itemstack Nbt",
    "Itemstack Itemstack nbt",
    "Itemstack Itemstack Nbt",
    "Itemstack itemStack nbt",
    "Itemstack itemStack Nbt",
    "Itemstack ItemStack nbt",
    "Itemstack ItemStack Nbt",
    "itemStack itemstack nbt",
    "itemStack itemstack Nbt",
    "itemStack Itemstack nbt",
    "itemStack Itemstack Nbt",
    "itemStack itemStack nbt",
    "itemStack itemStack Nbt",
    "itemStack ItemStack nbt",
    "itemStack ItemStack Nbt",
    "ItemStack itemstack nbt",
    "ItemStack itemstack Nbt",
    "ItemStack Itemstack nbt",
    "ItemStack Itemstack Nbt",
    "ItemStack itemStack nbt",
    "ItemStack itemStack Nbt",
    "ItemStack ItemStack nbt",
    "ItemStack ItemStack Nbt",
    "itemstack itemstack NBT",
    "itemstack Itemstack NBT",
    "itemstack itemStack NBT",
    "itemstack ItemStack NBT",
    "Itemstack itemstack NBT",
    "Itemstack Itemstack NBT",
    "Itemstack itemStack NBT",
    "Itemstack ItemStack NBT",
    "itemStack itemstack NBT",
    "itemStack Itemstack NBT",
    "itemStack itemStack NBT",
    "itemStack ItemStack NBT",
    "ItemStack itemstack NBT",
    "ItemStack Itemstack NBT",
    "ItemStack itemStack NBT",
    "ItemStack ItemStack NBT",
    "item nbt",
    "item Nbt",
    "Item nbt",
    "Item Nbt",
    "item NBT",
    "Item NBT",
    "itemstack nbt",
    "itemstack Nbt",
    "Itemstack nbt",
    "Itemstack Nbt",
    "itemStack nbt",
    "itemStack Nbt",
    "ItemStack nbt",
    "ItemStack Nbt",
    "itemstack NBT",
    "Itemstack NBT",
    "itemStack NBT",
    "ItemStack NBT",
  ];
  static override tooltipInfo = "Get the NBT tag of the given item." as const;

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
