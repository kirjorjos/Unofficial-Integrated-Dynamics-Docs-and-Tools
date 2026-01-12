import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Operator } from "../Operator";

export class OPERATOR_RECIPE_WITH_OUTPUT extends BaseOperator<
  Recipe,
  Operator<Ingredients, Recipe>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:recipe_with_output",
      nicknames: ["recipeWithOutput"],
      parsedSignature: new ParsedSignature(
        {
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
        },
        globalMap
      ),
      symbol: "Recipe.with_out",
      interactName: "recipeWithOutput",
      function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
        return (ingredients: Ingredients): Recipe => {
          return recipe.setOutput(ingredients);
        };
      },
    });
  }
}
