import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RECIPE_WITH_OUTPUT extends BaseOperator<
  Recipe,
  Operator<Ingredients, Recipe>
> {
  static override internalName =
    "integrateddynamics:recipe_with_output" as const;
  static override numericID = 185;
  static override nicknames = [
    "recipeWithOutput",
    "withOutput",
    "recipe_with_output",
    "recipeWith_output",
    "with_output",
  ];
  static override symbol = "Recipe.with_out";
  static override interactName = "recipeWithOutput";
  static override operatorName = "with_output" as const;
  static override displayName = "Recipe With Output Ingredients" as const;
  static override fullDisplayName =
    "Recipe Recipe With Output Ingredients" as const;
  static override stringDisplayNames = [
    "recipe with output ingredients",
    "recipe with output Ingredients",
    "recipe with Output ingredients",
    "recipe with Output Ingredients",
    "recipe With output ingredients",
    "recipe With output Ingredients",
    "recipe With Output ingredients",
    "recipe With Output Ingredients",
    "Recipe with output ingredients",
    "Recipe with output Ingredients",
    "Recipe with Output ingredients",
    "Recipe with Output Ingredients",
    "Recipe With output ingredients",
    "Recipe With output Ingredients",
    "Recipe With Output ingredients",
    "Recipe With Output Ingredients",
    "recipe recipe with output ingredients",
    "recipe recipe with output Ingredients",
    "recipe recipe with Output ingredients",
    "recipe recipe with Output Ingredients",
    "recipe recipe With output ingredients",
    "recipe recipe With output Ingredients",
    "recipe recipe With Output ingredients",
    "recipe recipe With Output Ingredients",
    "recipe Recipe with output ingredients",
    "recipe Recipe with output Ingredients",
    "recipe Recipe with Output ingredients",
    "recipe Recipe with Output Ingredients",
    "recipe Recipe With output ingredients",
    "recipe Recipe With output Ingredients",
    "recipe Recipe With Output ingredients",
    "recipe Recipe With Output Ingredients",
    "Recipe recipe with output ingredients",
    "Recipe recipe with output Ingredients",
    "Recipe recipe with Output ingredients",
    "Recipe recipe with Output Ingredients",
    "Recipe recipe With output ingredients",
    "Recipe recipe With output Ingredients",
    "Recipe recipe With Output ingredients",
    "Recipe recipe With Output Ingredients",
    "Recipe Recipe with output ingredients",
    "Recipe Recipe with output Ingredients",
    "Recipe Recipe with Output ingredients",
    "Recipe Recipe with Output Ingredients",
    "Recipe Recipe With output ingredients",
    "Recipe Recipe With output Ingredients",
    "Recipe Recipe With Output ingredients",
    "Recipe Recipe With Output Ingredients",
  ];
  static override tooltipInfo =
    "Get a copy of the given recipe with the given ingredients as input" as const;

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
          return recipe.setOutput(ingredients);
        };
      },
    });
  }
}
