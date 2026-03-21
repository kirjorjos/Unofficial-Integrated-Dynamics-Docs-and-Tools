import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_ITEMSTACK_BLOCK extends BaseOperator<Item, Block> {
  static override internalName = "integrateddynamics:itemstack_block" as const;
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
