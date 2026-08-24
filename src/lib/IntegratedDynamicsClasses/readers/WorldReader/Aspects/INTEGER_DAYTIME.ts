import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_INTEGER_DAYTIME extends WorldAspectBase {
  static displayName = "dayTime";
  static fullDisplayName = "Day Time";
  static nicknames = ["dayTime", "day_time", "timeOfDay", "time_of_day"];
  static settings = {};
  static icon = "integer/world/daytime";
  static outputType = "Integer";
  static tooltipInfo = "The time that has passed in the target world day";
}
