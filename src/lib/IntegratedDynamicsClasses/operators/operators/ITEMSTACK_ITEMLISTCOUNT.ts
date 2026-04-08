import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_ITEMSTACK_ITEMLISTCOUNT extends BaseOperator<
  iArray<Item>,
  Operator<Item, Integer>
> {
  static override internalName =
    "integrateddynamics:itemstack_itemlistcount" as const;
  static override numericID = 190;
  static override nicknames = [
    "listItemListCount",
    "ItemstackListCount",
    "itemstack_list_count",
    "itemstackListCount",
    "item_list_count",
    "itemListCount",
    "itemlistcount",
    "itemstackItemlistcount",
  ];
  static override symbol = "item_list_count";
  static override interactName = "listItemListCount";
  static override operatorName = "itemlistcount" as const;
  static override displayName = "Item List Count" as const;
  static override fullDisplayName = "Item Item List Count" as const;
  static override tooltipInfo =
    "Get the total item count of exactly the given item in a list." as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
