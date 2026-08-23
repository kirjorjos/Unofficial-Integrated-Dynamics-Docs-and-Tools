import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class InventoryReader extends ReaderBase {
  static typeName = "InventoryReader";
  static shortName = "inventory";
  /** 9-bit compressed ID — position 3 in aspects.json reader order */
  static numericID = 3;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_FULL: {
      settings: {},
      icon: "boolean/inventory/full",
      displayName: "Inventory Full",
    },
    BOOLEAN_EMPTY: {
      settings: {},
      icon: "boolean/inventory/empty",
      displayName: "Inventory Empty",
    },
    BOOLEAN_NONEMPTY: {
      settings: {},
      icon: "boolean/inventory/nonempty",
      displayName: "Inventory Not Empty",
    },
    BOOLEAN_APPLICABLE: {
      settings: {},
      icon: "boolean/inventory/applicable",
      displayName: "Is Inventory",
    },
    INTEGER_COUNT: {
      settings: {},
      icon: "integer/inventory/count",
      displayName: "Inventory Count",
    },
    INTEGER_SLOTS: {
      settings: {},
      icon: "integer/inventory/slots",
      displayName: "Slots",
    },
    INTEGER_SLOTSFILLED: {
      settings: {},
      icon: "integer/inventory/slotsfilled",
      displayName: "Slots Filled",
    },
    DOUBLE_FILLRATIO: {
      settings: {},
      icon: "double/inventory/fillratio",
      displayName: "Fill Ratio",
    },
    LIST_ITEMSTACKS: {
      settings: {},
      icon: "list/inventory/itemstacks",
      displayName: "Items",
    },
    OBJECT_ITEM_STACK_SLOT: {
      settings: { slotid: 0 },
      icon: "inventory/itemstack",
      displayName: "Slot Item",
    },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_FULL: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_EMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_NONEMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_APPLICABLE: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_COUNT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_SLOTS: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_SLOTSFILLED: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    DOUBLE_FILLRATIO: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    LIST_ITEMSTACKS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    OBJECT_ITEM_STACK_SLOT: OUTPUT_TYPE_TO_AST_TYPE["itemstack"].astType,
  };
}
