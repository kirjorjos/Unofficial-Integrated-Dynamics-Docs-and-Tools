import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTTYPE extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_plant_type" as const;
  static override numericID = 121;
  static override nicknames = ["plant_type", "planttype", "plantType"];
  static override symbol = "plant_type";
  static override interactName = "plantType";
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
