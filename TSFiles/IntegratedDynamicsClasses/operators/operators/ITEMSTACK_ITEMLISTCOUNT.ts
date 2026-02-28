import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_ITEMSTACK_ITEMLISTCOUNT extends BaseOperator<
  iArray<Item>,
  Operator<Item, Integer>
> {
  static override internalName =
    "integrateddynamics:itemstack_itemlistcount" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackListCount",
        "itemstack_list_count",
        "itemstackListCount",
        "item_list_count",
        "itemListCount",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "item_list_count",
      interactName: "listItemListCount",
      function: (items: iArray<Item>): TypeLambda<Item, Integer> => {
        return (item: Item): Integer => {
          let totalCount = Integer.ZERO;
          for (const i of items.valueOf()) {
            try {
              if (i.getUniqueName().equals(item.getUniqueName()).valueOf()) {
                totalCount = totalCount.add(i.getSize());
              }
            } catch (e) {
              continue;
            }
          }
          return totalCount;
        };
      },
    });
  }
}
