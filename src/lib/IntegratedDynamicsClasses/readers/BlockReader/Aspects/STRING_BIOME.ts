import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_STRING_BIOME extends BlockAspectBase {
  static displayName = "biome";
  static fullDisplayName = "Biome";
  static nicknames = [
    "biome",
    "blockBiome",
    "block_biome",
    "biomeName",
    "biome_name",
  ];
  static settings = {};
  static icon = "string/block/biome";
  static outputType = "String";
  static tooltipInfo = "The biome name at the target";
}
