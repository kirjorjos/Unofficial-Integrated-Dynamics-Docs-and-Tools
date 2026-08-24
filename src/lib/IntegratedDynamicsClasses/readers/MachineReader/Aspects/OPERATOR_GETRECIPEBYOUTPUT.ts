import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPEBYOUTPUT extends MachineAspectBase {
  static displayName = "recipeByOutput";
  static fullDisplayName = "Recipe By Output";
  static nicknames = [
    "recipeByOutput",
    "recipe_by_output",
    "getRecipeByOutput",
    "get_recipe_by_output",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeoutputsingle";
  static outputType = "Operator";
}
