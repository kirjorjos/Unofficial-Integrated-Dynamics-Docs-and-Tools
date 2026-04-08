import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

export class OPERATOR_NBT_FROM_TAG_LIST extends BaseOperator<
  iArray<Tag<IntegratedValue>>,
  ListTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_tag_list" as const;
  static override numericID = 265;
  static override nicknames = [
    "tagListAsNbt",
    "nbtFromTagList",
    "from_tag_list",
    "nbtFrom_tag_list",
  ];
  static override symbol = "NBT.from_tag_list";
  static override interactName = "tagListAsNbt";
  static override operatorName = "from_tag_list" as const;
  static override displayName = "NBT List From Tag List" as const;
  static override fullDisplayName = "NBT NBT List From Tag List" as const;
  static override tooltipInfo =
    "Create an NBT List tag from the given NBT List value" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "NBT" } },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (tagList: iArray<Tag<IntegratedValue>>): ListTag => {
        return new ListTag(tagList);
      },
    });
  }
}
