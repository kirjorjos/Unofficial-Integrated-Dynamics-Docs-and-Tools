import { globalMap } from "HelperClasses/TypeMap";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_ISFECONTAINER extends BaseOperator<
  Item,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_isfecontainer",
      nicknames: [
        "ItemstackIsfecontainer",
        "itemstack_is_fe_container",
        "itemstackIsFecontainer",
        "item_is_fe_container",
        "itemIsFecontainer",
        "isFeContainer",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_fe_container",
      interactName: "itemstackIsFeContainer",
      function: (item: Item): iBoolean => {
        return item.isFeContainer();
      },
    });
  }
}
