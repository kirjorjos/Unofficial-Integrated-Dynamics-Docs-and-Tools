import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Block } from "IntegratedDynamicsClasses/Block";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { BlockConstructor } from "IntegratedDynamicsClasses/registries/blockRegistry";

export class OPERATOR_OBJECT_BLOCK_TAG_STACKS extends BaseOperator<
  iString,
  iArray<Block>
> {
  static override internalName = "integrateddynamics:string_blocktag" as const;
  constructor() {
    super({
      nicknames: ["BlockTagStacks", "block_tag_stacks", "blockTagStacks"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: { type: "List", listType: { type: "Block" } },
      }),
      symbol: "block_tag_values",
      interactName: "stringBlocksByTag",
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
