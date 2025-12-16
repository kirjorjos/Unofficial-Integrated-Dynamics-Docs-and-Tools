import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { TypeMap } from "HelperClasses/TypeMap";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_ITEMSTACK_ITEMLISTCOUNT extends BaseOperator<
  iArray<Item>,
  Operator<Item, Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_itemlistcount",
      nicknames: [
        "ItemstackListCount",
        "itemstack_list_count",
        "itemstackListCount",
        "item_list_count",
        "itemListCount",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "List",
            listType: { type: "Item" },
          },
          to: {
            type: "Function",
            from: { type: "Item" },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "item_list_count",
      interactName: "listItemListCount",
      function: (items: Array<Item>): TypeLambda<Item, Integer> => {
        return (item: Item): Integer => {
          return new Integer(
            items.filter((i) => {
              try {
                return i.equals(item);
              } catch (e) {
                return false;
              }
            }).length
          );
        };
      },
    });
  }
}
