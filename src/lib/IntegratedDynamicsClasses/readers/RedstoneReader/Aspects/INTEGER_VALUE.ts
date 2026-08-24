import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_INTEGER_VALUE extends RedstoneAspectBase {
  static displayName = "redstoneValue";
  static fullDisplayName = "Redstone";
  static nicknames = [
    "redstoneValue",
    "redstoneLevel",
    "redstone_level",
    "signalStrength",
  ];
  static settings = {};
  static icon = "integer/redstone/value";
  static outputType = "Integer";
  static tooltipInfo = "Get the exact redstone level";
}
