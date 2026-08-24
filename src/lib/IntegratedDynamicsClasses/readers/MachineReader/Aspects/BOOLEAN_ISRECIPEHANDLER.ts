import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISRECIPEHANDLER extends MachineAspectBase {
  static displayName = "isRecipeHandler";
  static fullDisplayName = "Is Recipe Handler";
  static nicknames = [
    "isRecipeHandler",
    "is_recipe_handler",
    "recipeHandler",
    "recipe_handler",
  ];
  static settings = {};
  static icon = "boolean/recipehandler/applicable";
  static outputType = "Boolean";
}
