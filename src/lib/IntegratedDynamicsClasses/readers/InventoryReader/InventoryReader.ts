import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { INVENTORY_BOOLEAN_FULL } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/BOOLEAN_FULL";
import { INVENTORY_BOOLEAN_EMPTY } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/BOOLEAN_EMPTY";
import { INVENTORY_BOOLEAN_NONEMPTY } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/BOOLEAN_NONEMPTY";
import { INVENTORY_BOOLEAN_APPLICABLE } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/BOOLEAN_APPLICABLE";
import { INVENTORY_INTEGER_COUNT } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/INTEGER_COUNT";
import { INVENTORY_INTEGER_SLOTS } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/INTEGER_SLOTS";
import { INVENTORY_INTEGER_SLOTSFILLED } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/INTEGER_SLOTSFILLED";
import { INVENTORY_DOUBLE_FILLRATIO } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/DOUBLE_FILLRATIO";
import { INVENTORY_LIST_ITEMSTACKS } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/LIST_ITEMSTACKS";
import { INVENTORY_OBJECT_ITEM_STACK_SLOT } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/Aspects/OBJECT_ITEM_STACK_SLOT";

export class InventoryReader extends ReaderBase {
  static typeName = "InventoryReader";
  static shortName = "inventory";
  static numericID = 3;

  static aspects: ReaderAspects = {
    BOOLEAN_FULL: INVENTORY_BOOLEAN_FULL,
    BOOLEAN_EMPTY: INVENTORY_BOOLEAN_EMPTY,
    BOOLEAN_NONEMPTY: INVENTORY_BOOLEAN_NONEMPTY,
    BOOLEAN_APPLICABLE: INVENTORY_BOOLEAN_APPLICABLE,
    INTEGER_COUNT: INVENTORY_INTEGER_COUNT,
    INTEGER_SLOTS: INVENTORY_INTEGER_SLOTS,
    INTEGER_SLOTSFILLED: INVENTORY_INTEGER_SLOTSFILLED,
    DOUBLE_FILLRATIO: INVENTORY_DOUBLE_FILLRATIO,
    LIST_ITEMSTACKS: INVENTORY_LIST_ITEMSTACKS,
    OBJECT_ITEM_STACK_SLOT: INVENTORY_OBJECT_ITEM_STACK_SLOT,
  };
}
