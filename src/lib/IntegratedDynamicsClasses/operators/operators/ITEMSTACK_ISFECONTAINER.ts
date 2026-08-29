import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_ISFECONTAINER extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_isfecontainer" as const;
  static override numericID = 109;
  static override nicknames = [
    "isfecontainer",
    "isFeContainer",
    "itemIsFecontainer",
    "itemIsFeContainer",
    "itemstackIsfecontainer",
    "itemstackIsFecontainer",
    "itemstackIsFeContainer",
    "ItemstackIsfecontainer",
    "is_fe_container",
    "item_is_fe_container",
    "item_is_fecontainer",
    "itemstack_is_fe_container",
    "itemstack_is_fecontainer",
    "itemstack_isfecontainer",
  ];
  static override symbol = "is_fe_container";
  static override interactName = "itemstackIsFeContainer";
  static override operatorName = "isfecontainer" as const;
  static override displayName = "Is FE Container" as const;
  static override fullDisplayName = "Item Is FE Container" as const;
  static override stringDisplayNames = [
    "item is fe container",
    "item is fe Container",
    "item is Fe container",
    "item is Fe Container",
    "item Is fe container",
    "item Is fe Container",
    "item Is Fe container",
    "item Is Fe Container",
    "Item is fe container",
    "Item is fe Container",
    "Item is Fe container",
    "Item is Fe Container",
    "Item Is fe container",
    "Item Is fe Container",
    "Item Is Fe container",
    "Item Is Fe Container",
    "item is FE container",
    "item is FE Container",
    "item Is FE container",
    "item Is FE Container",
    "Item is FE container",
    "Item is FE Container",
    "Item Is FE container",
    "Item Is FE Container",
    "itemstack is fe container",
    "itemstack is fe Container",
    "itemstack is Fe container",
    "itemstack is Fe Container",
    "itemstack Is fe container",
    "itemstack Is fe Container",
    "itemstack Is Fe container",
    "itemstack Is Fe Container",
    "Itemstack is fe container",
    "Itemstack is fe Container",
    "Itemstack is Fe container",
    "Itemstack is Fe Container",
    "Itemstack Is fe container",
    "Itemstack Is fe Container",
    "Itemstack Is Fe container",
    "Itemstack Is Fe Container",
    "itemStack is fe container",
    "itemStack is fe Container",
    "itemStack is Fe container",
    "itemStack is Fe Container",
    "itemStack Is fe container",
    "itemStack Is fe Container",
    "itemStack Is Fe container",
    "itemStack Is Fe Container",
    "ItemStack is fe container",
    "ItemStack is fe Container",
    "ItemStack is Fe container",
    "ItemStack is Fe Container",
    "ItemStack Is fe container",
    "ItemStack Is fe Container",
    "ItemStack Is Fe container",
    "ItemStack Is Fe Container",
    "itemstack is FE container",
    "itemstack is FE Container",
    "itemstack Is FE container",
    "itemstack Is FE Container",
    "Itemstack is FE container",
    "Itemstack is FE Container",
    "Itemstack Is FE container",
    "Itemstack Is FE Container",
    "itemStack is FE container",
    "itemStack is FE Container",
    "itemStack Is FE container",
    "itemStack Is FE Container",
    "ItemStack is FE container",
    "ItemStack is FE Container",
    "ItemStack Is FE container",
    "ItemStack Is FE Container",
    "is fe container",
    "is fe Container",
    "is Fe container",
    "is Fe Container",
    "Is fe container",
    "Is fe Container",
    "Is Fe container",
    "Is Fe Container",
    "is FE container",
    "is FE Container",
    "Is FE container",
    "Is FE Container",
  ];
  static override tooltipInfo = "If the given item can hold FE" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return item.isFeContainer();
      },
    });
  }
}
