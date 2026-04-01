import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_ITEMS extends BaseOperator<
  Ingredients,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:ingredients_items" as const;
  static override numericID = 150;
  static override nicknames = ["ingredientsItems", "Ingr.items", "items"];
  static override symbol = "Ingr.items";
  static override interactName = "ingredientsItems";
  static override operatorName = "items" as const;
  static override kind = "ingredients" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
