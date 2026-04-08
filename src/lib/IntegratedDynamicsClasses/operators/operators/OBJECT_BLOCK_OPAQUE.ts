import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_OPAQUE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName = "integrateddynamics:block_opaque" as const;
  static override numericID = 16;
  static override nicknames = [
    "blockIsOpaque",
    "BlockOpaque",
    "opaque",
    "blockOpaque",
  ];
  static override symbol = "opaque";
  static override interactName = "blockIsOpaque";
  static override operatorName = "opaque" as const;
  static override displayName = "Opaque" as const;
  static override fullDisplayName = "Block Opaque" as const;
  static override tooltipInfo =
    "If the given block is opaque, non-transparent" as const;

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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): iBoolean => {
        return block.isOpaque();
      },
    });
  }
}
