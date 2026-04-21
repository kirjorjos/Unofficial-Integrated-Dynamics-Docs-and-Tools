import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";

export class OPERATOR_NBT_AS_TAG_LIST extends BaseOperator<
  ListTag,
  iArray<Tag<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:nbt_as_tag_list" as const;
  static override numericID = 253;
  static override nicknames = [
    "asTagList",
    "nbtAsTagList",
    "as_tag_list",
    "nbt_as_tag_list",
    "nbtAs_tag_list",
  ];
  static override symbol = "NBT.as_tag_list";
  static override interactName = "nbtAsTagList";
  static override operatorName = "as_tag_list" as const;
  static override displayName = "NBT List As NBT List" as const;
  static override fullDisplayName = "NBT NBT List As NBT List" as const;
  static override tooltipInfo =
    "Get the NBT List value of the given NBT List tag" as const;

  static override kind = "nbt" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
