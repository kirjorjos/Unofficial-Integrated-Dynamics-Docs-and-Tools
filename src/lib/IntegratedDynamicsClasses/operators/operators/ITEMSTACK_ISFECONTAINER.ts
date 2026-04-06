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
    "isfecontainer",
    "itemstackIsfecontainer",
  ];
  static override symbol = "is_fe_container";
  static override interactName = "itemstackIsFeContainer";
  static override operatorName = "isfecontainer" as const;
  static override displayName = "Is FE Container" as const;
  static override fullDisplayName = "Item Is FE Container" as const;
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
