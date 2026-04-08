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
    "with_output",
    "recipeWith_output",
  ];
  static override symbol = "Recipe.with_out";
  static override interactName = "recipeWithOutput";
  static override operatorName = "with_output" as const;
  static override displayName = "Recipe With Output Ingredients" as const;
  static override fullDisplayName =
    "Recipe Recipe With Output Ingredients" as const;
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
