import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_BOOLEAN_WEATHER_RAINING extends WorldAspectBase {
  static displayName = "weatherRain";
  static fullDisplayName = "Weather: Rain";
  static nicknames = [
    "weatherRain",
    "weather_rain",
    "isRaining",
    "raining",
    "weather_raining",
  ];
  static settings = {};
  static icon = "boolean/world/weather/raining";
  static outputType = "Boolean";
}
