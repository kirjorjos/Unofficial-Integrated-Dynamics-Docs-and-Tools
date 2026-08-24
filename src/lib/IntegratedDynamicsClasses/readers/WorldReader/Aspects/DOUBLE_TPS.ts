import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_DOUBLE_TPS extends WorldAspectBase {
  static displayName = "tps";
  static fullDisplayName = "TPS";
  static nicknames = ["tps", "tickRate", "ticksPerSecond", "ticks_per_second"];
  static settings = {};
  static icon = "double/world/tps";
  static outputType = "Double";
}
