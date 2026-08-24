import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_LONG_TOTALTIME extends WorldAspectBase {
  static displayName = "totalTime";
  static fullDisplayName = "Total Time";
  static nicknames = [
    "totalTime",
    "total_time",
    "worldTotalTime",
    "world_total_time",
  ];
  static settings = {};
  static icon = "long/world/totaltime";
  static outputType = "Long";
  static tooltipInfo = "The world time independent of the set time command";
}
