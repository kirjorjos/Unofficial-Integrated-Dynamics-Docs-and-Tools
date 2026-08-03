import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class NetworkReader extends ReaderBase {
  static typeName = "NetworkReader";
  static shortName = "network";
  /** 9-bit compressed ID — position 10 in aspects.json reader order */
  static numericID = 10;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_APPLICABLE: { settings: {} },
    INTEGER_ELEMENT_COUNT: { settings: {} },
    INTEGER_ENERGY_BATTERY_COUNT: { settings: {} },
    INTEGER_ENERGY_STORED: { settings: { channel: -1 } },
    INTEGER_ENERGY_MAX: { settings: { channel: -1 } },
    INTEGER_ENERGY_CONSUMPTION_RATE: { settings: {} },
    ANY_VALUE: { settings: {} },
    OPERATOR_GETVARIABLEBYID: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_APPLICABLE: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_ELEMENT_COUNT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_ENERGY_BATTERY_COUNT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_ENERGY_STORED: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_ENERGY_MAX: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_ENERGY_CONSUMPTION_RATE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    ANY_VALUE: OUTPUT_TYPE_TO_AST_TYPE["any"].astType,
    OPERATOR_GETVARIABLEBYID: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
  };
}
