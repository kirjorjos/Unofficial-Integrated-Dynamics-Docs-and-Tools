import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

export class OPERATOR_NBT_FROM_TAG_LIST extends BaseOperator<
  iArray<Tag<IntegratedValue>>,
  ListTag
> {
  static override internalName =
    "integrateddynamics:nbt_from_tag_list" as const;
  static override nicknames = ["tagListAsNbt", "nbtFromTagList"];
  static override symbol = "NBT.from_tag_list";
  static override interactName = "tagListAsNbt";
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
