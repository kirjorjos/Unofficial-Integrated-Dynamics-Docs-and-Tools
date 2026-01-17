import { globalMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_INT_LIST extends BaseOperator<
  iArray<Integer>,
  ListTag
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_from_int_list",
      nicknames: ["nbtFromIntList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_int_list",
      interactName: "intListAsNbt",
      function: (intList: iArray<Integer>): ListTag => {
        const nativeArray = intList.valueOf();
        const mappedTags = nativeArray.map((e: Integer) => new IntTag(e));
        const tagArray = new iArrayEager<Tag<IntegratedValue>>(mappedTags);
        return new ListTag(tagArray);
      },
    });
  }
}
