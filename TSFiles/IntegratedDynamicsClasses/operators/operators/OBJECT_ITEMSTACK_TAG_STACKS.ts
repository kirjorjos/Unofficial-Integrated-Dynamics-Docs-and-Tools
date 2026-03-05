import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";

export class OPERATOR_OBJECT_ITEMSTACK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Item>
> {
  static override internalName = "integrateddynamics:itemstack_tags" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackTags",
        "itemstack_tag_values",
        "itemstackTagValues",
        "item_tag_names",
        "itemTagNames",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "item_tag_val",
      interactName: "itemstackTagVal",
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
