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
    "Ingr.withItems",
    "ingredientsWithItems",
    "withItems",
    "Ingr.with_items",
    "ingredients_with_items",
    "ingredientsWith_items",
    "with_items",
  ];
  static override symbol = "Ingr.with_items";
  static override interactName = "ingredientsWithItems";
  static override operatorName = "with_items" as const;
  static override displayName = "Ingredients With Items" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Items" as const;
  static override stringDisplayNames = [
    "ingredients with items",
    "ingredients with Items",
    "ingredients With items",
    "ingredients With Items",
    "Ingredients with items",
    "Ingredients with Items",
    "Ingredients With items",
    "Ingredients With Items",
    "ingredients ingredients with items",
    "ingredients ingredients with Items",
    "ingredients ingredients With items",
    "ingredients ingredients With Items",
    "ingredients Ingredients with items",
    "ingredients Ingredients with Items",
    "ingredients Ingredients With items",
    "ingredients Ingredients With Items",
    "Ingredients ingredients with items",
    "Ingredients ingredients with Items",
    "Ingredients ingredients With items",
    "Ingredients ingredients With Items",
    "Ingredients Ingredients with items",
    "Ingredients Ingredients with Items",
    "Ingredients Ingredients With items",
    "Ingredients Ingredients With Items",
  ];
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given list of items at the given ingredient position" as const;

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
