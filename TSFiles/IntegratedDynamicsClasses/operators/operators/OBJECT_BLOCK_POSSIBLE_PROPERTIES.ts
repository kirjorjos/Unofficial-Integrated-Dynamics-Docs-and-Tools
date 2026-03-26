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
  static override numericID = 268;
  static override nicknames = [
    "BlockPossibleProperties",
    "block_possible_properties",
    "blockPossibleProperties",
  ];
  static override symbol = "block_all_props";
  static override interactName = "blockPossibleProperties";
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
