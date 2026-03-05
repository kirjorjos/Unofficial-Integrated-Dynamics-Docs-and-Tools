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
  constructor() {
    super({
      nicknames: ["nbtFromTagList"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "NBT" } },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT.from_tag_list",
      interactName: "tagListAsNbt",
      function: (tagList: iArray<Tag<IntegratedValue>>): ListTag => {
        return new ListTag(tagList);
      },
    });
  }
}
