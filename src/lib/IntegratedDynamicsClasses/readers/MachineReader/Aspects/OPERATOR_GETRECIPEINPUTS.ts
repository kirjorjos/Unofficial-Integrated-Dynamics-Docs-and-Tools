import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_OPERATOR_GETRECIPEINPUTS extends MachineAspectBase {
  static displayName = "recipeInputsByOutput";
  static fullDisplayName = "Recipe Inputs By Output";
  static nicknames = [
    "recipeInputsByOutput",
    "recipe_inputs_by_output",
    "getRecipeInputs",
    "get_recipe_inputs",
  ];
  static settings = {};
  static icon = "operator/recipehandler/recipeoutput";
  static outputType = "Operator";
}
