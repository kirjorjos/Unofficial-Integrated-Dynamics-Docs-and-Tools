import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { REDSTONE_BOOLEAN_LOW } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/BOOLEAN_LOW";
import { REDSTONE_BOOLEAN_NONLOW } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/BOOLEAN_NONLOW";
import { REDSTONE_BOOLEAN_HIGH } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/BOOLEAN_HIGH";
import { REDSTONE_BOOLEAN_CLOCK } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/BOOLEAN_CLOCK";
import { REDSTONE_INTEGER_VALUE } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/INTEGER_VALUE";
import { REDSTONE_INTEGER_COMPARATOR } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/INTEGER_COMPARATOR";

export class RedstoneReader extends ReaderBase {
  static typeName = "RedstoneReader";
  static shortName = "redstone";
  static numericID = 1;

  static aspects: ReaderAspects = {
    BOOLEAN_LOW: REDSTONE_BOOLEAN_LOW,
    BOOLEAN_NONLOW: REDSTONE_BOOLEAN_NONLOW,
    BOOLEAN_HIGH: REDSTONE_BOOLEAN_HIGH,
    BOOLEAN_CLOCK: REDSTONE_BOOLEAN_CLOCK,
    INTEGER_VALUE: REDSTONE_INTEGER_VALUE,
    INTEGER_COMPARATOR: REDSTONE_INTEGER_COMPARATOR,
  };
}
