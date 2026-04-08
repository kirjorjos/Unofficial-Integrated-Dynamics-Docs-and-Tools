import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_DAMAGE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName = "integrateddynamics:itemstack_damage" as const;
  static override numericID = 50;
  static override nicknames = [
    "ItemstackDamage",
    "itemstack_damage",
    "itemstackDamage",
    "damage",
  ];
  static override symbol = "damage";
  static override interactName = "itemstackDamage";
  static override operatorName = "damage" as const;
  static override displayName = "Damage" as const;
  static override fullDisplayName = "Item Damage" as const;
  static override tooltipInfo = "The current item damage" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Integer => {
        return item.getDamage();
      },
    });
  }
}
