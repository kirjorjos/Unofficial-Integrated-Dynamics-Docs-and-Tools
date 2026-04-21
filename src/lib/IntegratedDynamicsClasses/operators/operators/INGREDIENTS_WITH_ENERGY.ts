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
  static override nicknames = [
    "Ingr.withEnergy",
    "ingredientsWithEnergy",
    "withEnergy",
    "Ingr.with_energy",
    "ingredients_with_energy",
    "ingredientsWith_energy",
    "with_energy",
  ];
  static override symbol = "Ingr.with_energy";
  static override interactName = "ingredientsWithEnergy";
  static override operatorName = "with_energy" as const;
  static override displayName = "Ingredients With Energy" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Energy" as const;
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given energy at the given ingredient position" as const;

  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
