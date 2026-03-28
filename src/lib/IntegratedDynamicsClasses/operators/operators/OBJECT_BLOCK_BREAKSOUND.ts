import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_BREAKSOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_breaksound" as const;
  static override numericID = 13;
  static override nicknames = [
    "BlockBreaksound",
    "block_break_sound",
    "blockBreakSound",
    "breakSound",
  ];
  static override symbol = "break_sound";
  static override interactName = "blockBreakSound";
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
        return block.getBreakSound();
      },
    });
  }
}
