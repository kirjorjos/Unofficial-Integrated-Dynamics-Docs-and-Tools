import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_INTEGER_SLOTSFILLED extends InventoryAspectBase {
  static displayName = "slotsFilled";
  static fullDisplayName = "Slots Filled";
  static nicknames = [
    "slotsFilled",
    "slots_filled",
    "filledSlots",
    "filled_slots",
  ];
  static settings = {};
  static icon = "integer/inventory/slotsfilled";
  static outputType = "Integer";
  static tooltipInfo = "The number of slots that have an item";
}
