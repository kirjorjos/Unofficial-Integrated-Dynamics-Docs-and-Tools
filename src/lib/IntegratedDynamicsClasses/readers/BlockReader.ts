import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class BlockReader extends ReaderBase {
  static typeName = "BlockReader";
  static shortName = "block";
  /** 9-bit compressed ID — position 15 in aspects.json reader order */
  static numericID = 15;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_BLOCK: {
      settings: {},
      icon: "boolean/block/block",
      displayName: "Has Block",
    },
    INTEGER_DIMENSION: {
      settings: {},
      icon: "string/block/dimension",
      displayName: "Dimension",
    },
    INTEGER_POSX: {
      settings: {},
      icon: "integer/block/posx",
      displayName: "X Coordinate",
    },
    INTEGER_POSY: {
      settings: {},
      icon: "integer/block/posy",
      displayName: "Y Coordinate",
    },
    INTEGER_POSZ: {
      settings: {},
      icon: "integer/block/posz",
      displayName: "Z Coordinate",
    },
    BLOCK: { settings: {}, icon: "block", displayName: "Block" },
    NBT: {
      settings: {},
      icon: "nbt/block/tile",
      displayName: "Tile Entity NBT",
    },
    STRING_BIOME: {
      settings: {},
      icon: "string/block/biome",
      displayName: "Biome",
    },
    INTEGER_LIGHT: {
      settings: {},
      icon: "integer/block/light",
      displayName: "Light Level",
    },
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
