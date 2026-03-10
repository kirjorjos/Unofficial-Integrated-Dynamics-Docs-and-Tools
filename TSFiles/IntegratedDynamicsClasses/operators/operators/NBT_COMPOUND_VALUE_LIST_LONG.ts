import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../Operator";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { LongArrayTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongArrayTag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { Long } from "JavaNumberClasses/Long";

export class OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG extends BaseOperator<
  CompoundTag,
  Operator<iString, iArray<Long>>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_list_long" as const;
  static override nicknames = [
    "nbtGetListLong",
    "nbtCompoundValueListLong",
    "compoundValueListLong",
  ];
  static override symbol = "NBT{}.get_list_long";
  static override interactName = "nbtGetListLong";
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
          to: { type: "List", listType: { type: "Long" } },
        },
      }),
      function: (nbt: CompoundTag): TypeLambda<iString, iArray<Long>> => {
        return (key: iString): iArray<Long> => {
          let value = nbt.get(key);
          if (value instanceof LongArrayTag) {
            return value.valueOf();
          }
          if (value instanceof NullTag) {
            return new iArrayEager([]);
          }
          if (value instanceof ListTag) {
            let list = value.getArray();
            if (!list.every((e) => e instanceof LongTag))
              throw new Error(
                `${key.valueOf()} is not a list of long in ${JSON.stringify(
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
                  to: { type: "Long" },
                }),
              })
            ) as iArray<Long>;
          }
          throw new Error(
            `${key.valueOf()} is not a list of long in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
