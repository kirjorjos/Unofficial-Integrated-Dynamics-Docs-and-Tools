import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEMS extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_items" as const;
  static override numericID = 155;
  static override nicknames = [
    "ingredientsWithItems",
    "Ingr.with_items",
    "with_items",
    "ingredientsWith_items",
  ];
  static override symbol = "Ingr.with_items";
  static override interactName = "ingredientsWithItems";
  static override operatorName = "with_items" as const;
  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
            from: { type: "List", listType: { type: "Item" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Item>, Ingredients> => {
        return (itemList: iArray<Item>): Ingredients => {
          return ingredients.withItems(itemList);
        };
      },
    });
  }
}
