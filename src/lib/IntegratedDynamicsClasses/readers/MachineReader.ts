import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class MachineReader extends ReaderBase {
  static typeName = "MachineReader";
  static shortName = "machine";
  /** 9-bit compressed ID — position 18 in aspects.json reader order */
  static numericID = 18;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    BOOLEAN_ISWORKER: {
      settings: {},
      icon: "boolean/machine/isworker",
      displayName: "Is Worker",
    },
    BOOLEAN_HASWORK: {
      settings: {},
      icon: "boolean/machine/haswork",
      displayName: "Has Work",
    },
    BOOLEAN_CANWORK: {
      settings: {},
      icon: "boolean/machine/canwork",
      displayName: "Can Work",
    },
    BOOLEAN_ISWORKING: {
      settings: {},
      icon: "boolean/machine/isworking",
      displayName: "Is Working",
    },
    BOOLEAN_ISTEMPERATURE: {
      settings: {},
      icon: "boolean/temperature/istemperature",
      displayName: "Has Temperature",
    },
    DOUBLE_TEMPERATURE: {
      settings: {},
      icon: "double/temperature/temperature",
      displayName: "Temperature",
    },
    DOUBLE_MAXTEMPERATURE: {
      settings: {},
      icon: "double/temperature/maxtemperature",
      displayName: "Maximum Temperature",
    },
    DOUBLE_MINTEMPERATURE: {
      settings: {},
      icon: "double/temperature/mintemperature",
      displayName: "Minimum Temperature",
    },
    DOUBLE_DEFAULTTEMPERATURE: {
      settings: {},
      icon: "double/temperature/defaulttemperature",
      displayName: "Default Temperature",
    },
    BOOLEAN_ISRECIPEHANDLER: {
      settings: {},
      icon: "boolean/recipehandler/applicable",
      displayName: "Is Recipe Handler",
    },
    LIST_GETRECIPES: {
      settings: {},
      icon: "list/recipehandler/recipes",
      displayName: "Recipes",
    },
    OPERATOR_GETRECIPEBYINPUT: {
      settings: {},
      icon: "operator/recipehandler/recipeinputsingle",
      displayName: "Recipe By Input",
    },
    OPERATOR_GETRECIPEBYOUTPUT: {
      settings: {},
      icon: "operator/recipehandler/recipeoutputsingle",
      displayName: "Recipe By Output",
    },
    OPERATOR_GETRECIPESBYINPUT: {
      settings: {},
      icon: "operator/recipehandler/recipeinputlist",
      displayName: "Recipes By Input",
    },
    OPERATOR_GETRECIPESBYOUTPUT: {
      settings: {},
      icon: "operator/recipehandler/recipeoutputlist",
      displayName: "Recipes By Output",
    },
    OPERATOR_GETRECIPEOUTPUT: {
      settings: {},
      icon: "operator/recipehandler/recipeinput",
      displayName: "Recipe Output By Input",
    },
    OPERATOR_GETRECIPEINPUTS: {
      settings: {},
      icon: "operator/recipehandler/recipeoutput",
      displayName: "Recipe Inputs By Output",
    },
    BOOLEAN_ISENERGY: {
      settings: {},
      icon: "boolean/fe/applicable",
      displayName: "Is FE Handler",
    },
    BOOLEAN_ISENERGYRECEIVER: {
      settings: {},
      icon: "boolean/fe/isreceiver",
      displayName: "Is FE Receiver",
    },
    BOOLEAN_ISENERGYPROVIDER: {
      settings: {},
      icon: "boolean/fe/isprovider",
      displayName: "Is FE Provider",
    },
    BOOLEAN_CANEXTRACTENERGY: {
      settings: {},
      icon: "boolean/fe/canextract",
      displayName: "Can Extract FE",
    },
    BOOLEAN_CANINSERTENERGY: {
      settings: {},
      icon: "boolean/fe/caninsert",
      displayName: "Can Insert FE",
    },
    BOOLEAN_ISENERGYFULL: {
      settings: {},
      icon: "boolean/fe/isfull",
      displayName: "Is FE Buffer Full",
    },
    BOOLEAN_ISENERGYEMPTY: {
      settings: {},
      icon: "boolean/fe/isempty",
      displayName: "Is FE Buffer Empty",
    },
    BOOLEAN_ISENERGYNONEMPTY: {
      settings: {},
      icon: "boolean/fe/isnonempty",
      displayName: "Is FE Buffer Not Empty",
    },
    INTEGER_ENERGYSTORED: {
      settings: {},
      icon: "integer/fe/amount",
      displayName: "Stored FE",
    },
    INTEGER_ENERGYCAPACITY: {
      settings: {},
      icon: "integer/fe/capacity",
      displayName: "FE Capacity",
    },
    DOUBLE_ENERGYFILLRATIO: {
      settings: {},
      icon: "double/fe/fillratio",
      displayName: "FE Fill Ratio",
    },
  };

  static aspectOutputType: Record<string, string> = {
    BOOLEAN_ISWORKER: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_HASWORK: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_CANWORK: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISWORKING: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISTEMPERATURE: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    DOUBLE_TEMPERATURE: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    DOUBLE_MAXTEMPERATURE: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    DOUBLE_MINTEMPERATURE: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    DOUBLE_DEFAULTTEMPERATURE: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
    BOOLEAN_ISRECIPEHANDLER: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    LIST_GETRECIPES: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    OPERATOR_GETRECIPEBYINPUT: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    OPERATOR_GETRECIPEBYOUTPUT: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    OPERATOR_GETRECIPESBYINPUT: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    OPERATOR_GETRECIPESBYOUTPUT: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    OPERATOR_GETRECIPEOUTPUT: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    OPERATOR_GETRECIPEINPUTS: OUTPUT_TYPE_TO_AST_TYPE["operator"].astType,
    BOOLEAN_ISENERGY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISENERGYRECEIVER: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISENERGYPROVIDER: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_CANEXTRACTENERGY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_CANINSERTENERGY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISENERGYFULL: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISENERGYEMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    BOOLEAN_ISENERGYNONEMPTY: OUTPUT_TYPE_TO_AST_TYPE["boolean"].astType,
    INTEGER_ENERGYSTORED: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_ENERGYCAPACITY: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    DOUBLE_ENERGYFILLRATIO: OUTPUT_TYPE_TO_AST_TYPE["double"].astType,
  };
}
