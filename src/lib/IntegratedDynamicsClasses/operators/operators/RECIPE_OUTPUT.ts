import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_OUTPUT extends BaseOperator<Recipe, Ingredients> {
  static override internalName = "integrateddynamics:recipe_output" as const;
  static override numericID = 152;
  static override nicknames = ["recipeOutput"];
  static override symbol = "recipe_out";
  static override interactName = "recipeOutput";
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
        return recipe.getOutput();
      },
    });
  }
}
