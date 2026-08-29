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
    "Ingr.withItem",
    "ingredientsWithItem",
    "withItem",
    "Ingr.with_item",
    "ingredients_with_item",
    "ingredientsWith_item",
    "with_item",
  ];
  static override symbol = "Ingr.with_item";
  static override interactName = "ingredientsWithItem";
  static override operatorName = "with_item" as const;
  static override displayName = "Ingredients With Item" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Item" as const;
  static override stringDisplayNames = [
    "ingredients with item",
    "ingredients with Item",
    "ingredients With item",
    "ingredients With Item",
    "Ingredients with item",
    "Ingredients with Item",
    "Ingredients With item",
    "Ingredients With Item",
    "ingredients with itemstack",
    "ingredients with Itemstack",
    "ingredients with itemStack",
    "ingredients with ItemStack",
    "ingredients With itemstack",
    "ingredients With Itemstack",
    "ingredients With itemStack",
    "ingredients With ItemStack",
    "Ingredients with itemstack",
    "Ingredients with Itemstack",
    "Ingredients with itemStack",
    "Ingredients with ItemStack",
    "Ingredients With itemstack",
    "Ingredients With Itemstack",
    "Ingredients With itemStack",
    "Ingredients With ItemStack",
    "ingredients ingredients with item",
    "ingredients ingredients with Item",
    "ingredients ingredients With item",
    "ingredients ingredients With Item",
    "ingredients Ingredients with item",
    "ingredients Ingredients with Item",
    "ingredients Ingredients With item",
    "ingredients Ingredients With Item",
    "Ingredients ingredients with item",
    "Ingredients ingredients with Item",
    "Ingredients ingredients With item",
    "Ingredients ingredients With Item",
    "Ingredients Ingredients with item",
    "Ingredients Ingredients with Item",
    "Ingredients Ingredients With item",
    "Ingredients Ingredients With Item",
    "ingredients ingredients with itemstack",
    "ingredients ingredients with Itemstack",
    "ingredients ingredients with itemStack",
    "ingredients ingredients with ItemStack",
    "ingredients ingredients With itemstack",
    "ingredients ingredients With Itemstack",
    "ingredients ingredients With itemStack",
    "ingredients ingredients With ItemStack",
    "ingredients Ingredients with itemstack",
    "ingredients Ingredients with Itemstack",
    "ingredients Ingredients with itemStack",
    "ingredients Ingredients with ItemStack",
    "ingredients Ingredients With itemstack",
    "ingredients Ingredients With Itemstack",
    "ingredients Ingredients With itemStack",
    "ingredients Ingredients With ItemStack",
    "Ingredients ingredients with itemstack",
    "Ingredients ingredients with Itemstack",
    "Ingredients ingredients with itemStack",
    "Ingredients ingredients with ItemStack",
    "Ingredients ingredients With itemstack",
    "Ingredients ingredients With Itemstack",
    "Ingredients ingredients With itemStack",
    "Ingredients ingredients With ItemStack",
    "Ingredients Ingredients with itemstack",
    "Ingredients Ingredients with Itemstack",
    "Ingredients Ingredients with itemStack",
    "Ingredients Ingredients with ItemStack",
    "Ingredients Ingredients With itemstack",
    "Ingredients Ingredients With Itemstack",
    "Ingredients Ingredients With itemStack",
    "Ingredients Ingredients With ItemStack",
  ];
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given item at the given ingredient position" as const;

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
