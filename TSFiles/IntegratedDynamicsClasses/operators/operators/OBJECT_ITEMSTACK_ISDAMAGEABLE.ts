import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISDAMAGEABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_damageable" as const;
  static override nicknames = [
    "ItemstackIsdamageable",
    "itemstack_is_damageable",
    "itemstackIsDamageable",
    "isDamageable",
  ];
  static override symbol = "damageable";
  static override interactName = "itemstackIsDamageable";
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
        return item.isDamageable();
      },
    });
  }
}
