import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_INPUT extends BaseOperator<Recipe, Ingredients> {
  static override internalName = "integrateddynamics:recipe_input" as const;
  static override numericID = 151;
  static override nicknames = [
    "input",
    "recipeInput",
    "recipeWithInput",
    "recipe_input",
    "recipe_with_input",
  ];
  static override symbol = "recipe_in";
  static override interactName = "recipeInput";
  static override operatorName = "input" as const;
  static override displayName = "Recipe Input Ingredients" as const;
  static override fullDisplayName = "Recipe Recipe Input Ingredients" as const;
  static override tooltipInfo =
    "The input ingredients of the given recipe" as const;

  static override kind = "recipe" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
