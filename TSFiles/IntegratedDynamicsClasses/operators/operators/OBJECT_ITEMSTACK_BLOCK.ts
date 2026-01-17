import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_ITEMSTACK_BLOCK extends BaseOperator<Item, Block> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_block",
      nicknames: [
        "ItemstackBlock",
        "itemstack_block",
        "itemstackBlock",
        "itemBlock",
      ],
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
        globalMap
      ),
      symbol: "block",
      interactName: "itemstackBlock",
      function: (item: Item): Block => {
        return new Block(new Properties({}), item.getBlock());
      },
    });
  }
}
