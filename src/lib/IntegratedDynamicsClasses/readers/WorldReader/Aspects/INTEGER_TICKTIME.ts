import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_INTEGER_TICKTIME extends WorldAspectBase {
  static displayName = "tickTime";
  static fullDisplayName = "Tick time";
  static nicknames = ["tickTime", "tick_time", "tick"];
  static settings = {};
  static icon = "integer/world/ticktime";
  static outputType = "Integer";
}
