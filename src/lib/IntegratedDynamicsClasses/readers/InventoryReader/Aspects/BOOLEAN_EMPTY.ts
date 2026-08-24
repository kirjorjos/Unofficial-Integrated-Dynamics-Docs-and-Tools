import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_BOOLEAN_EMPTY extends InventoryAspectBase {
  static displayName = "inventoryEmpty";
  static fullDisplayName = "Inventory Empty";
  static nicknames = ["inventoryEmpty", "inventory_empty", "empty", "isEmpty"];
  static settings = {};
  static icon = "boolean/inventory/empty";
  static outputType = "Boolean";
}
