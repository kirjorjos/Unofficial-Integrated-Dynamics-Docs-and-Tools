import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_BOOLEAN_ISDAY extends WorldAspectBase {
  static displayName = "isDay";
  static fullDisplayName = "Is Day";
  static nicknames = ["isDay", "is_day", "day"];
  static settings = {};
  static icon = "boolean/world/isday";
  static outputType = "Boolean";
  static tooltipInfo = "If it is day in the target world";
}
