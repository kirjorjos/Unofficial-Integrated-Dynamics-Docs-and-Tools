import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ENERGIES extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_energies" as const;
  static override numericID = 153;
  static override nicknames = [
    "ingredientsWithEnergies",
    "Ingr.with_energies",
    "with_energies",
    "ingredientsWith_energies",
  ];
  static override symbol = "Ingr.with_energies";
  static override interactName = "ingredientsWithEnergies";
  static override operatorName = "with_energies" as const;
  static override displayName = "Ingredients With Energy Elements" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Energy Elements" as const;
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given list of energy elements at the given ingredient position" as const;

  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_VERYLONG" as const;
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
            from: { type: "List", listType: { type: "Long" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Long>, Ingredients> => {
        return (energyList: iArray<Long>): Ingredients => {
          return ingredients.withEnergies(energyList);
        };
      },
    });
  }
}
