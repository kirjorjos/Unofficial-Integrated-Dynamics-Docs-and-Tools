import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_MODNAME extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_mod" as const;
  constructor() {
    super({
      nicknames: ["blockMod", "block_mod"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "mod",
      interactName: "blockMod",
      function: (block: Block): iString => {
        return block.getModName();
      },
    });
  }
}
