import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_BOOLEAN_BLOCK extends BlockAspectBase {
  static displayName = "hasBlock";
  static fullDisplayName = "Has Block";
  static nicknames = [
    "hasBlock",
    "has_block",
    "isBlock",
    "is_block",
    "blockPresent",
    "block_present",
  ];
  static settings = {};
  static icon = "boolean/block/block";
  static outputType = "Boolean";
}
