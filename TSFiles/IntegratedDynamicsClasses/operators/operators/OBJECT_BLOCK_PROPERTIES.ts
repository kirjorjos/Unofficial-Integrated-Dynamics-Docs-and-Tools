import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_OBJECT_BLOCK_PROPERTIES extends BaseOperator<
  Block,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:block_blockproperties" as const;
  static override nicknames = [
    "BlockProperties",
    "block_properties",
    "blockProperties",
  ];
  static override symbol = "block_props";
  static override interactName = "blockProperties";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "NBT",
        },
      }),
      function: (block: Block): CompoundTag => {
        return block.getProperties().toCompoundTag();
      },
    });
  }
}
