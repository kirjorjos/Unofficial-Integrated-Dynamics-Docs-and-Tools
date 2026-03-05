import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Operator } from "../Operator";

export class OPERATOR_RECIPE_WITH_INPUT extends BaseOperator<
  Recipe,
  Operator<Ingredients, Recipe>
> {
  static override internalName =
    "integrateddynamics:recipe_with_input" as const;
  constructor() {
    super({
      nicknames: ["Recipe.with_in", "recipeWithInput"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Recipe",
        },
        to: {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Recipe",
          },
        },
      }),
      symbol: "Recipe.with_in",
      interactName: "recipeWithInput",
      function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
        return (ingredients: Ingredients): Recipe => {
          return recipe.setInput(ingredients);
        };
      },
    });
  }
}
