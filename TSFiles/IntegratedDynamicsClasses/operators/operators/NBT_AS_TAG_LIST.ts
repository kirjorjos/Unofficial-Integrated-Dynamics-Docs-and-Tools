import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

export class OPERATOR_NBT_AS_TAG_LIST extends BaseOperator<
  ListTag,
  iArray<Tag<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:nbt_as_tag_list" as const;
  static override nicknames = ["nbtAsTagList"];
  static override symbol = "NBT.as_tag_list";
  static override interactName = "nbtAsTagList";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "NBT" } },
        },
        normalizeSignature
      ),
      function: (nbt: ListTag): iArray<Tag<IntegratedValue>> => {
        if (nbt.getType() === Tag.TAG_LIST) {
          return nbt.valueOf();
        } else {
          return new iArrayEager<Tag<any>>([]);
        }
      },
    });
  }
}
