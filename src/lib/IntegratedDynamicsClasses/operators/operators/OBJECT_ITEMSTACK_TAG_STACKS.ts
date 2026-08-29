import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";

export class OPERATOR_OBJECT_ITEMSTACK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Item>
> {
  static override internalName =
    "integrateddynamics:itemstack_tag_stacks" as const;
  static override numericID = 200;
  static override nicknames = [
    "ItemstackTags",
    "itemstackTagVal",
    "itemstackTagValues",
    "stringTag",
    "itemstack_tag_val",
    "itemstack_tag_values",
    "string_tag",
  ];
  static override symbol = "item_tag_val";
  static override interactName = "itemstackTagVal";
  static override operatorName = "tag" as const;
  static override displayName = "Item Tag Values" as const;
  static override fullDisplayName = "String Item Tag Values" as const;
  static override stringDisplayNames = [
    "string item tag values",
    "string item tag Values",
    "string item Tag values",
    "string item Tag Values",
    "string Item tag values",
    "string Item tag Values",
    "string Item Tag values",
    "string Item Tag Values",
    "String item tag values",
    "String item tag Values",
    "String item Tag values",
    "String item Tag Values",
    "String Item tag values",
    "String Item tag Values",
    "String Item Tag values",
    "String Item Tag Values",
    "string itemstack tag values",
    "string itemstack tag Values",
    "string itemstack Tag values",
    "string itemstack Tag Values",
    "string Itemstack tag values",
    "string Itemstack tag Values",
    "string Itemstack Tag values",
    "string Itemstack Tag Values",
    "string itemStack tag values",
    "string itemStack tag Values",
    "string itemStack Tag values",
    "string itemStack Tag Values",
    "string ItemStack tag values",
    "string ItemStack tag Values",
    "string ItemStack Tag values",
    "string ItemStack Tag Values",
    "String itemstack tag values",
    "String itemstack tag Values",
    "String itemstack Tag values",
    "String itemstack Tag Values",
    "String Itemstack tag values",
    "String Itemstack tag Values",
    "String Itemstack Tag values",
    "String Itemstack Tag Values",
    "String itemStack tag values",
    "String itemStack tag Values",
    "String itemStack Tag values",
    "String itemStack Tag Values",
    "String ItemStack tag values",
    "String ItemStack tag Values",
    "String ItemStack Tag values",
    "String ItemStack Tag Values",
    "item tag values",
    "item tag Values",
    "item Tag values",
    "item Tag Values",
    "Item tag values",
    "Item tag Values",
    "Item Tag values",
    "Item Tag Values",
    "itemstack tag values",
    "itemstack tag Values",
    "itemstack Tag values",
    "itemstack Tag Values",
    "Itemstack tag values",
    "Itemstack tag Values",
    "Itemstack Tag values",
    "Itemstack Tag Values",
    "itemStack tag values",
    "itemStack tag Values",
    "itemStack Tag values",
    "itemStack Tag Values",
    "ItemStack tag values",
    "ItemStack tag Values",
    "ItemStack Tag values",
    "ItemStack Tag Values",
  ];
  static override tooltipInfo =
    "The Tag values (items) of the given name" as const;

  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "List",
            listType: {
              type: "Item",
            },
          },
        },
        normalizeSignature
      ),
      function: (tag: iString): iArray<Item> => {
        const matches: Item[] = [];
        const itemRegistry = RegistryHub.itemRegistry;
        if (itemRegistry) {
          for (const ItemClass of Object.values(itemRegistry.items)) {
            const item = new (ItemClass as any)();
            if (item.getTagNames().includes(tag).valueOf()) {
              matches.push(item);
            }
          }
        }
        return new iArrayEager(matches);
      },
    });
  }
}
