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
