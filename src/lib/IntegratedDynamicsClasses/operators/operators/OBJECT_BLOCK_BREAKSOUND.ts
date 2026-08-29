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
    "blockBreaksound",
    "blockBreakSound",
    "BlockBreaksound",
    "breaksound",
    "breakSound",
    "block_break_sound",
    "block_breaksound",
    "break_sound",
  ];
  static override symbol = "break_sound";
  static override interactName = "blockBreakSound";
  static override operatorName = "breaksound" as const;
  static override displayName = "Block Break Sound" as const;
  static override fullDisplayName = "Block Block Break Sound" as const;
  static override stringDisplayNames = [
    "block block break sound",
    "block block break Sound",
    "block block Break sound",
    "block block Break Sound",
    "block Block break sound",
    "block Block break Sound",
    "block Block Break sound",
    "block Block Break Sound",
    "Block block break sound",
    "Block block break Sound",
    "Block block Break sound",
    "Block block Break Sound",
    "Block Block break sound",
    "Block Block break Sound",
    "Block Block Break sound",
    "Block Block Break Sound",
    "block break sound",
    "block break Sound",
    "block Break sound",
    "block Break Sound",
    "Block break sound",
    "Block break Sound",
    "Block Break sound",
    "Block Break Sound",
  ];
  static override tooltipInfo = "The break sound of the given block" as const;

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
        return block.getBreakSound();
      },
    });
  }
}
