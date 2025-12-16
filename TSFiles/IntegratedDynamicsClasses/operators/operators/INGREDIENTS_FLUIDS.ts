import { TypeMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_FLUIDS extends BaseOperator<
  Ingredients,
  iArray<Fluid>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:ingredients_fluids",
      nicknames: ["ingredientsFluids", "Ingr.fluids"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "Ingr.fluids",
      interactName: "ingredientsFluids",
      function: (ingredients: Ingredients): iArray<Fluid> => {
        return ingredients.getFluids();
      },
    });
  }
}
