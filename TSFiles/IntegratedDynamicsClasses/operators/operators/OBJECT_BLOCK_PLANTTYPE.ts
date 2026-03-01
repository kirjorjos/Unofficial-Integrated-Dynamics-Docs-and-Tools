import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLANTTYPE extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_plant_type" as const;
  constructor() {
    super({
      nicknames: ["plant_type", "planttype", "plantType"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "plant_type",
      interactName: "plantType",
      function: (block: Block): iString => {
        return block.getPlantType();
      },
    });
  }
}
