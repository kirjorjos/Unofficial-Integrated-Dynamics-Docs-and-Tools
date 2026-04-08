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
    "blockproperties",
    "blockBlockproperties",
  ];
  static override symbol = "block_props";
  static override interactName = "blockProperties";
  static override operatorName = "blockproperties" as const;
  static override displayName = "Block Properties" as const;
  static override fullDisplayName = "Block Block Properties" as const;
  static override tooltipInfo =
    "Get the block properties as NBT compound tag." as const;

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
