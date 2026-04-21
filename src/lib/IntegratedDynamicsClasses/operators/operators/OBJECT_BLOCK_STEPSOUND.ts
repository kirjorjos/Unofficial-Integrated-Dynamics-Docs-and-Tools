import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_STEPSOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_stepsound" as const;
  static override numericID = 18;
  static override nicknames = [
    "blockStepsound",
    "blockStepSound",
    "BlockStepsound",
    "stepsound",
    "stepSound",
    "block_step_sound",
    "block_stepsound",
    "step_sound",
  ];
  static override symbol = "step_sound";
  static override interactName = "blockStepSound";
  static override operatorName = "stepsound" as const;
  static override displayName = "Block Step Sound" as const;
  static override fullDisplayName = "Block Block Step Sound" as const;
  static override tooltipInfo = "The step sound of the given block" as const;

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
