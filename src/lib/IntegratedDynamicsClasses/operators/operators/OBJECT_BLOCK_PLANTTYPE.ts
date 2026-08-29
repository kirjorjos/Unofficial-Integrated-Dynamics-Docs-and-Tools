import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTTYPE extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_plant_type" as const;
  static override numericID = 121;
  static override nicknames = [
    "blockPlanttype",
    "block_planttype",
    "blockPlantType",
    "block_plant_type",
  ];
  static override symbol = "plant_type";
  static override interactName = "plantType";
  static override operatorName = "planttype" as const;
  static override displayName = "Block Plant Type" as const;
  static override fullDisplayName = "Block Block Plant Type" as const;
  static override stringDisplayNames = [
    "block block plant type",
    "block block plant Type",
    "block block Plant type",
    "block block Plant Type",
    "block Block plant type",
    "block Block plant Type",
    "block Block Plant type",
    "block Block Plant Type",
    "Block block plant type",
    "Block block plant Type",
    "Block block Plant type",
    "Block block Plant Type",
    "Block Block plant type",
    "Block Block plant Type",
    "Block Block Plant type",
    "Block Block Plant Type",
    "block plant type",
    "block plant Type",
    "block Plant type",
    "block Plant Type",
    "Block plant type",
    "Block plant Type",
    "Block Plant type",
    "Block Plant Type",
  ];
  static override tooltipInfo = "The plant type of the given block" as const;

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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): iString => {
        return block.getPlantType();
      },
    });
  }
}
