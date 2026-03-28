import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_ITEMSTACK_BLOCK extends BaseOperator<Item, Block> {
  static override internalName = "integrateddynamics:itemstack_block" as const;
  static override numericID = 48;
  static override nicknames = [
    "ItemstackBlock",
    "itemstack_block",
    "itemstackBlock",
    "itemBlock",
  ];
  static override symbol = "block";
  static override interactName = "itemstackBlock";
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
        return new Block(new Properties({}), item.getBlock());
      },
    });
  }
}
