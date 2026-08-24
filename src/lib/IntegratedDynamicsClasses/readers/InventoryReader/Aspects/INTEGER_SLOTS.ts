import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_INTEGER_SLOTS extends InventoryAspectBase {
  static displayName = "slots";
  static fullDisplayName = "Slots";
  static nicknames = [
    "slots",
    "inventorySlots",
    "inventory_slots",
    "slotCount",
  ];
  static settings = {};
  static icon = "integer/inventory/slots";
  static outputType = "Integer";
  static tooltipInfo = "The number of slots in the inventory";
}
