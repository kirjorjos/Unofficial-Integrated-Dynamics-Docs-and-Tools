import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_PLANT extends BaseOperator<Item, Block> {
  static override internalName = "integrateddynamics:itemstack_plant" as const;
  static override numericID = 124;
  static override nicknames = ["plant", "itemstackPlant"];
  static override symbol = "plant";
  static override interactName = "plant";
  static override operatorName = "plant" as const;
  static override displayName = "Item Plant" as const;
  static override fullDisplayName = "Item Item Plant" as const;
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
            type: "Block",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Block => {
        return item.getPlant();
      },
    });
  }
}
