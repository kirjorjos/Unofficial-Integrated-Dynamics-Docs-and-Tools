import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_OBJECT_ITEMSTACK_TAG extends BaseOperator<
  Item,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:itemstack_tags" as const;
  static override nicknames = [
    "ItemstackTag",
    "itemstack_tag_names",
    "itemstackTagNames",
    "item_tag_names",
    "itemTagNames",
  ];
  static override symbol = "item_tag_names";
  static override interactName = "itemstackTags";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      function: (item: Item): iArray<iString> => {
        return item.getTagNames();
      },
    });
  }
}
