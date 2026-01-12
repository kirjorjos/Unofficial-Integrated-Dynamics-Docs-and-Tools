import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_TAG_STACKS extends BaseOperator<
  Item,
  iArray<iString>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_tags",
      nicknames: [
        "ItemstackTags",
        "itemstack_tag_values",
        "itemstackTagValues",
        "item_tag_names",
        "itemTagNames",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "List",
            listType: {
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "item_tag_val",
      interactName: "itemstackTagVal",
      function: (item: Item): iArray<iString> => {
        return item.getTagNames();
      },
    });
  }
}
