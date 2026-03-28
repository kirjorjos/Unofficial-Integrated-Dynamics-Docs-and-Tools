import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ENERGY extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Long, Ingredients>>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_energy" as const;
  static override numericID = 179;
  static override nicknames = ["ingredientsWithEnergy", "Ingr.with_energy"];
  static override symbol = "Ingr.with_energy";
  static override interactName = "ingredientsWithEnergy";
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
                type: "Long",
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
      ): TypeLambda<Integer, TypeLambda<Long, Ingredients>> => {
        return (index: Integer): TypeLambda<Long, Ingredients> => {
          return (energy: Long): Ingredients => {
            return ingredients.setEnergy(energy, index);
          };
        };
      },
    });
  }
}
