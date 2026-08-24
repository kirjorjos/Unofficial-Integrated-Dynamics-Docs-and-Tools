import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_BOOLEAN_LOW extends RedstoneAspectBase {
  static displayName = "redstoneLow";
  static fullDisplayName = "Redstone Low";
  static nicknames = ["redstoneLow", "redstone_low", "low", "isRedstoneLow"];
  static settings = {};
  static icon = "boolean/redstone/low";
  static outputType = "Boolean";
}
