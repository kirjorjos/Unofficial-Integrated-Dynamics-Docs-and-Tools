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
  static override nicknames = ["ingredientsEnergies", "Ingr.energies"];
  static override symbol = "Ingr.energies";
  static override interactName = "ingredientsEnergies";
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
