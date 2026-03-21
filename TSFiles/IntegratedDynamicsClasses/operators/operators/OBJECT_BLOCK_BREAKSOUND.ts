import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_BREAKSOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_breaksound" as const;
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
