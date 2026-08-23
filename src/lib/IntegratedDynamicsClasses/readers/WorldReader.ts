import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class WorldReader extends ReaderBase {
  static typeName = "WorldReader";
  static shortName = "world";
  /** 9-bit compressed ID — position 4 in aspects.json reader order */
  static numericID = 4;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_WEATHER_CLEAR: {
      settings: {},
      icon: "boolean/world/weather/clear",
      displayName: "Weather: Clear",
    },
    BOOLEAN_WEATHER_RAINING: {
      settings: {},
      icon: "boolean/world/weather/raining",
      displayName: "Weather: Rain",
    },
    BOOLEAN_WEATHER_THUNDER: {
      settings: {},
      icon: "boolean/world/weather/thunder",
      displayName: "Weather: Thunder",
    },
    BOOLEAN_ISDAY: {
      settings: {},
      icon: "boolean/world/isday",
      displayName: "Is Day",
    },
    BOOLEAN_ISNIGHT: {
      settings: {},
      icon: "boolean/world/isnight",
      displayName: "Is Night",
    },
    INTEGER_RAINCOUNTDOWN: {
      settings: {},
      icon: "integer/world/raincountdown",
      displayName: "Rain Countdown",
    },
    INTEGER_TICKTIME: {
      settings: {},
      icon: "integer/world/ticktime",
      displayName: "Tick time",
    },
    INTEGER_DAYTIME: {
      settings: {},
      icon: "integer/world/daytime",
      displayName: "Day Time",
    },
    INTEGER_LIGHTLEVEL: {
      settings: {},
      icon: "integer/world/lightlevel",
      displayName: "Light Level",
    },
    DOUBLE_TPS: { settings: {}, icon: "double/world/tps", displayName: "TPS" },
    LONG_TIME: { settings: {}, icon: "long/world/time", displayName: "Time" },
    LONG_TOTALTIME: {
      settings: {},
      icon: "long/world/totaltime",
      displayName: "Total Time",
    },
    STRING_NAME: {
      settings: {},
      icon: "string/world/worldname",
      displayName: "World Name",
    },
    LIST_PLAYERS: {
      settings: {},
      icon: "list/world/players",
      displayName: "Players",
    },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_WEATHER_CLEAR: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_WEATHER_RAINING: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_WEATHER_THUNDER: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISDAY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISNIGHT: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_RAINCOUNTDOWN: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_TICKTIME: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_DAYTIME: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_LIGHTLEVEL: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    DOUBLE_TPS: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    LONG_TIME: OUTPUT_TYPE_TO_AST_TYPE["long"].astType,
    LONG_TOTALTIME: OUTPUT_TYPE_TO_AST_TYPE["long"].astType,
    STRING_NAME: OUTPUT_TYPE_TO_AST_TYPE["string"].astType,
    LIST_PLAYERS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
  };
}
