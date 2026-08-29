import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";

export class OPERATOR_RECIPE_OUTPUT extends BaseOperator<Recipe, Ingredients> {
  static override internalName = "integrateddynamics:recipe_output" as const;
  static override numericID = 152;
  static override nicknames = ["output", "recipeOutput", "recipe_output"];
  static override symbol = "recipe_out";
  static override interactName = "recipeOutput";
  static override operatorName = "output" as const;
  static override displayName = "Recipe Output Ingredients" as const;
  static override fullDisplayName = "Recipe Recipe Output Ingredients" as const;
  static override stringDisplayNames = [
    "recipe output ingredients",
    "recipe output Ingredients",
    "recipe Output ingredients",
    "recipe Output Ingredients",
    "Recipe output ingredients",
    "Recipe output Ingredients",
    "Recipe Output ingredients",
    "Recipe Output Ingredients",
    "recipe recipe output ingredients",
    "recipe recipe output Ingredients",
    "recipe recipe Output ingredients",
    "recipe recipe Output Ingredients",
    "recipe Recipe output ingredients",
    "recipe Recipe output Ingredients",
    "recipe Recipe Output ingredients",
    "recipe Recipe Output Ingredients",
    "Recipe recipe output ingredients",
    "Recipe recipe output Ingredients",
    "Recipe recipe Output ingredients",
    "Recipe recipe Output Ingredients",
    "Recipe Recipe output ingredients",
    "Recipe Recipe output Ingredients",
    "Recipe Recipe Output ingredients",
    "Recipe Recipe Output Ingredients",
  ];
  static override tooltipInfo =
    "The output ingredients of the given recipe" as const;

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
        return recipe.getOutput();
      },
    });
  }
}
