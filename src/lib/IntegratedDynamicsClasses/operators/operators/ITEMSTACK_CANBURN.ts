import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_CANBURN extends BaseOperator<Item, iBoolean> {
  static override internalName =
    "integrateddynamics:itemstack_canburn" as const;
  static override numericID = 112;
  static override nicknames = [
    "ItemstackCanburn",
    "item_can_burn",
    "itemCanBurn",
    "item_is_fuel",
    "itemIsFuel",
    "isFuel",
    "can_burn",
    "itemstackCanBurn",
    "canburn",
    "itemstackCanburn",
  ];
  static override symbol = "can_burn";
  static override interactName = "itemstackCanBurn";
  static override operatorName = "canburn" as const;
  static override displayName = "Is Fuel" as const;
  static override fullDisplayName = "Item Is Fuel" as const;
  static override tooltipInfo =
    "If the given item can be used as fuel" as const;

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
        return item.isFuel();
      },
    });
  }
}
