import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_BOOLEAN_CLOCK extends RedstoneAspectBase {
  static displayName = "redstoneClock";
  static fullDisplayName = "Redstone Clock";
  static nicknames = ["redstoneClock", "redstone_clock", "clock"];
  static settings = { interval: 20, length: 1, offset: 0 };
  static icon = "boolean/redstone/clock";
  static outputType = "Boolean";
}
