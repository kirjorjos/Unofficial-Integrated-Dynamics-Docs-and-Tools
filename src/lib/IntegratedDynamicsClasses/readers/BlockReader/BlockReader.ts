import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { BLOCK_BOOLEAN_BLOCK } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/BOOLEAN_BLOCK";
import { BLOCK_INTEGER_DIMENSION } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/INTEGER_DIMENSION";
import { BLOCK_INTEGER_POSX } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/INTEGER_POSX";
import { BLOCK_INTEGER_POSY } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/INTEGER_POSY";
import { BLOCK_INTEGER_POSZ } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/INTEGER_POSZ";
import { BLOCK_BLOCK } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/BLOCK";
import { BLOCK_NBT } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/NBT";
import { BLOCK_STRING_BIOME } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/STRING_BIOME";
import { BLOCK_INTEGER_LIGHT } from "lib/IntegratedDynamicsClasses/readers/BlockReader/Aspects/INTEGER_LIGHT";

export class BlockReader extends ReaderBase {
  static typeName = "BlockReader";
  static shortName = "block";
  static numericID = 15;

  static aspects: ReaderAspects = {
    BOOLEAN_BLOCK: BLOCK_BOOLEAN_BLOCK,
    INTEGER_DIMENSION: BLOCK_INTEGER_DIMENSION,
    INTEGER_POSX: BLOCK_INTEGER_POSX,
    INTEGER_POSY: BLOCK_INTEGER_POSY,
    INTEGER_POSZ: BLOCK_INTEGER_POSZ,
    BLOCK: BLOCK_BLOCK,
    NBT: BLOCK_NBT,
    STRING_BIOME: BLOCK_STRING_BIOME,
    INTEGER_LIGHT: BLOCK_INTEGER_LIGHT,
  };
}
