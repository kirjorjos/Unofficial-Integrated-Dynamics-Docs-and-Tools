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
    "itemstackTagVal",
    "ItemstackTags",
    "itemstack_tag_values",
    "itemstackTagValues",
    "item_tag_names",
    "itemTagNames",
    "tag",
    "stringTag",
  ];
  static override symbol = "item_tag_val";
  static override interactName = "itemstackTagVal";
  static override operatorName = "tag" as const;
  static override displayName = "Item Tag Values" as const;
  static override fullDisplayName = "String Item Tag Values" as const;
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
