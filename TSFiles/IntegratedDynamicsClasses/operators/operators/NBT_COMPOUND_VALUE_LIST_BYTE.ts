import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "../Operator";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_BYTE extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Integer>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_byte" as const;
  static override nicknames = [
    "nbtGetListByte",
    "nbtCompoundValueListByte",
    "compoundValueListByte",
  ];
  static override symbol = "NBT{}.get_list_byte";
  static override interactName = "nbtGetListByte";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Integer>> => {
        return (key: iString): iArray<Integer> => {
          let value = nbt.get(key);
          if (value instanceof ByteArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof ByteTag))
              throw new Error(
                `${key.valueOf()} is not a list of byte in ${JSON.stringify(
                  nbt.toJSON()
                )}`
              );
            return list.map(
              new Operator({
                function: (e: Tag<IntegratedValue>) =>
                  e.valueOf() as IntegratedValue,
                parsedSignature: new ParsedSignature({
                  type: "Function",
                  from: { type: "NBT" },
                  to: { type: "Integer" },
                }),
              })
            ) as iArray<Integer>;
          }
          throw new Error(
            `${key.valueOf()} is not a list of byte in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
