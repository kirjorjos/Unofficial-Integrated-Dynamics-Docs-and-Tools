import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_ITEMS extends BaseOperator<
  Ingredients,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:ingredients_items" as const;
  static override nicknames = ["ingredientsItems", "Ingr.items"];
  static override symbol = "Ingr.items";
  static override interactName = "ingredientsItems";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (ingredients: Ingredients): iArray<Item> => {
        return ingredients.getItems();
      },
    });
  }
}
