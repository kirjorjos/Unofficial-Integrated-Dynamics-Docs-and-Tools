import { TypeMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_NBT_AS_TAG_LIST extends BaseOperator<
  ListTag,
  iArray<Tag<IntegratedValue>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_as_tag_list",
      nicknames: ["nbtAsTagList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "NBT" } },
        },
        globalMap
      ),
      symbol: "NBT.as_tag_list",
      interactName: "nbtAsTagList",
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
