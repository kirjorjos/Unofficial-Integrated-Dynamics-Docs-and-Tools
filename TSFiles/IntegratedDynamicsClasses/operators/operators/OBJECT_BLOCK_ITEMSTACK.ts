import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_OBJECT_BLOCK_ITEMSTACK extends BaseOperator<Block, Item> {
    static override internalName = "integrateddynamics:block_itemstack"
  constructor() {
    super({
      nicknames: [
        "BlockItemstack",
        "block_item",
        "blockItemstack",
        "block_itemstack",
        "blockItem",
      ],
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
        globalMap
      ),
      symbol: "itemstack",
      interactName: "blockItemStack",
      function: (block: Block): Item => {
        return block.getItem();
      },
    });
  }
}
