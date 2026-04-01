import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RECIPE_WITH_INPUT extends BaseOperator<
  Recipe,
  Operator<Ingredients, Recipe>
> {
  static override internalName =
    "integrateddynamics:recipe_with_input" as const;
  static override numericID = 184;
  static override nicknames = [
    "Recipe.with_in",
    "recipeWithInput",
    "with_input",
    "recipeWith_input",
  ];
  static override symbol = "Recipe.with_in";
  static override interactName = "recipeWithInput";
  static override operatorName = "with_input" as const;
  static override kind = "recipe" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
        return (ingredients: Ingredients): Recipe => {
          return recipe.setInput(ingredients);
        };
      },
    });
  }
}
