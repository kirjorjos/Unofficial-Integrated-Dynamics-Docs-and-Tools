import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { BlockConstructor } from "lib/IntegratedDynamicsClasses/registries/blockRegistry";

export class OPERATOR_OBJECT_BLOCK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Block>
> {
  static override internalName = "integrateddynamics:string_blocktag" as const;
  static override numericID = 298;
  static override nicknames = [
    "blocktag",
    "blockTagStacks",
    "BlockTagStacks",
    "stringBlocksByTag",
    "stringBlocktag",
    "block_tag_stacks",
    "string_blocks_by_tag",
    "string_blocktag",
  ];
  static override symbol = "block_tag_values";
  static override interactName = "stringBlocksByTag";
  static override operatorName = "blocktag" as const;
  static override displayName = "Block Tag Values" as const;
  static override fullDisplayName = "String Block Tag Values" as const;
  static override stringDisplayNames = [
    "string block tag values",
    "string block tag Values",
    "string block Tag values",
    "string block Tag Values",
    "string Block tag values",
    "string Block tag Values",
    "string Block Tag values",
    "string Block Tag Values",
    "String block tag values",
    "String block tag Values",
    "String block Tag values",
    "String block Tag Values",
    "String Block tag values",
    "String Block tag Values",
    "String Block Tag values",
    "String Block Tag Values",
    "block tag values",
    "block tag Values",
    "block Tag values",
    "block Tag Values",
    "Block tag values",
    "Block tag Values",
    "Block Tag values",
    "Block Tag Values",
  ];
  static override kind = "string" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Block" } },
        },
        normalizeSignature
      ),
      function: (name: iString): iArray<Block> => {
        const blockRegistry = RegistryHub.blockRegistry;
        const blocks: Block[] = [];
        for (const BlockConstructor of Object.values(
          blockRegistry.items
        ) as BlockConstructor[]) {
          const block = new BlockConstructor();
          if (block.getTagNames().includes(name).valueOf()) {
            blocks.push(block);
          }
        }
        return new iArrayEager(blocks);
      },
    });
  }
}
