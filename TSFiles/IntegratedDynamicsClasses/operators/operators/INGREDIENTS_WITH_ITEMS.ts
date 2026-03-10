import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEMS extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_items" as const;
  static override nicknames = ["ingredientsWithItems", "Ingr.with_items"];
  static override symbol = "Ingr.with_items";
  static override interactName = "ingredientsWithItems";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
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
