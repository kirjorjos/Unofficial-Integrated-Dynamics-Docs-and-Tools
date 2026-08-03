import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class InventoryReader extends ReaderBase {
  static typeName = "InventoryReader";
  static shortName = "inventory";
  /** 9-bit compressed ID — position 3 in aspects.json reader order */
  static numericID = 3;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_FULL: { settings: {} },
    BOOLEAN_EMPTY: { settings: {} },
    BOOLEAN_NONEMPTY: { settings: {} },
    BOOLEAN_APPLICABLE: { settings: {} },
    INTEGER_COUNT: { settings: {} },
    INTEGER_SLOTS: { settings: {} },
    INTEGER_SLOTSFILLED: { settings: {} },
    DOUBLE_FILLRATIO: { settings: {} },
    LIST_ITEMSTACKS: { settings: {} },
    OBJECT_ITEM_STACK_SLOT: { settings: { slotid: 0 } },
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
