import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_BOOLEAN_APPLICABLE extends InventoryAspectBase {
  static displayName = "isInventory";
  static fullDisplayName = "Is Inventory";
  static nicknames = [
    "isInventory",
    "inventoryApplicable",
    "inventory_applicable",
    "is_inventory",
  ];
  static settings = {};
  static icon = "boolean/inventory/applicable";
  static outputType = "Boolean";
  static tooltipInfo = "If the target has an inventory";
}
