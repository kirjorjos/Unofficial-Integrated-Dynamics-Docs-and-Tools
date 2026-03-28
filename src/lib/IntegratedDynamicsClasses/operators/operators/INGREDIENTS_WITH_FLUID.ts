import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUID extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Fluid, Ingredients>>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_fluid" as const;
  static override numericID = 180;
  static override nicknames = ["ingredientsWithFluid", "Ingr.with_fluid"];
  static override symbol = "Ingr.with_fluid";
  static override interactName = "ingredientsWithFluid";
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
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Fluid",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        ingredients: Ingredients
      ): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
        return (index: Integer): TypeLambda<Fluid, Ingredients> => {
          return (fluid: Fluid): Ingredients => {
            return ingredients.setFluid(fluid, index);
          };
        };
      },
    });
  }
}
