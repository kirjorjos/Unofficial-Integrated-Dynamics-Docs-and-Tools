import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_OBJECT_BLOCK_PROPERTIES extends BaseOperator<
  Block,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:block_blockproperties" as const;
  static override numericID = 269;
  static override nicknames = [
    "BlockProperties",
    "block_properties",
    "blockProperties",
  ];
  static override symbol = "block_props";
  static override interactName = "blockProperties";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (block: Block): CompoundTag => {
        return block.getProperties().toCompoundTag();
      },
    });
  }
}
