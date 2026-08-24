import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_LIST_GETRECIPES extends MachineAspectBase {
  static displayName = "recipes";
  static fullDisplayName = "Recipes";
  static nicknames = [
    "recipes",
    "getRecipes",
    "get_recipes",
    "recipeList",
    "recipe_list",
  ];
  static settings = {};
  static icon = "list/recipehandler/recipes";
  static outputType = "List";
}
