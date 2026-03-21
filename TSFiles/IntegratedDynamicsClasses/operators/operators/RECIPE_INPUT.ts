import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_INPUT extends BaseOperator<Recipe, Ingredients> {
  static override internalName = "integrateddynamics:recipe_input" as const;
  static override nicknames = ["recipeInput", "recipeWithInput"];
  static override symbol = "recipe_in";
  static override interactName = "recipeInput";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Recipe",
          },
          to: {
            type: "Ingredients",
          },
        },
        normalizeSignature
      ),
      function: (recipe: Recipe): Ingredients => {
        return recipe.getInput();
      },
    });
  }
}
