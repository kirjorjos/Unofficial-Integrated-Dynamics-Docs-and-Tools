import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ENERGIES extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:ingredients_with_energies",
      nicknames: ["ingredientsWithEnergies", "Ingr.with_energies"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Long" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_energies",
      interactName: "ingredientsWithEnergies",
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Long>, Ingredients> => {
        return (energyList: iArray<Long>): Ingredients => {
          return ingredients.appendEnergies(energyList);
        };
      },
    });
  }
}
