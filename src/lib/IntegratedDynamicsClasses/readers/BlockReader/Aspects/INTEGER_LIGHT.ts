import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_INTEGER_LIGHT extends BlockAspectBase {
  static displayName = "lightLevel";
  static fullDisplayName = "Light Level";
  static nicknames = [
    "lightLevel",
    "light_level",
    "blockLight",
    "block_light",
    "light",
  ];
  static settings = {};
  static icon = "integer/block/light";
  static outputType = "Integer";
}
