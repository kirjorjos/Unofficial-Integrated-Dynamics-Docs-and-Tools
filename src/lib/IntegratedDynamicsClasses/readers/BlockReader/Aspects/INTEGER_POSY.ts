import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_INTEGER_POSY extends BlockAspectBase {
  static displayName = "yCoordinate";
  static fullDisplayName = "Y Coordinate";
  static nicknames = ["yCoordinate", "y_coordinate", "posY", "pos_y", "y"];
  static settings = {};
  static icon = "integer/block/posy";
  static outputType = "Integer";
  static tooltipInfo = "The Y coordinate of the target";
}
