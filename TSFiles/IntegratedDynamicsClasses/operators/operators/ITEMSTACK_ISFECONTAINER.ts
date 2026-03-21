import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_ISFECONTAINER extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_isfecontainer" as const;
  static override nicknames = [
    "itemstackIsFeContainer",
    "ItemstackIsfecontainer",
    "itemstack_is_fe_container",
    "itemstackIsFecontainer",
    "item_is_fe_container",
    "itemIsFecontainer",
    "isFeContainer",
  ];
  static override symbol = "is_fe_container";
  static override interactName = "itemstackIsFeContainer";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return item.isFeContainer();
      },
    });
  }
}
