import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_BYTE extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Integer>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_value_list_byte",
      nicknames: ["nbtCompoundValueListByte", "compoundValueListByte"],
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
            to: { type: "List", listType: { type: "Integer" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_byte",
      interactName: "nbtGetListByte",
      function: (nbt: CompoundTag) => {
        return (key: iString): iArray<Integer> => {
          let value = nbt.get(key) as ListTag;
          if (value.getType() !== Tag.TAG_LIST)
            return new iArrayEager([Integer.ZERO]);
          let list = value.valueOf() as iArray<ByteTag>;
          return list.map(
            new Operator({
              function: (e: ByteTag) => e.valueOf() as Integer,
              parsedSignature: new ParsedSignature(
                {
                  type: "Function",
                  from: { type: "NBT" },
                  to: { type: "Integer" },
                },
                globalMap
              ),
            })
          ) as iArray<Integer>;
        };
      },
    });
  }
}
