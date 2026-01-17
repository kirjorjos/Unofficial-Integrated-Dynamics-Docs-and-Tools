import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_TAG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Tag<IntegratedValue>>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_value_list_tag",
      nicknames: [
        "nbtCompoundValueListTag",
        "nbtCompoundValueList",
        "compoundValueListNBT",
      ],
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
            to: { type: "List", listType: { type: "NBT" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_tag",
      interactName: "nbtGetListTag",
      function: (
        nbt: CompoundTag
      ): TypeLambda<iString, iArray<Tag<IntegratedValue>>> => {
        return (key: iString): iArray<Tag<IntegratedValue>> => {
          if (!nbt.has(key))
            throw new Error(
              `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
            );
          let listTag = nbt.get(key);
          if (listTag.getType() != Tag.TAG_LIST)
            throw new Error(
              `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
            );
          return (listTag as ListTag).getArray();
        };
      },
    });
  }
}
