import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_INPUT extends BaseOperator<Recipe, Ingredients> {
  static override internalName = "integrateddynamics:recipe_input" as const;
  constructor() {
    super({
      nicknames: ["recipeInput", "recipeWithInput"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Recipe",
        },
        to: {
          type: "Ingredients",
        },
      }),
      symbol: "recipe_in",
      interactName: "recipeInput",
      function: (recipe: Recipe): Ingredients => {
        return recipe.getInput();
      },
    });
  }
}
