import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ITEMSTACK_TAG extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:itemstack_tag" as const;
  static override numericID = 199;
  static override nicknames = [
    "itemstackTags",
    "ItemstackTag",
    "itemstack_tag_names",
    "itemstackTagNames",
    "item_tag_names",
    "itemTagNames",
  ];
  static override symbol = "item_tag_names";
  static override interactName = "itemstackTags";
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
