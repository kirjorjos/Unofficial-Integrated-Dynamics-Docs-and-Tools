import { TypeMap } from "HelperClasses/TypeMap";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_ITEMS extends BaseOperator<
  Ingredients,
  Operator<iArray<Long>, Ingredients>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:ingredients_with_items",
      nicknames: ["ingredientsWithItems", "Ingr.with_items"],
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
        globalMap
      ),
      symbol: "Ingr.with_items",
      interactName: "ingredientsWithItems",
      function: (
        ingredients: Ingredients
      ): TypeLambda<iArray<Item>, Ingredients> => {
        return (itemList: iArray<Item>): Ingredients => {
          return ingredients.appendItems(itemList);
        };
      },
    });
  }
}
