import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_INTEGER_POSX extends BlockAspectBase {
  static displayName = "xCoordinate";
  static fullDisplayName = "X Coordinate";
  static nicknames = ["xCoordinate", "x_coordinate", "posX", "pos_x", "x"];
  static settings = {};
  static icon = "integer/block/posx";
  static outputType = "Integer";
  static tooltipInfo = "The X coordinate of the target";
}
