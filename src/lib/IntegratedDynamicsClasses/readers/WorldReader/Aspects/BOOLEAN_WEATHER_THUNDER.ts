import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_BOOLEAN_WEATHER_THUNDER extends WorldAspectBase {
  static displayName = "weatherThunder";
  static fullDisplayName = "Weather: Thunder";
  static nicknames = [
    "weatherThunder",
    "weather_thunder",
    "isThundering",
    "thundering",
    "thunder",
  ];
  static settings = {};
  static icon = "boolean/world/weather/thunder";
  static outputType = "Boolean";
  static tooltipInfo = "If there is a thunderstorm in the world";
}
