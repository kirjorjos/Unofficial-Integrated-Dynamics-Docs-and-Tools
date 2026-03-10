import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUIDS extends BaseOperator<
  Ingredients,
  Operator<iArray<Fluid>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_fluids" as const;
  static override nicknames = ["ingredientsWithFluids", "Ingr.with_fluids"];
  static override symbol = "Ingr.with_fluids";
  static override interactName = "ingredientsWithFluids";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
