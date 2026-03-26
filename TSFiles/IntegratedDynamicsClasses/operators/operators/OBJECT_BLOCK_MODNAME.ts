import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_MODNAME extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_mod" as const;
  static override numericID = 15;
  static override nicknames = ["blockMod", "block_mod"];
  static override symbol = "mod";
  static override interactName = "blockMod";
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
