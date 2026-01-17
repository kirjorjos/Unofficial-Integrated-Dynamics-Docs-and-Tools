import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_BYTE extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Integer>, CompoundTag>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_with_list_byte",
      nicknames: ["nbtCompoundWithListByte", "NBTWithByteList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Integer" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_byte_list",
      interactName: "nbtWithByteList",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iArray<Integer>, CompoundTag>> => {
        return (key: iString): TypeLambda<iArray<Integer>, CompoundTag> => {
          return (value: iArray<Integer>): CompoundTag => {
            const nativeArray = value.valueOf();
            const mappedTags = nativeArray.map((e: Integer) => new ByteTag(e));
            const tagArray = new iArrayEager<Tag<IntegratedValue>>(mappedTags);
            return nbt.set(key.valueOf(), new ListTag(tagArray));
          };
        };
      },
    });
  }
}
