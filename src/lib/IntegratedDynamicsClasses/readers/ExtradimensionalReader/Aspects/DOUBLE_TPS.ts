import { ExtradimensionalAspectBase } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalAspectBase";

export class EXTRADIMENSIONAL_DOUBLE_TPS extends ExtradimensionalAspectBase {
  static displayName = "tps";
  static fullDisplayName = "TPS";
  static nicknames = ["tps", "tickRate", "ticksPerSecond", "ticks_per_second"];
  static settings = {};
  static icon = "double/extradimensional/tps";
  static outputType = "Double";
  static tooltipInfo = "The average number of ticks per second over all worlds";
}
