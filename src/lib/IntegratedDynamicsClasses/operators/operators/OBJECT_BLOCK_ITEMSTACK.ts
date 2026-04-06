import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_OBJECT_BLOCK_ITEMSTACK extends BaseOperator<Block, Item> {
  static override internalName = "integrateddynamics:block_itemstack" as const;
  static override numericID = 14;
  static override nicknames = [
    "blockItemStack",
    "BlockItemstack",
    "block_item",
    "blockItemstack",
    "block_itemstack",
    "blockItem",
    "itemstack",
  ];
  static override symbol = "itemstack";
  static override interactName = "blockItemStack";
  static override operatorName = "itemstack" as const;
  static override displayName = "Item" as const;
  static override fullDisplayName = "Block Item" as const;
  static override kind = "block" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Item",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): Item => {
        return block.getItem();
      },
    });
  }
}
