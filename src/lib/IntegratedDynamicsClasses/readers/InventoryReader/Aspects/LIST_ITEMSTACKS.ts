import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_LIST_ITEMSTACKS extends InventoryAspectBase {
  static displayName = "items";
  static fullDisplayName = "Items";
  static nicknames = [
    "items",
    "itemStacks",
    "inventoryItems",
    "inventory_items",
    "itemstacks",
    "item_stacks",
  ];
  static settings = {};
  static icon = "list/inventory/itemstacks";
  static outputType = "List";
  static tooltipInfo = "Get a list of the items in the inventory";
}
