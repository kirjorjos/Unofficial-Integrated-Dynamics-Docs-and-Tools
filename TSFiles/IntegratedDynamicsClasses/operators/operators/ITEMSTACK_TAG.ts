import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_ITEMSTACK_TAG extends BaseOperator<
  Item,
  iArray<iString>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_tag",
      nicknames: [
        "ItemstackTag",
        "itemstack_tag_names",
        "itemstackTagNames",
        "item_tag_names",
        "itemTagNames",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "item_tag_names",
      interactName: "itemstackTags",
      function: (item: Item): iArray<iString> => {
        return item.getTagNames();
      },
    });
  }
}
