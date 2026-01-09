import { TypeMap } from "HelperClasses/TypeMap";
import { Block } from "IntegratedDynamicsClasses/IntegratedDynamicsClasses/Block";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_MODNAME extends BaseOperator<
  Block,
  iString
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:block_mod",
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
        return new iString(block.getModName());
      },
    });
  }
}
