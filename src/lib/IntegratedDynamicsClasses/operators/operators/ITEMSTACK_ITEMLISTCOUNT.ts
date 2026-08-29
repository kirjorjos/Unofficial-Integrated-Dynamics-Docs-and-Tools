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
    "itemlistcount",
    "itemListCount",
    "itemstackItemlistcount",
    "itemstackListCount",
    "ItemstackListCount",
    "listItemListCount",
    "item_list_count",
    "itemstack_itemlistcount",
    "itemstack_list_count",
    "list_item_list_count",
  ];
  static override symbol = "item_list_count";
  static override interactName = "listItemListCount";
  static override operatorName = "itemlistcount" as const;
  static override displayName = "Item List Count" as const;
  static override fullDisplayName = "Item Item List Count" as const;
  static override stringDisplayNames = [
    "item item list count",
    "item item list Count",
    "item item List count",
    "item item List Count",
    "item Item list count",
    "item Item list Count",
    "item Item List count",
    "item Item List Count",
    "Item item list count",
    "Item item list Count",
    "Item item List count",
    "Item item List Count",
    "Item Item list count",
    "Item Item list Count",
    "Item Item List count",
    "Item Item List Count",
    "item itemstack list count",
    "item itemstack list Count",
    "item itemstack List count",
    "item itemstack List Count",
    "item Itemstack list count",
    "item Itemstack list Count",
    "item Itemstack List count",
    "item Itemstack List Count",
    "item itemStack list count",
    "item itemStack list Count",
    "item itemStack List count",
    "item itemStack List Count",
    "item ItemStack list count",
    "item ItemStack list Count",
    "item ItemStack List count",
    "item ItemStack List Count",
    "Item itemstack list count",
    "Item itemstack list Count",
    "Item itemstack List count",
    "Item itemstack List Count",
    "Item Itemstack list count",
    "Item Itemstack list Count",
    "Item Itemstack List count",
    "Item Itemstack List Count",
    "Item itemStack list count",
    "Item itemStack list Count",
    "Item itemStack List count",
    "Item itemStack List Count",
    "Item ItemStack list count",
    "Item ItemStack list Count",
    "Item ItemStack List count",
    "Item ItemStack List Count",
    "itemstack item list count",
    "itemstack item list Count",
    "itemstack item List count",
    "itemstack item List Count",
    "itemstack Item list count",
    "itemstack Item list Count",
    "itemstack Item List count",
    "itemstack Item List Count",
    "Itemstack item list count",
    "Itemstack item list Count",
    "Itemstack item List count",
    "Itemstack item List Count",
    "Itemstack Item list count",
    "Itemstack Item list Count",
    "Itemstack Item List count",
    "Itemstack Item List Count",
    "itemStack item list count",
    "itemStack item list Count",
    "itemStack item List count",
    "itemStack item List Count",
    "itemStack Item list count",
    "itemStack Item list Count",
    "itemStack Item List count",
    "itemStack Item List Count",
    "ItemStack item list count",
    "ItemStack item list Count",
    "ItemStack item List count",
    "ItemStack item List Count",
    "ItemStack Item list count",
    "ItemStack Item list Count",
    "ItemStack Item List count",
    "ItemStack Item List Count",
    "itemstack itemstack list count",
    "itemstack itemstack list Count",
    "itemstack itemstack List count",
    "itemstack itemstack List Count",
    "itemstack Itemstack list count",
    "itemstack Itemstack list Count",
    "itemstack Itemstack List count",
    "itemstack Itemstack List Count",
    "itemstack itemStack list count",
    "itemstack itemStack list Count",
    "itemstack itemStack List count",
    "itemstack itemStack List Count",
    "itemstack ItemStack list count",
    "itemstack ItemStack list Count",
    "itemstack ItemStack List count",
    "itemstack ItemStack List Count",
    "Itemstack itemstack list count",
    "Itemstack itemstack list Count",
    "Itemstack itemstack List count",
    "Itemstack itemstack List Count",
    "Itemstack Itemstack list count",
    "Itemstack Itemstack list Count",
    "Itemstack Itemstack List count",
    "Itemstack Itemstack List Count",
    "Itemstack itemStack list count",
    "Itemstack itemStack list Count",
    "Itemstack itemStack List count",
    "Itemstack itemStack List Count",
    "Itemstack ItemStack list count",
    "Itemstack ItemStack list Count",
    "Itemstack ItemStack List count",
    "Itemstack ItemStack List Count",
    "itemStack itemstack list count",
    "itemStack itemstack list Count",
    "itemStack itemstack List count",
    "itemStack itemstack List Count",
    "itemStack Itemstack list count",
    "itemStack Itemstack list Count",
    "itemStack Itemstack List count",
    "itemStack Itemstack List Count",
    "itemStack itemStack list count",
    "itemStack itemStack list Count",
    "itemStack itemStack List count",
    "itemStack itemStack List Count",
    "itemStack ItemStack list count",
    "itemStack ItemStack list Count",
    "itemStack ItemStack List count",
    "itemStack ItemStack List Count",
    "ItemStack itemstack list count",
    "ItemStack itemstack list Count",
    "ItemStack itemstack List count",
    "ItemStack itemstack List Count",
    "ItemStack Itemstack list count",
    "ItemStack Itemstack list Count",
    "ItemStack Itemstack List count",
    "ItemStack Itemstack List Count",
    "ItemStack itemStack list count",
    "ItemStack itemStack list Count",
    "ItemStack itemStack List count",
    "ItemStack itemStack List Count",
    "ItemStack ItemStack list count",
    "ItemStack ItemStack list Count",
    "ItemStack ItemStack List count",
    "ItemStack ItemStack List Count",
    "item list count",
    "item list Count",
    "item List count",
    "item List Count",
    "Item list count",
    "Item list Count",
    "Item List count",
    "Item List Count",
    "itemstack list count",
    "itemstack list Count",
    "itemstack List count",
    "itemstack List Count",
    "Itemstack list count",
    "Itemstack list Count",
    "Itemstack List count",
    "Itemstack List Count",
    "itemStack list count",
    "itemStack list Count",
    "itemStack List count",
    "itemStack List Count",
    "ItemStack list count",
    "ItemStack list Count",
    "ItemStack List count",
    "ItemStack List Count",
  ];
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
