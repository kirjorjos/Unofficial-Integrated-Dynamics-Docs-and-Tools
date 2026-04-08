import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_OBJECT_ITEMSTACK_TAG extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:itemstack_tags" as const;
  static override numericID = 201;
  static override nicknames = [
    "itemstackTags",
    "ItemstackTag",
    "itemstack_tag_names",
    "itemstackTagNames",
    "item_tag_names",
    "itemTagNames",
    "tag",
    "itemstackTag",
  ];
  static override symbol = "item_tag_names";
  static override interactName = "itemstackTags";
  static override operatorName = "tag" as const;
  static override displayName = "Item Tag Names" as const;
  static override fullDisplayName = "Item Item Tag Names" as const;
  static override tooltipInfo =
    "The Tag names (strings) of the given item" as const;

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
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
      function: (item: Item): iArray<iString> => {
        return item.getTagNames();
      },
    });
  }
}
