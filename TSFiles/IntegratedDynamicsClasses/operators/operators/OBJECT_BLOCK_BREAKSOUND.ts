import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_OBJECT_BLOCK_BREAKSOUND extends BaseOperator<
  Block,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:block_breaksound",
      nicknames: [
        "BlockBreaksound",
        "block_break_sound",
        "blockBreakSound",
        "breakSound",
      ],
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
        globalMap
      ),
      symbol: "break_sound",
      interactName: "blockBreakSound",
      function: (block: Block): iString => {
        return block.getBreakSound();
      },
    });
  }
}
