import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

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
  ];
  static override symbol = "max_damage";
  static override interactName = "itemstackMaxDamage";
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
