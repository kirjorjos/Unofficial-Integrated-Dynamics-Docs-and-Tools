import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_PLANT extends BaseOperator<Item, Block> {
  static override internalName = "integrateddynamics:itemstack_plant" as const;
  static override numericID = 124;
  static override nicknames = ["itemstackPlant", "itemstack_plant"];
  static override symbol = "plant";
  static override interactName = "plant";
  static override operatorName = "plant" as const;
  static override displayName = "Item Plant" as const;
  static override fullDisplayName = "Item Item Plant" as const;
  static override stringDisplayNames = [
    "item item plant",
    "item item Plant",
    "item Item plant",
    "item Item Plant",
    "Item item plant",
    "Item item Plant",
    "Item Item plant",
    "Item Item Plant",
    "item itemstack plant",
    "item itemstack Plant",
    "item Itemstack plant",
    "item Itemstack Plant",
    "item itemStack plant",
    "item itemStack Plant",
    "item ItemStack plant",
    "item ItemStack Plant",
    "Item itemstack plant",
    "Item itemstack Plant",
    "Item Itemstack plant",
    "Item Itemstack Plant",
    "Item itemStack plant",
    "Item itemStack Plant",
    "Item ItemStack plant",
    "Item ItemStack Plant",
    "itemstack item plant",
    "itemstack item Plant",
    "itemstack Item plant",
    "itemstack Item Plant",
    "Itemstack item plant",
    "Itemstack item Plant",
    "Itemstack Item plant",
    "Itemstack Item Plant",
    "itemStack item plant",
    "itemStack item Plant",
    "itemStack Item plant",
    "itemStack Item Plant",
    "ItemStack item plant",
    "ItemStack item Plant",
    "ItemStack Item plant",
    "ItemStack Item Plant",
    "itemstack itemstack plant",
    "itemstack itemstack Plant",
    "itemstack Itemstack plant",
    "itemstack Itemstack Plant",
    "itemstack itemStack plant",
    "itemstack itemStack Plant",
    "itemstack ItemStack plant",
    "itemstack ItemStack Plant",
    "Itemstack itemstack plant",
    "Itemstack itemstack Plant",
    "Itemstack Itemstack plant",
    "Itemstack Itemstack Plant",
    "Itemstack itemStack plant",
    "Itemstack itemStack Plant",
    "Itemstack ItemStack plant",
    "Itemstack ItemStack Plant",
    "itemStack itemstack plant",
    "itemStack itemstack Plant",
    "itemStack Itemstack plant",
    "itemStack Itemstack Plant",
    "itemStack itemStack plant",
    "itemStack itemStack Plant",
    "itemStack ItemStack plant",
    "itemStack ItemStack Plant",
    "ItemStack itemstack plant",
    "ItemStack itemstack Plant",
    "ItemStack Itemstack plant",
    "ItemStack Itemstack Plant",
    "ItemStack itemStack plant",
    "ItemStack itemStack Plant",
    "ItemStack ItemStack plant",
    "ItemStack ItemStack Plant",
    "item plant",
    "item Plant",
    "Item plant",
    "Item Plant",
    "itemstack plant",
    "itemstack Plant",
    "Itemstack plant",
    "Itemstack Plant",
    "itemStack plant",
    "itemStack Plant",
    "ItemStack plant",
    "ItemStack Plant",
  ];
  static override tooltipInfo =
    "The resulting block when this item is planted" as const;

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
            type: "Block",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Block => {
        return item.getPlant();
      },
    });
  }
}
