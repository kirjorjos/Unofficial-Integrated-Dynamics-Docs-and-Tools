import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTAGE extends BaseOperator<
  Block,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:block_plantage",
      nicknames: [
        "BlockPlantage",
        "block_plant_age",
        "blockPlantAge",
        "plantAge",
      ],
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
        globalMap
      ),
      symbol: "plant_age",
      interactName: "blockPlantAge",
      function: (block: Block): Integer => {
        return block.getPlantAge();
      },
    });
  }
}
