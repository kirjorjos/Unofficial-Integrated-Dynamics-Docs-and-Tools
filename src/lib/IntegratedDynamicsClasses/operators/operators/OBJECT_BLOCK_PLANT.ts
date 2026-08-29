import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANT extends BaseOperator<Block, Block> {
  static override internalName = "integrateddynamics:block_plant" as const;
  static override numericID = 120;
  static override nicknames = ["blockPlant", "block_plant"];
  static override symbol = "plant";
  static override interactName = "plant";
  static override operatorName = "plant" as const;
  static override displayName = "Block Plant" as const;
  static override fullDisplayName = "Block Block Plant" as const;
  static override stringDisplayNames = [
    "block block plant",
    "block block Plant",
    "block Block plant",
    "block Block Plant",
    "Block block plant",
    "Block block Plant",
    "Block Block plant",
    "Block Block Plant",
    "block plant",
    "block Plant",
    "Block plant",
    "Block Plant",
  ];
  static override tooltipInfo =
    "The resulting block when this block is planted" as const;

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
            type: "Block",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): Block => {
        return block.getPlant();
      },
    });
  }
}
