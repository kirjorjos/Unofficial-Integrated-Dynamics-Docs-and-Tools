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
    "block",
  ];
  static override symbol = "block";
  static override interactName = "itemstackBlock";
  static override operatorName = "block" as const;
  static override displayName = "Block" as const;
  static override fullDisplayName = "Item Block" as const;
  static override tooltipInfo = "The block from the given item" as const;

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
        return new Block(new Properties({}), item.getBlock());
      },
    });
  }
}
