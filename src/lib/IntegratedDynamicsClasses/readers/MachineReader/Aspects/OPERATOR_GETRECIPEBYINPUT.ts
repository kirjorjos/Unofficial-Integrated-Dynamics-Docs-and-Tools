import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPEBYINPUT extends MachineAspectBase {
  static displayName = "recipeByInput";
  static fullDisplayName = "Recipe By Input";
  static nicknames = [
    "recipeByInput",
    "recipe_by_input",
    "getRecipeByInput",
    "get_recipe_by_input",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeinputsingle";
  static outputType = "Operator";
}
