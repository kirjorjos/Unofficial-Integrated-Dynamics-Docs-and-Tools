import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPESBYINPUT extends MachineAspectBase {
  static displayName = "recipesByInput";
  static fullDisplayName = "Recipes By Input";
  static nicknames = [
    "recipesByInput",
    "recipes_by_input",
    "getRecipesByInput",
    "get_recipes_by_input",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeinputlist";
  static outputType = "Operator";
}
