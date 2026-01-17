import { globalMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_FROM_LONG_LIST extends BaseOperator<
  iArray<Long>,
  ListTag
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_long_list",
      nicknames: ["nbtFromLongList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_long_list",
      interactName: "longListAsNbt",
      function: (longList: iArray<Long>): ListTag => {
        const nativeArray = longList.valueOf();
        const mappedTags = nativeArray.map((e: Long) => new LongTag(e));
        const tagArray = new iArrayEager<Tag<IntegratedValue>>(mappedTags);
        return new ListTag(tagArray);
      },
    });
  }
}
