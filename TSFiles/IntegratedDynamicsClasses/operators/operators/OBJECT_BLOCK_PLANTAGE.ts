import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTAGE extends BaseOperator<
  Block,
  Integer
> {
  static override internalName = "integrateddynamics:block_plantage" as const;
  static override nicknames = [
    "BlockPlantage",
    "block_plant_age",
    "blockPlantAge",
    "plantAge",
  ];
  static override symbol = "plant_age";
  static override interactName = "blockPlantAge";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (block: Block): Integer => {
        return block.getPlantAge();
      },
    });
  }
}
