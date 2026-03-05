import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_OPAQUE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName = "integrateddynamics:block_opaque" as const;
  constructor() {
    super({
      nicknames: ["BlockOpaque", "opaque"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "opaque",
      interactName: "blockIsOpaque",
      function: (block: Block): iBoolean => {
        return block.isOpaque();
      },
    });
  }
}
