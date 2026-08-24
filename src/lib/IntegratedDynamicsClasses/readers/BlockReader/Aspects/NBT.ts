import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_NBT extends BlockAspectBase {
  static displayName = "tileEntityNbt";
  static fullDisplayName = "Tile Entity NBT";
  static nicknames = [
    "tileEntityNbt",
    "tile_entity_nbt",
    "tileNBT",
    "tile_nbt",
    "blockNbt",
    "block_nbt",
    "nbt",
  ];
  static settings = {};
  static icon = "nbt/block/tile";
  static outputType = "NBT";
  static tooltipInfo = "The target Tile Entity as NBT";
}
