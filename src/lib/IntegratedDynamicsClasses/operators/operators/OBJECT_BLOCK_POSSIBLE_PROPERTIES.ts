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
    "blockBlockpossibleproperties",
    "blockpossibleproperties",
    "blockPossibleProperties",
    "BlockPossibleProperties",
    "block_blockpossibleproperties",
    "block_possible_properties",
  ];
  static override symbol = "block_all_props";
  static override interactName = "blockPossibleProperties";
  static override operatorName = "blockpossibleproperties" as const;
  static override displayName = "Block Properties" as const;
  static override fullDisplayName = "Block Block Properties" as const;
  static override stringDisplayNames = [
    "block block possible properties",
    "block block possible Properties",
    "block block Possible properties",
    "block block Possible Properties",
    "block Block possible properties",
    "block Block possible Properties",
    "block Block Possible properties",
    "block Block Possible Properties",
    "Block block possible properties",
    "Block block possible Properties",
    "Block block Possible properties",
    "Block block Possible Properties",
    "Block Block possible properties",
    "Block Block possible Properties",
    "Block Block Possible properties",
    "Block Block Possible Properties",
  ];
  static override tooltipInfo =
    "Get all possible block properties as NBT compound tag with list values." as const;

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
