import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_ISPLANTABLE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:block_is_plantable" as const;
  static override numericID = 119;
  static override nicknames = ["blockIsPlantable", "block_is_plantable"];
  static override symbol = "is_plantable";
  static override interactName = "isPlantable";
  static override operatorName = "isplantable" as const;
  static override displayName = "Block Is Plant" as const;
  static override fullDisplayName = "Block Block Is Plant" as const;
  static override stringDisplayNames = [
    "block block is plant",
    "block block is Plant",
    "block block Is plant",
    "block block Is Plant",
    "block Block is plant",
    "block Block is Plant",
    "block Block Is plant",
    "block Block Is Plant",
    "Block block is plant",
    "Block block is Plant",
    "Block block Is plant",
    "Block block Is Plant",
    "Block Block is plant",
    "Block Block is Plant",
    "Block Block Is plant",
    "Block Block Is Plant",
    "block is plant",
    "block is Plant",
    "block Is plant",
    "block Is Plant",
    "Block is plant",
    "Block is Plant",
    "Block Is plant",
    "Block Is Plant",
  ];
  static override tooltipInfo = "If the given block is a plant" as const;

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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): iBoolean => {
        return block.isPlantable();
      },
    });
  }
}
