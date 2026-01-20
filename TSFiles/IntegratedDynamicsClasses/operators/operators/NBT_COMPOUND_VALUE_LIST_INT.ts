import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { IntArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_INT extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Integer>>
> {
    static override internalName = "integrateddynamics:nbt_compound_value_list_int"
  constructor() {
    super({
      nicknames: ["nbtCompoundValueListInt", "compoundValueListInteger"],
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
      symbol: "NBT{}.get_list_int",
      interactName: "nbtGetListInt",
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Integer>> => {
        return (key: iString): iArray<Integer> => {
          let value = nbt.get(key);
          if (value instanceof IntArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof IntTag))
              throw new Error(
                `${key.valueOf()} is not a list of int in ${JSON.stringify(
                  nbt.toJSON()
                )}`
              );
            return list.map(
              new Operator({
                function: (e: Tag<IntegratedValue>) =>
                  e.valueOf() as IntegratedValue,
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
          }
          throw new Error(
            `${key.valueOf()} is not a list of int in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
