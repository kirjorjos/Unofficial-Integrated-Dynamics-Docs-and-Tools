import { BlockAspectBase } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockAspectBase";

export class BLOCK_BLOCK extends BlockAspectBase {
  static displayName = "block";
  static fullDisplayName = "Block";
  static nicknames = ["block", "blockState", "block_state", "state"];
  static settings = {};
  static icon = "block";
  static outputType = "Block";
}
