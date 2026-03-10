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
  constructor() {
    super({
      nicknames: [
        "ItemstackTag",
        "itemstack_tag_names",
        "itemstackTagNames",
        "item_tag_names",
        "itemTagNames",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      symbol: "item_tag_names",
      interactName: "itemstackTags",
      function: (item: Item): iArray<iString> => {
        return item.getTagNames();
      },
    });
  }
}
