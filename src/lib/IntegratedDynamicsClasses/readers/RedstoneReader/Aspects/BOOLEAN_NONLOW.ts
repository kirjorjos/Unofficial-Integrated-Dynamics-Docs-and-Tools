import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_BOOLEAN_NONLOW extends RedstoneAspectBase {
  static displayName = "redstone";
  static fullDisplayName = "Redstone";
  static nicknames = [
    "redstone",
    "redstoneNonLow",
    "redstone_signal",
    "hasRedstone",
  ];
  static settings = {};
  static icon = "boolean/redstone/nonlow";
  static outputType = "Boolean";
  static tooltipInfo = "If there is a redstone level";
}
