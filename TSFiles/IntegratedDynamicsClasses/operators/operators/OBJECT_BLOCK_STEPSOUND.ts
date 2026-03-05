import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_STEPSOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_stepsound" as const;
  constructor() {
    super({
      nicknames: [
        "BlockStepsound",
        "blockStepSound",
        "block_step_sound",
        "stepSound",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "step_sound",
      interactName: "blockStepSound",
      function: (block: Block): iString => {
        return block.getStepSound();
      },
    });
  }
}
