import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

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
