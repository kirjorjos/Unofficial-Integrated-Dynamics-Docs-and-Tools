import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class FluidReader extends ReaderBase {
  static typeName = "FluidReader";
  static shortName = "fluid";
  /** 9-bit compressed ID — position 5 in aspects.json reader order */
  static numericID = 5;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_FULL: { settings: {} },
    BOOLEAN_EMPTY: { settings: {} },
    BOOLEAN_NONEMPTY: { settings: {} },
    BOOLEAN_APPLICABLE: { settings: {} },
    INTEGER_AMOUNT: { settings: { tankid: 0 } },
    INTEGER_AMOUNTTOTAL: { settings: {} },
    INTEGER_CAPACITY: { settings: { tankid: 0 } },
    INTEGER_CAPACITYTOTAL: { settings: {} },
    INTEGER_TANKS: { settings: {} },
    DOUBLE_FILLRATIO: { settings: { tankid: 0 } },
    LIST_TANKFLUIDS: { settings: {} },
    LIST_TANKCAPACITIES: { settings: {} },
    FLUIDSTACK: { settings: { tankid: 0 } },
    BLOCK: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_FULL: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_EMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_NONEMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_APPLICABLE: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_AMOUNT: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_AMOUNTTOTAL: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_CAPACITY: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_CAPACITYTOTAL: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_TANKS: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    DOUBLE_FILLRATIO: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    LIST_TANKFLUIDS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    LIST_TANKCAPACITIES: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    FLUIDSTACK: OUTPUT_TYPE_TO_AST_TYPE["fluidstack"].astType,
    BLOCK: OUTPUT_TYPE_TO_AST_TYPE["fluidstack"].astType,
  };
}
