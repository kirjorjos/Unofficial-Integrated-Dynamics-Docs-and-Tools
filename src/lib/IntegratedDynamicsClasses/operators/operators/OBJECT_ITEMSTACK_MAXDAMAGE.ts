import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MAXDAMAGE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_maxdamage" as const;
  static override numericID = 58;
  static override nicknames = [
    "ItemstackMaxdamage",
    "itemstack_max_damage",
    "itemstackMaxDamage",
    "maxDamage",
    "maxdamage",
    "itemstackMaxdamage",
  ];
  static override symbol = "max_damage";
  static override interactName = "itemstackMaxDamage";
  static override operatorName = "maxdamage" as const;
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
        return item.getMaxDamage();
      },
    });
  }
}
