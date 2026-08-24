import { InventoryAspectBase } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryAspectBase";

export class INVENTORY_OBJECT_ITEM_STACK_SLOT extends InventoryAspectBase {
  static displayName = "slotItem";
  static fullDisplayName = "Slot Item";
  static nicknames = [
    "slotItem",
    "slot_item",
    "itemStackSlot",
    "item_stack_slot",
    "inventorySlotItem",
    "inventory_slot_item",
  ];
  static settings = { slotid: 0 };
  static settingsInfo = {
    slotid: { displayName: "Slot ID" },
  };
  static icon = "inventory/itemstack";
  static outputType = "Item";
}
