import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_TOOLTIP extends BaseOperator<
  Item,
  iArray<iString>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_tooltip",
      nicknames: [
        "ItemstackTooltip",
        "itemstack_tooltip",
        "itemstackTooltip",
        "item_tooltip",
        "itemTooltip",
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
      symbol: "tooltip",
      interactName: "itemstackTooltip",
      function: (item: Item): iArray<iString> => {
        return item.getTooltip();
      },
    });
  }
}
