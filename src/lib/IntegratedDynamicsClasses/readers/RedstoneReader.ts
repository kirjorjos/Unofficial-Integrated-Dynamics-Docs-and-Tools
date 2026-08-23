import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class RedstoneReader extends ReaderBase {
  static typeName = "RedstoneReader";
  static shortName = "redstone";
  /** 9-bit compressed ID — position 1 in aspects.json reader order */
  static numericID = 1;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_LOW: {
      settings: {},
      icon: "boolean/redstone/low",
      displayName: "Redstone Low",
    },
    BOOLEAN_NONLOW: {
      settings: {},
      icon: "boolean/redstone/nonlow",
      displayName: "Redstone",
    },
    BOOLEAN_HIGH: {
      settings: {},
      icon: "boolean/redstone/high",
      displayName: "Redstone High",
    },
    BOOLEAN_CLOCK: {
      settings: { interval: 20, length: 1, offset: 0 },
      icon: "boolean/redstone/clock",
      displayName: "Redstone Clock",
    },
    INTEGER_VALUE: {
      settings: {},
      icon: "integer/redstone/value",
      displayName: "Redstone",
    },
    INTEGER_COMPARATOR: {
      settings: {},
      icon: "integer/redstone/comparator",
      displayName: "Comparator",
    },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_LOW: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_NONLOW: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_HIGH: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_CLOCK: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_VALUE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_COMPARATOR: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
  };
}
