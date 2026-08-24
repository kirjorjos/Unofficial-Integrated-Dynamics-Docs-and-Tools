import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_INTEGER_RAINCOUNTDOWN extends WorldAspectBase {
  static displayName = "rainCountdown";
  static fullDisplayName = "Rain Countdown";
  static nicknames = ["rainCountdown", "rain_countdown", "countdown"];
  static settings = {};
  static icon = "integer/world/raincountdown";
  static outputType = "Integer";
  static tooltipInfo = "The amount of ticks until it will rain in this world";
}
