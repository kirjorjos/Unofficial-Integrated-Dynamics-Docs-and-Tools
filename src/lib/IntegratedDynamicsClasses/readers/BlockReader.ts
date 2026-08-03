import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class BlockReader extends ReaderBase {
  static typeName = "BlockReader";
  static shortName = "block";
  /** 9-bit compressed ID — position 15 in aspects.json reader order */
  static numericID = 15;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_BLOCK: { settings: {} },
    INTEGER_DIMENSION: { settings: {} },
    INTEGER_POSX: { settings: {} },
    INTEGER_POSY: { settings: {} },
    INTEGER_POSZ: { settings: {} },
    BLOCK: { settings: {} },
    NBT: { settings: {} },
    STRING_BIOME: { settings: {} },
    INTEGER_LIGHT: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_BLOCK: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_DIMENSION: OUTPUT_TYPE_TO_AST_TYPE["string"].astType,
    INTEGER_POSX: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_POSY: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_POSZ: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    BLOCK: OUTPUT_TYPE_TO_AST_TYPE["block"].astType,
    NBT: OUTPUT_TYPE_TO_AST_TYPE["nbt"].astType,
    STRING_BIOME: OUTPUT_TYPE_TO_AST_TYPE["string"].astType,
    INTEGER_LIGHT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
  };
}
