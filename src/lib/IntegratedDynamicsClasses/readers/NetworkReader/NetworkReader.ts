import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { NETWORK_BOOLEAN_APPLICABLE } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/BOOLEAN_APPLICABLE";
import { NETWORK_INTEGER_ELEMENT_COUNT } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/INTEGER_ELEMENT_COUNT";
import { NETWORK_INTEGER_ENERGY_BATTERY_COUNT } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/INTEGER_ENERGY_BATTERY_COUNT";
import { NETWORK_INTEGER_ENERGY_STORED } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/INTEGER_ENERGY_STORED";
import { NETWORK_INTEGER_ENERGY_MAX } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/INTEGER_ENERGY_MAX";
import { NETWORK_INTEGER_ENERGY_CONSUMPTION_RATE } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/INTEGER_ENERGY_CONSUMPTION_RATE";
import { NETWORK_ANY_VALUE } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/ANY_VALUE";
import { NETWORK_OPERATOR_GETVARIABLEBYID } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/OPERATOR_GETVARIABLEBYID";

export class NetworkReader extends ReaderBase {
  static typeName = "NetworkReader";
  static shortName = "network";
  static numericID = 10;

  static aspects: ReaderAspects = {
    BOOLEAN_APPLICABLE: NETWORK_BOOLEAN_APPLICABLE,
    INTEGER_ELEMENT_COUNT: NETWORK_INTEGER_ELEMENT_COUNT,
    INTEGER_ENERGY_BATTERY_COUNT: NETWORK_INTEGER_ENERGY_BATTERY_COUNT,
    INTEGER_ENERGY_STORED: NETWORK_INTEGER_ENERGY_STORED,
    INTEGER_ENERGY_MAX: NETWORK_INTEGER_ENERGY_MAX,
    INTEGER_ENERGY_CONSUMPTION_RATE: NETWORK_INTEGER_ENERGY_CONSUMPTION_RATE,
    ANY_VALUE: NETWORK_ANY_VALUE,
    OPERATOR_GETVARIABLEBYID: NETWORK_OPERATOR_GETVARIABLEBYID,
  };
}
