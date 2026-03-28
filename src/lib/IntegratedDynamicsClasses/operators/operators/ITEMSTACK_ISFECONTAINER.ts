import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_ISFECONTAINER extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_isfecontainer" as const;
  static override numericID = 109;
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
