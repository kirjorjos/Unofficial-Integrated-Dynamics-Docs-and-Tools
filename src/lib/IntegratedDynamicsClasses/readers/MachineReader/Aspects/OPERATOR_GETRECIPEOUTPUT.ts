import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPEOUTPUT extends MachineAspectBase {
  static displayName = "recipeOutputByInput";
  static fullDisplayName = "Recipe Output By Input";
  static nicknames = [
    "recipeOutputByInput",
    "recipe_output_by_input",
    "getRecipeOutput",
    "get_recipe_output",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeinput";
  static outputType = "Operator";
}
