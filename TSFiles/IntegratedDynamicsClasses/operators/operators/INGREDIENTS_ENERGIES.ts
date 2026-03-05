import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_INGREDIENTS_ENERGIES extends BaseOperator<
  Ingredients,
  iArray<Long>
> {
  static override internalName =
    "integrateddynamics:ingredients_energies" as const;
  constructor() {
    super({
      nicknames: ["ingredientsEnergies", "Ingr.energies"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Ingredients",
        },
        to: { type: "List", listType: { type: "Long" } },
      }),
      symbol: "Ingr.energies",
      interactName: "ingredientsEnergies",
      function: (ingredients: Ingredients): iArray<Long> => {
        return ingredients.getEnergies();
      },
    });
  }
}
