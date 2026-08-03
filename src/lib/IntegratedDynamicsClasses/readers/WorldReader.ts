import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class WorldReader extends ReaderBase {
  static typeName = "WorldReader";
  static shortName = "world";
  /** 9-bit compressed ID — position 4 in aspects.json reader order */
  static numericID = 4;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_WEATHER_CLEAR: { settings: {} },
    BOOLEAN_WEATHER_RAINING: { settings: {} },
    BOOLEAN_WEATHER_THUNDER: { settings: {} },
    BOOLEAN_ISDAY: { settings: {} },
    BOOLEAN_ISNIGHT: { settings: {} },
    INTEGER_RAINCOUNTDOWN: { settings: {} },
    INTEGER_TICKTIME: { settings: {} },
    INTEGER_DAYTIME: { settings: {} },
    INTEGER_LIGHTLEVEL: { settings: {} },
    DOUBLE_TPS: { settings: {} },
    LONG_TIME: { settings: {} },
    LONG_TOTALTIME: { settings: {} },
    STRING_NAME: { settings: {} },
    LIST_PLAYERS: { settings: {} },
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
