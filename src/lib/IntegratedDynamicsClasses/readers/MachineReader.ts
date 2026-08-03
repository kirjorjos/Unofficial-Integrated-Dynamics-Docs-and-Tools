import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class MachineReader extends ReaderBase {
  static typeName = "MachineReader";
  static shortName = "machine";
  /** 9-bit compressed ID — position 18 in aspects.json reader order */
  static numericID = 18;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    BOOLEAN_ISWORKER: { settings: {} },
    BOOLEAN_HASWORK: { settings: {} },
    BOOLEAN_CANWORK: { settings: {} },
    BOOLEAN_ISWORKING: { settings: {} },
    BOOLEAN_ISTEMPERATURE: { settings: {} },
    DOUBLE_TEMPERATURE: { settings: {} },
    DOUBLE_MAXTEMPERATURE: { settings: {} },
    DOUBLE_MINTEMPERATURE: { settings: {} },
    DOUBLE_DEFAULTTEMPERATURE: { settings: {} },
    BOOLEAN_ISRECIPEHANDLER: { settings: {} },
    LIST_GETRECIPES: { settings: {} },
    OPERATOR_GETRECIPEBYINPUT: { settings: {} },
    OPERATOR_GETRECIPEBYOUTPUT: { settings: {} },
    OPERATOR_GETRECIPESBYINPUT: { settings: {} },
    OPERATOR_GETRECIPESBYOUTPUT: { settings: {} },
    OPERATOR_GETRECIPEOUTPUT: { settings: {} },
    OPERATOR_GETRECIPEINPUTS: { settings: {} },
    BOOLEAN_ISENERGY: { settings: {} },
    BOOLEAN_ISENERGYRECEIVER: { settings: {} },
    BOOLEAN_ISENERGYPROVIDER: { settings: {} },
    BOOLEAN_CANEXTRACTENERGY: { settings: {} },
    BOOLEAN_CANINSERTENERGY: { settings: {} },
    BOOLEAN_ISENERGYFULL: { settings: {} },
    BOOLEAN_ISENERGYEMPTY: { settings: {} },
    BOOLEAN_ISENERGYNONEMPTY: { settings: {} },
    INTEGER_ENERGYSTORED: { settings: {} },
    INTEGER_ENERGYCAPACITY: { settings: {} },
    DOUBLE_ENERGYFILLRATIO: { settings: {} },
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
