import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_INGREDIENTS_ENERGIES extends BaseOperator<
  Ingredients,
  iArray<Long>
> {
  static override internalName =
    "integrateddynamics:ingredients_energies" as const;
  static override numericID = 148;
  static override nicknames = [
    "energies",
    "Ingr.energies",
    "ingredientsEnergies",
    "ingredients_energies",
  ];
  static override symbol = "Ingr.energies";
  static override interactName = "ingredientsEnergies";
  static override operatorName = "energies" as const;
  static override displayName = "Ingredient energy elements" as const;
  static override fullDisplayName =
    "Ingredients Ingredient energy elements" as const;
  static override stringDisplayNames = [
    "ingredient energy elements",
    "ingredient energy Elements",
    "ingredient Energy elements",
    "ingredient Energy Elements",
    "Ingredient energy elements",
    "Ingredient energy Elements",
    "Ingredient Energy elements",
    "Ingredient Energy Elements",
    "ingredients ingredient energy elements",
    "ingredients ingredient energy Elements",
    "ingredients ingredient Energy elements",
    "ingredients ingredient Energy Elements",
    "ingredients Ingredient energy elements",
    "ingredients Ingredient energy Elements",
    "ingredients Ingredient Energy elements",
    "ingredients Ingredient Energy Elements",
    "Ingredients ingredient energy elements",
    "Ingredients ingredient energy Elements",
    "Ingredients ingredient Energy elements",
    "Ingredients ingredient Energy Elements",
    "Ingredients Ingredient energy elements",
    "Ingredients Ingredient energy Elements",
    "Ingredients Ingredient Energy elements",
    "Ingredients Ingredient Energy Elements",
  ];
  static override tooltipInfo = "The list of energy elements" as const;

  static override kind = "ingredients" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        normalizeSignature
      ),
      function: (ingredients: Ingredients): iArray<Long> => {
        return ingredients.getEnergies();
      },
    });
  }
}
