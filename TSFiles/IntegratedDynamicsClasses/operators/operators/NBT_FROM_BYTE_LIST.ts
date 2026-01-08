import { TypeMap } from "HelperClasses/TypeMap";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_NBT_FROM_BYTE_LIST extends BaseOperator<
  iArray<Integer>,
  ListTag
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_from_byte_list",
      nicknames: ["nbtFromByteList"],
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
      symbol: "NBT.from_byte_list",
      interactName: "byteListAsNbt",
      function: (byteList: iArray<Integer>): ListTag => {
        const nativeArray = byteList.valueOf();
        const mappedTags = nativeArray.map((e: Integer) => new ByteTag(e));
        const tagArray = new iArrayEager<Tag<IntegratedValue>>(mappedTags);
        return new ListTag(tagArray);
      },
    });
  }
}
