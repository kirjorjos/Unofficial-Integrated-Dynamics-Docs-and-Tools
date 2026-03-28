import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_RARITY extends BaseOperator<
  Item,
  iString
> {
  static override internalName = "integrateddynamics:itemstack_rarity" as const;
  static override numericID = 61;
  static override nicknames = [
    "ItemstackRarity",
    "itemstack_rarity",
    "itemstackRarity",
    "rarity",
  ];
  static override symbol = "rarity";
  static override interactName = "itemstackRarity";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iString => {
        return item.getRarity();
      },
    });
  }
}
