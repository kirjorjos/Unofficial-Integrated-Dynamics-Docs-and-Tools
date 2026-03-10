import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ENERGIES extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_energies" as const;
  static override nicknames = ["ingredientsWithEnergies", "Ingr.with_energies"];
  static override symbol = "Ingr.with_energies";
  static override interactName = "ingredientsWithEnergies";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Long>, Ingredients> => {
        return (energyList: iArray<Long>): Ingredients => {
          return ingredients.withEnergies(energyList);
        };
      },
    });
  }
}
