import { WORLD_BOOLEAN_WEATHER_CLEAR } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/BOOLEAN_WEATHER_CLEAR";
import { WORLD_BOOLEAN_WEATHER_RAINING } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/BOOLEAN_WEATHER_RAINING";
import { WORLD_BOOLEAN_WEATHER_THUNDER } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/BOOLEAN_WEATHER_THUNDER";
import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { WORLD_BOOLEAN_ISDAY } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/BOOLEAN_ISDAY";
import { WORLD_BOOLEAN_ISNIGHT } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/BOOLEAN_ISNIGHT";
import { WORLD_INTEGER_RAINCOUNTDOWN } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/INTEGER_RAINCOUNTDOWN";
import { WORLD_INTEGER_TICKTIME } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/INTEGER_TICKTIME";
import { WORLD_INTEGER_DAYTIME } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/INTEGER_DAYTIME";
import { WORLD_INTEGER_LIGHTLEVEL } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/INTEGER_LIGHTLEVEL";
import { WORLD_DOUBLE_TPS } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/DOUBLE_TPS";
import { WORLD_LONG_TIME } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/LONG_TIME";
import { WORLD_LONG_TOTALTIME } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/LONG_TOTALTIME";
import { WORLD_STRING_NAME } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/STRING_NAME";
import { WORLD_LIST_PLAYERS } from "lib/IntegratedDynamicsClasses/readers/WorldReader/Aspects/LIST_PLAYERS";

export class WorldReader extends ReaderBase {
  static typeName = "WorldReader";
  static shortName = "world";
  static numericID = 4;

  static aspects: ReaderAspects = {
    BOOLEAN_WEATHER_CLEAR: WORLD_BOOLEAN_WEATHER_CLEAR,
    BOOLEAN_WEATHER_RAINING: WORLD_BOOLEAN_WEATHER_RAINING,
    BOOLEAN_WEATHER_THUNDER: WORLD_BOOLEAN_WEATHER_THUNDER,
    BOOLEAN_ISDAY: WORLD_BOOLEAN_ISDAY,
    BOOLEAN_ISNIGHT: WORLD_BOOLEAN_ISNIGHT,
    INTEGER_RAINCOUNTDOWN: WORLD_INTEGER_RAINCOUNTDOWN,
    INTEGER_TICKTIME: WORLD_INTEGER_TICKTIME,
    INTEGER_DAYTIME: WORLD_INTEGER_DAYTIME,
    INTEGER_LIGHTLEVEL: WORLD_INTEGER_LIGHTLEVEL,
    DOUBLE_TPS: WORLD_DOUBLE_TPS,
    LONG_TIME: WORLD_LONG_TIME,
    LONG_TOTALTIME: WORLD_LONG_TOTALTIME,
    STRING_NAME: WORLD_STRING_NAME,
    LIST_PLAYERS: WORLD_LIST_PLAYERS,
  };
}
