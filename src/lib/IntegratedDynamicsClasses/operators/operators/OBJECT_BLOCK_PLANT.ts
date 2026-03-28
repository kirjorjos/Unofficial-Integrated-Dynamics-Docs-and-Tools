import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANT extends BaseOperator<Block, Block> {
  static override internalName = "integrateddynamics:block_plant" as const;
  static override numericID = 120;
  static override nicknames = ["plant"];
  static override symbol = "plant";
  static override interactName = "plant";
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
