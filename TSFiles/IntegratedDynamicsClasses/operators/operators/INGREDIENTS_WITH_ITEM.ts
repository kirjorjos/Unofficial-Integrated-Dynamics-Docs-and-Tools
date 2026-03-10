import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEM extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Item, Ingredients>>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_item" as const;
  static override nicknames = ["ingredientsWithItem", "Ingr.with_item"];
  static override symbol = "Ingr.with_item";
  static override interactName = "ingredientsWithItem";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
