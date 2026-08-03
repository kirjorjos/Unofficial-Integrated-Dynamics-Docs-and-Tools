import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class RedstoneReader extends ReaderBase {
  static typeName = "RedstoneReader";
  static shortName = "redstone";
  /** 9-bit compressed ID — position 1 in aspects.json reader order */
  static numericID = 1;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_LOW: { settings: {} },
    BOOLEAN_NONLOW: { settings: {} },
    BOOLEAN_HIGH: { settings: {} },
    BOOLEAN_CLOCK: { settings: { interval: 20, length: 1, offset: 0 } },
    INTEGER_VALUE: { settings: {} },
    INTEGER_COMPARATOR: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_LOW: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_NONLOW: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_HIGH: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_CLOCK: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_VALUE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_COMPARATOR: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
  };
}
