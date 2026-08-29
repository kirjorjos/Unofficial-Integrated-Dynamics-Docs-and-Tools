import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OBJECT_ITEMSTACK_INVENTORY extends BaseOperator<
  Item,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:itemstack_inventory" as const;
  static override numericID = 134;
  static override nicknames = [
    "itemInventory",
    "itemstackInventory",
    "ItemstackInventory",
    "item_inventory",
    "itemstack_inventory",
  ];
  static override symbol = "inventory";
  static override interactName = "itemstackInventory";
  static override operatorName = "inventory" as const;
  static override displayName = "Item Inventory" as const;
  static override fullDisplayName = "Item Item Inventory" as const;
  static override stringDisplayNames = [
    "item item inventory",
    "item item Inventory",
    "item Item inventory",
    "item Item Inventory",
    "Item item inventory",
    "Item item Inventory",
    "Item Item inventory",
    "Item Item Inventory",
    "item itemstack inventory",
    "item itemstack Inventory",
    "item Itemstack inventory",
    "item Itemstack Inventory",
    "item itemStack inventory",
    "item itemStack Inventory",
    "item ItemStack inventory",
    "item ItemStack Inventory",
    "Item itemstack inventory",
    "Item itemstack Inventory",
    "Item Itemstack inventory",
    "Item Itemstack Inventory",
    "Item itemStack inventory",
    "Item itemStack Inventory",
    "Item ItemStack inventory",
    "Item ItemStack Inventory",
    "itemstack item inventory",
    "itemstack item Inventory",
    "itemstack Item inventory",
    "itemstack Item Inventory",
    "Itemstack item inventory",
    "Itemstack item Inventory",
    "Itemstack Item inventory",
    "Itemstack Item Inventory",
    "itemStack item inventory",
    "itemStack item Inventory",
    "itemStack Item inventory",
    "itemStack Item Inventory",
    "ItemStack item inventory",
    "ItemStack item Inventory",
    "ItemStack Item inventory",
    "ItemStack Item Inventory",
    "itemstack itemstack inventory",
    "itemstack itemstack Inventory",
    "itemstack Itemstack inventory",
    "itemstack Itemstack Inventory",
    "itemstack itemStack inventory",
    "itemstack itemStack Inventory",
    "itemstack ItemStack inventory",
    "itemstack ItemStack Inventory",
    "Itemstack itemstack inventory",
    "Itemstack itemstack Inventory",
    "Itemstack Itemstack inventory",
    "Itemstack Itemstack Inventory",
    "Itemstack itemStack inventory",
    "Itemstack itemStack Inventory",
    "Itemstack ItemStack inventory",
    "Itemstack ItemStack Inventory",
    "itemStack itemstack inventory",
    "itemStack itemstack Inventory",
    "itemStack Itemstack inventory",
    "itemStack Itemstack Inventory",
    "itemStack itemStack inventory",
    "itemStack itemStack Inventory",
    "itemStack ItemStack inventory",
    "itemStack ItemStack Inventory",
    "ItemStack itemstack inventory",
    "ItemStack itemstack Inventory",
    "ItemStack Itemstack inventory",
    "ItemStack Itemstack Inventory",
    "ItemStack itemStack inventory",
    "ItemStack itemStack Inventory",
    "ItemStack ItemStack inventory",
    "ItemStack ItemStack Inventory",
    "item inventory",
    "item Inventory",
    "Item inventory",
    "Item Inventory",
    "itemstack inventory",
    "itemstack Inventory",
    "Itemstack inventory",
    "Itemstack Inventory",
    "itemStack inventory",
    "itemStack Inventory",
    "ItemStack inventory",
    "ItemStack Inventory",
  ];
  static override tooltipInfo =
    "Retrieve the inventory of the given item handler contents" as const;

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
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (item: Item): iArray<Item> => {
        return item.getInventory() as iArray<Item>;
      },
    });
  }
}
