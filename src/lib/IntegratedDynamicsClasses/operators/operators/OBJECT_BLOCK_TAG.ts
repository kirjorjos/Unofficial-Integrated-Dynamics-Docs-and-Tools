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
    "block_tag",
    "block_tags",
  ];
  static override symbol = "block_tag_names";
  static override interactName = "blockTags";
  static override operatorName = "tag" as const;
  static override displayName = "Block Tag Names" as const;
  static override fullDisplayName = "Block Block Tag Names" as const;
  static override stringDisplayNames = [
    "block block tag names",
    "block block tag Names",
    "block block Tag names",
    "block block Tag Names",
    "block Block tag names",
    "block Block tag Names",
    "block Block Tag names",
    "block Block Tag Names",
    "Block block tag names",
    "Block block tag Names",
    "Block block Tag names",
    "Block block Tag Names",
    "Block Block tag names",
    "Block Block tag Names",
    "Block Block Tag names",
    "Block Block Tag Names",
    "block tag names",
    "block tag Names",
    "block Tag names",
    "block Tag Names",
    "Block tag names",
    "Block tag Names",
    "Block Tag names",
    "Block Tag Names",
  ];
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
