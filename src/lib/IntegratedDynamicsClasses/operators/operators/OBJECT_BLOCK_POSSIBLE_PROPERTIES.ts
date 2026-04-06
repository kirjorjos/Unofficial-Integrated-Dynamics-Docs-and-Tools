import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_POSSIBLE_PROPERTIES extends BaseOperator<
  Block,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:block_blockpossibleproperties" as const;
  static override numericID = 268;
  static override nicknames = [
    "BlockPossibleProperties",
    "block_possible_properties",
    "blockPossibleProperties",
    "blockpossibleproperties",
    "blockBlockpossibleproperties",
  ];
  static override symbol = "block_all_props";
  static override interactName = "blockPossibleProperties";
  static override operatorName = "blockpossibleproperties" as const;
  static override displayName = "Block Properties" as const;
  static override fullDisplayName = "Block Block Properties" as const;
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
        return block.getPossibleProperties().toCompoundTag();
      },
    });
  }
}
