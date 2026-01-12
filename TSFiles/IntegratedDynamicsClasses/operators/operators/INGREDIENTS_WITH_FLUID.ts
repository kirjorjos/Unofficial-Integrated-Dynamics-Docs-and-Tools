import { TypeMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUID extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Fluid, Ingredients>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:ingredients_with_fluid",
      nicknames: ["ingredientsWithFluid", "Ingr.with_fluid"],
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
                type: "Fluid",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_fluid",
      interactName: "ingredientsWithFluid",
      function: (
        ingredients: Ingredients
      ): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
        return (index: Integer): TypeLambda<Fluid, Ingredients> => {
          return (fluid: Fluid): Ingredients => {
            return ingredients.setFluid(fluid, index);
          };
        };
      },
    });
  }
}
