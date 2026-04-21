import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_TAG extends BaseOperator<
  Block,
  iArray<iString>
> {
  static override internalName = "integrateddynamics:block_tag" as const;
  static override numericID = 296;
  static override nicknames = [
    "blockTag",
    "BlockTag",
    "blockTags",
    "tag",
    "block_tag",
    "block_tags",
  ];
  static override symbol = "block_tag_names";
  static override interactName = "blockTags";
  static override operatorName = "tag" as const;
  static override displayName = "Block Tag Names" as const;
  static override fullDisplayName = "Block Block Tag Names" as const;
  static override kind = "block" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
      function: (block: Block): iArray<iString> => {
        return block.getTagNames();
      },
    });
  }
}
