import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_LONG_TIME extends WorldAspectBase {
  static displayName = "time";
  static fullDisplayName = "Time";
  static nicknames = [
    "time",
    "worldTime",
    "world_time",
    "gameTime",
    "game_time",
  ];
  static settings = {};
  static icon = "long/world/time";
  static outputType = "Long";
  static tooltipInfo = "The world time dependent of the set time command";
}
