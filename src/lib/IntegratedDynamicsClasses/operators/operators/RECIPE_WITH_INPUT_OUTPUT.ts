import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RECIPE_WITH_INPUT_OUTPUT extends BaseOperator<
  Ingredients,
  Operator<Ingredients, Recipe>
> {
  static override internalName =
    "integrateddynamics:recipe_with_input_output" as const;
  static override numericID = 183;
  static override nicknames = [
    "ingredientsWithInputOutput",
    "recipeWithInputOutput",
    "with_input_output",
    "recipeWith_input_output",
  ];
  static override symbol = "Recipe.with_io";
  static override interactName = "ingredientsWithInputOutput";
  static override operatorName = "with_input_output" as const;
  static override kind = "recipe" as const;
  static override renderPattern = "PREFIX_2_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
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
      function: (input: Ingredients): TypeLambda<Ingredients, Recipe> => {
        return (output: Ingredients): Recipe => {
          return new Recipe(input, output);
        };
      },
    });
  }
}
