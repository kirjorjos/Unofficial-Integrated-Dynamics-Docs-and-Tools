import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_TAG extends BaseOperator<
  Block,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:block_tag" as const;
  static override nicknames = ["BlockTag", "blockTag"];
  static override symbol = "block_tag_names";
  static override interactName = "blockTags";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Block",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      function: (block: Block): iArray<iString> => {
        return block.getTagNames();
      },
    });
  }
}
