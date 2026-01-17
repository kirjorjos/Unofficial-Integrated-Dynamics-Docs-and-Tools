import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_OPAQUE extends BaseOperator<
  Block,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:block_opaque",
      nicknames: ["BlockOpaque", "opaque"],
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
        globalMap
      ),
      symbol: "opaque",
      interactName: "blockIsOpaque",
      function: (block: Block): iBoolean => {
        return block.isOpaque();
      },
    });
  }
}
