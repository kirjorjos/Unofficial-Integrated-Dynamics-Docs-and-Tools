import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_INGREDIENTS_FLUIDS extends BaseOperator<
  Ingredients,
  iArray<Fluid>
> {
  static override internalName =
    "integrateddynamics:ingredients_fluids" as const;
  static override numericID = 149;
  static override nicknames = ["ingredientsFluids", "Ingr.fluids", "fluids"];
  static override symbol = "Ingr.fluids";
  static override interactName = "ingredientsFluids";
  static override operatorName = "fluids" as const;
  static override displayName = "Ingredient fluids" as const;
  static override fullDisplayName = "Ingredients Ingredient fluids" as const;
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
