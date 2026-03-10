import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_OPAQUE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName = "integrateddynamics:block_opaque" as const;
  static override nicknames = ["blockIsOpaque", "BlockOpaque", "opaque"];
  static override symbol = "opaque";
  static override interactName = "blockIsOpaque";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (block: Block): iBoolean => {
        return block.isOpaque();
      },
    });
  }
}
