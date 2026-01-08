import { TypeMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Long } from "JavaNumberClasses/Long";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Long>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:nbt_compound_value_list_long",
      nicknames: ["nbtCompoundValueListLong", "compoundValueListLong"],
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
            to: { type: "List", listType: { type: "Long" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_long",
      interactName: "nbtGetListLong",
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Long>> => {
        return (key: iString): iArray<Long> => {
          let value = nbt.get(key);
          if (value.getType() != Tag.TAG_LIST)
            throw new Error(
              `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
            );
          let list = (value as ListTag).getArray();
          if (!list.every((e) => e.getType() == Tag.TAG_LONG))
            throw new Error(
              `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
            );
          return list.map(
            new Operator({
              function: (e: Tag<IntegratedValue>) =>
                e.valueOf() as IntegratedValue,
              parsedSignature: new ParsedSignature(
                {
                  type: "Function",
                  from: { type: "NBT" },
                  to: { type: "Long" },
                },
                globalMap
              ),
            })
          ) as iArray<Long>;
        };
      },
    });
  }
}
