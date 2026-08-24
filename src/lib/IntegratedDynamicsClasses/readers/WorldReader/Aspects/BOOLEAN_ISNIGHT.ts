import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_BOOLEAN_ISNIGHT extends WorldAspectBase {
  static displayName = "isNight";
  static fullDisplayName = "Is Night";
  static nicknames = ["isNight", "is_night", "night"];
  static settings = {};
  static icon = "boolean/world/isnight";
  static outputType = "Boolean";
  static tooltipInfo = "If it is night in the target world";
}
