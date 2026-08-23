import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class FluidReader extends ReaderBase {
  static typeName = "FluidReader";
  static shortName = "fluid";
  /** 9-bit compressed ID — position 5 in aspects.json reader order */
  static numericID = 5;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_FULL: {
      settings: {},
      icon: "boolean/fluid/full",
      displayName: "Tank Full",
    },
    BOOLEAN_EMPTY: {
      settings: {},
      icon: "boolean/fluid/empty",
      displayName: "Tank Empty",
    },
    BOOLEAN_NONEMPTY: {
      settings: {},
      icon: "boolean/fluid/nonempty",
      displayName: "Tank Not Empty",
    },
    BOOLEAN_APPLICABLE: {
      settings: {},
      icon: "boolean/fluid/applicable",
      displayName: "Is Tank",
    },
    INTEGER_AMOUNT: {
      settings: { tankid: 0 },
      icon: "integer/fluid/amount",
      displayName: "Fluid Amount",
    },
    INTEGER_AMOUNTTOTAL: {
      settings: {},
      icon: "integer/fluid/totalamount",
      displayName: "Total Fluid Amount",
    },
    INTEGER_CAPACITY: {
      settings: { tankid: 0 },
      icon: "integer/fluid/capacity",
      displayName: "Fluid Capacity",
    },
    INTEGER_CAPACITYTOTAL: {
      settings: {},
      icon: "integer/fluid/totalcapacity",
      displayName: "Total Fluid Capacity",
    },
    INTEGER_TANKS: {
      settings: {},
      icon: "integer/fluid/tanks",
      displayName: "Tanks",
    },
    DOUBLE_FILLRATIO: {
      settings: { tankid: 0 },
      icon: "double/fluid/fillratio",
      displayName: "Fluid Fill Ratio",
    },
    LIST_TANKFLUIDS: {
      settings: {},
      icon: "list/fluid/fluidstacks",
      displayName: "Tank Fluids",
    },
    LIST_TANKCAPACITIES: {
      settings: {},
      icon: "list/fluid/capacities",
      displayName: "Tank Capacities",
    },
    FLUIDSTACK: {
      settings: { tankid: 0 },
      icon: "fluidstack/fluid",
      displayName: "Tank Fluid",
    },
    BLOCK: {
      settings: {},
      icon: "fluidstack/block",
      displayName: "Block Fluid",
    },
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
