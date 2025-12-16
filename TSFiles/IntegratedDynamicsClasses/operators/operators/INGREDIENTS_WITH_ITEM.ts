import { TypeMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEM extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Item, Ingredients>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:ingredients_with_item",
      nicknames: ["ingredientsWithItem", "Ingr.with_item"],
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
                type: "Item",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_item",
      interactName: "ingredientsWithItem",
      function: (
        ingredients: Ingredients
      ): TypeLambda<Integer, TypeLambda<Item, Ingredients>> => {
        return (index: Integer): TypeLambda<Item, Ingredients> => {
          return (item: Item): Ingredients => {
            return ingredients.setItem(item, index);
          };
        };
      },
    });
  }
}
