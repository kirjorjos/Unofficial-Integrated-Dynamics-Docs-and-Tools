import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_WITH_LIST_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, Operator<ListTag, CompoundTag>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_with_list_tag",
      nicknames: ["nbtCompoundWithListTag", "NBTWithNBTList"],
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
              from: { type: "List", listType: { type: "NBT" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_tag_list",
      interactName: "nbtWithTagList",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, TypeLambda<ListTag, CompoundTag>> => {
        return (key: iString): TypeLambda<ListTag, CompoundTag> => {
          return (value: ListTag): CompoundTag => {
            return nbt.set(key.valueOf(), value);
          };
        };
      },
    });
  }
}
