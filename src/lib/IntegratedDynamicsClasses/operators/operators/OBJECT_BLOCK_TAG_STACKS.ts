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
    "stringBlocksByTag",
    "BlockTagStacks",
    "block_tag_stacks",
    "blockTagStacks",
  ];
  static override symbol = "block_tag_values";
  static override interactName = "stringBlocksByTag";
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
