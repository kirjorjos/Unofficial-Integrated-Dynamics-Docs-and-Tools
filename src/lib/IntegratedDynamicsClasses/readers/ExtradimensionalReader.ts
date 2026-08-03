import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class ExtradimensionalReader extends ReaderBase {
  static typeName = "ExtradimensionalReader";
  static shortName = "extradimensional";
  /** 9-bit compressed ID — position 17 in aspects.json reader order */
  static numericID = 17;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    INTEGER_RANDOM: { settings: {} },
    INTEGER_PLAYERCOUNT: { settings: {} },
    INTEGER_TICKTIME: { settings: {} },
    DOUBLE_TPS: { settings: {} },
    LIST_PLAYERS: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    INTEGER_RANDOM: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_PLAYERCOUNT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_TICKTIME: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    DOUBLE_TPS: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    LIST_PLAYERS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
  };
}
