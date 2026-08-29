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
    "Recipe.withIn",
    "recipeWithInput",
    "withInput",
    "recipe_with_input",
    "Recipe.with_in",
    "recipeWith_input",
    "with_input",
  ];
  static override symbol = "Recipe.with_in";
  static override interactName = "recipeWithInput";
  static override operatorName = "with_input" as const;
  static override displayName = "Recipe With Input Ingredients" as const;
  static override fullDisplayName =
    "Recipe Recipe With Input Ingredients" as const;
  static override stringDisplayNames = [
    "recipe with input ingredients",
    "recipe with input Ingredients",
    "recipe with Input ingredients",
    "recipe with Input Ingredients",
    "recipe With input ingredients",
    "recipe With input Ingredients",
    "recipe With Input ingredients",
    "recipe With Input Ingredients",
    "Recipe with input ingredients",
    "Recipe with input Ingredients",
    "Recipe with Input ingredients",
    "Recipe with Input Ingredients",
    "Recipe With input ingredients",
    "Recipe With input Ingredients",
    "Recipe With Input ingredients",
    "Recipe With Input Ingredients",
    "recipe recipe with input ingredients",
    "recipe recipe with input Ingredients",
    "recipe recipe with Input ingredients",
    "recipe recipe with Input Ingredients",
    "recipe recipe With input ingredients",
    "recipe recipe With input Ingredients",
    "recipe recipe With Input ingredients",
    "recipe recipe With Input Ingredients",
    "recipe Recipe with input ingredients",
    "recipe Recipe with input Ingredients",
    "recipe Recipe with Input ingredients",
    "recipe Recipe with Input Ingredients",
    "recipe Recipe With input ingredients",
    "recipe Recipe With input Ingredients",
    "recipe Recipe With Input ingredients",
    "recipe Recipe With Input Ingredients",
    "Recipe recipe with input ingredients",
    "Recipe recipe with input Ingredients",
    "Recipe recipe with Input ingredients",
    "Recipe recipe with Input Ingredients",
    "Recipe recipe With input ingredients",
    "Recipe recipe With input Ingredients",
    "Recipe recipe With Input ingredients",
    "Recipe recipe With Input Ingredients",
    "Recipe Recipe with input ingredients",
    "Recipe Recipe with input Ingredients",
    "Recipe Recipe with Input ingredients",
    "Recipe Recipe with Input Ingredients",
    "Recipe Recipe With input ingredients",
    "Recipe Recipe With input Ingredients",
    "Recipe Recipe With Input ingredients",
    "Recipe Recipe With Input Ingredients",
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
          return recipe.setInput(ingredients);
        };
      },
    });
  }
}
