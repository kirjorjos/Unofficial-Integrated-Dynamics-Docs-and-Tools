import { TypeMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_ITEMS extends BaseOperator<
  Ingredients,
  iArray<Item>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:ingredients_items",
      nicknames: ["ingredientsItems", "Ingr.items"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "Ingr.items",
      interactName: "ingredientsItems",
      function: (ingredients: Ingredients): iArray<Item> => {
        return ingredients.getItems();
      },
    });
  }
}
