import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_INTEGER_COUNT extends InventoryAspectBase {
  static displayName = "inventoryCount";
  static fullDisplayName = "Inventory Count";
  static nicknames = [
    "inventoryCount",
    "inventory_count",
    "count",
    "itemCount",
  ];
  static settings = {};
  static icon = "integer/inventory/count";
  static outputType = "Integer";
  static tooltipInfo = "Get the total amount of items";
}
