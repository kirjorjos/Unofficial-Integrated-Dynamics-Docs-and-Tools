import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_ISPLANTABLE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:block_is_plantable" as const;
  static override nicknames = ["is_plantable", "isplantable", "isPlantable"];
  static override symbol = "is_plantable";
  static override interactName = "isPlantable";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (block: Block): iBoolean => {
        return block.isPlantable();
      },
    });
  }
}
