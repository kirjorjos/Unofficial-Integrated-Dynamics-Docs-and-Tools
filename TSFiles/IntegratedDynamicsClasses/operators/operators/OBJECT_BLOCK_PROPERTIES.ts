import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_OBJECT_BLOCK_PROPERTIES extends BaseOperator<
  Block,
  CompoundTag
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:block_blockproperties",
      nicknames: ["BlockProperties", "block_properties", "blockProperties"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "block_props",
      interactName: "blockProperties",
      function: (block: Block): CompoundTag => {
        return block.getProperties().toCompoundTag();
      },
    });
  }
}
