import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Operator } from "../Operator";

export class OPERATOR_RECIPE_WITH_INPUT_OUTPUT extends BaseOperator<
  Ingredients,
  Operator<Ingredients, Recipe>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:recipe_with_input_output",
      nicknames: ["recipeWithInputOutput"],
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
        globalMap
      ),
      symbol: "Recipe.with_io",
      interactName: "ingredientsWithInputOutput",
      function: (input: Ingredients): TypeLambda<Ingredients, Recipe> => {
        return (output: Ingredients): Recipe => {
          return new Recipe(input, output);
        };
      },
    });
  }
}
