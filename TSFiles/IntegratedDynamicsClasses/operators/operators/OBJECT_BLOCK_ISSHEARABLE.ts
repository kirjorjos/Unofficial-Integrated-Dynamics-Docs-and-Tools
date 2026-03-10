import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_ISSHEARABLE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:block_isshearable" as const;
  constructor() {
    super({
      nicknames: ["blockIsshearable", "block_is_shearable", "blockIsShearable"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "is_shearable",
      interactName: "blockIsShearable",
      function: (block: Block): iBoolean => {
        return block.isShearable();
      },
    });
  }
}
