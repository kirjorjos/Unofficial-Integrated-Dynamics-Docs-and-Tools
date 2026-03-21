import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_OBJECT_BLOCK_ITEMSTACK extends BaseOperator<Block, Item> {
  static override internalName = "integrateddynamics:block_itemstack" as const;
  static override nicknames = [
    "blockItemStack",
    "BlockItemstack",
    "block_item",
    "blockItemstack",
    "block_itemstack",
    "blockItem",
  ];
  static override symbol = "itemstack";
  static override interactName = "blockItemStack";
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
