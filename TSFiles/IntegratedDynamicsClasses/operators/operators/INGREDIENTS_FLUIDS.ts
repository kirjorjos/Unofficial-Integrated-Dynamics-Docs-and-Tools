import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_INGREDIENTS_FLUIDS extends BaseOperator<
  Ingredients,
  iArray<Fluid>
> {
  static override internalName =
    "integrateddynamics:ingredients_fluids" as const;
  static override numericID = 149;
  static override nicknames = ["ingredientsFluids", "Ingr.fluids"];
  static override symbol = "Ingr.fluids";
  static override interactName = "ingredientsFluids";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        normalizeSignature
      ),
      function: (ingredients: Ingredients): iArray<Fluid> => {
        return ingredients.getFluids();
      },
    });
  }
}
