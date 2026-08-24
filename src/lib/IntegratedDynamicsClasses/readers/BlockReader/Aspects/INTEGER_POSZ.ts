import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_INTEGER_POSZ extends BlockAspectBase {
  static displayName = "zCoordinate";
  static fullDisplayName = "Z Coordinate";
  static nicknames = ["zCoordinate", "z_coordinate", "posZ", "pos_z", "z"];
  static settings = {};
  static icon = "integer/block/posz";
  static outputType = "Integer";
}
