import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_POSSIBLE_PROPERTIES extends BaseOperator<
  Block,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:block_blockpossibleproperties" as const;
  constructor() {
    super({
      nicknames: [
        "BlockPossibleProperties",
        "block_possible_properties",
        "blockPossibleProperties",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "block_all_props",
      interactName: "blockPossibleProperties",
      function: (block: Block): CompoundTag => {
        return block.getProperties().toCompoundTag();
      },
    });
  }
}
