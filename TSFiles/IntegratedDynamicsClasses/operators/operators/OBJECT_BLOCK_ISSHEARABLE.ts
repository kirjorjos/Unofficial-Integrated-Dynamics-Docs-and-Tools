import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_ISSHEARABLE extends BaseOperator<
  Block,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:block_isshearable",
      nicknames: [
        "BlockIsshearable",
        "block_is_shearable",
        "blockIsShearable",
        "blockIsShearable",
      ],
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
      symbol: "is_shearable",
      interactName: "blockIsShearable",
      function: (block: Block): iBoolean => {
        return block.isShearable();
      },
    });
  }
}
