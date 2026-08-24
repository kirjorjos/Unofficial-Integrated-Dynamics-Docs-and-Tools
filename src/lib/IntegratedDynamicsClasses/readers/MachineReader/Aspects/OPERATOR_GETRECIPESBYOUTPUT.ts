import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPESBYOUTPUT extends MachineAspectBase {
  static displayName = "recipesByOutput";
  static fullDisplayName = "Recipes By Output";
  static nicknames = [
    "recipesByOutput",
    "recipes_by_output",
    "getRecipesByOutput",
    "get_recipes_by_output",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeoutputlist";
  static outputType = "Operator";
}
