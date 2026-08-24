import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_BOOLEAN_NONEMPTY extends InventoryAspectBase {
  static displayName = "inventoryNotEmpty";
  static fullDisplayName = "Inventory Not Empty";
  static nicknames = [
    "inventoryNotEmpty",
    "inventory_not_empty",
    "nonEmpty",
    "hasItems",
  ];
  static settings = {};
  static icon = "boolean/inventory/nonempty";
  static outputType = "Boolean";
  static tooltipInfo = "If there is at least one item";
}
