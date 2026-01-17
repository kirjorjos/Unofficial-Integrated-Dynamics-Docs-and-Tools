import { globalMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUIDS extends BaseOperator<
  Ingredients,
  Operator<iArray<Fluid>, Ingredients>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:ingredients_with_fluids",
      nicknames: ["ingredientsWithFluids", "Ingr.with_fluids"],
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
        globalMap
      ),
      symbol: "Ingr.with_fluids",
      interactName: "ingredientsWithFluids",
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Fluid>, Ingredients> => {
        return (fluidList: iArray<Fluid>): Ingredients => {
          return ingredients.appendFluids(fluidList);
        };
      },
    });
  }
}
