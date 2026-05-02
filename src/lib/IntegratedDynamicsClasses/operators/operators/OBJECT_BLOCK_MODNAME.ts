import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_MODNAME extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_mod" as const;
  static override numericID = 15;
  static override nicknames = ["blockMod", "block_mod"];
  static override symbol = "mod";
  static override interactName = "blockMod";
  static override operatorName = "mod" as const;
  static override displayName = "Mod" as const;
  static override fullDisplayName = "Block Mod" as const;
  static override tooltipInfo =
    "The name of the mod owning the given block" as const;

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
        return block.getModName();
      },
    });
  }
}
