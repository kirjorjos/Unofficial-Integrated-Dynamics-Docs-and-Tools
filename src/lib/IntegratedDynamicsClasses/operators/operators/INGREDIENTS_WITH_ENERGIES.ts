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
    "Ingr.withEnergies",
    "ingredientsWithEnergies",
    "withEnergies",
    "Ingr.with_energies",
    "ingredients_with_energies",
    "ingredientsWith_energies",
    "with_energies",
  ];
  static override symbol = "Ingr.with_energies";
  static override interactName = "ingredientsWithEnergies";
  static override operatorName = "with_energies" as const;
  static override displayName = "Ingredients With Energy Elements" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Energy Elements" as const;
  static override stringDisplayNames = [
    "ingredients with energy elements",
    "ingredients with energy Elements",
    "ingredients with Energy elements",
    "ingredients with Energy Elements",
    "ingredients With energy elements",
    "ingredients With energy Elements",
    "ingredients With Energy elements",
    "ingredients With Energy Elements",
    "Ingredients with energy elements",
    "Ingredients with energy Elements",
    "Ingredients with Energy elements",
    "Ingredients with Energy Elements",
    "Ingredients With energy elements",
    "Ingredients With energy Elements",
    "Ingredients With Energy elements",
    "Ingredients With Energy Elements",
    "ingredients ingredients with energy elements",
    "ingredients ingredients with energy Elements",
    "ingredients ingredients with Energy elements",
    "ingredients ingredients with Energy Elements",
    "ingredients ingredients With energy elements",
    "ingredients ingredients With energy Elements",
    "ingredients ingredients With Energy elements",
    "ingredients ingredients With Energy Elements",
    "ingredients Ingredients with energy elements",
    "ingredients Ingredients with energy Elements",
    "ingredients Ingredients with Energy elements",
    "ingredients Ingredients with Energy Elements",
    "ingredients Ingredients With energy elements",
    "ingredients Ingredients With energy Elements",
    "ingredients Ingredients With Energy elements",
    "ingredients Ingredients With Energy Elements",
    "Ingredients ingredients with energy elements",
    "Ingredients ingredients with energy Elements",
    "Ingredients ingredients with Energy elements",
    "Ingredients ingredients with Energy Elements",
    "Ingredients ingredients With energy elements",
    "Ingredients ingredients With energy Elements",
    "Ingredients ingredients With Energy elements",
    "Ingredients ingredients With Energy Elements",
    "Ingredients Ingredients with energy elements",
    "Ingredients Ingredients with energy Elements",
    "Ingredients Ingredients with Energy elements",
    "Ingredients Ingredients with Energy Elements",
    "Ingredients Ingredients With energy elements",
    "Ingredients Ingredients With energy Elements",
    "Ingredients Ingredients With Energy elements",
    "Ingredients Ingredients With Energy Elements",
  ];
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
