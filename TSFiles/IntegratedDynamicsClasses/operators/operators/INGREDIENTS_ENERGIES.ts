import { globalMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_INGREDIENTS_ENERGIES extends BaseOperator<
  Ingredients,
  iArray<Long>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:ingredients_energies",
      nicknames: ["ingredientsEnergies", "Ingr.energies"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        globalMap
      ),
      symbol: "Ingr.energies",
      interactName: "ingredientsEnergies",
      function: (ingredients: Ingredients): iArray<Long> => {
        return ingredients.getEnergies();
      },
    });
  }
}
