import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEM extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Item, Ingredients>>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_item" as const;
  static override numericID = 181;
  static override nicknames = [
    "ingredientsWithItem",
    "Ingr.with_item",
    "with_item",
    "ingredientsWith_item",
  ];
  static override symbol = "Ingr.with_item";
  static override interactName = "ingredientsWithItem";
  static override operatorName = "with_item" as const;
  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
        normalizeSignature
      ),
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
