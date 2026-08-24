import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_BOOLEAN_WEATHER_CLEAR extends WorldAspectBase {
  static displayName = "weatherClear";
  static fullDisplayName = "Weather: Clear";
  static nicknames = [
    "weatherClear",
    "weather_clear",
    "clearWeather",
    "clear_weather",
  ];
  static settings = {};
  static icon = "boolean/world/weather/clear";
  static outputType = "Boolean";
  static tooltipInfo = "If there is a clear weather in the world";
}
