import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_TAG extends BaseOperator<
  Block,
  iArray<iString>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:block_tag",
      nicknames: ["BlockTag", "blockTag"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "block_tag_names",
      interactName: "blockTags",
      function: (block: Block): iArray<iString> => {
        return block.getTagNames();
      },
    });
  }
}
