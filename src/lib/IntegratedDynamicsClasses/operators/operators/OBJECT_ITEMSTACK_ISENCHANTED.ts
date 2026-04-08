import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTED extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_enchanted" as const;
  static override numericID = 53;
  static override nicknames = [
    "ItemstackIsenchanted",
    "itemstack_is_enchanted",
    "itemstackIsEnchanted",
    "isEnchanted",
    "enchanted",
    "itemstackEnchanted",
  ];
  static override symbol = "enchanted";
  static override interactName = "itemstackIsEnchanted";
  static override operatorName = "enchanted" as const;
  static override displayName = "Enchanted" as const;
  static override fullDisplayName = "Item Enchanted" as const;
  static override tooltipInfo = "If the item is enchanted" as const;

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
        return item.isEnchanted();
      },
    });
  }
}
