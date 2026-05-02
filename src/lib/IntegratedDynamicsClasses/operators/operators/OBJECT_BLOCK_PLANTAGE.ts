import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTAGE extends BaseOperator<
  Block,
  Integer
> {
  static override internalName = "integrateddynamics:block_plantage" as const;
  static override numericID = 122;
  static override nicknames = [
    "blockPlantage",
    "blockPlantAge",
    "BlockPlantage",
    "plantage",
    "plantAge",
    "block_plant_age",
    "block_plantage",
    "plant_age",
  ];
  static override symbol = "plant_age";
  static override interactName = "blockPlantAge";
  static override operatorName = "plantage" as const;
  static override displayName = "Block Plant Age" as const;
  static override fullDisplayName = "Block Block Plant Age" as const;
  static override tooltipInfo = "The age of the given plant block" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): Integer => {
        return block.getPlantAge();
      },
    });
  }
}
