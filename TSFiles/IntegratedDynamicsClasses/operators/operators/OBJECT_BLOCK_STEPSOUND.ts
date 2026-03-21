import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_STEPSOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_stepsound" as const;
  static override nicknames = [
    "BlockStepsound",
    "blockStepSound",
    "block_step_sound",
    "stepSound",
  ];
  static override symbol = "step_sound";
  static override interactName = "blockStepSound";
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
        return block.getStepSound();
      },
    });
  }
}
