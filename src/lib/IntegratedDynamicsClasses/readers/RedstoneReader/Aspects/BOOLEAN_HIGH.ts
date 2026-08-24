import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_BOOLEAN_HIGH extends RedstoneAspectBase {
  static displayName = "redstoneHigh";
  static fullDisplayName = "Redstone High";
  static nicknames = [
    "redstoneHigh",
    "redstone_high",
    "high",
    "isRedstoneHigh",
  ];
  static settings = {};
  static icon = "boolean/redstone/high";
  static outputType = "Boolean";
  static tooltipInfo = "If the redstone level is at its maximum";
}
