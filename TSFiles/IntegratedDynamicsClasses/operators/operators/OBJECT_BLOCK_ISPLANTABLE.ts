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
  constructor() {
    super({
      nicknames: ["is_plantable", "isplantable", "isPlantable"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "is_plantable",
      interactName: "isPlantable",
      function: (block: Block): iBoolean => {
        return block.isPlantable();
      },
    });
  }
}
