import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_INTEGER_DIMENSION extends BlockAspectBase {
  static displayName = "dimension";
  static fullDisplayName = "Dimension";
  static nicknames = [
    "dimension",
    "blockDimension",
    "block_dimension",
    "dimensionId",
    "dimension_id",
  ];
  static settings = {};
  static icon = "string/block/dimension";
  static outputType = "String";
}
