import { globalMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ENERGY extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Long, Ingredients>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:ingredients_with_energy",
      nicknames: ["ingredientsWithEnergy", "Ingr.with_energy"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Long",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_energy",
      interactName: "ingredientsWithEnergy",
      function: (
        ingredients: Ingredients
      ): TypeLambda<Integer, TypeLambda<Long, Ingredients>> => {
        return (index: Integer): TypeLambda<Long, Ingredients> => {
          return (energy: Long): Ingredients => {
            return ingredients.setEnergy(energy, index);
          };
        };
      },
    });
  }
}
