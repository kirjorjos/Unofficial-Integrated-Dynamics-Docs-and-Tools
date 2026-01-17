import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_OUTPUT extends BaseOperator<Recipe, Ingredients> {
  constructor() {
    super({
      internalName: "integrateddynamics:recipe_output",
      nicknames: ["recipeOutput"],
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
        globalMap
      ),
      symbol: "recipe_out",
      interactName: "recipeOutput",
      function: (recipe: Recipe): Ingredients => {
        return recipe.getOutput();
      },
    });
  }
}
