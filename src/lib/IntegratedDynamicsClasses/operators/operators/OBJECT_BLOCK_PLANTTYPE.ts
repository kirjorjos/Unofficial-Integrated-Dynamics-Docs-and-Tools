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
    "plant_type",
    "planttype",
    "plantType",
    "blockPlanttype",
  ];
  static override symbol = "plant_type";
  static override interactName = "plantType";
  static override operatorName = "planttype" as const;
  static override displayName = "Block Plant Type" as const;
  static override fullDisplayName = "Block Block Plant Type" as const;
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
