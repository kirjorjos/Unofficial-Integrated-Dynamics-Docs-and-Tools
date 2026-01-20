import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_MODNAME extends BaseOperator<
  Block,
  iString
> {
    static override internalName = "integrateddynamics:block_mod"
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
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "blockMod",
      function: (block: Block): iString => {
        return block.getModName();
      },
    });
  }
}
