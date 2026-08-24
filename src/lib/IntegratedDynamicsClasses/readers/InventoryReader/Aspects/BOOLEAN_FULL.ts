import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_BOOLEAN_FULL extends InventoryAspectBase {
  static displayName = "inventoryFull";
  static fullDisplayName = "Inventory Full";
  static nicknames = ["inventoryFull", "inventory_full", "full", "isFull"];
  static settings = {};
  static icon = "boolean/inventory/full";
  static outputType = "Boolean";
}
