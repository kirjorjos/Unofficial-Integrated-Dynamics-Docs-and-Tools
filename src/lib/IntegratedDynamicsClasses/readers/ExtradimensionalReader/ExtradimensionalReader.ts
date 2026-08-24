import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { EXTRADIMENSIONAL_INTEGER_RANDOM } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/Aspects/INTEGER_RANDOM";
import { EXTRADIMENSIONAL_INTEGER_PLAYERCOUNT } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/Aspects/INTEGER_PLAYERCOUNT";
import { EXTRADIMENSIONAL_INTEGER_TICKTIME } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/Aspects/INTEGER_TICKTIME";
import { EXTRADIMENSIONAL_DOUBLE_TPS } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/Aspects/DOUBLE_TPS";
import { EXTRADIMENSIONAL_LIST_PLAYERS } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/Aspects/LIST_PLAYERS";

export class ExtradimensionalReader extends ReaderBase {
  static typeName = "ExtradimensionalReader";
  static shortName = "extradimensional";
  static numericID = 17;

  static aspects: ReaderAspects = {
    INTEGER_RANDOM: EXTRADIMENSIONAL_INTEGER_RANDOM,
    INTEGER_PLAYERCOUNT: EXTRADIMENSIONAL_INTEGER_PLAYERCOUNT,
    INTEGER_TICKTIME: EXTRADIMENSIONAL_INTEGER_TICKTIME,
    DOUBLE_TPS: EXTRADIMENSIONAL_DOUBLE_TPS,
    LIST_PLAYERS: EXTRADIMENSIONAL_LIST_PLAYERS,
  };
}
