import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUIDS extends BaseOperator<
  Ingredients,
  Operator<iArray<Fluid>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_fluids" as const;
  static override numericID = 154;
  static override nicknames = [
    "Ingr.withFluids",
    "ingredientsWithFluids",
    "withFluids",
    "Ingr.with_fluids",
    "ingredients_with_fluids",
    "ingredientsWith_fluids",
    "with_fluids",
  ];
  static override symbol = "Ingr.with_fluids";
  static override interactName = "ingredientsWithFluids";
  static override operatorName = "with_fluids" as const;
  static override displayName = "Ingredients With Fluids" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Fluids" as const;
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given list of fluids at the given ingredient position" as const;

  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
            from: { type: "List", listType: { type: "Fluid" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Fluid>, Ingredients> => {
        return (fluidList: iArray<Fluid>): Ingredients => {
          return ingredients.withFluids(fluidList);
        };
      },
    });
  }
}
