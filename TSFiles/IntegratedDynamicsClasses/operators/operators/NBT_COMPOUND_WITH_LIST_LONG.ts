import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Long } from "JavaNumberClasses/Long";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<iArray<Long>, CompoundTag>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_with_list_long",
      nicknames: ["nbtCompoundWithListLong", "NBTWithLongList"],
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
              from: { type: "List", listType: { type: "Long" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_list_long",
      interactName: "nbtWithListLong",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<iArray<Long>, CompoundTag>> => {
        return (key: iString): TypeLambda<iArray<Long>, CompoundTag> => {
          return (value: iArray<Long>): CompoundTag => {
            const nativeArray = value.valueOf();
            const mappedTags = nativeArray.map((e: Long) => new LongTag(e));
            const tagArray = new iArrayEager<Tag<IntegratedValue>>(mappedTags);
            return nbt.set(key.valueOf(), new ListTag(tagArray));
          };
        };
      },
    });
  }
}
