import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_DOUBLE_FILLRATIO extends InventoryAspectBase {
  static displayName = "fillRatio";
  static fullDisplayName = "Fill Ratio";
  static nicknames = [
    "fillRatio",
    "fill_ratio",
    "inventoryFillRatio",
    "inventory_fill_ratio",
  ];
  static settings = {};
  static icon = "double/inventory/fillratio";
  static outputType = "Double";
  static tooltipInfo =
    "The number of non-empty slots divided by the total number of slots";
}
